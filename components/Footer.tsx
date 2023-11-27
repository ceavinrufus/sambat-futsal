import React from 'react'

function Footer() {
    return (
        <div className="bg-primary w-full z-50 py-8 text-white">
            <div className="mx-20">
                <div className="flex items-center justify-between h-16">
                    <a href="/" className="flex-shrink-0 text-2xl">
                        <span className="font-bold">Sambat</span>Futsal
                    </a>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <div className="">
                        &copy; Sambat Futsal, 2023. All rights reserved.
                    </div>
                    <div className="">
                        <a className="text-white hover:underline hover:text-white px-3 py-2 rounded-md cursor-pointer">
                            Privacy Policy
                        </a>
                        <a className="text-white hover:underline hover:text-white px-3 py-2 rounded-md cursor-pointer">
                            Terms & Conditions
                        </a>
                        <a className="text-white hover:underline hover:text-white px-3 py-2 rounded-md cursor-pointer">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer