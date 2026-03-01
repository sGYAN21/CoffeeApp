import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import { Item, theme } from '../constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductScreen from '../screens/Product/ProductScreen';
import SignupScreen from '../auth/SignUp/SignUpScreen';
import SignInScreen from '../auth/SignIn/SignInScreen';
import ForgetPassword from '../auth/ForgetPassword/ForgetPassword';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { View } from 'react-native';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import FavouriteScreen from '../screens/Favourite/FavouriteScreen';
import CartScreen from '../screens/Cart/CartScreen';
import GetStartedScreen from '../screens/GetStarted/GetStartedScreen';
import PlaceOrderScreen from '../screens/PlaceOrder/PlaceOrderScreen';


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
         <Stack.Screen name="getstarted" component={GetStartedScreen} />
         <Stack.Screen name="forgetpassword" component={ForgetPassword} />
         {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="MainTabs" component={HomeTabs} />
        <Stack.Screen name="ProductDetails" component={ProductScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
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
          backgroundColor: theme.secondary,
          height: 55,
          position: 'absolute',
          bottom: 20,
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
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
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