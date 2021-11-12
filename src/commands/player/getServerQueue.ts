import { Message } from "discord.js";
import { queue } from "./player";

export const getServerQueue = (message: Message) => queue.get(message.guild.id);
