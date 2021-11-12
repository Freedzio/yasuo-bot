import { Queue } from "./types";

export const getNextSong = (queue: Queue) => queue.songs[0];
