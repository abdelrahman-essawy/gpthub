import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../screens/Home';
import Splash from '../../screens/splash';
import Profile from '../../screens/profile';
import Chat from '../../screens/chat';

export type RootStackParams = {
  Splash: undefined;
  Root: undefined;
  Profile: undefined;
  Chat: { title: string };
};

const Stack = createNativeStackNavigator<RootStackParams>();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Root" component={HomeStack} />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ navigation, route }) => ({
            headerTitle: route.params?.title,
            navigation: navigation,
            route: route,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default App;
