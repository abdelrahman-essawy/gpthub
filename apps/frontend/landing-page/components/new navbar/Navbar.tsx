'use client';

import React from 'react';
import Button from '../Button/Button';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NewNavBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 1100 });

  return (
    <div className="w-full h-24 z-50 shadow-md shadow-amber-50/40 flex flex-row items-center">
      <nav className="max-w-[110rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <a className="flex-none text-2xl font-semibold dark:text-white mr-24" href="#">
          GPTHUB
        </a>
        {!isMobile && (
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
        )}
        <div className={`flex items-center sm:w-72`}>
          <div className="bg-gray-500/25 px-4 sm:px-10 py-2 rounded-lg flex items-center w-full">
            <input
              type="text"
              placeholder="Search Document"
              className="outline-none bg-transparent border-none text-white flex-grow w-full"
            />
            <Button label={'CtrlK'} className={"bg-black text-white"} x={4} />
          </div>
        </div>
      </nav>
      {isMobile && (
        <div className="dropdown dropdown-end px-2 right-0">
          <div tabIndex={0} role="button" className="btn m-1">
            <FontAwesomeIcon icon={faBars} />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a className="font-medium" href="#">
              Showcase
            </a></li>
            <li><a className="font-medium" href="#">
              Docs
            </a></li>
            <li><a className="font-medium" href="#">
              Blog
            </a></li>
            <li><a className="font-medium" href="#">
              Analytics
            </a></li>
          </ul>
        </div>
      )}
    </div>
    // {/*<hr className="border-t-2 border-gray-300" />*/}
  );
};

export default NewNavBar;
