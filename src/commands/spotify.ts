import { Message } from "discord.js";
import fetch from "node-fetch";

const baseURL = "https://api.spotify.com/v1";
const spotifyUserID = "21ejkgoivwl4x7ddwkwvml2ya";

function myFetch(endpoint: string, token) {
  return fetch(baseURL + endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function spotify(msg: Message, args: string[]) {
  const playlistName = args.join(" ").toLowerCase();

  const spotifyRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${new Buffer(
        `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
      ).toString("base64")}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const spotifyData = (await spotifyRes.json()) as any;

  const spotifyAccesToken = spotifyData.access_token;

  const allPlaylistsRes = await myFetch(
    `/users/${spotifyUserID}/playlists`,
    spotifyAccesToken
  );
  const allPlaylistsData = (await allPlaylistsRes.json()) as any;

  const playlistData = allPlaylistsData.items.find(
    (p) => p.name.toLowerCase() === playlistName
  );

  const voiceChannelId = msg.member.voice.channelID;

  msg.channel.send(`-p ${playlistData.external_urls.spotify}`);

  // msg.client.channels.cache.get(voiceChannelId).join().then(() => {
  // })
}
