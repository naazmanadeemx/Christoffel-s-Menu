// src/screens/FilterScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from '../types/MenuItem';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type FilterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Filter'>;
  route: RouteProp<RootStackParamList, 'Filter'>;
};

const FilterScreen: React.FC<FilterScreenProps> = ({ route }) => {
  const { menuItems } = route.params; // Accessing menuItems from route params
  const [selectedCourse, setSelectedCourse] = useState<string>('All');

  const filteredItems = selectedCourse === 'All'
    ? menuItems
    : menuItems.filter(item => item.course === selectedCourse);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter Menu by Course</Text>
      <Picker
        selectedValue={selectedCourse}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCourse(itemValue)}
      >
        <Picker.Item label="All Courses" value="All" />
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: MenuItem }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Dish Name: {item.name}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Course: {item.course}</Text>
            <Text>Price: ${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  picker: { height: 50, width: '100%', marginBottom: 16 },
  item: { padding: 10, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  itemText: { fontSize: 18 },
});

export default FilterScreen;
