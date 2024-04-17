// import styles from './page.module.css';
import { NavBar } from './components/navbar';
import { Menu } from './components/menu';
export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className="flex flex-col items-center bg-backgroundColor w-full h-screen">
      <NavBar />
      <div className="flex w-full h-full">
        <div className="w-1/5 h-full">
          <Menu />
        </div>
        <div className="bg-black w-3/5  h-full"></div>
        <div className="w-1/5 h-full"></div>
      </div>
    </div>
  );
}
