import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Sparkles, KeyRound } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../constants/theme';
import { dataCenter } from '../../data/data';

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${dataCenter.apiUrl}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      
      if (data.success) {
        Alert.alert(
          'Email Sent', 
          data.message || 'Password reset link sent to your email.',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      } else {
        Alert.alert('Error', data.message || 'Failed to send reset link.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: Math.max(insets.top + 10, 20), paddingBottom: Math.max(insets.bottom + 20, 36) }} showsVerticalScrollIndicator={false}>
          
          {/* Header Logo */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <Sparkles size={24} color="#000" fill="#000" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>Food Menu</Text>
          </View>

          {/* Illustration Area */}
          <View style={{ alignItems: 'center', marginBottom: 30, height: 160, justifyContent: 'center' }}>
            <View style={{ width: 120, height: 120, backgroundColor: theme.colors.accent + '15', borderRadius: 60, justifyContent: 'center', alignItems: 'center' }}>
              <KeyRound size={60} color={theme.colors.accent} strokeWidth={1.5} />
            </View>
          </View>

          {/* Welcome Text */}
          <View style={{ alignItems: 'center', marginBottom: 28 }}>
            <Text style={{ fontSize: 34, fontWeight: '800', color: '#111827', marginBottom: 12 }}>Forgot Password</Text>
            <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center' }}>
              Enter your email address to receive a password reset code.
            </Text>
          </View>

          {/* Email Input */}
          <View 
            style={{ 
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: activeInput === 'email' ? 2 : 1, 
              borderColor: activeInput === 'email' ? theme.colors.accent : '#E5E7EB', 
              borderRadius: 24, 
              paddingHorizontal: 20, 
              height: 72, 
              marginBottom: 32, 
              backgroundColor: '#FFFFFF',
            }}
          >
            <Mail size={24} color="#6B7280" strokeWidth={1.5} style={{ marginRight: 16 }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 2, fontWeight: '500' }}>Email Address</Text>
              <TextInput
                style={{ fontSize: 16, color: '#111827', fontWeight: '600', padding: 0 }}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setActiveInput('email')}
                onBlur={() => setActiveInput(null)}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity 
            style={{ height: 58, borderRadius: 29, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}
            onPress={handleNext}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={{ color: '#FFF', fontSize: 17, fontWeight: '600' }}>Send Reset Code</Text>
            )}
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity style={{ alignItems: 'center', marginBottom: 36 }} onPress={() => router.back()}>
            <Text style={{ color: '#6B7280', fontSize: 15, fontWeight: '500' }}>
              Remember your password? <Text style={{ color: theme.colors.accent, fontWeight: '600' }}>Log In</Text>
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
