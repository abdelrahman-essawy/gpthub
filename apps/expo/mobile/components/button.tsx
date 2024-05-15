import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

type Prop = {
  onClick: (arg0: string) => void;
  text: string;
};

const ButtonForm = ({ onClick, text }: Prop) => {
  return (
    <TouchableOpacity onPress={() => onClick(text)}>
      <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 50 }}>
        <Text style={{ color: 'black', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonForm;
