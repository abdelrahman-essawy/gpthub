import { ScrollView, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatScreenProps } from '../core/types';
import Input from '../components/input';
import ChatHeader from '../components/chatHeader';
import Messages from '../components/chat/messages';
import { run } from '../lib/fetchGemini';

type MessageType = {
  sender: 'bot' | 'me';
  message: string;
};

const Chat = ({ navigation, route }: ChatScreenProps) => {
  const { title } = route.params || {};
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleMessageChange = async (text: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'me', message: text },
    ]);
    const response: string = await run(text);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'bot', message: response },
    ]);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-chatBackground p-2 items-center">
      <View className="flex-1 w-full">
        <ChatHeader title={title} />
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{
            marginVertical: 16,
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}
        >
          {messages.map((obj, index) => (
            <Messages key={index} sender={obj.sender} message={obj.message} />
          ))}
        </ScrollView>
        <Input onTextChange={handleMessageChange} />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
