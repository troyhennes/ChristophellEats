import React from 'react';
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

const menuData: MenuItem[] = [
  { id: '1', name: 'Spaghetti Bolognese', price: 77.5, course: 'Main' },
  { id: '2', name: 'Chicken Curry', price: 45, course: 'Main' },
  { id: '3', name: 'Beef Burger', price: 35, course: 'Main' },
  { id: '4', name: 'Caesar Salad', price: 14, course: 'Starter' },
];

const MenuScreen: React.FC<Props> = ({ navigate }) => {
  const totalPrice = menuData.reduce((sum, item) => sum + item.price, 0);

  const exitApp = () => Alert.alert('Exit', 'Application closed!');

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/ChristophellEats.png')} style={styles.logo} />
      <Text style={styles.breadcrumb}>Home / Menu</Text>

      {menuData.map(item => (
        <View key={item.id} style={styles.item}>
          <Text>{item.name} - R{item.price.toFixed(2)} ({item.course})</Text>
        </View>
      ))}

      <Text style={styles.summary}>Estimated Total: R{totalPrice.toFixed(2)}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigate('Home')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={exitApp}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  logo: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 10 },
  breadcrumb: { fontSize: 14, color: '#888', marginBottom: 15, textAlign: 'center' },
  item: { padding: 10, backgroundColor: '#fff', marginBottom: 8, borderRadius: 8 },
  summary: { fontSize: 16, fontWeight: '600', color: '#333', marginVertical: 20, textAlign: 'center' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { backgroundColor: '#888', flex: 0.48, padding: 10, borderRadius: 8 },
  exitButton: { backgroundColor: '#C0392B', flex: 0.48, padding: 10, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});