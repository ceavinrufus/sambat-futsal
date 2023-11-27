import React, { useState } from 'react';

interface AlertProps {
  type: 'success' | 'warning' | 'error';
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
    const [isOpen, setIsOpen] = useState(true);
    let bgColor = '';
    let textColor = '';

    // Define styles based on the alert type
    switch (type) {
        case 'success':
        bgColor = 'bg-green-500';
        textColor = 'text-white';
        break;
        case 'warning':
        bgColor = 'bg-yellow-500';
        textColor = 'text-white';
        break;
        case 'error':
        bgColor = 'bg-red-500';
        textColor = 'text-white';
        break;
        default:
        bgColor = 'bg-gray-500';
        textColor = 'text-white';
        break;
    }

    const handleClose = () => {
        setIsOpen(false);
        onClose();
      };

    return (
        <div>
        {isOpen && (
          <div className="fixed top left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className={`p-4 w-80 rounded-md shadow-md ${bgColor} ${textColor}`}>
              <div className="flex justify-between items-center">
                <p>{message}</p>
                <button onClick={handleClose} className="text-white">
                  x
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default Alert;
