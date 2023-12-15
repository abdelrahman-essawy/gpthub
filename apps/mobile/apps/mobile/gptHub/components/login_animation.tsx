import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

interface LottieLoginAnimationProps {
  style?: any; // Accept any style prop
}

const LottieLoginAnimation: React.FC<LottieLoginAnimationProps> = ({
  style,
}) => {
  return (
    <View>
      <LottieView
        source={require('../assets/login/loginAnimation.json')}
        autoPlay
        loop
      />
    </View>
  );
};
export default LottieLoginAnimation;
