import { Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatScreenProps } from '../core/types';

const Chat = ({ navigation, route }: ChatScreenProps) => {
  const { title } = route.params || {};
  return (
    <SafeAreaView className="flex-1 bg-gray-700 p-2 items-center">
      <View>
        <Text className="text-white">{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
