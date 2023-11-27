import React from 'react';
import FieldCards from '../components/FieldCards';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import AuthRoute from '@/components/AuthRoute';

const Home = () => {
    return (
        <>
            <AuthRoute role='customer' />
            <Navbar />
            <div className="mx-4 md:mx-12 lg:mx-20">
                <Hero />
                <FieldCards />
            </div>
        </>
    );
};

export default Home;

