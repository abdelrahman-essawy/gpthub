import React from 'react';
import Image from 'next/image';
import { GrSearch } from 'react-icons/gr';
import { BsBellFill, BsFillChatLeftTextFill } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';
export const NavBar = () => {
  return (
    <div className="flex items-center bg-backgroundColor h-20 w-full z-10">
      {/* left */}
      <div className="p-4  w-1/5">
        <div className="flex justify-start bg-black w-64 py-2 pl-4 rounded-4xl">
          <Image
            src="/profile.jfif"
            width={50}
            height={50}
            alt="profile picture"
            className="rounded-full"
          />
          <div className="ml-4 flex flex-col text-white">
            <p>Essawy</p>
            <p>essawy.231</p>
          </div>
        </div>
      </div>
      {/* mid  */}
      <div className="flex justify-between items-center w-3/5 ml-8">
        <p className="text-3xl font-bold text-white flex-grow-1">
          Room Overview
        </p>

        <div className="flex justify-end items-center ml-auto">
          <div className="flex">
            <GrSearch className="text-white" />
            <p className="pl-2 text-sm text-gray-200 mr-28">Search for rooms</p>
          </div>
          <div className="flex pl-2 gap-2 text-white">
            <BsBellFill />
            <IoMdMail/>
            <BsFillChatLeftTextFill/>
          </div>
        </div>
      </div>
      {/* end */}
      <div className="ml-8 w-1/5">
        <p className="text-xl text-white font-bold">Current Room</p>
      </div>
    </div>
  );
};
