import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FieldList from '@/components/FieldList';
import AuthRoute from '@/components/AuthRoute';

const Reservation = () => {
    return (
        <>
            <AuthRoute role="customer" />
            <Navbar />
            <div className="mx-20 py-20">
                <div className="h-screen pt-16 flex justify-center">
                    <div className="h-5/6 max-w-[1600px] w-full">
                        <h1 className='text-3xl font-bold text-primary mb-10'>
                            Reservasi
                        </h1>
                        <FieldList />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Reservation;

