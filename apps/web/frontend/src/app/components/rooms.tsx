'use client';

import { CardData } from '../core/types';
import { Carousel } from './Carousel';
import React, { useEffect, useState } from 'react';

export const Rooms = () => {
  const [rooms, setRooms] = useState<CardData[]>([]);

  useEffect(() => {
    const cachedRooms = localStorage.getItem('rooms');
    if (cachedRooms) {
      const parsedRooms = JSON.parse(cachedRooms).map((room: any) => ({
        title: room.roomId,
        subTitle: room.subTitle || 'No Subtitle',
        img: room.imgData ? `data:image/png;base64,${room.imgData}` : '/default-image.png', // Handling imgData
        noActive: room.noActive || 0,
        noResources: room.resources ? room.resources.length : 0,
        noMessages: room.noMessages || 0,
      }));
      setRooms(parsedRooms);
    }
  }, []);

  return (
    <div className="flex flex-col bg-black w-full h-screen">
      {/*<Carousel title="Trending Rooms" />*/}

      {rooms.length === 0 ? (
        <div className="text-white text-2xl font-bold w-full p-8">
          No rooms created yet
        </div>
      ) : (
        <Carousel title="Joined Rooms" rooms={rooms} />
        // rooms.map((room, index) => {
        //   return (
        //     <div key={index} className="flex flex-col bg-black w-full h-screen">
        //       <button
        //         className="text-white text-2xl font-bold w-full p-8 bg-green"
        //         onClick={() => {
        //           window.location.href = `/pages/chat/${room.roomId}`;
        //         }}
        //       >
        //         {room.roomId}
        //       </button>
        //     </div>
        //   );
        // })
      )}
    </div>
  );
};
