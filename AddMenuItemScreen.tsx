import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';

type ScreenType = 'Welcome' | 'Home' | 'AddMenuItem' | 'MenuList' | 'Menu';

interface Props {
  navigate: (screen: ScreenType) => void;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  course: string;
}

const courses = ['Starter', 'Main', 'Dessert', 'Beverage'];

const AddMenuItemScreen: React.FC<Props> = ({ navigate }) => {
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('Starter');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addItem = () => {
    if (!dishName || !dishPrice) {
      Alert.alert('Error', 'Please enter both dish name and price.');
      return;
    }

    const newItem: MenuItem = {
      id: (menuItems.length + 1).toString(),
      name: dishName,
      price: parseFloat(dishPrice),
      course: selectedCourse,
    };

    setMenuItems([...menuItems, newItem]);
    setDishName('');
    setDishPrice('');
    setSelectedCourse('Starter');
  };

  const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);

  const refreshForm = () => {
    setDishName('');
    setDishPrice('');
    setSelectedCourse('Starter');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/ChristophellEats.png')} style={styles.logo} />
      <Text style={styles.breadcrumb}>Home / Add Menu Item</Text>

      <Text style={styles.label}>Dish Name:</Text>
      <TextInput
        style={styles.input}
        value={dishName}
        onChangeText={setDishName}
        placeholder="Enter dish name"
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={dishPrice}
        onChangeText={setDishPrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Select Course:</Text>
      <View style={styles.courseButtons}>
        {courses.map(course => (
          <TouchableOpacity
            key={course}
            style={[
              styles.courseButton,
              selectedCourse === course && styles.courseButtonSelected,
            ]}
            onPress={() => setSelectedCourse(course)}
          >
            <Text style={styles.courseButtonText}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.refreshButton} onPress={refreshForm}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigate('Home')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.summary}>Total Items: {menuItems.length} | Estimated Total: R{totalPrice.toFixed(2)}</Text>

      {menuItems.map(item => (
        <View key={item.id} style={styles.item}>
          <Text>{item.name} - R{item.price.toFixed(2)} ({item.course})</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AddMenuItemScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  logo: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 10 },
  breadcrumb: { fontSize: 14, color: '#888', marginBottom: 15, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 5, marginTop: 10, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: '#fff' },
  courseButtons: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  courseButton: { padding: 10, margin: 5, borderRadius: 8, backgroundColor: '#ccc' },
  courseButtonSelected: { backgroundColor: '#2E86DE' },
  courseButtonText: { color: '#fff', fontWeight: '600' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  addButton: { backgroundColor: '#2E86DE', flex: 0.48, padding: 10, borderRadius: 8 },
  refreshButton: { backgroundColor: '#F39C12', flex: 0.48, padding: 10, borderRadius: 8 },
  backButton: { backgroundColor: '#888', flex: 1, padding: 10, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  summary: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10, textAlign: 'center' },
  item: { padding: 8, backgroundColor: '#fff', marginBottom: 5, borderRadius: 8 },
});