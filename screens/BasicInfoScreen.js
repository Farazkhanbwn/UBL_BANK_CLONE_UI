import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { submitBasicInfo } from '../services/api';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dates = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 50 }, (_, i) => 2024 - i);

export default function BasicInfoScreen({ navigation, route }) {
  const { cardData } = route.params || {};
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [gender, setGender] = useState('Male');
  const [showCongrats, setShowCongrats] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [selectedDate, setSelectedDate] = useState(18);
  const [selectedYear, setSelectedYear] = useState(2019);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const basicInfo = {
      maritalStatus,
      gender,
      dateOfBirth: `${selectedYear}-${selectedMonth + 1}-${selectedDate}`,
      ...cardData
    };
    
    try {
      const response = await submitBasicInfo(basicInfo);
      if (response.success) {
        setShowCongrats(true);
      }
    } catch (error) {
      console.error('Error submitting info:', error);
    } finally {
      setSubmitting(false);
    }
  };

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
              <Text className="text-textPrimary text-xl font-bold">Basic Information</Text>
            </View>
          </View>

          <View className="px-6 py-6">
            {/* Description */}
            <Text className="text-gray-600 text-sm mb-6 leading-5">
              Confirm or update your name, date of birth and mobile number. Your email 'farazkhanaa2555@gmail.com' will be associated with your debit card.
            </Text>

            {/* Relationship Dropdown */}
            <View className="mb-4">
              <Text className="text-gray-600 text-sm mb-2">Relationship with Cardholder</Text>
              <TouchableOpacity className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex-row justify-between items-center">
                <Text className="text-textPrimary">Self</Text>
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Account Dropdown */}
            <View className="mb-6">
              <Text className="text-gray-600 text-sm mb-2">Account</Text>
              <TouchableOpacity className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex-row justify-between items-center">
                <Text className="text-textPrimary">Sample</Text>
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Marital Status */}
            <Text className="text-textPrimary text-base mb-3">What is your marital status?</Text>
            <View className="flex-row bg-gray-100 rounded-full p-1 mb-6">
              <TouchableOpacity
                onPress={() => setMaritalStatus('Single')}
                className={`flex-1 py-3 rounded-full ${maritalStatus === 'Single' ? 'bg-accent' : 'bg-transparent'}`}
              >
                <Text className={`text-center font-semibold ${maritalStatus === 'Single' ? 'text-white' : 'text-gray-500'}`}>
                  Single {maritalStatus === 'Single' && '✓'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMaritalStatus('Married')}
                className={`flex-1 py-3 rounded-full ${maritalStatus === 'Married' ? 'bg-accent' : 'bg-transparent'}`}
              >
                <Text className={`text-center font-semibold ${maritalStatus === 'Married' ? 'text-white' : 'text-gray-500'}`}>
                  Married
                </Text>
              </TouchableOpacity>
            </View>

            {/* Date of Birth */}
            <Text className="text-textPrimary text-base mb-3">Date of Birth</Text>
            
            {/* Month Picker */}
            <Text className="text-gray-600 text-xs mb-2">Month</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              {months.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  onPress={() => setSelectedMonth(index)}
                  className={`px-6 py-3 rounded-xl mr-2 ${selectedMonth === index ? 'bg-accent' : 'bg-white border border-gray-200'}`}
                >
                  <Text className={`font-semibold ${selectedMonth === index ? 'text-white' : 'text-gray-600'}`}>
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Date Picker */}
            <Text className="text-gray-600 text-xs mb-2">Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              {dates.map((date) => (
                <TouchableOpacity
                  key={date}
                  onPress={() => setSelectedDate(date)}
                  className={`w-12 h-12 rounded-xl mr-2 items-center justify-center ${selectedDate === date ? 'bg-accent' : 'bg-white border border-gray-200'}`}
                >
                  <Text className={`font-semibold ${selectedDate === date ? 'text-white' : 'text-gray-600'}`}>
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Year Picker */}
            <Text className="text-gray-600 text-xs mb-2">Year</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  onPress={() => setSelectedYear(year)}
                  className={`px-6 py-3 rounded-xl mr-2 ${selectedYear === year ? 'bg-accent' : 'bg-white border border-gray-200'}`}
                >
                  <Text className={`font-semibold ${selectedYear === year ? 'text-white' : 'text-gray-600'}`}>
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Gender */}
            <Text className="text-textPrimary text-base mb-3">What is your gender?</Text>
            <View className="flex-row bg-gray-100 rounded-full p-1 mb-6">
              <TouchableOpacity
                onPress={() => setGender('Male')}
                className={`flex-1 py-3 rounded-full ${gender === 'Male' ? 'bg-accent' : 'bg-transparent'}`}
              >
                <Text className={`text-center font-semibold ${gender === 'Male' ? 'text-white' : 'text-gray-500'}`}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender('Female')}
                className={`flex-1 py-3 rounded-full ${gender === 'Female' ? 'bg-accent' : 'bg-transparent'}`}
              >
                <Text className={`text-center font-semibold ${gender === 'Female' ? 'text-white' : 'text-gray-500'}`}>
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Next Button */}
        <View className="px-6 py-4 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={submitting}
            className="bg-accent rounded-xl py-4"
          >
            <Text className="text-white text-center font-bold text-base">{submitting ? 'Submitting...' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Congratulations Modal */}
      <Modal
        visible={showCongrats}
        transparent
        animationType="fade"
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white rounded-3xl p-8 w-full max-w-sm items-center">
            <View className="w-20 h-20 rounded-full bg-success/20 items-center justify-center mb-6">
              <Ionicons name="checkmark-circle" size={60} color="#22C55E" />
            </View>
            <Text className="text-textPrimary text-2xl font-bold mb-4">Congratulations</Text>
            <Text className="text-gray-600 text-center mb-8 leading-6">
              Your request for a new Secondary Debit Card has been received. You will be soon contacted by our representative.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowCongrats(false);
                navigation.navigate('Home');
              }}
              className="bg-accent rounded-xl py-4 w-full"
            >
              <Text className="text-white text-center font-bold text-base">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
