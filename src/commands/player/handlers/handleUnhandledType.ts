import { Message } from "discord.js";

export const handleUnhandled = (msg: Message, type: string) => {
  msg.channel.send(
    `Dodano zbiór typu **${type}** - nie potrafię tego osbłużyć`
  );
  throw new Error(`unhandled - ${type}`);
};
