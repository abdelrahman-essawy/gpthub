import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const chatHeader = ({ title }: { title: string }) => {
  return (
    <View className="z-10 flex flex-col w-full mt-3">
      <View className="flex flex-row w-full justify-between items-center">
        <TouchableOpacity
          onPress={() => {
            // router.push('/screens/Home');
          }}
        >
          <Entypo name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-xl text-white">{title}</Text>
        <FontAwesome6 name="edit" size={24} color="white" />
      </View>
      <View className="h-1 rounded-xl mt-4 bg-gray-200/20 w-full" />
    </View>
  );
};

export default chatHeader;
