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
    <div className="flex flex-col justify-center items-center bg-backgroundColor w-full min-h-screen max-h-screen mx-auto">
      <div className='pt-20 w-full'>
        <NavBar />
      </div>
      <div className="flex w-full h-screen justify-center">
        {/* right */}
        <div className="w-2/12 h-full">
          <Menu />
        </div>
        {/* mid */}
        <div className="bg-black w-7/12 h-screen">
          <Rooms />
        </div>
        {/* left */}
        <div className="w-3/12 h-full">
          <CurrentRoom />
        </div>
      </div>
    </div>
  );
}
