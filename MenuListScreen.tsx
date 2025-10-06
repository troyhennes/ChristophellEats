import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';

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

const initialSelectedItems: MenuItem[] = [
  { id: '1', name: 'Spaghetti Bolognese', price: 77.5, course: 'Main' },
  { id: '2', name: 'Caesar Salad', price: 14, course: 'Starter' },
];

const MenuListScreen: React.FC<Props> = ({ navigate }) => {
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>(initialSelectedItems);

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (id: string) => setSelectedItems(selectedItems.filter(item => item.id !== id));

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/ChristophellEats.png')} style={styles.logo} />
      <Text style={styles.breadcrumb}>Home / Menu List</Text>

      {selectedItems.map(item => (
        <View key={item.id} style={styles.item}>
          <Text>{item.name} - R{item.price.toFixed(2)} ({item.course})</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.summary}>Total Items: {selectedItems.length} | Estimated Total: R{totalPrice.toFixed(2)}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigate('Home')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => navigate('AddMenuItem')}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.displayButton} onPress={() => Alert.alert('Final Menu', `Total Items: ${selectedItems.length}\nTotal Price: $${totalPrice.toFixed(2)}`)}>
        <Text style={styles.buttonText}>Display Final Menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MenuListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  logo: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 10 },
  breadcrumb: { fontSize: 14, color: '#888', marginBottom: 15, textAlign: 'center' },
  item: { padding: 10, backgroundColor: '#fff', marginBottom: 8, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between' },
  deleteText: { color: '#C0392B', fontWeight: '600' },
  summary: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 15, textAlign: 'center' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  backButton: { backgroundColor: '#888', flex: 0.48, padding: 10, borderRadius: 8 },
  addButton: { backgroundColor: '#2E86DE', flex: 0.48, padding: 10, borderRadius: 8 },
  displayButton: { backgroundColor: '#28B463', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});