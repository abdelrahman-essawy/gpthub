import { View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  className?: string;
  onTextChange: (text: string) => void;
};

const Input = ({ className, onTextChange }: Props) => {
  const [text, setText] = useState<string>('');

  return (
    <View
      className={`flex flex-row justify-between w-full border-white/25 border-2 py-2 px-2 rounded-xl bg-opacity-10 ${className}`}
    >
      <TextInput
        value={text}
        onChangeText={setText}
        className="flex-1 text-white mr-4"
      />
      <TouchableOpacity
        onPress={() => onTextChange(text)}
        className="p-2 bg-gray-400 rounded-xl"
      >
        <AntDesign name="arrowup" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Input;
