import React from 'react';

type WelcomeProp ={
  style?: string;
}

const Welcome = ({ style }: WelcomeProp) => {
  return (

    <div
      className={`bg-gray-50/20 ${style} px-8 py-4 md:py-10 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg mx-auto text-center`}>
      <h1 className="font-Comfortaa text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">WELCOME TO</h1>
      <h1 className="font-Dela_Gothic_One text-white text-2xl md:text-3xl lg:text-4xl">GPTHUB</h1>
    </div>
  );
}

export default Welcome;
