import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getTransactions } from '../services/api';

const paymentCategories = [
  { id: 1, icon: 'flash', label: 'Electricity', color: '#F59E0B' },
  { id: 2, icon: 'water', label: 'Water', color: '#3B82F6' },
  { id: 3, icon: 'wifi', label: 'Internet', color: '#8B5CF6' },
  { id: 4, icon: 'call', label: 'Mobile', color: '#10B981' },
  { id: 5, icon: 'tv', label: 'Cable TV', color: '#EF4444' },
  { id: 6, icon: 'card', label: 'Credit Card', color: '#EC4899' },
];

export default function PaymentsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('bills');
  const [loading, setLoading] = useState(false);
  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    loadRecentPayments();
  }, []);

  const loadRecentPayments = async () => {
    setLoading(true);
    try {
      const response = await getTransactions(3);
      if (response.success) {
        setRecentPayments(response.data.filter(t => t.type === 'debit'));
      }
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <LinearGradient
          colors={['#1B3A6B', '#00B4D8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-4 pb-6 rounded-b-3xl"
        >
          <Text className="text-white text-2xl font-bold mb-2">Payments</Text>
          <Text className="text-white/80 text-sm">Pay bills and transfer money</Text>
        </LinearGradient>

        {/* Tabs */}
        <View className="px-6 mt-6 mb-4">
          <View className="flex-row bg-gray-100 rounded-full p-1">
            <TouchableOpacity
              onPress={() => setActiveTab('bills')}
              className={`flex-1 py-3 rounded-full ${activeTab === 'bills' ? 'bg-accent' : 'bg-transparent'}`}
            >
              <Text className={`text-center font-semibold ${activeTab === 'bills' ? 'text-white' : 'text-gray-500'}`}>
                Bill Payments
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('transfer')}
              className={`flex-1 py-3 rounded-full ${activeTab === 'transfer' ? 'bg-accent' : 'bg-transparent'}`}
            >
              <Text className={`text-center font-semibold ${activeTab === 'transfer' ? 'text-white' : 'text-gray-500'}`}>
                Transfer
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === 'bills' ? (
          <>
            {/* Bill Categories */}
            <View className="px-6 mb-6">
              <Text className="text-textPrimary text-lg font-bold mb-4">Select Category</Text>
              <View className="flex-row flex-wrap justify-between">
                {paymentCategories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    className="bg-white rounded-2xl p-4 items-center w-[30%] mb-4 shadow-sm"
                  >
                    <View className="w-14 h-14 rounded-full items-center justify-center mb-2" style={{ backgroundColor: category.color + '20' }}>
                      <Ionicons name={category.icon} size={28} color={category.color} />
                    </View>
                    <Text className="text-textPrimary text-xs text-center font-medium">{category.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Recent Payments */}
            <View className="px-6" style={{ marginBottom: 100 }}>
              <Text className="text-textPrimary text-lg font-bold mb-4">Recent Payments</Text>
              {loading ? (
                <ActivityIndicator size="small" color="#00B4D8" />
              ) : (
                <View className="bg-white rounded-2xl p-4 shadow-sm">
                  {recentPayments.map((payment, index) => (
                    <View key={payment.id}>
                      <View className="flex-row justify-between items-center py-3">
                        <View className="flex-row items-center flex-1">
                          <View className="w-12 h-12 rounded-full bg-background items-center justify-center mr-3">
                            <Ionicons name={payment.icon} size={20} color="#1B3A6B" />
                          </View>
                          <View className="flex-1">
                            <Text className="text-textPrimary font-semibold">{payment.name}</Text>
                            <Text className="text-gray-500 text-xs">{payment.date}</Text>
                          </View>
                        </View>
                        <Text className="font-bold text-base text-danger">
                          PKR {Math.abs(payment.amount).toLocaleString()}
                        </Text>
                      </View>
                      {index < recentPayments.length - 1 && <View className="h-px bg-gray-100" />}
                    </View>
                  ))}
                </View>
              )}
            </View>
          </>
        ) : (
          <>
            {/* Transfer Form */}
            <View className="px-6" style={{ marginBottom: 100 }}>
              <View className="bg-white rounded-2xl p-6 shadow-sm mb-4">
                <Text className="text-textPrimary text-base font-bold mb-4">Transfer Money</Text>
                
                <Text className="text-gray-600 text-sm mb-2">Account Number / IBAN</Text>
                <TextInput
                  className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 mb-4 text-textPrimary"
                  placeholder="Enter account number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />

                <Text className="text-gray-600 text-sm mb-2">Amount</Text>
                <View className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 mb-4 flex-row items-center">
                  <Text className="text-textPrimary font-bold text-lg mr-2">PKR</Text>
                  <TextInput
                    className="flex-1 text-textPrimary font-bold text-lg"
                    placeholder="0"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                  />
                </View>

                <Text className="text-gray-600 text-sm mb-2">Description (Optional)</Text>
                <TextInput
                  className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 mb-6 text-textPrimary"
                  placeholder="Enter description"
                  placeholderTextColor="#9CA3AF"
                  multiline
                />

                <TouchableOpacity className="bg-accent rounded-xl py-4">
                  <Text className="text-white text-center font-bold text-base">Transfer Now</Text>
                </TouchableOpacity>
              </View>

              {/* Quick Transfer */}
              <Text className="text-textPrimary text-lg font-bold mb-4">Quick Transfer</Text>
              <View className="bg-white rounded-2xl p-4 shadow-sm">
                <TouchableOpacity className="flex-row items-center py-3">
                  <View className="w-12 h-12 rounded-full bg-accent/20 items-center justify-center mr-3">
                    <Ionicons name="person" size={20} color="#00B4D8" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-textPrimary font-semibold">Tania Khan</Text>
                    <Text className="text-gray-500 text-xs">Last transfer: PKR 5,000</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
