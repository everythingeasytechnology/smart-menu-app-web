import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = () => {
    router.replace('/login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0803' }}>
      {/* Background Graphic Simulation */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%', backgroundColor: '#2D1F08' }} />
      <View style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: '25%', opacity: 0.2 }}>
        {/* Fake grid lines */}
        <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#FFC107', marginTop: 10 }} />
        <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#FFC107', marginTop: 10 }} />
        <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#FFC107', marginTop: 10 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} bounces={false} showsVerticalScrollIndicator={false}>
          
          <View style={{ alignItems: 'center', paddingTop: Math.max(insets.top + 20, 80), paddingBottom: 40, position: 'relative' }}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={{ position: 'absolute', left: 20, top: Math.max(insets.top + 20, 40), width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#666', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronLeft color="white" />
            </TouchableOpacity>

            <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFF5E1', alignItems: 'center', justifyContent: 'center', marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10 }}>
              <Text style={{ fontSize: 40 }}>🔑</Text>
            </View>

            <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#FFF', marginTop: 20, marginBottom: 5 }}>Reset Password</Text>
            <Text style={{ fontSize: 13, color: '#A0A0A0' }}>Enter your new password below</Text>
          </View>

          {/* White Card */}
          <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 24, paddingTop: 30, paddingBottom: Math.max(insets.bottom + 20, 40) }}>
            
            <Text style={{ color: '#666', fontSize: 13, fontWeight: '600', marginBottom: 8, marginLeft: 4 }}>New Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 16, paddingHorizontal: 16, height: 56, marginBottom: 20 }}>
              <Lock size={20} color="#9CA3AF" />
              <TextInput
                style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#333' }}
                placeholder="********"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={20} color="#9CA3AF" /> : <EyeOff size={20} color="#9CA3AF" />}
              </TouchableOpacity>
            </View>

            <Text style={{ color: '#666', fontSize: 13, fontWeight: '600', marginBottom: 8, marginLeft: 4 }}>Confirm Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 16, paddingHorizontal: 16, height: 56, marginBottom: 30 }}>
              <Lock size={20} color="#9CA3AF" />
              <TextInput
                style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#333' }}
                placeholder="********"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <Eye size={20} color="#9CA3AF" /> : <EyeOff size={20} color="#9CA3AF" />}
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={{ height: 56, backgroundColor: '#FBC02D', borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}
              onPress={handleReset}
            >
              <Text style={{ color: '#222', fontSize: 16, fontWeight: '700' }}>Reset Password</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
