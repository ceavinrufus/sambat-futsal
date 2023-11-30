'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../config/supabaseClient';
import TextField from './TextField';
import Button from './Button';
import { GoEye, GoEyeClosed } from "react-icons/go";
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';

function RegisterForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState<Date | null>(null);
    const [phone, setPhone] = useState('');
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const router = useRouter();

    const handleRegister = async () => {
        try {
            const { data, error } = await supabase.auth.signUp(
                {
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            gender,
                            phone,
                        }
                    }
                }
            )
            if (error) {
                throw error;
            }
            alert("Sukses register!")
            router.push("/")
        } catch (error: any) {
            console.error('Register error:', error.message);
        }
    }

    return (
        <form className="w-full flex flex-col items-center gap-6" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <div className='flex flex-col gap-2 w-1/3'>
                {/* Full Name */}
                <label className="block text-white text-sm font-bold">Full Name</label>
                <TextField placeholder='Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                {/* Email */}
                <label className="block text-white text-sm font-bold">Email</label>
                <TextField placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {/* Password */}
                <label className="block text-white text-sm font-bold">Password</label>
                <TextField
                    placeholder='Password'
                    type={`${show1 ? "text" : 'password'}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    rightIcon={show1 ? <GoEyeClosed /> : <GoEye />}
                    onRightIconClick={() => setShow1(!show1)}
                />
                {/* Confirm Password */}
                <label className="block text-white text-sm font-bold">Confirm Password</label>
                <TextField
                    placeholder='Confirm Password'
                    type={`${show2 ? "text" : 'password'}`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    rightIcon={show2 ? <GoEyeClosed /> : <GoEye />}
                    onRightIconClick={() => setShow2(!show2)}
                />
                {/* Gender */}
                <label className="block text-white text-sm font-bold">Gender</label>
                <Dropdown variant='white' placeholder="Gender" options={['Male', 'Female']} onSelect={(selectedOption) => setGender(selectedOption)} />
                {/* Phone */}
                <label className="block text-white text-sm font-bold">Phone Number</label>
                <TextField placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <Button variant="secondary" type="submit"><span className='font-bold'>Register</span></Button>
        </form>
    )
}

export default RegisterForm