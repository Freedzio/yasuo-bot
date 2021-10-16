import { Message } from "discord.js";

const timeUnits = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60,
};

let buffer = {};

export function timer(msg: Message, args: string[]) {
  const userId = msg.author.id;

  if (args.length === 1) {
    if (args[0] === "cancel") {
      if (buffer[userId].amount) {
        msg.reply(`usunąłem Twój timer - ${buffer[userId].amount}`);
        clearInterval(buffer[userId].t);
        delete buffer[userId];
      }
    } else if (!Object.keys(buffer).includes(userId)) {
      const tmp = args.join("").split("");
      const unit = tmp.pop().toLowerCase();

      if (Object.keys(timeUnits).includes(unit)) {
        const amount = parseInt(tmp.join(""));

        msg.reply(`timer uruchomiony na ${args}`);

        const t = setTimeout(() => {
          msg.reply(`czas minął - ${args}`);
          delete buffer[userId];
        }, amount * timeUnits[unit]);

        buffer = {
          ...buffer,
          [userId]: {
            timeout: t,
            amount: args,
          },
        };
      } else {
        msg.reply("nieprawidłowa jednostka czasu - wybierz s, m lub h");
      }
    } else {
      msg.reply(
        `masz już nastawiony timer na ${buffer[userId].amount} - poczekaj aż się skończy albo anuluj go komendą "!timer cancel"`
      );
    }
  }
}
