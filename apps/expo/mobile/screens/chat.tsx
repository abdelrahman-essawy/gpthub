import { ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatScreenProps } from '../core/types';
import Input from '../components/input';
import ChatHeader from '../components/chatHeader';

const Chat = ({ navigation, route }: ChatScreenProps) => {
  const { title } = route.params || {};
  const [messages, setMessages] = useState<string[]>([]);

  const handleMessageChange = (text: string) => {
    setMessages((prevMessages) => [...prevMessages, text]);
  };
  return (
    <SafeAreaView className="flex-1 bg-chatBackground p-2 items-center">
      <View className="flex-1 first-letter:w-full">
        <ChatHeader title={title} />
        {/* <Text className="text-white text-center pb-10">{title}</Text> */}
        <ScrollView
          className="flex-1 "
          contentContainerStyle={{
            marginVertical: 16,
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}
        >
          {messages.map((message, index) => {
            return (
              <Text key={index} className="text-white text-center pb-10">
                {message}
              </Text>
            );
          })}
        </ScrollView>
        <Input onTextChange={handleMessageChange} />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
