import React from 'react';
import { FunctionComponent } from 'react';
import { IoMdFootball } from "react-icons/io";


const Loading: FunctionComponent = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin">
                <IoMdFootball size="100"/>
            </div>
        </div>
    );
};

export default Loading;