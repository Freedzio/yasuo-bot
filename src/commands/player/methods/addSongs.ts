import { Message, TextChannel } from "discord.js";
import ytsr, { Playlist } from "ytsr";
import { handlePlaylist } from "../handlers/handlePlaylist";
import { handleSong } from "../handlers/handleSong";
import { handleSpotify } from "../handlers/handleSpotify";

export const addSongs = async (message: Message, args: string[]) => {
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
  const isSpotify = songToSearch.startsWith(
    "https://open.spotify.com/playlist/"
  );

  try {
    if (isSpotify) {
      await handleSpotify(message, songToSearch);

      return;
    }

    const searchResult = (await ytsr(songToSearch, { limit: 1 })).items[0];

    const isSong = searchResult?.type === "video";
    const isPlaylist =
      searchResult?.type === "playlist" ||
      songToSearch.includes("playlist?list=");

    if (isPlaylist)
      await handlePlaylist(
        message,
        (searchResult as Playlist)?.playlistID || songToSearch
      );
    if (isSong) await handleSong(message, searchResult);
  } catch (e) {
    message.channel.send(
      "Oopsie daisy, coś poszło nie tak. Spróbuj dodać utwór w inny sposób"
    );

    (
      message.client.channels.cache.find(
        (c) => c.id === process.env.BOT_CHANNEL_ID
      ) as TextChannel
    ).send(`${message.content} resulted in error: \n \`${e.toString()}\``);
  }
};
