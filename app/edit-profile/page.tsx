import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileForm from '@/components/ProfileForm';
import AuthRoute from '@/components/AuthRoute';

const EditProfile = () => {
    return (
        <>
            <AuthRoute />
            <Navbar />
            <div className="flex justify-end flex-col">
                <div className="flex flex-row h-screen">
                    {/* Left Side */}
                    <div className="bg-white h-full flex items-center p-4 w-2/5">
                        <img src="/hero.png" />
                    </div>
                    {/* Right Side */}
                    <div className="flex flex-col px-16 bg-white gap-2 p-4 w-3/5 justify-center">
                        <h2 className='text-xl md:text-2xl lg:text-4xl font-bold mb-10 text-primary'>Profile</h2>
                        <ProfileForm />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EditProfile;