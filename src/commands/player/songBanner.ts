import { MessageEmbed } from "discord.js";
import { SongInfo } from "./types";

export const banner = (song: SongInfo) =>
  new MessageEmbed()
    .setTitle("Siemanko")
    .setColor("PURPLE")
    .addField("Tera leci:", `[${song.title}](${song.url})`);
