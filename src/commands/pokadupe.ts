import { Message } from "discord.js";
import { getRandomItem } from "../helpers";

const replies = [
  "( ͡° ͜ʖ ͡°) chciałbyś",
  "( ͡° ͜ʖ ͡°)╭∩╮ nie",
  "( ͠° ͟ʖ ͡°) słucham?",
  "(° ͜ʖ °) dupy to se możesz na Morence zobaczyć",
  "[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅] ok, ale nie jestem tani",
  "(____  .  ____)",
  "moje ciało jest gotowe",
];
export function pokadupe(msg: Message) {
  // args[0] === 'on' ? active = true && msg.reply('moje ciało jest gotowe')
  //   : args[0] === 'off' ? active = false && msg.reply('koniec psot')
  //     : active &&  msg.reply(helpers.getRandomItem(replies))

  msg.reply(getRandomItem(replies));
}
