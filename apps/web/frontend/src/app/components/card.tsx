import React from 'react';
import { CardData } from '../core/types';
// import Image from 'next/image';

export const Card = (data: CardData) => {
  return (
    <div className="flex items-center p-2 text-white w-full bg-red-200">
      <div>
        {/* <Image
          src={data.img}
          width={50}
          height={50}
          alt="profile picture"
          className="rounded-full"
        /> */}
      </div>
      <div>
        <p>{data.title}</p>
        <p>{data.subTitle}</p>
      </div>
    </div>
  );
};

export default Card;
