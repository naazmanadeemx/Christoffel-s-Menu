// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddMenuItemScreen from './src/screens/AddMenuItemScreen';
import FilterScreen from './src/screens/FilterScreen'; 
import { MenuItem } from './src/types/MenuItem';


export type RootStackParamList = {
  Home: undefined;
  AddMenuItem: { setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> };
  Filter: { menuItems: MenuItem[] }; 
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} /> {/* Add FilterScreen here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
