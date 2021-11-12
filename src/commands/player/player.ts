import { Message } from "discord.js";
import ytsr, { Video } from "ytsr";
import { Queue } from "./types";
import { handleSong } from "./handlers/handleSong";
import { skip } from "./methods/skip";
import { stop } from "./methods/stop";
import { addSongs } from "./methods/addSongs";

export const queue = new Map<string, Queue>();

export let shouldLoop = false;

const loop = (msg: Message) => {
  shouldLoop = !shouldLoop;

  msg.channel.send(shouldLoop ? `Ok, zapętlam ` : "");
};

module.exports = {
  play: (msg: Message, args) => addSongs(msg, args),
  p: (msg: Message, args) => addSongs(msg, args),
  skip: (msg: Message) => skip(msg),
  stop: (msg: Message) => stop(msg),
};
