import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getAccounts } from '../services/api';

export default function VirtualCardScreen({ navigation }) {
  const [hasCard, setHasCard] = useState(true);
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('5000');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const response = await getAccounts();
      if (response.success) {
        setAccounts(response.data);
        setSelectedAccount(response.data[0]);
      }
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    const cardData = {
      accountId: selectedAccount?.id,
      hasExistingCard: hasCard,
      cardNumber: hasCard ? cardNumber : null,
      amount: parseFloat(amount)
    };
    navigation.navigate('BasicInfo', { cardData });
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#00B4D8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="px-6 py-4 bg-white">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
              </TouchableOpacity>
              <Text className="text-textPrimary text-xl font-bold">Virtual WIZ Card</Text>
            </View>
          </View>

          <View className="px-6 py-6">
            {/* Pay From Section */}
            <Text className="text-gray-600 text-sm mb-3">Pay From</Text>
            <TouchableOpacity className="bg-white rounded-xl p-4 mb-6 flex-row items-center justify-between border border-gray-200">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-accent/20 items-center justify-center mr-3">
                  <Ionicons name="business" size={20} color="#00B4D8" />
                </View>
                <View className="flex-1">
                  <Text className="text-textPrimary font-bold">{selectedAccount?.accountHolder}</Text>
                  <Text className="text-gray-500 text-xs">Account Number: {selectedAccount?.accountNumber}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Already Have Card Question */}
            <Text className="text-textPrimary text-base mb-3">Do you already have a prepaid card?</Text>
            <View className="flex-row bg-gray-100 rounded-full p-1 mb-6">
              <TouchableOpacity
                onPress={() => setHasCard(true)}
                className={`flex-1 py-3 rounded-full ${hasCard ? 'bg-accent' : 'bg-transparent'}`}
              >
                <Text className={`text-center font-semibold ${hasCard ? 'text-white' : 'text-gray-500'}`}>
                  Yes {hasCard && '✓'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setHasCard(false)}
                className={`flex-1 py-3 rounded-full ${!hasCard ? 'bg-accent' : 'bg-transparent'}`}
              >
                <Text className={`text-center font-semibold ${!hasCard ? 'text-white' : 'text-gray-500'}`}>
                  No
                </Text>
              </TouchableOpacity>
            </View>

            {/* Card Number Input */}
            {hasCard && (
              <View className="mb-6">
                <Text className="text-gray-600 text-sm mb-2">Prepaid Card Number</Text>
                <TextInput
                  className="bg-white rounded-xl border border-gray-200 px-4 py-3 text-textPrimary"
                  placeholder="Enter your card number"
                  placeholderTextColor="#9CA3AF"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                />
              </View>
            )}

            {/* Amount Input */}
            <View className="mb-6">
              <Text className="text-gray-600 text-sm mb-2">Amount</Text>
              <View className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex-row items-center">
                <Text className="text-textPrimary font-bold text-lg mr-2">PKR</Text>
                <TextInput
                  className="flex-1 text-textPrimary font-bold text-lg"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Info Box */}
            <View className="bg-blue-50 rounded-xl p-4 mb-6 flex-row">
              <Ionicons name="information-circle" size={20} color="#00B4D8" />
              <Text className="text-gray-600 text-xs ml-2 flex-1">
                Minimum amount is PKR 1,000 and maximum is PKR 50,000 per transaction.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View className="px-6 py-4 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={handleContinue}
            className="bg-accent rounded-xl py-4"
          >
            <Text className="text-white text-center font-bold text-base">Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
