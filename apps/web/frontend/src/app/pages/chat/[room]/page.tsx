'use client';
import React, { useEffect, useState } from 'react';
import Chat from '../../../components/chat/chat';
import NavBarU from '../../../components/chat/NavBarU';
import { useRouter } from 'next/navigation';
import { DataSent } from '../../../components/menu';
import { Room } from '../../../../../../../expo/mobile/core/types';

const ChatPage = ({ params }: { params: { room: string } }) => {
  const title = params.room;
  const [room, setRoom] = useState<Room>({
    roomId: '',
    subTitle: '',
    resources: [],
    img: '',
    messages: 0,
    name: '',
  });
  const rooms = JSON.parse(localStorage.getItem('rooms') || '[]');

  useEffect(() => {
    // if (rooms.length > 0) {
    //   const doesRoomExist = rooms.find(
    //     (r: { roomId: string }) => r.roomId === room.roomId,
    //   );
    //   if (!doesRoomExist) {
    //     rooms.push(room);
    //     localStorage.setItem('rooms', JSON.stringify(rooms));
    //   }
    // }
  }, []);

  useEffect(() => {
    // localStorage.setItem(
    //   'rooms',
    //   JSON.stringify(
    //     rooms.map((r: Room) => (r.roomId === room.roomId ? room : r)),
    //   ),
    // );
  }, [room]);

  // useEffect(() => {
  //   const roomId = window.location.pathname.split('/').pop() || '';
  //   const roomDetails = {
  //     roomId: roomId,
  //     subTitle: '',
  //     img: null,
  //     resources: [],
  //   };
  //
  //   const restRooms = localStorage.getItem('rooms');
  //   if (restRooms) {
  //     const rooms = JSON.parse(restRooms);
  //     const doesRoomExist = rooms.find(
  //       (room: { roomId: string }) => room.roomId === roomId,
  //     );
  //     if (!doesRoomExist) {
  //       rooms.push(roomDetails);
  //       localStorage.setItem('rooms', JSON.stringify(rooms));
  //       setRoom(roomDetails);
  //     } else {
  //       setRoom(doesRoomExist);
  //     }
  //   } else {
  //     localStorage.setItem('rooms', JSON.stringify([roomDetails]));
  //     setRoom(roomDetails);
  //   }
  // }, [title]);

  return (
    <div className="h-screen">
      <div className="fixed z-10 w-full">
        <NavBarU title={title} room={room} setRoom={setRoom} />
      </div>
      <div className="flex py-14 h-screen bg-gray-700">
        <Chat title={title} room={room} />
      </div>
    </div>
  );
};

export default ChatPage;
