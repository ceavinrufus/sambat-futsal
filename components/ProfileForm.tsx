'use client'
import React, { useRef, useState, useEffect } from 'react';
import Button from '@/components/Button';
import TextField from "@/components/TextField";
import DatePicker from '@/components/DatePicker';
import Dropdown from "@/components/Dropdown";
import { supabase } from '@/config/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { GoUpload } from "react-icons/go"

const ProfileForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState<string>('Male');
    const [birthdate, setBirthdate] = useState<Date | null>(null);
    const [fullName, setFullName] = useState("");
    // const [isChanged, setIsChanged] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string | null>('');
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const gender_options = ['Male', 'Female'];

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setFile(file);
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setAvatar(fileURL);
        } else {
            setAvatar(null);
        }
    };

    useEffect(() => {
        // Check if the user is authenticated
        const fetchSession = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (user != null) {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user?.id)
                if (data) {
                    setFullName(data[0].full_name)
                    setPhoneNumber(data[0].phone)
                    setGender(data[0].gender)
                    // Check if avatar is present and contains valid JSON
                    if (data[0]?.birthdate) {
                        try {
                            
                            setBirthdate(new Date(Date.parse(data[0].birthdate)))
                        } catch (error) {
                            console.error('Error parsing avatar JSON:', error);
                            // Handle the error as needed (e.g., set a default avatar)
                        }
                    }
                    
                    // Check if avatar is present and contains valid JSON
                    if (data[0]?.avatar) {
                        try {
                            const parsedAvatar = JSON.parse(data[0].avatar);
                            setAvatar(parsedAvatar.url);
                        } catch (error) {
                            console.error('Error parsing avatar JSON:', error);
                            // Handle the error as needed (e.g., set a default avatar)
                        }
                    }
                }
            }
        }

        fetchSession()
    }, []);

    const handleUpdateProfileSubmit = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        const uniquePath = user?.id + '/' + uuidv4();


        if (user) {
            if (file) {
                const { data: imgData, error: imgErr } = await supabase.storage
                    .from('avatars')
                    .upload(uniquePath, file!, {
                        contentType: "image/*"
                    });
                if (imgErr) {
                    console.error('Error uploading file:', imgErr);
                    return;
                }
                const { error } = await supabase
                    .from('profiles')
                    .update({
                        avatar: {
                            path: imgData.path,
                            url: process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/avatars/" + imgData.path
                        },
                    })
                    .eq('id', user?.id);
            }

            // Edit operation
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    phone: phoneNumber,
                    gender: gender,
                    birthdate: birthdate
                })
                .eq('id', user?.id);

            if (error) {
                console.error('Error updating data:', error.message);
                alert('Failed!');
            } else {
                alert('Data updated successfully!');
            }
        }
    }

    return (
        <>
            <form className="" onSubmit={(e) => { e.preventDefault(); handleUpdateProfileSubmit(); }}>
                <div className="flex justify-center mb-6 w-32 h-32">
                    <img
                        className="w-32 h-32 rounded-full absolute object-contain"
                        src={avatar ? avatar : "/default-avatar.png"}
                        alt=""
                    />
                    <div className="w-32 h-32 border-primary border-2 group hover:bg-primary-2 opacity-60 rounded-full flex justify-center items-center cursor-pointer transition duration-500">
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                        <div className="hidden group-hover:flex text-white justify-center items-center" onClick={handleImageClick}>
                            <GoUpload size={64} />
                        </div>
                    </div>
                </div>

                {/* Editable Name */}
                <div className="flex flex-col mb-4 text-black">
                    <TextField variant="secondary" placeholder={fullName} value={fullName}
                        onChange={(e) => setFullName(e.target.value)} label='Nama' />
                </div>

                {/* Editable Phone Number */}
                <div className="flex flex-col mb-4 ">
                    <TextField variant="secondary" placeholder={phoneNumber} value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)} label='Nomor Telepon' />
                </div>

                {/* Dropdown for Gender */}
                <div className="flex flex-col font-medium mb-4 text-black">
                    <label className="block text-primary text-sm font-bold mb-2">Gender</label>
                    <Dropdown variant="white" options={gender_options} onSelect={(selectedOption) => setGender(selectedOption)} placeholder={gender} />
                </div>

                {/* Date Picker for Birthdate */}
                <label className="block text-primary text-sm font-bold mb-2">Birthdate</label>
                <DatePicker selectedDate={birthdate} onChange={setBirthdate} />

                {/* Save Button (Centered) */}
                <div className="flex items-center mt-6">
                    <Button variant="secondary" type="submit"><span className='font-bold'>Save</span></Button>
                    {/* <Button variant="primary" onClick={isChanged ? handleSave : undefined} disabled={!isChanged}>Save</Button> */}
                </div>
            </form>
        </>
    );
};

export default ProfileForm;