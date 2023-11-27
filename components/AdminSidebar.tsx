"use client"
import { title } from "process";
import React from "react";
import Link from 'next/link';
import Button from "./Button";
import { useRouter } from 'next/navigation';


const AdminSidebar = () => {
  // const { children, title } = props;
  const router = useRouter();

  return (
    <div className="bg-primary justify-start pt-8 text-white h-screen flex flex-col" style={{ width: 250 }}>
      <h2 className="text-lg mb-4 px-4 "><span className="font-bold">Sambat</span>Futsal</h2>
      <h2 className="text-lg font-semibold mb-4 px-4 pt-10">Dashboard</h2>
      <nav className="flex flex-col justify-between pb-10 h-full">
        <ul>
          <li className='hover:bg-primary-2 px-4 py-2'>
            <Link href="/kelola-lapangan">
              Kelola Lapangan
            </Link>
          </li>
          <li className='hover:bg-primary-2 px-4 py-2'>
            <Link href="/kelola-pesanan">
              Kelola Pesanan
            </Link>
          </li>
        </ul>
        <div className="px-4 flex gap-2">
          <Button variant="secondary-outline" onClick={() => router.push("/register")}>
            Register
          </Button>
          <Button variant="secondary" onClick={() => router.push("/login")}>
            Login
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
