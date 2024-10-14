import { supabase } from '@/utils/supabase/client';

const LinkSpotify = () => {
  const handleLinkSpotify = async () => {
    // Implement linking logic using Spotify API
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
    });
    if (error) {
      console.error('Error linking Spotify account:', error.message);
    }
  };

  return (
    <div>
      <h2>Link Spotify</h2>
      <button onClick={handleLinkSpotify}>Link Spotify Account</button>
    </div>
  );
};

export default LinkSpotify;