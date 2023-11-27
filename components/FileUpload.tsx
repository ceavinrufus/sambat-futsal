import React, { useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
}

const FileUpload = (props: FileUploadProps) => {
    const { onFileSelect } = props;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file);
        onFileSelect(file);
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setPreviewURL(fileURL);
        } else {
            setPreviewURL(null);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div id='fileUpload'>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
            />
            <button className='px-4 py-2 rounded flex items-center justify-between gap-2 text-black bg-white' onClick={handleButtonClick}>Select File <FiUpload /></button>
            {selectedFile &&
                <a href={previewURL || ''} target='blank' className='text-xs underline'>{selectedFile.name}</a>
            }
        </div>
    );
};

export default FileUpload;
