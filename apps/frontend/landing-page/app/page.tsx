import React from 'react';
import Welcome from '../components/welcome/Welcome';
import Card from '../components/card/Card';
import NewNavBar from '../components/new navbar/Navbar';
import Footer from '../components/footer/Footer';
import Image from 'next/image';
import ListPowered from '../components/list powered/ListPowered';
export default async function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <NewNavBar />
      <div className="flex flex-col items-center mt-32">
        <Welcome />
        <p
          className="mt-14 text-center font-Dela_Gothic_One sm:text-xl md:text-2xl lg:text-4xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 inline-block text-transparent bg-clip-text">
          Build on Foundation of fast, Production-grade tooling
        </p>
        <p
          className="mt-2 text-center font-Dela_Gothic_One sm:text-xl md:text-2xl lg:text-4xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 inline-block text-transparent bg-clip-text">
          Powered By
        </p>
        <div className="flex flex-col justify-center items-center mb-8 lg:flex-row lg:gap-4">
          <Card
            className="mt-14"
            title="Gemini"
            description="
Elevate your online experience with our Gemini AI-powered website. Merging cutting-edge artificial intelligence, we deliver unparalleled personalization, intelligent content recommendations, and seamless navigation. This platform evolves dynamically, anticipating user preferences for a sophisticated and engaging web encounter. Step into the future of technology and user-centric design with our Gemini AI-driven website."
          />
          <Card
            className="mt-14"
            title="Next.js"
            description="Next.js is a popular React framework for building web applications. It provides a great developer experience with features like automatic code splitting, server-side rendering, and easy API routes. Next.js is often used for creating scalable and performant React applications, offering a powerful toolset for building modern web experiences."
          />
          <Card
            className="mt-14"
            title="Nest.js"
            description="Nest.js is a framework for building efficient and scalable server-side applications. It is built on top of Node.js and uses TypeScript, providing a modular and structured approach to developing back-end services. Nest.js embraces the principles of SOLID and enables developers to create maintainable and scalable server-side applications with ease."
          />
        </div>
      </div>
      <p
        className="mt-2 mb-10 text-center font-Dela_Gothic_One sm:text-xl md:text-2xl lg:text-4xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 inline-block text-transparent bg-clip-text">
        Used Technologies
      </p>
      <ListPowered />
      <div className="mt-auto mt-10">
        <hr className="border-amber-50/30" />
        <Footer />
      </div>
    </div>
  );
}
