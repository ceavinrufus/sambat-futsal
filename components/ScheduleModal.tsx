import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import CustomDatePicker from './DatePicker';
import { Field } from '@/types/Field';
import ScheduleTable from './ScheduleTable';

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    field: Field
}

function ScheduleModal(props: ScheduleModalProps) {
    const { isOpen, onClose, field } = props;

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <Modal
            onRequestClose={onClose}
            isOpen={isOpen}
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
                <div className="flex justify-around w-full items-center">
                    <h2 className='text-xl'>Jadwal Lapangan {field.no_lapangan}</h2>
                    <div className="w-1/4">
                        <CustomDatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
                    </div>
                </div>
                <div className="flex justify-around w-full">
                    <div className="mt-10">
                        <ScheduleTable startHour={0} endHour={8} selectedDate={selectedDate} field={field} />
                    </div>
                    <div className="mt-10">
                        <ScheduleTable startHour={8} endHour={16} selectedDate={selectedDate} field={field} />
                    </div>
                    <div className="mt-10">
                        <ScheduleTable startHour={16} endHour={24} selectedDate={selectedDate} field={field} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ScheduleModal