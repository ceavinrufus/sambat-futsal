import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
    const { variant = 'primary', onClick, leftIcon, rightIcon, children, ...rest } = props;
    // const { variant = 'secondary', onClick, children } = props;

    let buttonClasses = 'lg:px-4 lg:py-2 px-2 py-1 rounded flex items-center justify-between disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed';

    if (variant === 'primary') {
        buttonClasses += ' bg-primary text-white hover:bg-primary-2';
    } else if (variant === 'secondary') {
        buttonClasses += ' bg-secondary text-black hover:bg-secondary-2';
    } else if (variant === 'primary-outline') {
        buttonClasses += ' border border-primary text-primary hover:bg-primary hover:text-white';
    } else if (variant === 'secondary-outline') {
        buttonClasses += ' border border-secondary text-secondary hover:bg-secondary hover:text-black';
    }

    return (
        <button className={buttonClasses} onClick={onClick} {...rest}>
            <div className="flex items-center text-xs lg:text-base">
                {leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
            </div>
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
};

export default Button;
