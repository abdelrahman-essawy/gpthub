import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo
import LottieLoginAnimation from '../components/login_animation';
import COLORS from '../constants/colors';
import { TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated';

interface LoginProps {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require('../assets/login/images/background.png')}
      />
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-[255] w-[100] ml-2"
          source={require('../assets/login/images/light.png')}
        />
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-[160] w-[65]"
          source={require('../assets/login/images/light.png')}
        />
      </View>
      <View className="h-full w-full flex justify-around pt-52 pb-10">
        <View className="flex items-center">
          <Text className="text-white font-bold text-5xl tracking-wider">
            Login
          </Text>
        </View>
        <View className="flex items-center mx-4 space-y-4">
          <View className="bg-black/5 p-5  rounded-2xl w-full">
            <TextInput placeholder="Email" placeholderTextColor={'grey'} />
          </View>
          <View className="bg-black/5 p-5  rounded-2xl w-full">
            <TextInput
              placeholder="password"
              placeholderTextColor={'grey'}
              secureTextEntry
            />
          </View>
          <View className="w-full">
            <TouchableOpacity>
              <View className="w-full bg-blue-400 rounded-2xl p-3 mb-3">
                <Text className="text-xl text-white font-bold text-center">
                  Login
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center ">
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text className="text-blue-400">SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
