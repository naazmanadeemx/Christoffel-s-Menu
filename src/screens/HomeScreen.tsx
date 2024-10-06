// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem } from '../types/MenuItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const addItemHandler = () => {
    navigation.navigate('AddMenuItem', { setMenuItems }); // Pass setMenuItems here
  };

  const removeItemHandler = (id: number) => {
    setMenuItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const totalItems = menuItems.length;
  const averagePrice = totalItems > 0 
    ? (menuItems.reduce((acc, item) => acc + item.price, 0) / totalItems).toFixed(2) 
    : '0.00';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Christoffel's Menu</Text>
      <Text style={styles.stats}>Total Items: {totalItems}</Text>
      <Text style={styles.stats}>Average Price: ${averagePrice}</Text>
      
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemText}>Dish Name: {item.name}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Course: {item.course}</Text>
              <Text>Price: ${item.price}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeItemHandler(item.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Add Menu Item" onPress={addItemHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  stats: { fontSize: 16, textAlign: 'center', marginVertical: 4 },
  item: { 
    padding: 10, 
    marginBottom: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd', 
    flexDirection: 'row', 
    justifyContent: 'space-between', // Aligns children to the space between
    alignItems: 'center', // Aligns items vertically
    borderRadius: 5, // Optional: rounds the corners
    backgroundColor: '#f9f9f9', // Optional: adds a light background color
  },
  itemDetails: { 
    flex: 1, // This allows the details to take up the remaining space
  },
  itemText: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  removeButton: {
    backgroundColor: '#e74c3c', // Red background for remove button
    borderRadius: 5,
    padding: 8,
  },
  removeButtonText: {
    color: 'white', // Text color for the button
    fontWeight: 'bold',
  },
});

export default HomeScreen;