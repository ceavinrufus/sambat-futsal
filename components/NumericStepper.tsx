import React, { useState } from 'react';

interface NumericStepperProps {
    value: number;
    minValue?: number;
    maxValue?: number;
    step?: number;
    onChange: (value: number) => void;
}

const NumericStepper = (props: NumericStepperProps) => {
    const { value, minValue = 0, maxValue = 100, step = 1, onChange } = props;

    return (
        <div className="flex items-center">
            <input
                type="number"
                value={value}
                min={minValue}
                max={maxValue}
                step={step}
                onChange={(e) => {
                    if (Number(e.target.value) >= 0 && Number(e.target.value) <= maxValue)
                        onChange(Number(e.target.value));
                    else
                        onChange(minValue)
                }}
                className="px-2 py-1 text-center border-t border-b w-20 text-black rounded"
            />
        </div>
    );
};

export default NumericStepper;
