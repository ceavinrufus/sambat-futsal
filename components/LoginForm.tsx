'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../config/supabaseClient';
import TextField from './TextField';
import Button from './Button';
import { GoEye, GoEyeClosed } from "react-icons/go";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                throw error;
            }
            alert("Sukses login!")
            const { data: { user } } = await supabase.auth.getUser()
            const { data } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user?.id)
            if (data) {
                if (data[0].role == "admin") {
                    router.push("/dashboard/admin")
                } else if (data[0].role == "field owner") {
                    router.push("/dashboard/field-owner")
                } else if (data[0].role == "customer") {
                    router.push("/")
                }
            }
        } catch (error: any) {
            console.error('Error signing in:', error.message);
            alert("Gagal login!")
        }
    };

    return (
        <form className="w-full flex flex-col items-center gap-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className='flex flex-col gap-2 w-1/3'>
                {/* Email */}
                <label className="block text-white text-sm font-bold">Email</label>
                <TextField placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {/* Password */}
                <label className="block text-white text-sm font-bold">Password</label>
                <TextField
                    placeholder='Password'
                    type={`${showPass ? "text" : 'password'}`}
                    value={password}
                    rightIcon={showPass ? <GoEyeClosed /> : <GoEye />}
                    onChange={(e) => setPassword(e.target.value)}
                    onRightIconClick={() => setShowPass(!showPass)}
                />
            </div>
            <Button variant="secondary" type="submit"><span className='font-bold'>Login</span></Button>
        </form>
    )
}

export default LoginForm