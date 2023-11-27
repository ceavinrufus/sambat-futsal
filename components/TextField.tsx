import React, { InputHTMLAttributes, ReactNode } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'primary' | 'secondary';
    label?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onRightIconClick?: () => void;
}

const TextField = (props: TextFieldProps) => {
    const { variant = "primary", label, leftIcon, rightIcon, onRightIconClick, ...rest } = props;

    let textPickerClasses = "border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    if (variant === 'primary') {
        textPickerClasses += ' border-white';
    } else if (variant === 'secondary') {
        textPickerClasses += ' border-primary';
    } else if (variant === 'secondary') {
        textPickerClasses += ' border-secondary';
    }

    const handleRightIconClick = () => {
        if (onRightIconClick) {
            onRightIconClick();
        }
    };

    return (
        <div className="w-full">
            {label && <label className="block text-primary text-sm font-bold mb-2">{label}</label>}
            <div className="relative">
                {leftIcon && <span className="absolute inset-y-0 left-0 pl-3 flex items-center">{leftIcon}</span>}
                <input
                    {...rest}
                    className={textPickerClasses}
                />
                {rightIcon && (
                    <span
                        className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                        onClick={handleRightIconClick}
                    >
                        {rightIcon}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TextField;
