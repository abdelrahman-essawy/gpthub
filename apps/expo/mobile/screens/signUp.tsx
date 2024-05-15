import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../src/app/App';
import InputForm from '../components/InputForm';
import ButtonForm from '../components/button';


const SignUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
    // 0 pass    1 email   2//person
  return (
    <SafeAreaView className="flex-1 bg-darkBackground p-2 pt-20">
      <View className="items-center mb-10">
        <Text className="text-white text-5xl font-bold">Let's get</Text>
        <Text className="text-white text-5xl font-bold">started</Text>
      </View>

      <View className="flex flex-col">
        <View className="flex-row w-full pb-4 justify-between">
          <View className="w-[170px] ">
            <InputForm
              handleChange={() => {
                console.log();
              }}
              label={'First Name'}
              category={2}
            />
          </View>
          <View className="w-[170px]">
            <InputForm
              handleChange={() => {
                console.log();
              }}
              label={'Last Name'}
              category={2}
            />
          </View>
        </View>
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
        <View className="mt-4">
          <InputForm
            handleChange={() => {
              console.log();
            }}
            label={'Confirm Password'}
            category={0}
          />
        </View>
      </View>
      <View className="mt-10 flex-grow">
        <ButtonForm
          text="Sign Up"
          onClick={() => {
            navigation.pop();
          }}
        />
      </View>
      <View className="flex flex-row justify-center mt-8">
        <Text className="text-iconColor text-l">Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
        >
          <Text className="text-white ml-2">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
