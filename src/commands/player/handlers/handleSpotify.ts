import { Message } from "discord.js";
import fetch from "node-fetch";
import ytsr, { Video } from "ytsr";
import { getMessageAfterAddingSongs } from "../getMesageAfterAddingSongs";
import { getServerQueue } from "../getServerQueue";
import { SongInfo } from "../types";
import { handleNoQueue } from "./handleNoQueue";

const baseURL = "https://api.spotify.com/v1";

function spotifyFetch(endpoint: string, token) {
  return fetch(baseURL + endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const handleSpotify = async (msg: Message, playlistUrl: string) => {
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

  const playlistId = playlistUrl
    .replace("https://open.spotify.com/playlist/", "")
    .split("?")[0];

  const playlistRes = await spotifyFetch(
    `/playlists/${playlistId}`,
    spotifyAccesToken
  );
  const data = (await playlistRes.json()) as any;

  const songsToSearch = data.tracks.items.map((i) => i.track.name);

  const results: SongInfo[] = [];

  for (let i in songsToSearch) {
    const searchResult = (await ytsr(songsToSearch[i], { limit: 1 }))
      .items[0] as Video;
    results.push({ title: searchResult.title, url: searchResult.url });
  }

  // TODO unify queue no queue handling methodss

  msg.channel.send(getMessageAfterAddingSongs(results));

  if (!getServerQueue(msg)) await handleNoQueue(msg, results);
  else getServerQueue(msg).songs = getServerQueue(msg).songs.concat(results);
};
