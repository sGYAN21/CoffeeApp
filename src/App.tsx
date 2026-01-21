import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from "./navigation/AppNavigation" // Adjust path based on your folder structure

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
    
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <AppNavigation />
    </SafeAreaProvider>
  );
}

export default App;