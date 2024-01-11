// import styles from './page.module.css';
import Welcome from '../components/Welcome/Welcome';
import NavBar from '../components/Navbar/NavBar';

export default async function Index() {
  return (
    <div className="h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col text-white">
      <NavBar />
      <div className="flex justify-center mt-32">
        <Welcome />
      </div>
    </div>
  );
}
