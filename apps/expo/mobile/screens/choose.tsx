import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';

const Choose = () => {
  const animationRef = useRef<LottieView | null>();
  useEffect(() => {
    animationRef.current?.play();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* <LottieView
        ref={(animation) => {
          animationRef.current = animation;
        }}
        source={require('../assets/animation/com.json')}
        autoPlay={true}
        loop={true}
        // style={{width:500,height:500}}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Set your desired background color
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFF', // Set your desired text color
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default Choose;
