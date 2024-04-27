import Chat from '../../../components/chat/chat';
import NavBarU from '../../../components/chat/NavBarU';

const ChatPage = ({ params }: { params: { room: string } }) => {
  const title = params.room;
  return (
    <div className="h-screen">
      <div className="fixed z-10 w-full">
        <NavBarU title={title}/>
      </div>
      <div className="flex py-14 h-screen bg-gray-700">
        <Chat/>
      </div>
    </div>
  );
};
export default ChatPage;
