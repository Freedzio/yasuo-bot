const { Client, MessageEmbed } = require('discord.js');

const embed = require('./assets/helpEmbed')
const bootMessage = require('./assets/bootMessage');
const client = new Client();

const commandHandler = require('./commands');
const helpers = require('./helpers');
const { default: fetch } = require('node-fetch');

require('dotenv').config();

client.on('ready', async () => {
  console.log(bootMessage);

  const channelToSayHello = process.env.DEBUG === 'true' ? process.env.BOT_CHANNEL_ID : process.env.MAIN_CHANNEL_ID;
  client.channels.cache.get(channelToSayHello).send(embed)
})

client.on('message', commandHandler);

// just for funsies
const chanceMultiplier = 99;
const funsies = [
  'd( ͡° ͜ʖ ͡°)b widzę was...',
  'mamo, gdzie jesteś?'
]

client.on('message', (msg) => {
  const x = Math.ceil(Math.random() * chanceMultiplier);
  if (x === chanceMultiplier) msg.channel.send(helpers.getRandomItem(funsies));
});

client.login(process.env.BOT_TOKEN);