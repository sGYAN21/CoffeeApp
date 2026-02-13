import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from "./navigation/AppNavigation"
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SnackbarProvider } from './context/SnackbarContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
        <SnackbarProvider>
          <AppNavigation />
        </SnackbarProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;