import { View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';

type Props = {
  className?: string;
  onTextChange:(text:string)=>void;
};

const Input = ({className,onTextChange}:Props) => {

  const [text, setText] = useState<string>("");

  return (
    <View className={`flex flex-row justify-between w-full bg-gray-500 p-4 rounded-xl ${className}`}>
      <TextInput
        value={text}
        onChangeText={setText}
        className='flex-1 text-white mr-4'
      />
      <Button
        onPress={()=>onTextChange(text)}
        title="Send"
        color='#007AFF'
      />
    </View>
  );
};

export default Input;
