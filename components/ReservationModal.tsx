'use client'
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Button from './Button';
import { supabase } from '@/config/supabaseClient';
import TextField from './TextField';
import CustomDatePicker from './DatePicker'
import CustomTimePicker from './TimePicker'
import NumericStepper from './NumericStepper'
import formatNumberWithDot from '@/utils/formatNumber';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialData?: any;
}

const ReservationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [maxDur, setMaxDur] = useState<number>(6);
  const [noLap, setNoLap] = useState<string | null>(initialData.no_lapangan);
  const [time, setTime] = useState<string | null>(initialData.time);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(initialData.date));
  const [duration, setDuration] = useState(initialData.duration);
  const [price, setPrice] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Set formData when initialData changes
  const handleDurationChange = (value: number) => {
    setDuration(value);
  };

  useEffect(() => {
    setDuration(1)
    if (time) {
      if (time == "23:00:00" || time == "23:00") {
        setMaxDur(1)
      } else if (time == "22:00:00" || time == "22:00") {
        setMaxDur(2)
      } else if (time == "21:00:00" || time == "21:00") {
        setMaxDur(3)
      } else if (time == "20:00:00" || time == "20:00") {
        setMaxDur(4)
      } else if (time == "19:00:00" || time == "19:00") {
        setMaxDur(5)
      } else {
        setMaxDur(6)
      }
    }
  }, [time])

  useEffect(() => {
    const fetchHarga = async () => {
      try {
        const { data, error } = await supabase
          .from('fields')
          .select('*')
          .eq("no_lapangan", noLap)

        if (data && selectedDate && time) {
          setButtonDisabled(false)
          const day = selectedDate.getDay()
          if (day == 0 || day == 6)
            setPrice(data[0].harga_weekend * duration);
          else
            setPrice(data[0].harga_weekday * duration);
        } else {
          setButtonDisabled(true)
        }
        if (error) {
          console.error('Supabase error:', error.message, error.details);
          throw error;
        }
      } catch (error) {
        console.error('Error getting data from Supabase:', (error as Error).message);
      }
    }

    fetchHarga()
  }, [noLap, duration, selectedDate, time])


  const handleSubmit = async () => {
    if (!buttonDisabled) {
      try {
        const { error } = await supabase
          .from('reservations')
          .update(
            {
              no_lapangan: noLap,
              date: selectedDate,
              time,
              duration,
              total_price: price
            }
          )
          .eq('reservation_id', initialData.reservation_id);

        if (error) {
          console.error('Supabase error:', error.message, error.details);
          throw error;
        }

        // Close the modal after submission
        onClose();
      } catch (error) {
        console.error('Error updating data in Supabase:', (error as Error).message);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          width: '50%',
          height: 'fit-content',
          transform: 'translate(-50%, -50%)',
          background: "#25334B"
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className='w-full justify-center items-start flex flex-col text-white'>
        <h2>Edit Pesanan</h2>
        <form className='w-full'>
          <div className="mt-10 flex flex-col gap-4">
            <div className="w-2/5">
              <h3>Nomor Lapangan</h3>
              <TextField value={noLap?.toString()} onChange={(e) => setNoLap(e.target.value)} />
            </div>
            <div className="w-2/5">
              <h3>Tanggal</h3>
              <CustomDatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
            </div>
            <div className="w-1/3">
              <h3>Waktu Mulai</h3>
              <div className="flex items-center gap-2">
                <CustomTimePicker value={time} onChange={setTime} variant='outline' /> WIB
              </div>
            </div>
            <div className="w-2/5">
              <h3>Durasi</h3>
              <div className="flex items-center gap-2">
                <NumericStepper value={duration} minValue={1} maxValue={maxDur} onChange={handleDurationChange} />
                jam
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-between items-center mt-8 w-full">
          <div className="w-full">
            <p>Total harga:</p>
            <p className='text-secondary'>Rp{price && formatNumberWithDot(price)}</p>
          </div>
          {/* <Button onClick={handleSubmit} variant='secondary'>Submit</Button> */}
          <div className="flex w-full justify-end gap-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button disabled={buttonDisabled} variant='secondary' onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReservationModal;
