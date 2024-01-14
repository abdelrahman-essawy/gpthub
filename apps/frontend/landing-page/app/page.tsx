import React from 'react';
import Welcome from '../components/welcome/Welcome';
import NavBar from '../components/Navbar/NavBar';
import Card from '../components/card/Card';
import Button from '../components/Button/Button';
import NewNavBar from '../components/new navbar/Navbar';

export default async function Index() {
  return (
    // bg-gradient-to-br from-gray-900 to-gray-800
    <div className="min-h-screen  flex flex-col bg-black text-white">
      <NewNavBar />
      {/*<NavBar/>*/}
      <div className="flex justify-center flex-col items-center mt-20">
        <Welcome />
        <p className="mt-14 font-Dela_Gothic_One sm:text-xl md:text-2xl lg:text-4xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 inline-block text-transparent bg-clip-text">Build on Foundation of fast, Production-grade tooling</p>
        <h1 className="mt-2 font-Dela_Gothic_One sm:text-xl md:text-2xl lg:text-4xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 inline-block text-transparent bg-clip-text">Powered By</h1>
        <div className="flex flex-col items-center lg:flex-row justify-center gap-4">
          <Card className={"mt-14"} title="Next.js" description="Next.js is a popular React framework for building web applications. It provides a great developer experience with features like automatic code splitting, server-side rendering, and easy API routes. Next.js is often used for creating scalable and performant React applications, offering a powerful toolset for building modern web experiences."/>
          <Card className={"mt-14"} title="Nest.js" description="Nest.js is a framework for building efficient and scalable server-side applications. It is built on top of Node.js and uses TypeScript, providing a modular and structured approach to developing back-end services. Nest.js embraces the principles of SOLID and enables developers to create maintainable and scalable server-side applications with ease."/>
          <Card className={"mt-14"} title="React Native" description="React Native is a framework for building cross-platform mobile applications using React. It allows developers to use React and JavaScript to build native mobile applications for iOS and Android. React Native provides a consistent development experience across platforms while allowing for native performance and access to device features. It's a popular choice for businesses looking to develop mobile apps efficiently."/>
        </div>

      </div>
    </div>
  );
}
