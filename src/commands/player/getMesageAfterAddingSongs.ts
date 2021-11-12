import { SongInfo } from "./types";

export const getMessageAfterAddingSongs = (songs: SongInfo[]) =>
  songs.length > 1
    ? `Dodano ${songs.length} utworów do kolejki`
    : `Dodano ${songs[0].title} do kolejki`;
