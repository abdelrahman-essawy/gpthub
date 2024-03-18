import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/navbar';
import ListRooms from '../components/list_rooms';
import { fake_room_data } from '../mock/fake_rooms';
import { ScrollView } from 'react-native-gesture-handler';
const Home = () => {
  const roomList = fake_room_data(20);
  return (
    <SafeAreaView className="flex-1 bg-gray-950 p-2">
      <ScrollView>
        <Navbar />
        <ListRooms text="Joined Rooms" roomList={roomList}/>
        <ListRooms text="Trending Rooms" roomList={roomList}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
