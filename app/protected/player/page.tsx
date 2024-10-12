// app/protected/player/page.tsx
import { getSupabaseSession } from "@/utils/supabase/server";
import SpotifyPlayer from "@/components/SpotifyPlayer";

const PlayerPage = async () => {
  const session = await getSupabaseSession();
  const accessToken = session?.provider_token; // Ensure this is the Spotify access token

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {accessToken ? (
        <SpotifyPlayer accessToken={accessToken} />
      ) : (
        <p className="text-white">Please log in with Spotify to use the player.</p>
      )}
    </div>
  );
};

export default PlayerPage;
