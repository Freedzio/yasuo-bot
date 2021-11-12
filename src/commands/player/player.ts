import { Message } from "discord.js";
import { Queue } from "./types";
import { skip } from "./methods/skip";
import { stop } from "./methods/stop";
import { addSongs } from "./methods/addSongs";
import { loop } from "./methods/loop";

export const queue = new Map<string, Queue>();

module.exports = {
  play: (msg: Message, args) => addSongs(msg, args),
  p: (msg: Message, args) => addSongs(msg, args),
  skip: (msg: Message) => skip(msg),
  stop: (msg: Message) => stop(msg),
  loop: (msg: Message) => loop(msg),
};
