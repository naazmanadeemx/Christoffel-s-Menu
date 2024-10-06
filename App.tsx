// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddMenuItemScreen from './src/screens/AddMenuItemScreen';
import { MenuItem } from './src/types/MenuItem';

// Define the parameters for the navigation
export type RootStackParamList = {
  Home: undefined; // No parameters for Home
  AddMenuItem: { setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> }; // Accept setMenuItems as parameter
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
