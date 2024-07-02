import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdMenuBook } from 'react-icons/md';
import { IoMdCloudDone } from 'react-icons/io';
import { TbWorld } from "react-icons/tb";
import { PiNotepadFill } from "react-icons/pi";

export const CurrentRoom = () => {
  return (
    <div className="flex flex-col w-full h-full px-8">
      {/* <div className="flex flex-col justify-between items-center w-full h-80 bg-black rounded-3xl p-2">
        <div>
          <Image
            src="/csc.jfif"
            width={400}
            height={100}
            objectFit="cover"
            objectPosition="center"
            alt="profile picture"
            className="rounded-3xl"
          />
        </div>
        <div className="flex flex-col items-start  text-white w-full h-full p-2">
          <p className="font-bold">Backend Development</p>
          <div className="pt-2 w-full h-full text-sm">
            <div className="flex justify-between items-center w-full ">
              <p>Online Participants</p>
              <p className="text-green-400">34</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p>All Participants</p>
              <p>213</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-2xl text-white font-bold">Room Resources</p>
        <div className="flex flex-col w-full mt-4 gap-4">
          <Link
            href={''}
            className="flex items-center bg-black rounded-3xl p-4 text-white"
          >
            <MdMenuBook className=" text-3xl ml-2" />
            <div className="flex flex-col w-full ml-8 ">
              <p className="font-bold ">OOP</p>
              <p className="text-sm">Book</p>
            </div>
            <IoMdCloudDone className='text-4xl'/>
          </Link>
          <Link
            href={''}
            className="flex items-center bg-black rounded-3xl p-4 text-white"
          >
            <TbWorld className=" text-3xl ml-2" />
            <div className="flex flex-col w-full ml-8 ">
              <p className="font-bold ">TypeScript</p>
              <p className="text-sm">Online Docs</p>
            </div>
            <IoMdCloudDone className='text-4xl'/>
          </Link>
          <Link
            href={''}
            className="flex items-center bg-black rounded-3xl p-4 text-white"
          >
            <PiNotepadFill className=" text-3xl ml-2" />
            <div className="flex flex-col w-full ml-8 ">
              <p className="font-bold ">System Design</p>
              <p className="text-sm">Article</p>
            </div>
            <IoMdCloudDone className='text-4xl'/>
          </Link>
        </div>
      </div> */}
    </div>
  );
};
