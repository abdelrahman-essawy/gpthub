import { TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


type Prop = {
  label: string;
  handleChange: (arg0: string) => void;
  category: number;
  className?: string;
};

const InputForm = ({ label, handleChange, category, className }: Prop) => {
  const [text, setText] = useState<string>('');
  const cStyle = className;
  const defaultStyle =
    'flex flex-row justify-between w-full bg-inputFormBg p-4 rounded-full border-2 border-inputFormBorderColor ';
  return (
    <View className={`${defaultStyle} ${cStyle}`}>
      <View className="px-2">
        {!category ? (
          <AntDesign name="lock1" size={24} color="#67666e" />
        ) : category===1 ?(
          <Feather name="mail" size={24} color="#67666e" />
        ):<Ionicons name="person-outline" size={24} color="#67666e" />}
      </View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={label}
        placeholderTextColor="#727179"
        className="flex-1 text-white mr-4 placeholder-white "
      />
    </View>
  );
};

export default InputForm;
