import React from "react";


const [title, setTitle] = React.useState('RAGHUB');


const pTitle=title;
export const handleRoomClick = (roomName: string) => {
    setTitle(roomName);
};