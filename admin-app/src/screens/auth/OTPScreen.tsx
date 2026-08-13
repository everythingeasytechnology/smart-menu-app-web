import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../../../constants/theme';
import { ChevronLeft } from 'lucide-react-native';

export default function OTPScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleVerify = () => {
    // For now, assume successful verification goes to login or reset-password
    router.replace('/login');
  };

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full border border-gray-600 items-center justify-center mb-8">
            <ChevronLeft color="white" />
          </TouchableOpacity>

          {/* Placeholder for 3D graphic */}
          <View className="items-center mb-10 h-40 justify-center">
            <Text className="text-white text-6xl">📱</Text>
          </View>

          {/* Form Card */}
          <View className="bg-white rounded-3xl p-6 shadow-lg pb-10">
            
            <View className="items-center mb-6">
              <Text className="text-2xl font-bold text-gray-800 mb-2">Verify Code</Text>
              <Text className="text-gray-500 text-center">We've sent a code to your mobile number</Text>
            </View>

            <Text className="text-gray-600 mb-4 text-center font-semibold">Enter 4-digit code</Text>
            
            <View className="flex-row justify-center space-x-4 mb-6 gap-3">
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => inputs.current[index] = ref}
                  className="w-16 h-16 bg-gray-100 rounded-2xl text-center text-2xl font-bold border border-gray-200"
                  keyboardType="number-pad"
                  maxLength={1}
                  value={code[index]}
                  onChangeText={(text) => handleChange(text, index)}
                />
              ))}
            </View>

            <Text className="text-center text-gray-400 mb-8">Resend code in <Text className="font-bold text-gray-700">00:58</Text></Text>

            <TouchableOpacity 
              className="py-4 rounded-xl items-center"
              style={{ backgroundColor: theme.colors.primary }}
              onPress={handleVerify}
            >
              <Text className="text-white font-bold text-lg">Verify & Continue</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
