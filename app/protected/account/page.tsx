"use client";

import ChangePassword from './ChangePassword';
import LinkSpotify from './LinkSpotify';
import DeleteAccount from './DeleteAccount';
import EditProfile from './EditProfile';
import AccountSettingsLayout from './AccountSettingsLayout';
import { supabase } from '@/utils/supabase/client';
import { useSession } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AccountSettingsPage = () => {
    const session = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Session:', session); // Log session to check if it's valid

        if (!session) {
            // Redirect to sign-in if not logged in
            router.push('/sign-in');
        } else {
            setLoading(false);
        }
    }, [session, router]);

    if (loading) {
        return <p>Loading...</p>;  // Display loading while checking session
    }

    return (
        <AccountSettingsLayout>
            <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
            <EditProfile />
            {session && session.user?.app_metadata.provider === 'email' && <ChangePassword />}
            {session && !session.user?.app_metadata.providers?.includes('spotify') && <LinkSpotify />}
            <DeleteAccount />
        </AccountSettingsLayout>
    );
};

export default AccountSettingsPage;