import { Message, TextChannel } from "discord.js";
import ytsr, { Playlist, Video } from "ytsr";
import { handlePlaylist } from "../handlers/handlePlaylist";
import { handleSong } from "../handlers/handleSong";
import { handleSpotify } from "../handlers/handleSpotify";
import { handleUnhandled } from "../handlers/handleUnhandledType";

export const addSongs = async (message: Message, args: string[]) => {
  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel)
    return message.channel.send("Wejdź na kanał głosowy aby puszczać muzykę!");

  if (
    !voiceChannel &&
    !voiceChannel.members.some((m) => m.id === "815621087764414476")
  )
    return message.reply("Jesteś na innym kanale kasztaniarzu");

  const permissions = voiceChannel.permissionsFor(message.client.user);

  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Nie mam uprawnień aby dołączyć do kanału głosowego"
    );
  }

  const songToSearch = args.join(" ");
  const isSpotify = songToSearch.startsWith("https://open.spotify.com/");

  if (isSpotify) {
    await handleSpotify(message, songToSearch);

    return;
  }

  const searchResult = (await ytsr(songToSearch, { limit: 1 })).items[0];

  const isSong = searchResult?.type === "video";
  const isPlaylist =
    searchResult?.type === "playlist" ||
    songToSearch.includes("playlist?list=");

  switch (true) {
    case isPlaylist:
      await handlePlaylist(
        message,
        (searchResult as Playlist)?.playlistID || songToSearch
      );
      return;
    case isSong:
      await handleSong(message, searchResult as Video);

      return;

    default:
      handleUnhandled(message, searchResult.type);

      message.channel.send(
        "Oopsie daisy, coś poszło nie tak. Spróbuj podać dokładniejszy opis lub inne źródło"
      );
  }
};
