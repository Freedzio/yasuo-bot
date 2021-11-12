import { Message } from "discord.js";
import { getServerQueue } from "../getServerQueue";

export function stop(message: Message) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Musisz być na kanale głosowym aby zatrzymać playlistę!"
    );

  if (!getServerQueue(message))
    return message.channel.send("Nie ma czego zatrzymywać!");

  getServerQueue(message).songs = [];
  getServerQueue(message).connection.dispatcher.end();
}
