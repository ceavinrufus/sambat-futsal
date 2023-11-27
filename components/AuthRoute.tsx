"use client"
import React, { useEffect } from 'react';
import { supabase } from '@/config/supabaseClient';
import { useRouter } from 'next/navigation';

interface AuthProps {
    role: string;
}
function AuthRoute(props: AuthProps) {
    const { role } = props;

    const router = useRouter();
    useEffect(() => {
        // Check if the user is authenticated
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            console.log(data)
            if (data.session == null) {
                router.push("login");
            } else {
                const { data: { user } } = await supabase.auth.getUser()

                if (user != null) {
                    const { data, error } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", user?.id)
                    if (data) {
                        if (data[0].role !== role) {
                            router.push("/login")
                        }
                    }
                }

            }
        }

        fetchSession()
    }, []);
    return (
        <></>
    )
}

export default AuthRoute