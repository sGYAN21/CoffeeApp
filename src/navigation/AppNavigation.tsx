import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { CoffeeItem } from '../constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductScreen from '../screens/ProductScreen';
import SignupScreen from '../auth/SignUp/SignUpScreen';
import SignInScreen from '../auth/SignIn/SignInScreen';

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { item: CoffeeItem };
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="signup" component={SignupScreen} />
         <Stack.Screen name="signin" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="ProductDetails" component={ProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: '#EDEDED',
        tabBarStyle: {
          backgroundColor: '#C67C4E',
          height: 64,
          position: 'absolute',
          bottom: 25,
          marginHorizontal: 20,
          borderRadius: 35,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          height: 64,
          paddingBottom: 0,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: string = 'home';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'basket' : 'basket-outline';
          }
          return <Icon name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourite" component={HomeScreen} />
      <Tab.Screen name="Cart" component={HomeScreen} />
    </Tab.Navigator>
  );
}