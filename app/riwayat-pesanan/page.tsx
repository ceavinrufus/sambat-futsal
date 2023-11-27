"use client";
import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Table from '@/components/Table';
import SearchBar from '@/components/Searchbar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { supabase } from '@/config/supabaseClient';

interface Order {
  reservation_id: number;
  reserver_id: number;
  reservation_time: string;
  total_price: number;
  field_id: number;
  booking_code: string;
  payment_proof: string | { path: string; url: string };
}

const KelolaPesanan: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Order | null>(null);
  const [filteredData, setFilteredData] = useState<Order[]>([]);

  const handleSearch = (query: string) => {
    console.log(query)
    if (query && query.length > 0) {
      const filtered = data.filter((order) =>
        order.booking_code.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered)
      console.log(filtered)
    } else {
      setFilteredData(data);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user != null) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", user?.id);

          if (profileError) {
            console.error('Supabase error (profile):', profileError.message, profileError.details);
            throw new Error(profileError.message || 'An error occurred while fetching profile data');
          }

          if (profileData && profileData.length > 0) {
            const reserverId = profileData[0].id;

            const { data: reservationsData, error: reservationsError } = await supabase
              .from("reservations")
              .select('*')
              .eq("reserver_id", reserverId);

            if (reservationsError) {
              console.error('Supabase error (reservations):', reservationsError.message, reservationsError.details);
              throw new Error(reservationsError.message || 'An error occurred while fetching reservations');
            }

            console.log('Reservations data:', reservationsData);

            const modifiedData = reservationsData?.map((row: any) => {
              if (row.payment_proof && typeof row.payment_proof === 'object') {
                return {
                  ...row,
                  payment_proof: row.payment_proof.url,
                };
              }
              return row;
            }) || [];

            console.log('Modified data:', modifiedData);

            setData(modifiedData);
            setFilteredData(modifiedData);
          }
        }
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
    if (isModalOpen) {
      fetchData();
    }
  }, [isModalOpen]);


  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col p-8 ml-12 mt-20 gap-4 w-4/5">
          <h1 className="font-bold text-2xl">Riwayat Pesanan</h1>
          <SearchBar onSearch={handleSearch} />
          <div className="max-w-max ml-auto">{ }</div>
          <div className="flex flex-col">
            {filteredData.length > 0 && (
              <Table
                columns={Object.keys(filteredData[0])}
                key={currentPage}
                data={filteredData}
                ud={false}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KelolaPesanan;
