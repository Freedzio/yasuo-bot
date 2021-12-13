import { Message } from "discord.js";
import { getServerQueue } from "../getServerQueue";

export function stop(message: Message) {
  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel)
    return message.channel.send(
      "Musisz być na kanale głosowym aby zatrzymać playlistę!"
    );

  if (!voiceChannel.members.some((m) => m.id === message.author.id))
    return message.reply("Jesteś na innym kanale kasztaniarzu");

  if (!getServerQueue(message))
    return message.channel.send("Nie ma czego zatrzymywać!");

  getServerQueue(message).songs = [];
  getServerQueue(message).connection.dispatcher.end();
}
