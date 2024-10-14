import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('profiles').update({ name, bio });
    if (error) {
      console.error('Error updating profile:', error.message);
    } else {
      alert('Profile updated successfully.');
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleEditProfile}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;