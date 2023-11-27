'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Button from "./Button";
import { supabase } from '../config/supabaseClient';
import { FaRegUserCircle } from "react-icons/fa";
import Dropdown from './Dropdown';

interface NavbarProps {
    transparent?: boolean;
};

interface NavItemProps {
    path: string;
    text: string;
};

const NavItem = (props: NavItemProps) => {
    const { path, text } = props;

    return (
        <a href={path} className="text-white hover:bg-primary-2 hover:text-white px-3 py-2 rounded-md font-medium">
            {text}
        </a>
    )
}

const Navbar = (props: NavbarProps) => {
    const { transparent } = props;

    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState<string | null>("");
    const router = useRouter();

    useEffect(() => {
        // Check if the user is authenticated
        const fetchSession = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (user != null) {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("full_name, role")
                    .eq("id", user?.id)
                if (data) {
                    setFullName(data[0].full_name)
                    setRole(data[0].role)
                }
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        }

        fetchSession()
    }, []);

    const handleSelect = (option: string) => {
        if (option == "Logout") {
            handleLogout();
        } else if (option == "Profile") {
            router.push("edit-profile")
        }
    }
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        setAuthenticated(false)
    }

    let navbarClasses = 'fixed w-full z-50 flex justify-center';

    if (transparent) {
        navbarClasses += ' bg-transparent';
    } else {
        navbarClasses += ' bg-primary';
    }

    return (
        <nav className={navbarClasses}>
            <div className="md:mx-12 lg:mx-20 mx-4 max-w-[1600px] w-full">
                <div className="flex items-center justify-between h-12 lg:h-16">
                    <a href="/" className={`flex-shrink-0 ${transparent ? '' : 'text-white'} lg:text-2xl`}>
                        <span className="font-bold">Sambat</span>Futsal
                    </a>
                    <div className="flex gap-6">
                        {authenticated && (
                            <div className="flex items-center">
                                {role && role === 'field owner' ? (
                                    <NavItem path="/financial-report" text="Laporan Keuangan" />
                                ) : (
                                    <>
                                        <NavItem path="/reservasi" text="Reservasi" />
                                        {role === 'customer'}
                                        <NavItem path="/riwayat-pesanan" text="Riwayat Pesanan" />
                                    </>
                                )}
                            </div>
                        )}
                        <div className="flex gap-2 items-center">
                            {authenticated ? (
                                <Dropdown changeOptionWhenClicked={false} variant='secondary' onSelect={handleSelect} options={["Profile", "Logout"]} placeholder={
                                    <>
                                        <FaRegUserCircle /> {fullName.trim().split(' ')[0]}
                                    </>
                                } />
                            ) : (
                                <>
                                    <Button variant="secondary-outline" onClick={() => router.push("/register")}>
                                        Register
                                    </Button>
                                    <Button variant="secondary" onClick={() => router.push("/login")}>
                                        Login
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
