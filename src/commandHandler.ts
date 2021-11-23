import { Message, TextChannel } from "discord.js";
import { commands } from "./commands/index";

export default function commandHandler(msg: Message) {
  if (
    process.env.DEBUG === "true"
      ? msg.channel.id === process.env.BOT_CHANNEL_ID
      : msg.channel.id !== process.env.BOT_CHANNEL_ID
  ) {
    try {
      let tokens = msg.content.split(" ");
      let command = tokens.shift();

      if (command.charAt(0) === "!") {
        command = command.substring(1).toLowerCase();

        const timeOfCommand = new Date();

        if (Object.keys(commands).includes(command)) {
          commands[command](msg, tokens);
          console.log(
            `${timeOfCommand}: ${msg.author.username} said ${command} with arguments ${tokens}`
          );
        } else {
          console.log(
            `${timeOfCommand}: I dont know that command - ${command}`
          );
          msg.reply(`Nie znam takiej komendy - ${command}`);
        }
      }
    } catch (e) {
      (
        msg.client.channels.cache.find(
          (c) => c.id === process.env.BOT_CHANNEL_ID
        ) as TextChannel
      ).send(`\`${msg.content} resulted in error: \n ${e.toString()}\``);
    }
  }
}
