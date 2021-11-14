import { Message } from "discord.js";
import { getMessageAfterAddingSongs } from "./getMesageAfterAddingSongs";
import { getServerQueue } from "./getServerQueue";
import { handleNoQueue } from "./handlers/handleNoQueue";
import { SongInfo } from "./types";

export const putSongsInQueue = async (msg: Message, songs: SongInfo[]) => {
  if (!getServerQueue(msg)) await handleNoQueue(msg, songs);
  else getServerQueue(msg).songs = getServerQueue(msg).songs.concat(songs);

  msg.channel.send(getMessageAfterAddingSongs(songs));
};
