import { NavBar } from '../../components/navbar';
import { Menu } from '../../components/menu';
import { CurrentRoom } from '../../components/currentRoom';
import { Rooms } from '../../components/rooms';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center bg-backgroundColor w-full min-h-screen max-h-screen mx-auto">
      <div className="w-full">
        <NavBar />
      </div>
      <div className="flex w-full h-full justify-center overflow-hidden">
        {/* right */}
        <div className="w-2/12 h-full bg-backgroundColor overflow-y-auto">
          <Menu />
        </div>
        {/* mid */}
        <div className="bg-black w-10/12 h-full overflow-y-auto z-10">
          <Rooms />
        </div>
        {/* left */}
        {/* <div className="w-3/12 h-full bg-black overflow-y-auto">
          <CurrentRoom />
        </div> */}
      </div>
    </div>
  );
}
