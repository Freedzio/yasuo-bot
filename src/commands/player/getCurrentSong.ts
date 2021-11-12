import { Message } from "discord.js";
import { getServerQueue } from "./getServerQueue";

export const getCurrentSong = (msg: Message) => getServerQueue(msg).songs[0];
