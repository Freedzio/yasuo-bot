import { Message } from "discord.js";
import { Video } from "ytsr";
import { putSongsInQueue } from "../putSongsInQueue";

export const handleSong = async (message: Message, songInfo: Video) => {
  const song = {
    title: songInfo.title,
    url: songInfo.url,
  };

  await putSongsInQueue(message, [song]);
};
