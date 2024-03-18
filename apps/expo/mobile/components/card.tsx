import { View, Text } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { Room } from '../core/types';

const Card = ({ room }: { room: Room }) => {
  return (
    <View className="flex flex-row bg-gray-700 rounded-xl p-2 m-2">
      <Image
        className="w-10 h-10 rounded-full mr-4"
        source={room.img}
        contentFit="scale-down"
        transition={1000}
      />
      <View className='flex flex-col '>
        <Text className="text-white">{room.name}</Text>
        <Text>{room.subTitle}</Text>
      </View>
    </View>
  );
};

export default Card;
