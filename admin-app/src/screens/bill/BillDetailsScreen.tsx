import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../../constants/theme';

export default function BillDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const handlePayment = () => {
    // Mark as paid and go back
    router.back();
  };

  return (
    <View className="flex-1 bg-white pt-10 px-4 pb-10">
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-2xl font-bold text-gray-800">Bill #{id}</Text>
        <TouchableOpacity onPress={() => router.back()} className="px-3 py-1 bg-gray-100 rounded-lg">
          <Text className="text-gray-600 font-semibold">Close</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-full bg-green-100 items-center justify-center mb-4">
            <Text className="text-3xl">🧾</Text>
          </View>
          <Text className="text-gray-500 mb-1">Total to Pay</Text>
          <Text className="text-4xl font-bold text-gray-800">₹2100</Text>
        </View>

        <View className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-8">
          <View className="flex-row justify-between py-2 border-b border-gray-200 border-dashed">
            <Text className="text-gray-600">3x Sushi Roll</Text>
            <Text className="font-semibold text-gray-800">₹2100</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-gray-200 border-dashed mt-2">
            <Text className="text-gray-600">Subtotal</Text>
            <Text className="font-semibold text-gray-800">₹2100</Text>
          </View>
          <View className="flex-row justify-between py-2 mt-2">
            <Text className="text-gray-600">Tax</Text>
            <Text className="font-semibold text-gray-800">₹0</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={{ backgroundColor: theme.colors.accent }}
        className="py-4 rounded-2xl items-center shadow-sm"
        onPress={handlePayment}
      >
        <Text className="text-white font-bold text-lg">Mark Payment as Done</Text>
      </TouchableOpacity>
    </View>
  );
}
