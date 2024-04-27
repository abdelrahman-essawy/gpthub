import React from 'react'
import Logo from '../../../../public/logo/justlogo.png';
import Image from 'next/image'
import { IconSeparator } from '../ui/Icons';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className='flex items-center w-full h-28 bg-black pl-4'>
        <Image src={Logo} alt='logo' width={60} height={60}/>
        <IconSeparator className="text-gray-600 ml-2 " />
        <button className="ml-2">
            <Link href="/login" className='text-white text-2xl'>Login</Link>
          </button>
    </div>
  )

}
