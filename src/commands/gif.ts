import { Message } from "discord.js";
import fetch from "node-fetch";
import { getRandomItem } from "../helpers";

const apiKey = process.env.TENOR_TOKEN;
const contentFilter = "low";
const locale = "pl_PL";

let buffer = [];

export async function gif(msg: Message, args: string[]) {
  const userId = msg.author.id;

  if (!buffer.includes(userId)) {
    const searchPhrase = args;

    const url = `https://g.tenor.com/v1/search?key=${apiKey}&q=${searchPhrase}&contentfilter=${contentFilter}&locale=${locale}`;

    const response = await fetch(url);
    // TODO dodaj typingi dla zwrotki z gifami
    const results = (await response.json()) as any;

    const gifURL = getRandomItem(results.results).url;

    msg.channel.send(gifURL);

    buffer.push(userId);

    setTimeout(() => {
      buffer = buffer.filter((i) => i !== userId);
    }, 5000);
  } else msg.reply("Zwolnij troszkę");
}
