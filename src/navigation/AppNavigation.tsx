import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { Item } from '../constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductScreen from '../screens/ProductScreen';
import SignupScreen from '../auth/SignUp/SignUpScreen';
import SignInScreen from '../auth/SignIn/SignInScreen';
import ForgetPassword from '../auth/ForgetPassword/ForgetPassword';
import ProfileScreen from '../screens/ProfileScreen';
import Favourite from '../screens/Favourite';
import Cart from '../screens/Cart';
import { View } from 'react-native';
import SplashScreen from '../screens/SplashScreen';


export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { item: Item };
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default function AppNavigation() {
  return (
    <View style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
           <Stack.Screen name="splashScreen" component={SplashScreen} />
         <Stack.Screen name="signin" component={SignInScreen} />
         <Stack.Screen name="signup" component={SignupScreen} />
         <Stack.Screen name="forgetpassword" component={ForgetPassword} />
         {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="MainTabs" component={HomeTabs} />
        <Stack.Screen name="ProductDetails" component={ProductScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
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
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}