import { NavBar } from '../../components/navbar';
import { Menu } from '../../components/menu';
import { CurrentRoom } from '../../components/currentRoom';
import { Rooms } from '../../components/rooms';
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center bg-backgroundColor w-full min-h-screen max-h-screen mx-auto">
      <div className="pt-20 w-full">
        <NavBar />
      </div>
      <div className="flex w-full h-full justify-center">
        {/* right */}
        <div className="w-2/12 h-screen bg-backgroundColor">
          <Menu />
        </div>
        {/* mid */}
        <div className="bg-black w-7/12 h-full">
          <Rooms />
        </div>
        {/* left */}
        <div className="w-3/12 h-screen bg-backgroundColor">
          <CurrentRoom />
        </div>
      </div>
    </div>
  );
}
