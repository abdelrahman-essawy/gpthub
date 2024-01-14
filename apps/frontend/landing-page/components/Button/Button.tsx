import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  label:string
  link?:string
  x?:number
  y?:number
  className?:string
}
const Button =({label='ok',link='https://www.google.com',x=10,y=2,className}:ButtonProps)=>{
  return (
    <Link href={link} passHref>
        <div className={`bg-amber-50 px-${x} py-${y} rounded-lg text-black ${className} `}>
          {label}
        </div>
    </Link>
  );
}
export default Button;
