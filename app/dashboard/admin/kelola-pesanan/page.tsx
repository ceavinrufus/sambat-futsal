"use client";
import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../../components/AdminSidebar';
import SearchBar from '@/components/Searchbar';
import DashboardModal from '@/components/ReservationModal';
import { supabase } from '@/config/supabaseClient';
import Table from '@/components/Table';
import { Order } from '@/types/Order';
import ReservationPostModal from '@/components/ReservationPostModal';
import Button from '@/components/Button';
import ReservationForm from '@/components/ReservationForm';
import AuthRoute from '@/components/AuthRoute';


const KelolaPesanan: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Order | null>(null);
  const [data, setData] = useState<Order[]>([]);
  const [filteredData, setFilteredData] = useState<Order[]>([]);

  const handleSearch = (query: string) => {
    if (query && query.length > 0) {
      const filtered = data.filter((order) =>
        order.booking_code.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered)
    } else {
      setFilteredData(data);
    }
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*');

      if (error) {
        console.error('Supabase error:', error.message, error.details);
        throw error;
      }
      // if (data) {
      setData(data);
      setFilteredData(data);
      // }
    } catch (error) {
      console.error('Error fetching data from Supabase:', (error as Error).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isModalOpen]);


  const handleUpdateClick = (row: Order) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  // Function to delete data on Supabase
  const handleDeleteClick = async (row: Order) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('reservation_id', row.reservation_id);

      if (error) {
        console.error('Supabase delete error:', error.message, error.details);
      }
      if (data) {
        const updatedData = data.filter((item) => item.reservation_id !== row.reservation_id);
        setData(updatedData);
      }
      console.log(`Successfully deleted data on Supabase for reservation ID: ${row.reservation_id}`);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
  const openAddLapanganModal = () => {
    setIsPostModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null)
  };

  return (
    <>
      <AuthRoute role='admin' />
      <div className="flex">
        <AdminSidebar />

        <div className="flex flex-col p-8 ml-12 mt-20 gap-4 w-4/5">
          <h1 className="font-bold text-2xl">Daftar Pesanan</h1>
          <SearchBar onSearch={handleSearch} />
          <div className="max-w-max ml-auto">
            <Button variant='secondary' onClick={openAddLapanganModal}>+ Tambah Pesanan</Button>
          </div>
          {filteredData?.length > 0 && (
            <Table
              // columns={Object.keys(filteredData[0])}
              data={filteredData}
              ud={true}
              handleUpdateClick={handleUpdateClick}
              handleDeleteClick={handleDeleteClick}
            />
          )}
        </div>
      </div>

      {/* Render DashboardModal */}
      {selectedRow &&
        <DashboardModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Edit Pesanan"
          initialData={selectedRow}
        />
      }

      <div className={`${isPostModalOpen ? "opacity-60" : "opacity-0 invisible"} transition duration-200 fixed left-0 top-0 z-50 h-screen w-screen bg-black`}></div>
      <div className={`${isPostModalOpen ? "" : "translate-x-[500px]"} duration-200 transition z-50 top-0 right-0 fixed`}>
        <ReservationPostModal onClick={() => setIsPostModalOpen(false)} />
      </div>
      {/* 
      <Footer /> */}
    </>
  );
};

export default KelolaPesanan;
