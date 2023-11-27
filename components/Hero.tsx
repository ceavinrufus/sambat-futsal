import React from 'react'
import Button from './Button'
import { GoChevronRight } from "react-icons/go";
import { BsChevronCompactDown, BsChevronDoubleDown } from "react-icons/bs";

function Hero() {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <div className="flex flex-col-reverse md:flex-row items-center lg:justify-between justify-center h-full max-w-[1600px] gap-10 lg:gap-0">
                <div className="flex flex-col md:w-1/2 gap-4" data-aos="fade-right">
                    <div className="font-bold text-xl lg:text-5xl">Tingkatkan Performamu. Mainkan dengan Semangat!</div>
                    <div className="lg:text-xl">Futsal untuk semua, <span className='font-bold'>Profesional</span> atau <span className='font-bold'>Amatir</span>, kami siap menyediakan lapangan untukmu.</div>
                    <div className="">
                        <Button variant='secondary' rightIcon={<GoChevronRight />}>
                            <a href='/reservasi' className='font-bold text-sm lg:text-base'>
                                Pesan Sekarang
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="md:w-1/2" data-aos="zoom-in"><img src="/hero.png" alt="" /></div>
            </div>
            <div className="text-black flex justify-center">
                <a href='#lapangan' className="flex flex-col items-center group cursor-pointer text-xs md:text-sm lg:text-base">
                    Lihat Lapangan
                    <BsChevronCompactDown className="group-hover:hidden" />
                    <BsChevronDoubleDown className="hidden group-hover:flex" />
                </a>
            </div>
        </div>
    )
}

export default Hero