import { Message } from "discord.js";
import { handleSpotify, spotifyFetch } from "./player/handlers/handleSpotify";

const spotifyUsers = ["21ejkgoivwl4x7ddwkwvml2ya"];

export const addSpotifyPlaylistByName = async (
  msg: Message,
  playlistTokens: string[]
) => {
  for (let i = 0; i < spotifyUsers.length; i++) {
    const searchResults = await spotifyFetch(
      `/users/${spotifyUsers[i]}/playlists`
    );

    const data = await searchResults.json();

    const searchedPlaylist = data.items.find((p) =>
      playlistTokens.every((t) => p.name.toLowerCase().includes(t))
    );

    if (Boolean(searchedPlaylist)) {
      handleSpotify(msg, searchedPlaylist.external_urls.spotify);
      return;
    }
  }

  msg.channel.send(
    `Nie znalazłem playlisty ${playlistTokens.join(
      " "
    )} u żadnego ze zdefiniowanych użytkowników`
  );
};
