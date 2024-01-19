import React from 'react';
import Image from 'next/image';

const ListPowered =()=>{
  return (
    <div className={`flex flex-col w-full items-center gap-4 `}>
      <div className="flex gap-4 justify-center">
        <Image src="/assets/images/Gemini.jpg" alt="Gemini Avatar" width={300} height={300}
               className="w-[800px] sm:w-96 rounded-xl border-gray-400/30 border hover:border-gray-400/40 shadow-2xl" />
        <div className="mockup-code w-1/2">
          <pre data-prefix="$" className="whitespace-pre-wrap"><code>Gemini</code></pre>
          <pre className="text-warning whitespace-pre-wrap p-4"><code>Gemini AI, a cutting-edge artificial intelligence platform, propels this website into the realms of innovation and efficiency. Harnessing the power of Gemini AI, our platform seamlessly integrates advanced machine learning algorithms to deliver a personalized and intuitive user experience. From intelligent content recommendations to streamlined navigation, Gemini AI ensures that every interaction is tailored to individual preferences, creating a dynamic and engaging online environment. With its adaptive capabilities, Gemini AI continuously learns and evolves, staying ahead of trends and user behaviors to anticipate needs and provide a truly futuristic web experience.</code></pre>
          <pre data-prefix=">" className="text-success whitespace-pre-wrap"><code>Done!</code></pre>
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        <Image src="/assets/images/Next.jpg" alt="Gemini Avatar" width={300} height={300}
               className="w-[800px] sm:w-96 rounded-xl border-gray-400/30 border hover:border-gray-400/40 shadow-2xl" />
        <div className="mockup-code w-1/2">
          <pre data-prefix="$" className="whitespace-pre-wrap"><code>Next.js</code></pre>
          <pre className="text-warning whitespace-pre-wrap p-4"><code>
Powering our website with Next.js, we've embraced a cutting-edge framework that seamlessly blends efficiency, performance, and scalability. Next.js enables us to create dynamic, server-rendered React applications with ease, providing a streamlined development experience. Leveraging its powerful features such as automatic code splitting, server-side rendering, and a robust plugin system, our website achieves optimal performance and user experience. With Next.js, we navigate the realms of modern web development, ensuring our users enjoy a fast, interactive, and engaging online presence. Explore the future of web development with our Next.js-powered website — where innovation meets speed.</code></pre>
          <pre data-prefix=">" className="text-success whitespace-pre-wrap"><code>Done!</code></pre>
        </div>
      </div>
      <div className="flex gap-4 justify-center">

        <Image src="/assets/images/Nestjs.png" alt="Gemini Avatar" width={300} height={300}
               className="w-[800px] sm:w-96 rounded-xl border-gray-400/30 border hover:border-gray-400/40 shadow-2xl" />
        <div className="mockup-code w-1/2">
          <pre data-prefix="$" className="whitespace-pre-wrap"><code>Next.js</code></pre>
          <pre className="text-warning whitespace-pre-wrap p-4"><code>
Elevating our website with the prowess of NestJS, we've entered a realm of server-side excellence and scalability. NestJS, a powerful and modular framework for building server-side applications with TypeScript, empowers our web presence with efficient and maintainable code. With its reliance on decorators, dependency injection, and a robust module system, NestJS offers a structured and scalable architecture for our server-side logic. By seamlessly integrating with the power of TypeScript, NestJS ensures a smooth development experience and robust runtime execution. Our website, crafted on the foundation of NestJS, stands as a testament to server-side innovation and the future of web applications. Experience the synergy of NestJS and web development excellence on our platform.</code></pre>
          <pre data-prefix=">" className="text-success whitespace-pre-wrap"><code>Done!</code></pre>
        </div>
      </div>
    </div>

  );
}
export default ListPowered;
