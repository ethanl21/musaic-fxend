// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck


// components/SpotifyPlayer.tsx



"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface SpotifyPlayerProps {
  accessToken: string;
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
   
  }
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ accessToken }) => {
  const [player, setPlayer] = useState<>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [playerState, setPlayerState] = useState<>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  // const supabase = createClientComponentClient();

  useEffect(() => {
    const checkPremium = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.product === "premium") {
          setIsPremium(true);
        } else {
          alert("You need a Spotify Premium account to use the Web Playback SDK.");
        }
      } catch (error) {
        console.error("Error checking Spotify account type:", error);
      }
    };

    if (accessToken) {
      checkPremium();
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken || !isPremium) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Next.js Spotify Player",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      // Error handling
      spotifyPlayer.addListener("initialization_error", ({ message }: { message: string }) => {
        console.error("Initialization Error:", message);
        alert("Failed to initialize Spotify Player.");
      });
      spotifyPlayer.addListener("authentication_error", ({ message }: { message: string }) => {
        console.error("Authentication Error:", message);
        alert("Authentication failed. Please log in again.");
      });
      spotifyPlayer.addListener("account_error", ({ message }: { message: string }) => {
        console.error("Account Error:", message);
        alert("There was an issue with your Spotify account.");
      });
      spotifyPlayer.addListener("playback_error", ({ message }: { message: string }) => {
        console.error("Playback Error:", message);
        alert("Playback error occurred.");
      });

      // Ready
      spotifyPlayer.addListener("ready", ({ device_id }: { device_id: string }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      // Not Ready
      spotifyPlayer.addListener("not_ready", ({ device_id }: { device_id: string }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Player state changed
      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        setPlayerState(state);
      });

      // Connect to the player!
      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);
    };

    // Cleanup on unmount
    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [accessToken, isPremium]);

  const play = async () => {
    if (!deviceId) {
      console.error("No device ID available.");
      return;
    }

    try {
      await axios({
        method: "PUT",
        url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          uris: ["spotify:track:1VdZ0vKfR5jneCmWIUam9f"], // Replace with desired track URI
        },
      });
    } catch (error) {
      console.error("Error starting playback:", error.response?.data);
    }
  };

  const togglePlay = async () => {
    if (!player) {
      console.error("Spotify Player is not initialized.");
      return;
    }

    try {
      await player.togglePlay();
    } catch (error) {
      console.error("Error toggling play:", error.response?.data);
    }
  };

  const pause = async () => {
    if (!deviceId) {
      console.error("No device ID available.");
      return;
    }

    try {
      await axios({
        method: "PUT",
        url: `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error pausing playback:", error.response?.data);
    }
  };

  return (
    <div className="spotify-player p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Spotify Player</h2>
      {playerState ? (
        <div className="current-track mb-4">
          <p className="text-lg">
            Now Playing:{" "}
            <span className="font-semibold">
              {playerState.track_window.current_track.name}
            </span>{" "}
            by{" "}
            <span className="font-semibold">
              {playerState.track_window.current_track.artists
                .map((artist) => artist.name)
                .join(", ")}
            </span>
          </p>
          <div className="controls space-x-2">
            <button
              onClick={togglePlay}
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition"
            >
              {playerState.paused ? "Play" : "Pause"}
            </button>
            <button
              onClick={play}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
            >
              Start Playback
            </button>
            <button
              onClick={pause}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
            >
              Pause Playback
            </button>
          </div>
        </div>
      ) : (
        <div className="no-track mb-4">
          <p>No track is currently playing.</p>
          <button
            onClick={play}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
          >
            Start Playback
          </button>
        </div>
      )}
    </div>
  );
};

export default SpotifyPlayer;
