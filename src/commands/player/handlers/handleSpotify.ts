import { Message } from "discord.js";
import fetch from "node-fetch";
import ytsr, { Video } from "ytsr";
import { putSongsInQueue } from "../putSongsInQueue";
import { SongInfo } from "../types";
import { handleUnhandled } from "./handleUnhandledType";

const baseURL = "https://api.spotify.com/v1";

export const spotifyFetch = async (endpoint: string) => {
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

  const token = spotifyData.access_token;

  return fetch(baseURL + endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const handleSpotify = async (msg: Message, spotifyUrl: string) => {
  const spotifySource = spotifyUrl
    .replace("https://open.spotify.com/", "")
    .split("/");

  const musicType = spotifySource[0];

  const id = spotifySource[1].split("?")[0];

  const playlistRes = await spotifyFetch(`/${musicType}s/${id}`);

  const data = (await playlistRes.json()) as any;
  switch (musicType) {
    case "track":
      const track = `${data.artists[0].name} ${data.name}`;

      const searchResult = (await ytsr(track, { limit: 1 })).items[0] as Video;

      const { title, url } = searchResult;
      const song = { title, url };

      await putSongsInQueue(msg, [song]);

      break;

    case "album":
      const artist = data.artists[0].name;
      const tracks = data.tracks.items;

      const searchResults = [];

      for (let i in tracks) {
        const trackData = (
          await ytsr(`${artist} ${tracks[i].name}`, { limit: 1 })
        ).items[0] as Video;
        const { title, url } = trackData;
        searchResults.push({ title, url });
      }
      await putSongsInQueue(msg, searchResults);

      break;

    case "playlist":
      const songsToSearch = data.tracks.items.map(
        (i) => `${i.track.name} ${i.track.artists[0].name}`
      );

      const results: SongInfo[] = [];

      for (let i in songsToSearch) {
        const searchResult = (await ytsr(songsToSearch[i], { limit: 1 }))
          .items[0] as Video;

        results.push({ title: searchResult.title, url: searchResult.url });
      }
      await putSongsInQueue(msg, results);

      break;

    default:
      handleUnhandled(msg, musicType);

      break;
  }
};
