import React from 'react';
import { generateRandomCards } from '../mock/generateRandomCards';
import { CardData } from '../core/types';
import Card from './card';

export const Rooms = () => {
  const roomsData: CardData[] = generateRandomCards(10);
  return (
    <div className="flex flex-col w-full h-full">
      <p className="text-white text-2xl font-bold w-full p-8">Joined Rooms</p>
      <div className="flex flex-wrap justify-around gap-2 w-full h-64 overflow-auto">
        {' '}
        {/* Changed flex to flex-wrap */}
        {roomsData.map((data, index) => (
          <Card
            key={index}
            img={data.img}
            category={data.category}
            title={data.title}
            subTitle={data.subTitle}
            noActive={data.noActive}
            noResources={data.noResources}
            noMessages={data.noMessages}
          />
        ))}
      </div>
      <p className="text-white text-2xl font-bold w-full p-8">Trending Rooms</p>
      <div className="flex flex-wrap justify-around gap-2 w-full h-64 overflow-auto">
        {' '}
        {/* Changed flex to flex-wrap */}
        {roomsData.map((data, index) => (
          <Card
            key={index}
            img={data.img}
            category={data.category}
            title={data.title}
            subTitle={data.subTitle}
            noActive={data.noActive}
            noResources={data.noResources}
            noMessages={data.noMessages}
          />
        ))}
      </div>
    </div>
  );
};
