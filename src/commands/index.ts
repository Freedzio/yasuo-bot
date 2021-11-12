import { gif } from "./gif";
import { spotify } from "./spotify";
import { what } from "./what";
import { timer } from "./timer";
import { pokadupe } from "./pokadupe";
import * as player from "./player/player";

export const commands = {
  gif,
  spotify,
  what,
  timer,
  pokadupe,
  ...player,
};
