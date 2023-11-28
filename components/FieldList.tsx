"use client"
import React, { useEffect, useState } from 'react';
import { supabase } from '@/config/supabaseClient';
import Button from '@/components/Button';
import ReservationForm from '@/components/ReservationForm';
import formatNumberWithDot from '@/utils/formatNumber';
import type { Field } from "@/types/Field"
import { GoFilter, GoSortAsc, GoSortDesc } from "react-icons/go";
import Dropdown from './Dropdown';
import ScheduleModal from './ScheduleModal';

const Reservation = () => {
    const [ascending, setAscending] = useState<boolean>(true)
    const [fetchError, setFetchError] = useState<string | null>()
    const [fields, setFields] = useState<Field[] | null>(null)
    const [field, setField] = useState<Field | null>(null)
    const [type, setType] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        const fetchFields = async () => {
            if (type == null || type == "Semua Jenis") {
                const { data, error } = await supabase
                    .from('fields')
                    .select('*')
                    .order("no_lapangan", { ascending })
                if (error) {
                    setFetchError('Could not fetch the fields!');
                    setFields(null)
                    console.log(error)
                }
                if (data) {
                    setFields(data)
                    setFetchError(null)
                }
            } else if (type) {
                const { data, error } = await supabase
                    .from('fields')
                    .select('*')
                    .order("no_lapangan", { ascending })
                    .eq("type", type.toLowerCase())
                if (error) {
                    setFetchError('Could not fetch the fields!');
                    setFields(null)
                    console.log(error)
                }

                if (data) {
                    setFields(data)
                    setFetchError(null)
                }
            }
        }

        fetchFields()
    }, [ascending, type])

    return (
        <>
            <div className="flex gap-2 justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <label>Tipe Lapangan:</label>
                    <Dropdown variant="primary-outline" onSelect={(selected) => { setType(selected) }} options={["Semua Jenis", "Lantai Atletik Poliuretan", "Lantai Rumput Sintetis", "Lantai Semen"]} placeholder="Semua Jenis" />
                </div>
                <Button variant='primary-outline' rightIcon={ascending ? <GoSortAsc size={32} /> : <GoSortDesc size={32} />} onClick={() => setAscending(!ascending)}>
                    Nomor Lapangan
                </Button>
            </div >
            {
                fields && (
                    <div className="flex text-black gap-8 flex-col h-full">
                        <div className="max-h-full overflow-y-auto space-y-6">
                            {fields.map(field => (
                                // Card
                                <div key={field.id} className="border border-primary rounded-xl shadow-md p-4 flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="h-40 w-40">
                                            {field.type === "lantai atletik poliuretan" ? <img src={"/poliuretan.jpg"} className='rounded-xl' /> : field.type === "lantai rumput sintetis" ? <img src={"/rumput.jpg"} className='rounded-xl' /> : <img src={"/semen.jpg"} className='rounded-xl' />}
                                        </div>
                                        <div className="flex flex-col items-start justify-around">
                                            <div className="">
                                                <p className='capitalize font-bold text-2xl'>{field.type}</p>
                                                <p className=''>Harga Weekday: Rp{formatNumberWithDot(field.harga_weekday)}</p>
                                                <p className=''>Harga Weekend: Rp{formatNumberWithDot(field.harga_weekend)}</p>
                                            </div>
                                            <div className='flex gap-2'>
                                                <Button onClick={() => { setIsOpen(true); setField(field) }}>Pesan</Button>
                                                <Button variant='secondary' onClick={() => { setIsModalOpen(true); setField(field) }}>Lihat Jadwal</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center items-center gap-2'>
                                        <p className=''>No. Lapangan</p>
                                        <p className='text-4xl'>
                                            {field.no_lapangan}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
            <div className={`${isOpen ? "opacity-60" : "opacity-0 invisible"} transition duration-200 fixed left-0 top-0 z-50 h-screen w-screen bg-black`}></div>
            <div className={`${isOpen ? "" : "translate-x-[500px]"} duration-200 transition z-50 top-0 right-0 fixed`}>
                <ReservationForm field={field} onClick={() => setIsOpen(false)} />
            </div>

            {isModalOpen && field &&
                <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} field={field} />
            }
        </>
    );
};

export default Reservation;

