'use client';
import React, { useEffect, useState } from 'react';
import Chat from '../../../components/chat/chat';
import NavBarU from '../../../components/chat/NavBarU';
import { useRouter } from 'next/navigation';

interface Room {
  roomId: string;
  subTitle: string;
  img: File | null;
  resources: string[];
}

const ChatPage = ({ params }: { params: { room: string } }) => {
  const title = params.room;
  const router = useRouter();

  const [room, setRoom] = useState<Room>({
    roomId: '',
    subTitle: '',
    img: null,
    resources: [],
  });

  useEffect(() => {
    const roomId = window.location.pathname.split('/').pop() || '';
    const roomDetails = {
      roomId: roomId,
      subTitle: '',
      img: null,
      resources: [],
    };

    const restRooms = localStorage.getItem('rooms');
    if (restRooms) {
      const rooms = JSON.parse(restRooms);
      const doesRoomExist = rooms.find(
        (room: { roomId: string }) => room.roomId === roomId,
      );
      if (!doesRoomExist) {
        rooms.push(roomDetails);
        localStorage.setItem('rooms', JSON.stringify(rooms));
        setRoom(roomDetails);
      } else {
        setRoom(doesRoomExist);
      }
    } else {
      localStorage.setItem('rooms', JSON.stringify([roomDetails]));
      setRoom(roomDetails);
    }
  }, [title]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRoom({ ...room, img: file });
    }
  };

  const handleSubmit = () => {
    // Handle form submission with room details including the image file
    const rooms = JSON.parse(localStorage.getItem('rooms') || '[]');
    rooms.push(room);
    localStorage.setItem('rooms', JSON.stringify(rooms));
    router.push(`/pages/chat/${room.roomId}`);
  };

  return (
    <div className="h-screen">
      <div className="fixed z-10 w-full">
        <NavBarU title={title} room={room} />
      </div>
      <div className="flex py-14 h-screen bg-gray-700">
        <Chat title={title} room={room} />
      </div>
    </div>
  );
};

export default ChatPage;
