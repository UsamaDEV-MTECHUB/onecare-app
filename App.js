import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import COLORS from './src/utilities/colors/Color';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from './src/screen/SignIn';
import MobileNumber from './src/screen/MobileNumber';
import Verification from './src/screen/Verification';
import Welcome from './src/screen/Welcome';
import ChatWithAdmin from './src/screen/ChatWithAdmin';
import CompleteProfile from './src/screen/CompleteProfile';

import FirstScreen from './src/screen/FirstScreen';

const Stack = createNativeStackNavigator();
const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="FirstScreen"
          component={FirstScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatWithAdmin"
          component={ChatWithAdmin}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
          initialParams={{routeName: 'ProductScreen'}}
        />
        <Stack.Screen
          name="MobileNumber"
          component={MobileNumber}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
