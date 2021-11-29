import { gif } from "./gif";
import { what } from "./what";
import { timer } from "./timer";
import { pokadupe } from "./pokadupe";
import * as player from "./player/player";
import { addSpotifyPlaylistByName as spotify } from "./spotify";

export const commands = {
  gif,
  what,
  timer,
  pokadupe,
  ...player,
  spotify,
};
