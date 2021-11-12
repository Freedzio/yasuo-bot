import { Message } from "discord.js";
import ytpl from "ytpl";
import { getMessageAfterAddingSongs } from "../getMesageAfterAddingSongs";
import { getServerQueue } from "../getServerQueue";
import { SongInfo } from "../types";
import { handleNoQueue } from "./handleNoQueue";

export const handlePlaylist = async (message: Message, playlistUrl: string) => {
  const playlist = (await ytpl(playlistUrl, {})).items;
  const songs: SongInfo[] = playlist.map((s) => ({
    title: s.title,
    url: s.shortUrl,
  }));

  message.channel.send(getMessageAfterAddingSongs(songs));

  if (!getServerQueue(message)) await handleNoQueue(message, songs);
  else
    getServerQueue(message).songs = getServerQueue(message).songs.concat(songs);
};
