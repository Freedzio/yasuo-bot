import { Message } from "discord.js";
import ytsr from "ytsr";
import { handlePlaylist } from "../handlers/handlePlaylist";
import { handleSong } from "../handlers/handleSong";

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

  const searchResult = (await ytsr(songToSearch, { limit: 1 })).items[0];

  console.log(searchResult);

  const isPlaylist = searchResult.type === "playlist";
  const isSong = searchResult.type === "video";

  if (isPlaylist) await handlePlaylist(message, searchResult.playlistID);
  if (isSong) await handleSong(message, searchResult);
};
