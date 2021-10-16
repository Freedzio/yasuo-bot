import { Message } from "discord.js";
import { embed } from "../assets/helpEmbed";

export function what(msg: Message) {
  msg.reply(embed);
}
