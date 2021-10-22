import {
  Guild,
  Message,
  TextChannel,
  VoiceChannel,
  VoiceConnection,
} from "discord.js";
import ytdl from "ytdl-core";
import ytsr, { Video } from "ytsr";

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
const isUrl = (songToSearch: string) => {
  try {
    new URL(songToSearch);
    return true;
  } catch (e) {
    return false;
  }
};

export async function execute(message: Message, args: string[]) {
  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = (await ytsr(args.join(" "), { limit: 1 })).items[0];

  const song = {
    title: (songInfo as Video).title,
    url: (songInfo as Video).url,
  };

  if (!serverQueue(message)) {
    const queueContruct = {
      textChannel: message.channel as TextChannel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue(message).songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

export function skip(message: Message) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue(message))
    return message.channel.send("There is no song that I could skip!");
  serverQueue(message).connection.dispatcher.end();
}

export function stop(message: Message) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );

  if (!serverQueue(message))
    return message.channel.send("There is no song that I could stop!");

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
      queueToHandle.textChannel.send(`Done playing: **${song.title}**`);
      queueToHandle.songs.shift();
      play(guild, queueToHandle.songs[0]);
    })
    .on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(queueToHandle.volume / 5);
  queueToHandle.textChannel.send(`Start playing: **${song.title}**`);
}

module.exports = {
  play: (msg: Message, args) => execute(msg, args),
  p: (msg: Message, args) => execute(msg, args),
  skip: (msg: Message) => skip(msg),
  stop: (msg: Message) => stop(msg),
};
