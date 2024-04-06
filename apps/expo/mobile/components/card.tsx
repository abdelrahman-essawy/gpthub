import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { Room } from '../core/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParams } from '../src/app/App';

const Card = ({ room }: { room: Room }) => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <Pressable onPress={() => navigator.navigate('Chat', { title: room.name })}>
      <View className="flex flex-row bg-black border-white/20 border rounded-xl p-4">
        <Image
          className="w-12 h-10 mr-4 rounded-md"
          source={room.img}
          contentFit="scale-down"
          transition={1000}
        />
        <View className="flex flex-col">
          <Text className="text-white">{room.name}</Text>
          <Text className="text-white text-xs">{room.subTitle}</Text>
        </View>

        <View className="absolute flex justify-center items-center h-6 w-6 right-0 -top-2 bg-red-500 rounded-full text-center">
          <Text className=" text-white">{room.messages}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
