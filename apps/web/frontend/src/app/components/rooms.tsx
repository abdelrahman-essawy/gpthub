import { Carousel } from './Carousel';

export const Rooms = () => {
  return (
    <div className="flex flex-col bg-black w-full h-screen">
      <Carousel title="Joined Rooms" />
      <Carousel title="Trending Rooms" />
    </div>
  );
};
