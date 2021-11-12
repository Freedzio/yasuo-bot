import { Message } from "discord.js";
import { getServerQueue } from "../getServerQueue";

export function skip(message: Message) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Musisz być na kanale głosowym aby pomijać utwory!"
    );
  if (!getServerQueue(message))
    return message.channel.send("Nie ma czego pomijać!");
  getServerQueue(message).connection.dispatcher.end();
}
