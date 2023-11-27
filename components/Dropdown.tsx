import React, { useState } from 'react';
import { GoChevronDown, GoChevronUp } from "react-icons/go";

interface DropdownProps {
    variant?: 'primary' | 'secondary' | 'white' | 'primary-outline' | 'secondary-outline' | 'white-outline';
    options: string[];
    onSelect: (selectedOption: string) => void;
    placeholder?: React.ReactNode;
    changeOptionWhenClicked?: boolean
}

const Dropdown = (props: DropdownProps) => {
    const { variant = 'secondary-outline', options, onSelect, placeholder = 'Select an option', changeOptionWhenClicked = true } = props;

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOptionClick = (option: string) => {
        if (changeOptionWhenClicked) {
            setSelectedOption(option);
        }
        onSelect(option);
        setIsOpen(false);
    };

    const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
        const { target } = event;

        if (!target || (target.id != "dropdownItem")) {
            setIsOpen(false);
        }
    };

    let dropdownClasses = 'flex items-center gap-2 justify-between w-full rounded px-4 py-2 text-sm font-medium';
    let dropdownWrapperClasses = 'absolute z-50 origin-top-right right-0 mt-2 w-full rounded-md shadow-lg'
    let dropdownItemClasses = 'block px-4 py-2 text-sm cursor-pointer'

    if (variant === 'primary') {
        dropdownClasses += ' bg-primary text-white hover:bg-primary-2';
        dropdownWrapperClasses += ' bg-primary text-white';
        dropdownItemClasses += ' bg-primary text-white hover:bg-primary-2';
    } else if (variant === 'secondary') {
        dropdownClasses += ' bg-secondary text-black hover:bg-secondary-2';
        dropdownWrapperClasses += ' bg-secondary text-black';
        dropdownItemClasses += ' bg-secondary text-black hover:bg-secondary-2';
    } else if (variant === 'white') {
        dropdownClasses += ' border border-primary bg-white text-primary hover:bg-gray-200';
        dropdownWrapperClasses += ' border border-primary bg-white text-primary';
        dropdownItemClasses += ' bg-white text-primary hover:bg-gray-200';
    } else if (variant === 'primary-outline') {
        dropdownClasses += ' border border-primary bg-white text-primary hover:bg-primary hover:text-white';
        dropdownWrapperClasses += ' border border-primary bg-white text-primary hover:text-white';
        dropdownItemClasses += ' text-primary hover:bg-primary hover:text-white';
    } else if (variant === 'secondary-outline') {
        dropdownClasses += ' border border-secondary text-secondary hover:bg-secondary hover:text-black';
        dropdownWrapperClasses += ' border border-secondary text-secondary hover:text-black';
        dropdownItemClasses += ' text-secondary hover:bg-secondary hover:text-black';
    } else if (variant === "white-outline") {
        dropdownClasses += ' border border-white text-white bg-primary';
        dropdownWrapperClasses += ' border border-white text-white bg-primary';
        dropdownItemClasses += ' text-white';
    }

    return (
        <div className="relative inline-block text-left" >
            <div>
                <button
                    id='dropdownItem'
                    onBlur={handleBlur}
                    type="button"
                    className={dropdownClasses}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedOption || placeholder}
                    {isOpen ? <GoChevronUp /> :
                        <GoChevronDown />}
                </button>
            </div>

            {isOpen && (
                <div className={dropdownWrapperClasses}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options.map((option, index) => (
                            <p
                                key={index}
                                className={dropdownItemClasses}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
