import React from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';

// Define ScreenType locally
type ScreenType = 'Welcome' | 'Home' | 'AddMenuItem' | 'MenuList' | 'Menu';

interface Props {
  navigate: (screen: ScreenType) => void;
}

const WelcomeScreen: React.FC<Props> = ({ navigate }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/ChristophellEats.png')} style={styles.logo} />
      <Text style={styles.breadcrumb}>Home / Welcome</Text>
      <Text style={styles.welcomeText}>Welcome to Christophell Eats</Text>

      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={() => navigate('Home')} />
        <Button title="Exit" onPress={() => Alert.alert('Exit', 'Application closed!')} />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 140, height: 140, borderRadius: 70, marginBottom: 25 },
  breadcrumb: { fontSize: 16, color: '#888', marginBottom: 8 },
  welcomeText: { fontSize: 20, fontWeight: '600', marginBottom: 40, textAlign: 'center' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: 200 },
});