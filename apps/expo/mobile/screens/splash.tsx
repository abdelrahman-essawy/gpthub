import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParams } from '../src/app/App';

const Splash = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logo = require('../assets/logo/justlogo.png');

  useEffect(() => {
    const navigateToHome = () => {
      navigation.replace('Root');
    };

    const delay = setTimeout(navigateToHome, 2000);
    return () => clearTimeout(delay);
  }, [navigation]);

  return (
    <View className="bg-gray-700 flex justify-center items-center w-full h-full">
      <Image
        className="w-full h-1/3"
        source={logo}
        contentFit="scale-down"
        transition={1000}
      />
    </View>
  );
};

export default Splash;
