import React from 'react';
import { GoClock } from 'react-icons/go';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { FiX } from "react-icons/fi";

interface TimePickerProps {
    variant?: 'primary' | 'secondary' | 'outline';
    value: string | null;
    onChange: (value: string | null) => void;
}

const CustomTimePicker = (props: TimePickerProps) => {
    const { variant = "primary", value, onChange } = props;

    let timePickerClasses = 'relative px-4 py-2 rounded flex items-center justify-between';

    if (variant === 'primary') {
        timePickerClasses += ' bg-primary text-white hover:bg-primary-2';
    } else if (variant === 'secondary') {
        timePickerClasses += ' bg-secondary text-black hover:bg-secondary-2';
    } else if (variant === 'outline') {
        timePickerClasses += ' bg-white text-black';
    }

    const handleTimeChange = (time: string | null) => {
        // Ensure that the time chosen is on the hour
        if (time !== null) {
            const selectedTime = new Date(`01/01/2000 ${time}`);
            const minutes = selectedTime.getMinutes();

            if (minutes !== 0) {
                // Adjust the time to the nearest hour
                selectedTime.setMinutes(0);
                onChange(selectedTime.toTimeString().slice(0, 5)); // Only HH:mm part
            } else {
                onChange(time); // No adjustment needed if already on the hour
            }
        } else {
            onChange(null);
        }
    };

    return (
        <div className="w-32">
            <div className={timePickerClasses}>
                <TimePicker
                    clearIcon={value != null ? < FiX /> : null}
                    disableClock={true}
                    format="HH:mm"
                    onChange={(time: string | null) => handleTimeChange(time)}
                    value={value} // If null, display a default time
                    clockIcon={null}
                    onInvalidChange={() => alert('Invalid time')}
                />
                {value == null && < GoClock />}
            </div>
        </div>
    );
};

export default CustomTimePicker;
