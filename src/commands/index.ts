import { gif } from "./gif";
import { what } from "./what";
import { timer } from "./timer";
import { pokadupe } from "./pokadupe";
import * as player from "./player/player";

export const commands = {
  gif,
  what,
  timer,
  pokadupe,
  ...player,
};
