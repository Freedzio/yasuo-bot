const { Client, MessageEmbed } = require('discord.js');

const embed = require('./assets/helpEmbed')
const bootMessage = require('./assets/bootMessage');
const client = new Client();

require('dotenv').config();

client.login(process.env.BOT_TOKEN);


client.on('ready', () => {
  console.log(bootMessage);

  const channelToSayHello = process.env.DEBUG === 'true' ? process.env.BOT_CHANNEL_ID : process.env.MAIN_CHANNEL_ID;
  client.channels.cache.get(channelToSayHello).send(embed)
})

const commandHandler = require('./commands');
const helpers = require('./helpers');

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
})
