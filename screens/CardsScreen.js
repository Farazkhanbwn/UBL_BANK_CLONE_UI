import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getCards } from '../services/api';

const cardActions = [
  { id: 1, icon: 'lock-closed', label: 'Block Card', color: '#EF4444' },
  { id: 2, icon: 'refresh', label: 'Replace Card', color: '#F59E0B' },
  { id: 3, icon: 'settings', label: 'Card Limits', color: '#3B82F6' },
  { id: 4, icon: 'document-text', label: 'Statement', color: '#10B981' },
];

export default function CardsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardEnabled, setCardEnabled] = useState(true);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const response = await getCards();
      if (response.success) {
        setCards(response.data);
        setSelectedCard(response.data[0]);
      }
    } catch (error) {
      console.error('Error loading cards:', error);
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
          className="px-6 pt-4 pb-6 rounded-b-3xl"
        >
          <Text className="text-white text-2xl font-bold mb-2">My Cards</Text>
          <Text className="text-white/80 text-sm">Manage your cards</Text>
        </LinearGradient>

        {/* Card Display */}
        <View className="px-6 -mt-8 mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cards.map((card) => (
              <TouchableOpacity
                key={card.id}
                onPress={() => setSelectedCard(card)}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={card.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="w-80 h-48 rounded-3xl p-6 mr-4"
                >
                  <View className="flex-row justify-between items-start mb-4">
                    <Text className="text-white/80 text-sm">{card.type}</Text>
                    <Ionicons name="card" size={24} color="rgba(255,255,255,0.8)" />
                  </View>
                  
                  <Text className="text-white text-xl font-bold mb-8">{card.cardNumber}</Text>
                  
                  <View className="flex-row justify-between items-end mt-auto">
                    <View>
                      <Text className="text-white/80 text-xs">{card.isCredit ? 'Credit Limit' : 'Available Balance'}</Text>
                      <Text className="text-white text-2xl font-bold">{card.currency} {card.balance.toLocaleString()}</Text>
                    </View>
                    <View className="flex-row">
                      <View className="w-8 h-8 rounded-full bg-red-500/80" />
                      <View className="w-8 h-8 rounded-full bg-orange-400/80 -ml-3" />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Card Controls */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row justify-between items-center py-3">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-success/20 items-center justify-center mr-3">
                  <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                </View>
                <View>
                  <Text className="text-textPrimary font-bold">Card Status</Text>
                  <Text className="text-gray-500 text-xs">{cardEnabled ? 'Active' : 'Disabled'}</Text>
                </View>
              </View>
              <Switch
                value={cardEnabled}
                onValueChange={setCardEnabled}
                trackColor={{ false: '#D1D5DB', true: '#00B4D8' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Card Actions */}
        <View className="px-6 mb-6">
          <Text className="text-textPrimary text-lg font-bold mb-4">Card Management</Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            {cardActions.map((action, index) => (
              <View key={action.id}>
                <TouchableOpacity className="flex-row items-center py-4">
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: action.color + '20' }}>
                    <Ionicons name={action.icon} size={20} color={action.color} />
                  </View>
                  <Text className="flex-1 text-textPrimary font-semibold">{action.label}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>
                {index < cardActions.length - 1 && <View className="h-px bg-gray-100" />}
              </View>
            ))}
          </View>
        </View>

        {/* Apply for New Card */}
        <View className="px-6" style={{ marginBottom: 100 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('VirtualCard')}
            className="bg-accent rounded-2xl p-6 flex-row items-center justify-between shadow-sm"
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
                <Ionicons name="add-circle" size={28} color="white" />
              </View>
              <View>
                <Text className="text-white font-bold text-base">Apply for New Card</Text>
                <Text className="text-white/80 text-xs">Get a virtual or physical card</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
