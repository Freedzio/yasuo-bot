import { Message } from "discord.js";
import { Video } from "ytsr";
import { getServerQueue } from "../getServerQueue";
import { handleNoQueue } from "./handleNoQueue";

export const handleSong = async (message: Message, songInfo: Video) => {
  const song = {
    title: songInfo.title,
    url: songInfo.url,
  };

  if (!getServerQueue(message)) await handleNoQueue(message, [song]);
  else {
    getServerQueue(message).songs.push(song);
    return message.channel.send(`Dodano ${song.title} do kolejki!`);
  }
};
