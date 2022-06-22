import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './components/MainScreen.jsx';
import FinalFoodList from './components/FinalFoodList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: true, title: 'Food List' }}
        />
        <Stack.Screen
          name="FinalFoodList"
          component={FinalFoodList}
          options={{ headerShown: true, title: 'Final Food List' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
