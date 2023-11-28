'use client'
import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'; // Import date-fns for date formatting
import { GoCalendar } from 'react-icons/go';

interface DatePickerProps {
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date | null;
}

const CustomDatePicker = (props: DatePickerProps) => {
    const { selectedDate, onChange, minDate, ...rest } = props

    // eslint-disable-next-line react/display-name

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className='w-full'>
            <button
                className="px-4 py-2 rounded border bg-white text-black flex items-center justify-between w-full border-primary"
                onClick={handleClick}
            >
                <span>{selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'dd/MM/yyyy'}</span>
                <GoCalendar />
            </button>
            {isOpen && (
                <div className={`absolute z-10 mt-1 text-sm`}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date: Date | null) => { onChange(date); setIsOpen(false) }}
                        dateFormat="dd/MM/yyyy"
                        showDisabledMonthNavigation
                        inline
                        minDate={minDate}
                        {...rest}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;
