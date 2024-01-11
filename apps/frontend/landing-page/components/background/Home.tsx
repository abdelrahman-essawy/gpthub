import React from  'react';

const Home =()=>{
  return (
    <div className="flex-col bg-amber-100 py-7 px-6 rounded-xl">
      <div className="flex-wrap px-10 py-2 rounded-xl bg-amber-700 ">
        <div className="flex gap-4">
          <h1 className="bg-blue-300 hover:bg-white px-2 rounded-xl duration-300 basis-1/2">Home</h1>
          <h1>Home</h1>
          <h1>Home</h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 py-10">
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <div>04</div>
        <div>05</div>
        <div>06</div>
        <div>07</div>
        <div>08</div>
        <div>09</div>
      </div>

      <div className="flex justify-start">
        <div className="bg-yellow-50">01</div>
        <div>02</div>
        <div>03</div>
      </div>
    </div>

  );
}
export default Home;
