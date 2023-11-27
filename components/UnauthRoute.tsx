"use client"
import React, { useEffect } from 'react';
import { supabase } from '@/config/supabaseClient';
import { useRouter } from 'next/navigation';

function UnauthRoute() {
    const router = useRouter();
    useEffect(() => {
        // Check if the user is authenticated
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session != null) {
                router.push("/");
            }
        }

        fetchSession()
    }, []);
    return (
        <></>
    )
}

export default UnauthRoute