import { Message } from "discord.js";
import { getServerQueue } from "../getServerQueue";

export function skip(message: Message) {
  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel)
    return message.channel.send(
      "Musisz być na kanale głosowym aby pomijać utwory!"
    );

  if (!voiceChannel.members.some((m) => m.id === message.author.id))
    return message.reply("Jesteś na innym kanale kasztaniarzu");

  if (!getServerQueue(message))
    return message.channel.send("Nie ma czego pomijać!");
  getServerQueue(message).connection.dispatcher.end();
}
