import AccountSettingsLayout from './AccountSettingsLayout';
import ChangePassword from './ChangePassword';
import LinkSpotify from './LinkSpotify';
import DeleteAccount from './DeleteAccount';
import EditProfile from './EditProfile';
import { useSession } from '@supabase/auth-helpers-react';

const AccountSettingsPage = () => {
  const session = useSession();

  if (!session) {
    return <p>You need to be logged in to access this page.</p>;
  }

  return (
    <AccountSettingsLayout>
      <h1>Account Settings</h1>
      <EditProfile />
      <ChangePassword />
      <LinkSpotify />
      <DeleteAccount />
    </AccountSettingsLayout>
  );
};

export default AccountSettingsPage;