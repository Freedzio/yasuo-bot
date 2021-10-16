import { Client, TextChannel } from "discord.js";

import { embed } from "./assets/helpEmbed";
import { bootMessage } from "./assets/bootMessage";
import * as dotenv from "dotenv";
import commandHandler from "./commands";
import { getRandomItem } from "./helpers";

const client = new Client();

dotenv.config();

client.on("ready", async () => {
  console.log(bootMessage);

  const channelToSayHello =
    process.env.DEBUG === "true"
      ? process.env.BOT_CHANNEL_ID
      : process.env.MAIN_CHANNEL_ID;
  (client.channels.cache.get(channelToSayHello) as TextChannel).send(embed);
});

client.on("message", commandHandler);

// just for funsies
const chanceMultiplier = 99;
const funsies = ["d( ͡° ͜ʖ ͡°)b widzę was...", "mamo, gdzie jesteś?"];

client.on("message", (msg) => {
  const x = Math.ceil(Math.random() * chanceMultiplier);
  if (x === chanceMultiplier) msg.channel.send(getRandomItem(funsies));
});

client.login(process.env.BOT_TOKEN);
