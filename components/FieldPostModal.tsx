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
import { v4 as uuidv4 } from 'uuid'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FieldPostModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [noLap, setNoLap] = useState<number>(1);
  const [tipeLapangan, setTipeLapangan] = useState<string>("");
  const [priceWeekday, setPriceWeekday] = useState("0");
  const [priceWeekend, setPriceWeekend] = useState("0");

  const handleNoLapChange = (value: number) => {
    setNoLap(value);
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from('fields')
        .insert(
          {
            id: uuidv4(),
            type: tipeLapangan,
            no_lapangan: noLap,
            harga_weekday: priceWeekday,
            harga_weekend: priceWeekend,
          }
        )

      if (error) {
        console.error('Supabase error:', error.message, error.details);
        throw error;
      }
      alert("Sukses menambah lapangan!")

      // Close the modal after submission
      onClose();
    } catch (error) {
      alert("Gagal menambah lapangan!")
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
        <h2>Tambah Lapangan</h2>
        <form className='w-full'>
          <div className="mt-10 flex flex-col gap-4">
            <div className="w-2/5">
              <h3>Nomor Lapangan</h3>
              <div className="flex items-center gap-2">
                <NumericStepper value={noLap} minValue={1} onChange={handleNoLapChange} />
              </div>
            </div>
            <div className="w-2/5">
              <h3>Tipe Lapangan</h3>
              <TextField value={tipeLapangan} onChange={(e) => setTipeLapangan(e.target.value)} />
            </div>
            <div className="w-2/5">
              <h3>Harga Weekday (Rupiah)</h3>
              <TextField value={priceWeekday} onChange={(e) => setPriceWeekday(e.target.value)} />
            </div>
            <div className="w-2/5">
              <h3>Harga Weekend (Rupiah)</h3>
              <TextField value={priceWeekend} onChange={(e) => setPriceWeekend(e.target.value)} />
            </div>
          </div>
        </form>
        <div className="flex justify-between items-center mt-8 w-full">
          {/* <Button onClick={handleSubmit} variant='secondary'>Submit</Button> */}
          <div className="flex w-full justify-end gap-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button variant='secondary' onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FieldPostModal;
