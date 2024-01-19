'use client';

import React from 'react';
import Button from '../Button/Button';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NewNavBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 1100 });

  return (
    <div className="w-full h-24 z-50 bg-black shadow-md shadow-amber-50/40 flex flex-row items-center bg-opacity-25 fixed backdrop-filter backdrop-blur-sm">
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
          <div className="bg-gray-500/25 px-4 sm:px-10 py-2 rounded-lg flex items-center w-full h-14">
            <input
              type="text"
              placeholder="Search Document"
              className="outline-none bg-transparent border-none text-white flex-grow w-full"
            />
            {!isMobile && <Button label={'CtrlK'} className={"bg-black text-white"} x={4} />}
          </div>
        </div>
      </nav>
      {/*let it be at the right menu*/}
      {isMobile && (
        <div className="flex justify-end mr-4">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-4" className=" drawer-button btn"><FontAwesomeIcon icon={faBars} /></label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
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
        </div>
        </div>
      )}
    </div>

    // {/*<hr className="border-t-2 border-gray-300" />*/}
  );
};

export default NewNavBar;
