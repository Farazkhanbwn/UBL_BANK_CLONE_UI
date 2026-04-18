import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getUserData, getCards, getTransactions, getQuickActions } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [quickActions, setQuickActions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [userRes, cardsRes, transactionsRes, actionsRes] = await Promise.all([
        getUserData(),
        getCards(),
        getTransactions(),
        getQuickActions()
      ]);

      if (userRes.success) setUser(userRes.data);
      if (cardsRes.success) setCards(cardsRes.data);
      if (transactionsRes.success) setTransactions(transactionsRes.data);
      if (actionsRes.success) setQuickActions(actionsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
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
          className="px-6 pt-4 pb-8 rounded-b-3xl"
        >
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-2xl font-bold">{user?.greeting}, {user?.name} 👋</Text>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Balance Card */}
        <View className="px-6 -mt-16 mb-6">
          <LinearGradient
            colors={['#7B2FF7', '#F107A3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-3xl p-6 shadow-lg"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <Text className="text-white/80 text-sm mb-2">Available Balance</Text>
                <Text className="text-white text-4xl font-bold">
                  {cards[0]?.currency} {cards[0]?.balance.toLocaleString()}
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Cards')}
                className="bg-white/20 rounded-full p-3"
              >
                <Ionicons name="wallet" size={24} color="white" />
              </TouchableOpacity>
            </View>
            
            <View className="flex-row items-center mt-4">
              <View className="flex-row items-center mr-4">
                <Ionicons name="card" size={16} color="rgba(255,255,255,0.8)" />
                <Text className="text-white/80 text-xs ml-1">{cards[0]?.type}</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="eye-off" size={16} color="rgba(255,255,255,0.8)" />
                <Text className="text-white/80 text-xs ml-1">{cards[0]?.cardNumber}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                className="bg-white rounded-2xl p-4 items-center w-[22%] shadow-sm"
                onPress={() => {
                  if (action.route === 'VirtualCard') {
                    navigation.navigate('VirtualCard');
                  }
                }}
              >
                <View className="w-12 h-12 rounded-full items-center justify-center mb-2" style={{ backgroundColor: action.color + '20' }}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text className="text-textPrimary text-xs text-center font-medium">{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="px-6" style={{ marginBottom: 100 }}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-textPrimary text-lg font-bold">Recent Transactions</Text>
            <TouchableOpacity>
              <Text className="text-accent font-semibold">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl p-4 shadow-sm">
            {transactions.map((transaction, index) => (
              <View key={transaction.id}>
                <View className="flex-row justify-between items-center py-3">
                  <View className="flex-row items-center flex-1">
                    <View className="w-12 h-12 rounded-full bg-background items-center justify-center mr-3">
                      <Ionicons name={transaction.icon} size={20} color="#1B3A6B" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-textPrimary font-semibold">{transaction.name}</Text>
                      <Text className="text-gray-500 text-xs">{transaction.date}</Text>
                    </View>
                  </View>
                  <Text className={`font-bold text-base ${transaction.type === 'credit' ? 'text-success' : 'text-danger'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.currency || 'PKR'} {Math.abs(transaction.amount).toLocaleString()}
                  </Text>
                </View>
                {index < transactions.length - 1 && <View className="h-px bg-gray-100" />}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
