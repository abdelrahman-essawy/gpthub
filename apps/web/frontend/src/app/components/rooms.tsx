import React from 'react';
import { generateRandomCards } from '../mock/generateRandomCards';
import { CardData } from '../core/types';
import Card from './card';

export const Rooms = () => {
  const roomsData: CardData[] = generateRandomCards(10);
  return (
    <div className="flex flex-col p-8 w-full wrap">
      <p className="text-white text-2xl font-bold w-full wrap">Joined Rooms</p>
      <div className="flex gap-2 w-full wrap">
        {roomsData.map((data, index) => {
          return (
            <div key={index} className='w-1/2'>
              <Card
                img={data.img}
                category={data.category}
                title={data.title}
                subTitle={data.subTitle}
                noActive={data.noActive}
                noResources={data.noResources}
                noMessages={data.noMessages}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
