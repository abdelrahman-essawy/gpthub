import { View, Text } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Card from './card';
import { Room } from '../core/types';

const ListRooms = ({ roomList, text }: { roomList: Room[], text: string }) => {
  return (
    <View className="p-4 rounded-l w-full h-96">
      <Text className="text-2xl font-bold text-white pb-4">{text}</Text>
      <ScrollView
        contentContainerStyle={{
          marginVertical: 16,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {roomList.map((room, index) => {
          return (
            <View className="w-1/2 p-2" key={index}>
              <Card room={room} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ListRooms;
