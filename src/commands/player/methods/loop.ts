import { Message } from "discord.js";
import { getCurrentSong } from "../getCurrentSong";
import { getServerQueue } from "../getServerQueue";

export let shouldLoop = false;

export const loop = (msg: Message) => {
  if (!getServerQueue(msg)) return msg.channel.send("Nie ma czego zapętlać!");

  shouldLoop = !shouldLoop;

  msg.channel.send(
    shouldLoop
      ? `Ok, zapętlam **${getCurrentSong(msg).title}**`
      : "Zapętlanie wyłączone"
  );
};
