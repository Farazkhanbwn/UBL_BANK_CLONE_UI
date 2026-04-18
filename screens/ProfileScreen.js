import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getUserData } from '../services/api';

const profileSections = [
  {
    title: 'Account',
    items: [
      { id: 1, icon: 'person-outline', label: 'Personal Information', route: 'PersonalInfo' },
      { id: 2, icon: 'lock-closed-outline', label: 'Security & Privacy', route: 'Security' },
      { id: 3, icon: 'notifications-outline', label: 'Notifications', route: 'Notifications' },
    ]
  },
  {
    title: 'Support',
    items: [
      { id: 4, icon: 'help-circle-outline', label: 'Help Center', route: 'Help' },
      { id: 5, icon: 'chatbubble-outline', label: 'Contact Support', route: 'Support' },
      { id: 6, icon: 'document-text-outline', label: 'Terms & Conditions', route: 'Terms' },
    ]
  },
  {
    title: 'Preferences',
    items: [
      { id: 7, icon: 'language-outline', label: 'Language', route: 'Language' },
      { id: 8, icon: 'moon-outline', label: 'Dark Mode', route: 'Theme' },
      { id: 9, icon: 'finger-print-outline', label: 'Biometric Login', route: 'Biometric' },
    ]
  }
];

export default function ProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await getUserData();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#00B4D8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <LinearGradient
          colors={['#1B3A6B', '#00B4D8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-4 pb-20 rounded-b-3xl"
        >
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-2xl font-bold">Profile</Text>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Profile Card */}
        <View className="px-6 -mt-16 mb-6">
          <View className="bg-white rounded-3xl p-6 shadow-lg">
            <View className="items-center">
              <View className="w-24 h-24 rounded-full bg-accent/20 items-center justify-center mb-4">
                <Text className="text-accent text-4xl font-bold">
                  {user?.name?.charAt(0) || 'F'}
                </Text>
              </View>
              <Text className="text-textPrimary text-2xl font-bold mb-1">{user?.name}</Text>
              <Text className="text-gray-500 text-sm mb-1">{user?.email}</Text>
              <Text className="text-gray-500 text-sm mb-4">{user?.phone}</Text>
              
              <TouchableOpacity className="bg-accent/10 rounded-full px-6 py-2">
                <Text className="text-accent font-semibold">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="px-6 mb-6">
            <Text className="text-textPrimary text-base font-bold mb-3">{section.title}</Text>
            <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, index) => (
                <View key={item.id}>
                  <TouchableOpacity className="flex-row items-center px-4 py-4">
                    <View className="w-10 h-10 rounded-full bg-background items-center justify-center mr-3">
                      <Ionicons name={item.icon} size={20} color="#1B3A6B" />
                    </View>
                    <Text className="flex-1 text-textPrimary font-medium">{item.label}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                  {index < section.items.length - 1 && <View className="h-px bg-gray-100 ml-16" />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View className="px-6" style={{ marginBottom: 100 }}>
          <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center justify-center shadow-sm border border-danger/20">
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text className="text-danger font-bold text-base ml-2">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View className="items-center pb-6">
          <Text className="text-gray-400 text-xs">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
