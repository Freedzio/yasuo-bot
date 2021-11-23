import { Message, TextChannel } from "discord.js";
import ytdl from "ytdl-core";
import { getServerQueue } from "../getServerQueue";
import { queue } from "../player";
import { banner } from "../songBanner";
import { SongInfo } from "../types";
import { shouldLoop } from "./loop";

export const play = async (message: Message, song: SongInfo) => {
  const queueToHandle = getServerQueue(message);
  if (!song) {
    queueToHandle.voiceChannel.leave();
    queue.delete(message.guild.id);
    return;
  }

  const dispatcher = queueToHandle.connection
    .play(ytdl(song.url, { filter: "audioonly" }), {
      highWaterMark: 1,
    })
    .on("finish", () => {
      if (!shouldLoop) queueToHandle.songs.shift();
      play(message, queueToHandle.songs[0]);
    })
    .on("error", (error) => {
      console.error(error);

      (
        message.client.channels.cache.find(
          (c) => c.id === process.env.BOT_CHANNEL_ID
        ) as TextChannel
      ).send(
        `\`${message.content} resulted in error: \n ${error.toString()}\``
      );

      play(message, queueToHandle.songs[0]);
    })
    .on("start", () => {
      queueToHandle.textChannel.send(banner(song));
    });
  dispatcher.setVolumeLogarithmic(queueToHandle.volume / 5);
};
