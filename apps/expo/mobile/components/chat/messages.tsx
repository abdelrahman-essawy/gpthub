/* eslint-disable @typescript-eslint/no-var-requires */
import { View, Text } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
type MessagesProps = {
  sender: 'bot' | 'me';
  message: string;
};
export default function Messages({ message, sender }: MessagesProps) {
  const profilePic = require('../../assets/images/profilepic.png');
  const chatGPT = require('../../assets/images/chatgpt_logo.jpg');

  return sender === 'me' ? (
    <View className="flex gap-2 items-end  p-2 w-full">
      <Image
        className="w-10 h-10 rounded-full "
        source={profilePic}
        contentFit="scale-down"
        transition={1000}
      />
      <Text className="text-white text-right">{message}</Text>
    </View>
  ) : (
    <View className="flex gap-2 justify-start  p-2 w-full">
      <Image
        className="w-10 h-10 rounded-full mr-4"
        source={chatGPT}
        contentFit="scale-down"
        transition={1000}
      />
      <Text className="text-white text-left">{message}</Text>
    </View>
  );
}
