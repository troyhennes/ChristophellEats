import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

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

const menuData: MenuItem[] = [
  { id: '1', name: 'Spaghetti Bolognese', price: 12.5, course: 'Main' },
  { id: '2', name: 'Chicken Curry', price: 10, course: 'Main' },
  { id: '3', name: 'Beef Burger', price: 9.5, course: 'Main' },
  { id: '4', name: 'Caesar Salad', price: 8, course: 'Starter' },
];

const HomeScreen: React.FC<Props> = ({ navigate }) => {
  const totalItems = menuData.length;
  const averagePrice = menuData.reduce((sum, item) => sum + item.price, 0) / totalItems;

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/ChristophellEats.png')} style={styles.logo} />
      <Text style={styles.breadcrumb}>Home / Menu</Text>
      <Text style={styles.summary}>Total Items: {totalItems} | Average Price: R{averagePrice.toFixed(2)}</Text>

      {menuData.map(item => (
        <View key={item.id} style={styles.menuItem}>
          <Text>{item.name} - R{item.price.toFixed(2)} ({item.course})</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => navigate('AddMenuItem')}>
        <Text style={styles.buttonText}>Add New Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#28B463' }]} onPress={() => navigate('MenuList')}>
        <Text style={styles.buttonText}>View Menu List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#8E44AD' }]} onPress={() => navigate('Menu')}>
        <Text style={styles.buttonText}>View Menu (Client)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  logo: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 15 },
  breadcrumb: { fontSize: 14, color: '#888', marginBottom: 10, textAlign: 'center' },
  summary: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 15, textAlign: 'center' },
  menuItem: { padding: 10, backgroundColor: '#fff', marginBottom: 5, borderRadius: 8 },
  button: { backgroundColor: '#2E86DE', padding: 15, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});