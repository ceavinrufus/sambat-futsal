import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import TextField from './TextField'
import CustomDatePicker from './DatePicker'
import CustomTimePicker from './TimePicker'
import FileUpload from './FileUpload'
import { GoChevronLeft } from "react-icons/go";
import NumericStepper from './NumericStepper'
import Button from './Button'
import { supabase } from '@/config/supabaseClient'
import type { Field } from "@/types/Field"
import formatNumberWithDot from '@/utils/formatNumber'
import generateRandomCode from '@/utils/generateRandomCode'
import { v4 as uuidv4 } from 'uuid';

interface ReservationFormProps {
    onClick: () => void;
    field: Field | null;
}

function ReservationForm(props: ReservationFormProps) {
    const { onClick, field } = props;

    const [price, setPrice] = useState<number | null>(0);
    const [time, setTime] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date);
    const [duration, setDuration] = useState(1);
    const [file, setFile] = useState<File | null>(null);

    const handleDurationChange = (value: number) => {
        setDuration(value);
    };

    const handleFileSelect = (file: File | null) => {
        if (file) {
            setFile(file)
        }
    };

    useEffect(() => {
        if (field && selectedDate) {
            const day = selectedDate.getDay()
            if (day == 0 || day == 6)
                setPrice(field?.harga_weekend * duration);
            else
                setPrice(field?.harga_weekday * duration);
        }
    }, [selectedDate, duration, field])


    const handleSubmit = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        try {
            const uniquePath = user?.id + '/' + Date.now() + "_" + uuidv4();

            const { data: imgData, error: imgErr } = await supabase.storage
                .from('payment_proof')
                .upload(uniquePath, file!, {
                    contentType: "image/*"
                });
            if (imgErr) {
                console.error('Error uploading file:', imgErr);
                return;
            }

            const { data, error } = await supabase
                .from('reservations')
                .insert(
                    {
                        reservation_id: uuidv4(),
                        reserver_id: user?.id,
                        date: selectedDate,
                        no_lapangan: field?.no_lapangan,
                        total_price: price,
                        booking_code: generateRandomCode(10),
                        payment_proof: {
                            path: imgData.path,
                            url: process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/payment_proof/" + imgData.path
                        },
                        time: time,
                        duration: duration,
                        payment_date: new Date(),
                    },
                );

            if (error) {
                console.error('Error inserting data:', error);
            } else {
                alert('Data inserted successfully!');
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Sidebar>
            <div className="flex flex-col justify-between h-full">
                <div className="">
                    <div className='flex items-center text-xl gap-2'>
                        <button onClick={() => { onClick(); setSelectedDate(new Date) }}>
                            <GoChevronLeft />
                        </button>
                        <h1 className='text-xl'>Formulir Reservasi</h1>
                    </div>
                    <div className="mt-12 flex flex-col gap-4">
                        <div className="w-2/5">
                            <h3>Tanggal</h3>
                            <CustomDatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
                        </div>
                        <div className="w-1/3">
                            <h3>Waktu Mulai</h3>
                            <CustomTimePicker value={time} onChange={setTime} variant='outline' />
                        </div>
                        <div className="w-2/5">
                            <h3>Durasi</h3>
                            <div className="flex items-center gap-2">
                                <NumericStepper value={duration} minValue={1} maxValue={6} onChange={handleDurationChange} />
                                jam
                            </div>
                        </div>
                        <div className="">
                            <h3>Bukti Pembayaran</h3>
                            <FileUpload onFileSelect={handleFileSelect} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="">
                        <p>Total harga:</p>
                        <p className='text-secondary'>Rp{price && formatNumberWithDot(price)}</p>
                    </div>
                    <Button onClick={handleSubmit} variant='secondary'>Submit</Button>
                </div>
            </div>
        </Sidebar>
    )
}

export default ReservationForm