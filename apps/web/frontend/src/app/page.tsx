// import styles from './page.module.css';
import { NavBar } from './components/navbar';
import { Menu } from './components/menu';
import { CurrentRoom } from './components/currentRoom';
import { Rooms } from './components/rooms';
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
        {/* right */}
        <div className="w-2/12 h-full">
          <Menu />
        </div>
        {/* mid */}
        <div className="bg-black w-7/12  h-full">
          <Rooms />
        </div>
        {/* left */}
        <div className="w-3/12">
          <CurrentRoom />
        </div>
      </div>
    </div>
  );
}
