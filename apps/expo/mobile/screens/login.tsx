import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputForm from '../components/InputForm';
import ButtonForm from '../components/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../src/app/App';

export const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <SafeAreaView className="flex-1 bg-darkBackground p-4">
      <View className="flex-0 mt-10">
        <Text className="text-white text-5xl font-bold">Hey,</Text>
        <Text className="text-white text-5xl font-bold">Welcome</Text>
        <Text className="text-white text-5xl font-bold">Back</Text>
      </View>
      <View className="flex flex-col mt-20">
        <InputForm
          handleChange={() => {
            console.log();
          }}
          label={'Email'}
          category={1}
        />
        <View className="mt-4">
          <InputForm
            handleChange={() => {
              console.log();
            }}
            label={'Password'}
            category={0}
          />
        </View>
      </View>
      <View className="mt-10 flex-grow">
        <ButtonForm
          text="Login"
          onClick={() => {
            navigation.replace('Root');
          }}
        />
      </View>
      <View className="flex flex-row justify-center mt-8">
        <Text className="text-iconColor text-l">Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push('SignUp');
          }}
        >
          <Text className="text-white ml-2">Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
