import React from 'react';
import { CardData } from '../core/types';
import Image from 'next/image';
import Link from 'next/link';

const Card = (data: CardData) => {
  return (
    <div className="flex items-center p-2 text-white w-full bg-black rounded-2xl border-amber-50/20 border-2 h-full">
      <div className="">
        <Link href={`pages/chat/${data.title}`}>
          {/* Adjusted width class */}
          <Image
            src={data.img}
            width={200}
            height={200}
            alt="profile picture"
            className="rounded-2xl"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-1 items-start ml-2 w-full p-2">
        {/* Adjusted width class */}
        <p className="font-bold text-sm xl:text-l">{data.title}</p>
        <p className="text-xs xl:text-sm">{data.subTitle}</p>
        <p className="text-green-500">{data.noActive + ' active'}</p>
        {/* <p className="text-green-500">{data.index + ' index'}</p> */}
        <div className="border-t border-gray-600 w-full border-2"></div>
        <div className="flex justify-between w-full">
          <p>{data.noResources + ' Resources'}</p>
          <p>{data.noMessages + ' messages'}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
