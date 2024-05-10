import React from 'react';
import Link from 'next/link';
import { IoIosChatbubbles, IoIosPeople } from 'react-icons/io';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaFolder } from 'react-icons/fa6';
import { LuSettings } from 'react-icons/lu';
import { TbLogout2 } from 'react-icons/tb';

// const handleSelect = (index:number)=>{

// }

export const Menu = () => {
  return (
    <div className="flex flex-col text-white h-full p-4 pt-10 ">
      {/* top menu */}
      <div className="grow flex flex-col gap-1 ">
        <Link
          href={''}
          className="flex items-center gap-2 w-full hover:bg-black p-2 py-4 rounded-2xl"
        >
          <IoIosChatbubbles />
          <p>Rooms</p>
        </Link>
        <Link
          href={''}
          className="flex items-center gap-2 w-full hover:bg-black p-2 py-4 rounded-2xl"
        >
          <IoIosPeople />
          <p>Participants</p>
        </Link>
        <Link
          href={''}
          className="flex items-center gap-2 w-full hover:bg-black p-2 py-4 rounded-2xl"
        >
          <BsFillCheckCircleFill />
          <p>Resources</p>
        </Link>
        <Link
          href={''}
          className="flex items-center gap-2 w-full hover:bg-black p-2 py-4 rounded-2xl"
        >
          <FaFolder />
          <p>Available Resources</p>
        </Link>
      </div>
      {/* end menu */}
      <div className="border-t border-gray-500 my-8"></div>
      <div className="flex flex-col gap-8 pb-14">
        {/* I want to add a divider here horizontal one */}
        <Link href={''} className="flex items-center gap-2">
          <LuSettings />
          <p>Settings</p>
        </Link>
        <Link href={''} className="flex items-center gap-2 ">
          <TbLogout2 />
          <p>Sign Out</p>
        </Link>
      </div>
    </div>
  );
};
