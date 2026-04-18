import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import CardsScreen from './screens/CardsScreen';
import ProfileScreen from './screens/ProfileScreen';
import VirtualCardScreen from './screens/VirtualCardScreen';
import BasicInfoScreen from './screens/BasicInfoScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Payments') iconName = focused ? 'card' : 'card-outline';
          else if (route.name === 'Cards') iconName = focused ? 'wallet' : 'wallet-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00B4D8',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
      <Tab.Screen name="Cards" component={CardsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="VirtualCard" component={VirtualCardScreen} />
          <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
