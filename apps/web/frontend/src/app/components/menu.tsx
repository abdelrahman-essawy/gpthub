'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { IoIosChatbubbles, IoIosPeople } from 'react-icons/io';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaFolder } from 'react-icons/fa';
import { LuSettings } from 'react-icons/lu';
import { TbLogout2 } from 'react-icons/tb';
import { useRouter } from 'next/navigation';

export type DataSent = {
  roomId: string;
  subTitle: string;
  imgName: string;
  imgData: string | null; // Updated to store Base64 string
  resources: { name: string; text: string }[];
};

export const Menu = () => {
  const [formData, setFormData] = useState<DataSent>({
    roomId: '',
    subTitle: '',
    imgName: '', // Initialize with empty string
    imgData: null, // Initialize with null
    resources: [],
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      getBase64Image(file, (base64Image: string) => {
        setFormData({
          ...formData,
          imgName: file.name,
          imgData: base64Image,
        });
      });
    } else {
      setFormData({
        ...formData,
        imgName: '',
        imgData: null,
      });
    }
  };

  const handleFormSubmit = () => {
    const rooms = JSON.parse(localStorage.getItem('rooms') || '[]');

    // Store metadata about the file, not the file object itself
    const roomDataToStore = {
      roomId: formData.roomId,
      subTitle: formData.subTitle,
      imgName: formData.imgName,
      imgData: formData.imgData,
      resources: formData.resources,
    };

    rooms.push(roomDataToStore);
    localStorage.setItem('rooms', JSON.stringify(rooms));

    // Redirect or navigate after storing data
    router.push(`/pages/chat/${formData.roomId}`);
  };

  const getBase64Image = (
    img: File,
    callback: (base64Image: string) => void,
  ) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      callback(reader.result as string);
    };
    reader.onerror = (error) => {
      console.error('Error converting image to Base64: ', error);
    };
  };

  return (
    <div className="flex flex-col text-white h-full p-4 pt-10">
      {/* top menu */}
      <div className="grow flex flex-col gap-1">
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
        <button
          className="btn"
          onClick={() => document.getElementById('my_modal_1')?.showModal()}
        >
          Create Room
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create Room!</h3>
            <div className="flex flex-col gap-4 w-full justify-center items-center py-8">
              <input
                name="roomId"
                value={formData.roomId}
                onChange={handleInputChange}
                type="text"
                placeholder="Room ID"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                name="subTitle"
                value={formData.subTitle}
                onChange={handleInputChange}
                type="text"
                placeholder="SubTitle"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
            <div className="modal-action flex justify-between">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
              <button className="btn" onClick={handleFormSubmit}>
                Create
              </button>
            </div>
          </div>
        </dialog>
      </div>
      <div className="border-t border-gray-500 my-8"></div>
      <div className="flex flex-col gap-8 pb-14">
        <Link href={''} className="flex items-center gap-2">
          <LuSettings />
          <p>Settings</p>
        </Link>
        <Link href={''} className="flex items-center gap-2">
          <TbLogout2 />
          <p>Sign Out</p>
        </Link>
      </div>
    </div>
  );
};
