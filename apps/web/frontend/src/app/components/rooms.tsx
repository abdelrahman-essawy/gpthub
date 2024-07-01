'use client';
import { Carousel } from './Carousel';
import React, { useEffect, useState } from 'react';

export const Rooms = () => {
  const [rooms, setRooms] = useState<
    {
      roomId: string;
      resources: string[];
    }[]
  >([]);

  useEffect(() => {
    const cachedRooms = localStorage.getItem('rooms');
    if (cachedRooms) {
      setRooms(JSON.parse(cachedRooms));
    }
  }, []);

  return (
    <div className="flex flex-col bg-black w-full h-screen">
      {/*<Carousel title="Joined Rooms" />*/}
      {/*<Carousel title="Trending Rooms" />*/}

      {rooms.length == 0 ? (
        <div className="text-white text-2xl font-bold w-full p-8">
          No rooms created yet
        </div>
      ) : (
        rooms.map((room, index) => {
          return (
            <div key={index} className="flex flex-col bg-black w-full h-screen">
              <button
                className="text-white text-2xl font-bold w-full p-8 bg-green"
                onClick={() => {
                  window.location.href = `/pages/chat/${room.roomId}`;
                }}
              >
                {room.roomId}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};
