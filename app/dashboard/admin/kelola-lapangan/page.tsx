'use client'
import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../../components/AdminSidebar';
import Table from '@/components/Table';
import FieldModal from '@/components/FieldModal';
import FieldPostModal from '@/components/FieldPostModal';
import type { Field } from "@/types/Field"
import { supabase } from '@/config/supabaseClient';
import Footer from '@/components/Footer';
import Alert from '@/components/Alert';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/Searchbar';
import Button from '@/components/Button';
import AuthRoute from '@/components/AuthRoute';

const KelolaLapangan: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [data, setData] = useState<Field[]>([]);
  const [selectedRow, setSelectedRow] = useState<Field | null>(null);
  const [filteredData, setFilteredData] = useState<Field[]>([]);
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; message: string } | null>(null);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('fields')
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
    fetchData()
  }, [isModalOpen])


  const handleUpdateClick = (row: Field) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (row: Field) => {
    try {
      const { error } = await supabase
        .from('fields')
        .delete()
        .eq('id', row.id);

      if (error) {
        console.error('Supabase delete error:', error.message, error.details);
      }
      if (data) {
        const updatedData = data.filter((item) => item.id !== row.id);
        setData(updatedData);
        fetchData()
      }
      console.log(`Successfully deleted data on Supabase for reservation ID: ${row.id}`);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const openAddLapanganModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
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
          <h1 className="font-bold text-2xl">Daftar Lapangan</h1>
          <div className="max-w-max ml-auto">
            <Button variant='secondary' onClick={openAddLapanganModal}>+ Tambah Lapangan</Button>
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
        <FieldModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Edit Lapangan"
          initialData={selectedRow}
        />
      }
      {/* {isPostModalOpen && */}
      <FieldPostModal
        isOpen={isPostModalOpen}
        onClose={closePostModal}
      />
      {/* } */}
      {/* 
      <Footer /> */}
      <Footer />
    </>
  );
};

export default KelolaLapangan;