// import styles from './page.module.css';
import Welcome from '../components/welcome/Welcome';
import NavBar from '../components/Navbar/NavBar';
import Card from '../components/card/Card'

export default async function Index() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col text-white">
      <NavBar />
      <div className="flex justify-center flex-col items-center mt-20">
        <Welcome />
        <p className="mt-14 font-Dela_Gothic_One text-white text-2xl">Build on Foundation of fast, Production-grade tooling</p>
        <h1 className="mt-4 font-Dela_Gothic_One text-2xl">Powered By</h1>
        <div className="flex flex-row justify-center gap-4">
          <Card style={"mt-14"} title="Next.js" description="Next.js is a popular React framework for building web applications. It provides a great developer experience with features like automatic code splitting, server-side rendering, and easy API routes. Next.js is often used for creating scalable and performant React applications, offering a powerful toolset for building modern web experiences."/>
          <Card style={"mt-14"} title="Nest.js" description="Nest.js is a framework for building efficient and scalable server-side applications. It is built on top of Node.js and uses TypeScript, providing a modular and structured approach to developing back-end services. Nest.js embraces the principles of SOLID and enables developers to create maintainable and scalable server-side applications with ease."/>
          <Card style={"mt-14"} title="React Native" description="React Native is a framework for building cross-platform mobile applications using React. It allows developers to use React and JavaScript to build native mobile applications for iOS and Android. React Native provides a consistent development experience across platforms while allowing for native performance and access to device features. It's a popular choice for businesses looking to develop mobile apps efficiently."/>
        </div>

      </div>
    </div>
  );
}
