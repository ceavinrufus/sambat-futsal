"use client"
import { title } from "process";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Button from "./Button";
import { useRouter } from 'next/navigation';
import Dropdown from './Dropdown';
import { supabase } from '../config/supabaseClient';
import { FaRegUserCircle } from "react-icons/fa";


const AdminSidebar = () => {
  // const { children, title } = props;
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [fullName, setFullName] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    setAuthenticated(false)
  }

  const handleSelect = (option: string) => {
    if (option == "Logout") {
      handleLogout();
      router.push("/login")
    } else if (option == "Profile") {
      router.push("/edit-profile")
    }
  }
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
        }
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    }

    fetchSession()
  }, []);

  return (
    <div className="bg-primary justify-start py-20 items-center text-white h-screen flex flex-col w-1/6">
      <nav className="flex flex-col justify-between pb-10 h-full items-start">
        <div className="">
          <h2 className="text-lg mb-1"><span className="font-bold">Sambat</span>Futsal</h2>
          <p className="mb-4">Admin Dashboard</p>
        </div>
        <ul className="flex flex-col gap-4">
          <li className='text-white hover:bg-primary-2 hover:text-white px-3 py-2 rounded-md font-medium'>
            <Link href="/dashboard/admin/kelola-lapangan">
              Mengelola Lapangan
            </Link>
          </li>
          <li className="text-white hover:bg-primary-2 hover:text-white px-3 py-2 rounded-md font-medium">
            <Link href="/dashboard/admin/kelola-pesanan">
              Mengelola Pesanan
            </Link>
          </li>
        </ul>
        <div className=" flex gap-2">
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
      </nav>
    </div >
  );
};

export default AdminSidebar;
