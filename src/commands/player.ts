import {
  Guild,
  Message,
  MessageEmbed,
  TextChannel,
  VoiceChannel,
  VoiceConnection,
} from "discord.js";
import ytdl from "ytdl-core";
import ytsr, { Video } from "ytsr";
import ytpl from "ytpl";

type SongInfo = {
  title: string;
  url: string;
};

type Queue = {
  textChannel: TextChannel;
  voiceChannel: VoiceChannel;
  connection: VoiceConnection;
  songs: SongInfo[];
  volume: number;
  playing: boolean;
};

const queue = new Map<string, Queue>();

const serverQueue = (message: Message) => queue.get(message.guild.id);

const isPlaylist = (songToSearch: string) => {
  return ["youtube.com", "list"].every((i) => songToSearch.includes(i));
};

async function handleSong(message: Message, songToSearch: string) {
  const songInfo = (await ytsr(songToSearch, { limit: 1 })).items[0];

  const itTurnsOutItIsAPlaylist = songInfo.type === "playlist";

  if (itTurnsOutItIsAPlaylist) {
    handlePlaylist(message, songInfo.playlistID);
    return;
  }

  const song = {
    title: (songInfo as Video).title,
    url: (songInfo as Video).url,
  };

  if (!serverQueue(message)) await handleNoQueue(message, [song]);
  else {
    serverQueue(message).songs.push(song);
    return message.channel.send(`Dodano ${song.title} do kolejki!`);
  }
}

async function handlePlaylist(message: Message, playlistUrl: string) {
  const playlist = (await ytpl(playlistUrl, {})).items;
  const songs: SongInfo[] = playlist.map((s) => ({
    title: s.title,
    url: s.shortUrl,
  }));

  if (!serverQueue(message)) await handleNoQueue(message, songs);
  else {
    serverQueue(message).songs = serverQueue(message).songs.concat(songs);
    return message.channel.send(`Dodano ${songs.length} utworów do kolejki!`);
  }
}

const getMessageAfetAddingSongs = (songs: SongInfo[]) =>
  songs.length > 1
    ? `Dodano ${songs.length} utworów do kolejki`
    : `Dodano ${songs[0].title} do kolejki`;

async function handleNoQueue(message: Message, songs: SongInfo[]) {
  const voiceChannel = message.member.voice.channel;

  const queueContruct: Queue = {
    textChannel: message.channel as TextChannel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 5,
    playing: true,
  };

  queue.set(message.guild.id, queueContruct);

  songs.forEach((s) => queueContruct.songs.push(s));

  message.channel.send(getMessageAfetAddingSongs(songs));

  try {
    var connection = await voiceChannel.join();
    queueContruct.connection = connection;
    play(message.guild, queueContruct.songs[0]);
  } catch (err) {
    console.log(err);
    queue.delete(message.guild.id);
    return message.channel.send(err);
  }
}

export async function execute(message: Message, args: string[]) {
  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel)
    return message.channel.send("Wejdź na kanał głosowy aby puszczać muzykę!");

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Nie mam uprawnień aby dołączyć do kanału głosowego"
    );
  }

  const songToSearch = args.join(" ");

  if (isPlaylist(songToSearch)) await handlePlaylist(message, songToSearch);
  else await handleSong(message, songToSearch);
}

export function skip(message: Message) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Musisz być na kanale głosowym aby pomijać utwory!"
    );
  if (!serverQueue(message))
    return message.channel.send("Nie ma czego pomijać!");
  serverQueue(message).connection.dispatcher.end();
}

export function stop(message: Message) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Musisz być na kanale głosowym aby zatrzymać playlistę!"
    );

  if (!serverQueue(message))
    return message.channel.send("Nie ma czego zatrzymywać!");

  serverQueue(message).songs = [];
  serverQueue(message).connection.dispatcher.end();
}

async function play(guild: Guild, song: { title: string; url: string }) {
  const queueToHandle = queue.get(guild.id);
  if (!song) {
    queueToHandle.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = queueToHandle.connection
    .play(ytdl(song.url, { filter: "audioonly" }), {
      highWaterMark: 1,
    })
    .on("finish", () => {
      queueToHandle.songs.shift();
      play(guild, queueToHandle.songs[0]);
    })
    .on("error", (error) => {
      console.error(error);
    });
  dispatcher.setVolumeLogarithmic(queueToHandle.volume / 5);

  const banner = new MessageEmbed()
    .setTitle("Siemanko")
    .setColor("PURPLE")
    .addField("Tera leci:", `[${song.title}](${song.url})`);

  queueToHandle.textChannel.send(banner);
}

module.exports = {
  play: (msg: Message, args) => execute(msg, args),
  p: (msg: Message, args) => execute(msg, args),
  skip: (msg: Message) => skip(msg),
  stop: (msg: Message) => stop(msg),
};
