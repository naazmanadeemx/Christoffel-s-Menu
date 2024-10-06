// src/screens/AddMenuItemScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { MenuItem } from '../types/MenuItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Picker } from '@react-native-picker/picker'; 

type AddMenuItemScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddMenuItem'>;

const AddMenuItemScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const navigation = useNavigation<AddMenuItemScreenNavigationProp>();
  const route = useRoute();
  const { setMenuItems } = route.params as { setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> };

  const addItemHandler = () => {
    const newItem: MenuItem = {
      id: Math.floor(Math.random() * 10000), 
      name,
      description,
      course,
      price: parseFloat(price),
    };

    setMenuItems((currentItems) => [...currentItems, newItem]);

    navigation.navigate('Home');
  };

  const cancelHandler = () => {
    
    setName('');
    setDescription('');
    setCourse('');
    setPrice('');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add/Edit Menu Item</Text>
      <TextInput
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Course" value="" />
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={addItemHandler} />
        <Button title="Cancel" onPress={cancelHandler} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default AddMenuItemScreen;
