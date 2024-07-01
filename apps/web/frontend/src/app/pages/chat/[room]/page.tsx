'use client';
import Chat from '../../../components/chat/chat';
import NavBarU from '../../../components/chat/NavBarU';
import { useEffect, useState } from 'react';

const ChatPage = ({ params }: { params: { room: string } }) => {
  const title = params.room;
  const [room, setRoom] = useState({
    roomId: '',
    resources: [],
  });

  useEffect(() => {
    const roomId = window.location.pathname.split('/').pop() || '';
    const roomDetails = {
      roomId: roomId,
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
        return;
      }
      setRoom(doesRoomExist);
    } else {
      localStorage.setItem('rooms', JSON.stringify([roomDetails]));
    }
  }, [title]);

  return (
    <div className="h-screen">
      <div className="fixed z-10 w-full">
        <NavBarU title={title} room={room} />
      </div>
      <div className="flex py-14 h-screen bg-gray-700">
        <Chat title={title} />
      </div>
    </div>
  );
};
export default ChatPage;
