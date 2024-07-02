'use client';
import React, { useEffect, useState } from 'react';
import Chat from '../../../components/chat/chat';
import NavBarU from '../../../components/chat/NavBarU';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Room } from '../../../../../../../expo/mobile/core/types';

const ChatPage = ({ params }: { params: { room: string } }) => {
  const name = params.room;
  const [room, setRoom] = useState<Room>({
    subTitle: '',
    resources: [],
    img: '',
    messages: [],
    name: name,
  });
  const rooms = JSON.parse(localStorage.getItem('rooms') || '[]');

  useEffect(() => {
    const isRoomExist = rooms.find((room: Room) => room.name === name);

    if (!isRoomExist) {
      rooms.push(room);
      localStorage.setItem('rooms', JSON.stringify(rooms));
    } else {
      setRoom(isRoomExist);
    }
  }, []);

  useEffect(() => {
    const updatedRooms = rooms.map((r: Room) =>
      r.name === room.name ? room : r,
    );
    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
  }, [room]);

  return (
    <div className="h-screen">
      <div className="fixed z-10 w-full">
        <NavBarU title={name} room={room} setRoom={setRoom} />
      </div>
      <div className="flex py-14 h-screen bg-gray-700">
        <Chat title={name} room={room} />
      </div>
    </div>
  );
};

export default ChatPage;
