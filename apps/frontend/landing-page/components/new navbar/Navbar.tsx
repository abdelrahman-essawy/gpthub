import React from 'react';
import Button from '../Button/Button';

const NewNavBar = () => {
  return (
    <div>
      <div className="w-full h-24 z-50 shadow-md shadow-amber-50/40 flex flex-row items-center">
        <nav className="max-w-[110rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <a className="flex-none text-2xl font-semibold dark:text-white mr-24" href="#">
            GPTHUB
          </a>
          <div className="flex flex-row mr-auto text-gray-500 text-lg gap-10">
            <a className="font-medium hover:text-white" href="#">
              Showcase
            </a>
            <a className="font-medium hover:text-white" href="#">
              Docs
            </a>
            <a className="font-medium hover:text-white" href="#">
              Blog
            </a>
            <a className="font-medium hover:text-white" href="#">
              Analytics
            </a>
            <a className="font-medium hover:text-white" href="#">
              Analytics
            </a>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-500/25 px-10 py-2 rounded-lg  flex items-center">
              <input
                type="text"
                placeholder="Search Document"
                className="outline-none bg-transparent border-none text-white flex-grow"
              />
              <Button label={'CtrlK'} className={"bg-black text-white"} x={4} />
            </div>
          </div>
        </nav>
      </div>
      {/*<hr className="border-t-2 border-gray-300" />*/}
    </div>
  );
};

export default NewNavBar;
