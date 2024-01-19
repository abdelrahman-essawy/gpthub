import React from 'react';

type CardProps = {
  title: string;
  description: string;
  className: string;
};

const Card = (props: CardProps) => {
  return (
    <div className={`flex flex-col items-center p-4 pt-2 rounded-xl w-full sm:w-1/2 md:w-1/2 lg:w-1/4 min-h-[300px] bg-black border-2 border-gray-400/30 hover:border-gray-400/40 shadow-2xl ${props.className}`}>
      <h1 className="font-Dela_Gothic_One text-2xl pt-2">{props.title}</h1>
      <h2 className="font-Comfortaa text-l pt-4">{props.description}</h2>
    </div>
  );
};

export default Card;
