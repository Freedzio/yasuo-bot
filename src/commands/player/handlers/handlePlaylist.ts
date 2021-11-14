import { Message } from "discord.js";
import ytpl from "ytpl";
import { putSongsInQueue } from "../putSOngsInQueue";
import { SongInfo } from "../types";

export const handlePlaylist = async (message: Message, playlistUrl: string) => {
  const playlist = (await ytpl(playlistUrl, {})).items;
  const songs: SongInfo[] = playlist.map((s) => ({
    title: s.title,
    url: s.shortUrl,
  }));

  await putSongsInQueue(message, songs);
};
