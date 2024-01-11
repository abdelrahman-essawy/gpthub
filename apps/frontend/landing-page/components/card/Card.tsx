import React from 'react';

type CardProps = {
  title: string;
  description: string;
  style: string;
};

const Card = (props: CardProps) => {
  return (
    <div className={`flex flex-col items-center p-4 pt-2 rounded-xl w-1/4 min-h-[300px] bg-gray-700 shadow-2xl ${props.style}`}>
      <h1 className="font-Dela_Gothic_One text-lg pt-2">{props.title}</h1>
      <h2 className="font-Comfortaa pt-4">{props.description}</h2>
    </div>
  );
};

export default Card;
