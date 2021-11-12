import { Message, TextChannel } from "discord.js";
import { getNextSong } from "../getNextSong";
import { play } from "../methods/play";
import { queue } from "../player";
import { SongInfo, Queue } from "../types";

export const handleNoQueue = async (message: Message, songs: SongInfo[]) => {
  const voiceChannel = message.member.voice.channel;

  const queueContruct: Queue = {
    textChannel: message.channel as TextChannel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 5,
    playing: true,
  };

  queue.set(message.guild.id, queueContruct);

  songs.forEach((s) => queueContruct.songs.push(s));

  try {
    var connection = await voiceChannel.join();
    queueContruct.connection = connection;
    play(message, getNextSong(queueContruct));
  } catch (err) {
    console.log(err);
    queue.delete(message.guild.id);
    return message.channel.send(err);
  }
};
