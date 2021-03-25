const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const queueTypes = require('../assets/lol/queueTypes')

const baseURL = 'https://eun1.api.riotgames.com';
const apiKey = process.env.RIOT_TOKEN;

module.exports = async function (msg, args) {
  const summonerName = args.shift();

  try {
    const summonerResponse = await fetch(`${baseURL}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
      headers: {
        "X-Riot-Token": apiKey
      }
    });

    const summonerData = await summonerResponse.json();
    // console.log(summonerData);

    if (summonerData.status && summonerData.status.status_code === 404) {
      msg.reply('ni mo takiego summonera')
    } else {
      const { id, accountId, puuid, name, profileIconId, summonerLevel } = summonerData;

      const summonerRankedResponse = await fetch(`${baseURL}/lol/league/v4/entries/by-summoner/${id}`, {
        headers: {
          "X-Riot-Token": apiKey
        }
      })

      const summonerRankedData = await summonerRankedResponse.json();

      const summonerEmbed = new MessageEmbed()
        .setTitle(`Staty summonera ${name}`)
        .setColor('DARK_BLUE')
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/${profileIconId}.png`)
        .addField('Poziom', summonerLevel)
      if (summonerRankedData.length > 0) {

        for (let i = 0; i < summonerRankedData.length; i++) {
          const { tier, rank, wins, losses, queueType } = summonerRankedData[i];

          summonerEmbed
            .addField(queueTypes[queueType], `${tier} ${rank}`)
            .addField('Wygrane', wins, true)
            .addField('Przegrane', losses, true)
        }

      } else {
        summonerEmbed.setDescription('Ni mo rankingu żadnego')
      }

      msg.reply(summonerEmbed)
    }

  } catch (e) {
    msg.reply('coś nie siadło')
  }
}