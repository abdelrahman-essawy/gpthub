import React from 'react';

type WelcomeProp ={
  style?: string;
}

const Welcome = ({ style }: WelcomeProp) => {
  return (

    <div className={`bg-gray-50/10 ${style} px-52 py-10 h-40 rounded-lg`}>
      <h1 className="font-Comfortaa text-white text-3xl font-bold">WELCOME TO</h1>
      <h1 className="pt-2 ml-6 font-Dela_Gothic_One text-white text-3xl">GBTHUB</h1>
    </div>
  );
}

export default Welcome;
