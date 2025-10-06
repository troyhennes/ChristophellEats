import React, { useState } from 'react';
import { View } from 'react-native';
import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import AddMenuItemScreen from './AddMenuItemScreen';
import MenuListScreen from './MenuListScreen';
import MenuScreen from './MenuScreen';

export type ScreenType =
  | 'Welcome'
  | 'Home'
  | 'AddMenuItem'
  | 'MenuList'
  | 'Menu';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('Welcome');

  const navigate = (screen: ScreenType) => setCurrentScreen(screen);

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'Welcome' && <WelcomeScreen navigate={navigate} />}
      {currentScreen === 'Home' && <HomeScreen navigate={navigate} />}
      {currentScreen === 'AddMenuItem' && <AddMenuItemScreen navigate={navigate} />}
      {currentScreen === 'MenuList' && <MenuListScreen navigate={navigate} />}
      {currentScreen === 'Menu' && <MenuScreen navigate={navigate} />}
    </View>
  );
};

export default App;
