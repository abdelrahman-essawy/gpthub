import React from 'react';

type NavBarProps = {
  name?: string;
  label1?: string;
  label2?: string;
  label3?: string;
  background: string;
};

const NavBar = ({
  name = 'GBTHUB',
  label1 = 'About me',
  label2 = 'Skills',
  label3 = 'Projects',
  background = 'blue',
}: NavBarProps) => {
  return (
    <div className="bg-slate-900 px-10 py-3 text-white">
      <div>
        <h1>{name}</h1>
        <h1>{label1}</h1>
        <h1>{label2}</h1>
        <h1>{label3}</h1>
      </div>
    </div>
  );
};

export default NavBar;
