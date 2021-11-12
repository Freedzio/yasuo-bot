import { TextChannel, VoiceChannel, VoiceConnection } from "discord.js";

export type SongInfo = {
  title: string;
  url: string;
};

export type Queue = {
  textChannel: TextChannel;
  voiceChannel: VoiceChannel;
  connection: VoiceConnection;
  songs: SongInfo[];
  volume: number;
  playing: boolean;
};
