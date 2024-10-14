import { supabase } from '@/utils/supabase/client';

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmDelete) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', user.id);
        if (error) {
          console.error('Error deleting account:', error.message);
        } else {
          alert('Account deleted successfully.');
          // Redirect after deleting account
        }
      }
    }
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default DeleteAccount;
