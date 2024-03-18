import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native'; // Add this import
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParams } from '../src/app/App';

const Tabs = ({ text }: { text: string }) => {
  const colorIt = text === 'All' ? 'bg-green-400' : 'bg-gray-300';

  return (
    <Text className={` px-4 py-2 rounded-2xl mr-2  ${colorIt}`}>{text}</Text>
  );
};

export const Navbar = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParams>>();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const img = require('../assets/images/photo.jpg');
  return (
    <View className="flex justify-center pl-4 pt-4 pb-4">
      <ScrollView horizontal>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            className="w-10 h-10 rounded-full mr-4"
            source={img}
            contentFit="scale-down"
            transition={1000}
          />
        </TouchableOpacity>
        <Tabs text="All" />
        <Tabs text="Rooms" />
        <Tabs text="Participated" />
      </ScrollView>
    </View>
  );
};

export default Navbar;
