const fetch = require('node-fetch');
const helpers = require('../helpers');

let buffer = [];

module.exports = async function (msg, args) {
  const userId = msg.author.id;

  if (!(buffer).includes(userId)) {
    const apiKey = process.env.TENOR_TOKEN;
    const searchPhrase = args
    const contentFilter = 'low'
    const locale = 'pl_PL'

    const url = `https://g.tenor.com/v1/search?key=${apiKey}&q=${searchPhrase}&contentfilter=${contentFilter}&locale=${locale}`

    const response = await fetch(url);
    const results = await response.json();

    const gifURL = helpers.getRandomItem(results.results).url

    msg.channel.send(gifURL)

    buffer.push(userId)

    setTimeout(() => {
      buffer = buffer.filter(i => i !== userId)
    }, 5000);
  } else msg.reply('Zwolnij troszkę')
}