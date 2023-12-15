import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

interface SignUpProps {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
}

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Open up App.js to start working on your Helloz!</Text>
    </View>
  );
};
export default SignUp;
