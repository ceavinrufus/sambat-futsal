import React from "react";
import { GoChevronRight } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import Button from "./Button";
import { fieldData } from "@/data/FieldData";

const FieldCards = () => {
  return (
    <div
      id="lapangan"
      className="mt-20 flex flex-col items-center justify-center"
      data-aos="fade-up"
    >
      <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-10 text-primary">
        Lapangan Kami
      </h2>
      {fieldData && (
        <div className="flex justify-center text-white gap-8 max-w-[1600px] flex-wrap">
          {fieldData.map((field) => (
            // Card
            <div
              key={field.id}
              className="bg-primary shadow-md p-4 w-2/3 md:w-80 gap-4 flex flex-col rounded-3xl"
            >
              <div className="flex justify-center">
                <img src={field.imgSource} className="rounded-3xl" />
              </div>
              <div className="h-full divide-y-[1px] flex flex-col justify-between">
                <div className=" h-full pb-2 px-1">
                  <p className="capitalize font-bold text-sm md:text-base lg:text-xl">
                    {field.type}
                  </p>
                  <p className="capitalize text-xs md:text-sm lg:text-base">
                    Ukuran: {field.panjang}x{field.lebar}
                  </p>
                  <div className="mt-2">
                    {field.keterangan && (
                      <ul className="list-disc list-inside">
                        {field.keterangan.map((point, index) => (
                          <li key={index} className="flex items-start text-sm pt-1">
                            <div className="pt-1">
                              <GoCheck className="mr-2 text-white justify-start top-0" size={18} />
                            </div>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center items-center gap-10 mt-6 mb-16 lg:mt-12 lg:mb-20">
        <Button variant="secondary">
          <a href="/reservasi" className="font-bold">
            Sewa Sekarang!
          </a>
        </Button>
      </div>
    </div>
  );
};

export default FieldCards;
