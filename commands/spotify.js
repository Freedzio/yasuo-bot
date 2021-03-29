const { default: fetch } = require("node-fetch");

const baseURL = 'https://api.spotify.com/v1';
const spotifyUserID = '21ejkgoivwl4x7ddwkwvml2ya';

function myFetch(endpoint, token) {
  return fetch(baseURL + endpoint, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

module.exports = async function (msg, args) {
  const playlistName = args.join(' ');

  const spotifyRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const spotifyData = await spotifyRes.json();
  console.log(spotifyData)

  const spotifyAccesToken = spotifyData.access_token;

  const allPlaylistsRes = await myFetch(`/users/${spotifyUserID}/playlists`, spotifyAccesToken);
  const allPlaylistsData = await allPlaylistsRes.json();

  const playlistData = allPlaylistsData.items.find(p => p.name === playlistName)

  const voiceChannelId = msg.member.voice.channelID;

  msg.channel.send(`-p ${playlistData.external_urls.spotify}`);

  // msg.client.channels.cache.get(voiceChannelId).join().then(() => {
  // })
}