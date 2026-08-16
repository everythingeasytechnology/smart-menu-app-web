import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles, Facebook, Mail, Lock, Eye, EyeOff, UtensilsCrossed } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../constants/theme';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataCenter } from '../../data/data';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState<'email' | 'password' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${dataCenter.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          device_name: 'React Native App'
        })
      });

      const data = await response.json();
console.log(data, 'login data');

      if (data.success) {
        // Store in Redux
        dispatch(setCredentials({
          user: data.data.user,
          business: data.data.business,
          token: data.data.access_token
        }));

        // Store in AsyncStorage
        await AsyncStorage.setItem('@auth_session', JSON.stringify({
          user: data.data.user,
          business: data.data.business,
          token: data.data.access_token
        }));

        // Navigate to Home/Orders based on role
        const role = data.data.user.role?.toLowerCase() || '';
        if (['waiter', 'manager', 'cashier', 'kitchen_staff'].includes(role)) {
          router.replace('/(waiter)/orders');
        } else {
          router.replace('/(tabs)/orders');
        }
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

const debounce = (fn, delay)=>{
  let timer 
  return function (...args){
    clearInterval(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay);
  }
}

const debounceSearch = debounce((email)=>{
console.log('APi fetched for email exixts or not for -  ', email )
setEmail(email)
},1000)


const throttle  = (fn , delay)=>{
  let isThrottle = false 
  return function (...args){
    if(isThrottle) return
      fn(...args)
    isThrottle = true
  
    setTimeout(() => {
      isThrottle = false
    }, delay);
  }
}

const throttledsearch = throttle((email)=>{
  console.log("api fetched for email -  ", email);
  
},500)



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: Math.max(insets.top + 10, 20), paddingBottom: Math.max(insets.bottom + 20, 36) }} showsVerticalScrollIndicator={false}>
          
          {/* Header Logo */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
   
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>Smart Menu</Text>
          </View>

          {/* Illustration Area */}
          <View style={{ alignItems: 'center', marginBottom: 30, height: 160, justifyContent: 'center' }}>
            <Image 
              source={require('../../../assets/images/splash.png')}
              style={{ width: 160, height: 160 }}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <View style={{ alignItems: 'center', marginBottom: 28 }}>
            <Text style={{ fontSize: 34, fontWeight: '800', color: '#111827' }}>Welcome Back</Text>
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
              marginBottom: 16, 
              backgroundColor: '#FFFFFF',
            }}
          >
            <Mail size={24} color="#6B7280" strokeWidth={1.5} style={{ marginRight: 16 }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 2, fontWeight: '500' }}>Email Address</Text>
              <TextInput
                style={{ fontSize: 16, color: '#111827', fontWeight: '600', padding: 0 }}
                placeholder="Enter email address"
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

          {/* Password Input */}
          <View 
            style={{ 
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: activeInput === 'password' ? 2 : 1, 
              borderColor: activeInput === 'password' ? theme.colors.accent : '#E5E7EB', 
              borderRadius: 24, 
              paddingHorizontal: 20, 
              height: 72, 
              marginBottom: 32, 
              backgroundColor: '#FFFFFF',
            }}
          >
            <Lock size={24} color="#6B7280" strokeWidth={1.5} style={{ marginRight: 16 }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 2, fontWeight: '500' }}>Password</Text>
              <TextInput
                style={{ fontSize: 16, color: '#111827', fontWeight: '800', padding: 0, letterSpacing: password.length > 0 ? 3 : 0, transform: [{translateY: 2}] }}
                placeholder="********"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setActiveInput('password')}
                onBlur={() => setActiveInput(null)}
              />
            </View>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
              {showPassword ? <Eye size={24} color="#6B7280" strokeWidth={1.5} /> : <EyeOff size={24} color="#6B7280" strokeWidth={1.5} />}
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity 
            style={{ height: 58, borderRadius: 29, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 24, opacity: isLoading ? 0.7 : 1 }}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={{ color: '#FFF', fontSize: 17, fontWeight: '600' }}>Sign in</Text>
            )}
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity style={{ alignItems: 'center', marginBottom: 24 }} onPress={() => router.push('/forgot-password')}>
            <Text style={{ color: theme.colors.accent, fontSize: 15, fontWeight: '500' }}>Forgot your password?</Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'center', marginBottom: 36 }}>
            <Text style={{ fontSize: 15, color: '#6B7280' }}>
              Don't have an account? <Text style={{ color: theme.colors.accent, fontWeight: '600' }} onPress={() => router.push('/signup')}>Sign up</Text>
            </Text>
          </View>

       

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
