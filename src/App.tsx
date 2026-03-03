import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from "./navigation/AppNavigation"
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SnackbarProvider } from './context/SnackbarContext';
import { OrderProvider } from './context/OrderContext';
import CartProvider from './context/CartProvider';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <CartProvider>
          <OrderProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
            <SnackbarProvider>
              <AppNavigation />
            </SnackbarProvider>
          </OrderProvider>
        </CartProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;