import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Animated, ActivityIndicator, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Hotel, Coffee, UtensilsCrossed, Croissant, Cloud, User, Mail, Lock, Eye, EyeOff, Phone, X, CheckCircle2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';
import { dataCenter } from '../../data/data';

const INDUSTRIES = [
  { id: 'hotels', name: 'Hotels', icon: Hotel },
  { id: 'cafe', name: 'Cafe', icon: Coffee },
  { id: 'restaurant', name: 'Restaurant', icon: UtensilsCrossed },
  { id: 'bakery', name: 'Bakery', icon: Croissant },

];

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  
  // Wizard State
  const [step, setStep] = useState(1);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  // Form Data
  const [industry, setIndustry] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [expectedOtp, setExpectedOtp] = useState<string | null>(null);
  const [otpTimer, setOtpTimer] = useState(60);

  // Custom Alert State
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  // Availability Checks
  const [phoneStatus, setPhoneStatus] = useState<'idle' | 'checking' | 'available' | 'exists'>('idle');
  const [phoneMessage, setPhoneMessage] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'checking' | 'available' | 'exists'>('idle');
  const [emailMessage, setEmailMessage] = useState('');

  React.useEffect(() => {
    if (mobile.length === 10) {
      checkPhone(mobile);
    } else {
      setPhoneStatus('idle');
      setPhoneMessage('');
    }
  }, [mobile]);

  const checkPhone = async (phone: string) => {
    setPhoneStatus('checking');
    try {
      const res = await fetch(`${dataCenter.apiUrl.replace('/auth', '')}/auth/check-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      if (data.data?.available) {
        setPhoneStatus('available');
        setPhoneMessage(data.message || 'Phone number is available');
      } else {
        setPhoneStatus('exists');
        setPhoneMessage(data.message || 'Phone number already exists');
      }
    } catch (e) {
      setPhoneStatus('idle');
    }
  };

  React.useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isValidEmail) {
      const timeoutId = setTimeout(() => {
        checkEmail(email);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setEmailStatus('idle');
      setEmailMessage('');
    }
  }, [email]);

  const checkEmail = async (emailToCheck: string) => {
    setEmailStatus('checking');
    try {
      const res = await fetch(`${dataCenter.apiUrl.replace('/auth', '')}/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: emailToCheck })
      });
      const data = await res.json();
      if (data.data?.available) {
        setEmailStatus('available');
        setEmailMessage(data.message || 'Email is available');
      } else {
        setEmailStatus('exists');
        setEmailMessage(data.message || 'Email already exists');
      }
    } catch (e) {
      setEmailStatus('idle');
    }
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 6 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${dataCenter.apiUrl.replace('/auth', '')}/auth/email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success && data.data?.otp) {
        setExpectedOtp(data.data.otp);
        setOtpTimer(60);
        showAlert('Success', 'A new OTP has been sent to your email.');
      } else {
        showAlert('Error', data.message || 'Failed to resend OTP');
      }
    } catch (e) {
      showAlert('Error', 'An error occurred while resending OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (step === 5) {
      setIsLoading(true);
      try {
        const res = await fetch(`${dataCenter.apiUrl.replace('/auth', '')}/auth/email-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        console.log(data);
        
        if (data.success && data.data?.otp) {
          setExpectedOtp(data.data.otp);
          setOtpTimer(60);
          setStep(6);
        } else {
          showAlert('Error', data.message || 'Failed to send OTP');
        }
      } catch (e) {
        showAlert('Error', 'An error occurred while sending OTP');
      } finally {
        setIsLoading(false);
      }
    } else if (step < 6) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (otp !== expectedOtp) {
      showAlert('Error', "Invalid OTP. Please enter the correct code sent to your email.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        name,
        email,
        phone: mobile,
        password,
        password_confirmation: confirmPassword,
        business_name: `${name}'s Business`,
        business_type: industry || 'restaurant'
      };

      const response = await fetch(`${dataCenter.apiUrl.replace('/auth', '')}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (data.success) {
        dispatch(setCredentials({
          user: data.data.user,
          business: data.data.business,
          token: data.data.access_token
        }));

        await AsyncStorage.setItem('@auth_session', JSON.stringify({
          user: data.data.user,
          business: data.data.business,
          token: data.data.access_token
        }));

        router.replace('/(tabs)/orders');
      } else {
        if (data.errors) {
          const firstErrorKey = Object.keys(data.errors)[0];
          const firstErrorMsg = data.errors[firstErrorKey][0];
          showAlert('Registration Failed', firstErrorMsg);
        } else {
          showAlert('Registration Failed', data.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error(error);
      showAlert('Error', 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    if (step === 1) return industry !== null;
    if (step === 2) return name.trim().length > 2;
    if (step === 3) return mobile.length === 10 && phoneStatus === 'available';
    if (step === 4) return emailStatus === 'available';
    if (step === 5) return password.length >= 8 && password === confirmPassword;
    if (step === 6) return otp.length >= 4;
    return false;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: Math.max(insets.top + 10, 20), paddingBottom: Math.max(insets.bottom + 20, 36) }} showsVerticalScrollIndicator={false}>
          
          {/* Header & Back Button */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
            <TouchableOpacity onPress={handleBack} style={{ padding: 8, marginLeft: -8 }}>
              <ChevronLeft size={28} color="#111827" />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <Text style={{ fontSize: 15, fontWeight: '700', color: theme.colors.accent }}>Step {step} of 6</Text>
          </View>

          {/* STEP 1: Industry Type */}
          {step === 1 && (
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', marginBottom: 12 }}>Your Business</Text>
              <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 32 }}>Select the industry that best describes your business.</Text>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {INDUSTRIES.map((item) => {
                  const isSelected = industry === item.id;
                  const IconComponent = item.icon;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => setIndustry(item.id)}
                      style={{
                        width: '48%',
                        height: 120,
                        backgroundColor: isSelected ? theme.colors.accent + '10' : '#F9FAFB',
                        borderWidth: 2,
                        borderColor: isSelected ? theme.colors.accent : '#F3F4F6',
                        borderRadius: 24,
                        padding: 16,
                        marginBottom: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComponent size={32} color={isSelected ? theme.colors.accent : '#9CA3AF'} style={{ marginBottom: 12 }} />
                      <Text style={{ fontSize: 14, fontWeight: '600', color: isSelected ? theme.colors.accent : '#4B5563', textAlign: 'center' }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* STEP 2: Name Input */}
          {step === 2 && (
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', marginBottom: 12 }}>What's your name?</Text>
              <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 32 }}>We'll use this to set up your profile.</Text>

              <View 
                style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: activeInput === 'name' ? 2 : 1, 
                  borderColor: activeInput === 'name' ? theme.colors.accent : '#E5E7EB', 
                  borderRadius: 24, 
                  paddingHorizontal: 20, 
                  height: 72, 
                  marginBottom: 16, 
                  backgroundColor: '#FFFFFF',
                }}
              >
                <User size={24} color="#6B7280" strokeWidth={1.5} style={{ marginRight: 16 }} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 2, fontWeight: '500' }}>Full Name</Text>
                  <TextInput
                    style={{ fontSize: 16, color: '#111827', fontWeight: '600', padding: 0 }}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setActiveInput('name')}
                    onBlur={() => setActiveInput(null)}
                    autoFocus
                  />
                </View>
              </View>
            </View>
          )}

          {/* STEP 3: Mobile Input */}
          {step === 3 && (
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', marginBottom: 12 }}>Your Mobile Number</Text>
              <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 32 }}>We'll use this for account recovery and updates.</Text>

              <View 
                style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: activeInput === 'mobile' ? 2 : 1, 
                  borderColor: activeInput === 'mobile' ? theme.colors.accent : '#E5E7EB', 
                  borderRadius: 24, 
                  paddingHorizontal: 20, 
                  height: 72, 
                  marginBottom: 16, 
                  backgroundColor: '#FFFFFF',
                }}
              >
                <Phone size={24} color="#6B7280" strokeWidth={1.5} style={{ marginRight: 16 }} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 2, fontWeight: '500' }}>Mobile Number</Text>
                  <TextInput
                    style={{ fontSize: 16, color: '#111827', fontWeight: '600', padding: 0 }}
                    placeholder="Enter mobile number"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={mobile}
                    onChangeText={(val) => setMobile(val.replace(/[^0-9]/g, ''))}
                    onFocus={() => setActiveInput('mobile')}
                    onBlur={() => setActiveInput(null)}
                    autoFocus
                  />
                </View>
              </View>
              {phoneStatus === 'checking' && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
                  <ActivityIndicator size="small" color="#6B7280" />
                  <Text style={{ marginLeft: 8, color: '#6B7280', fontSize: 13 }}>Checking availability...</Text>
                </View>
              )}
              {phoneStatus === 'available' && (
                <Text style={{ marginLeft: 16, color: '#10B981', fontSize: 13, fontWeight: '500' }}>{phoneMessage}</Text>
              )}
              {phoneStatus === 'exists' && (
                <Text style={{ marginLeft: 16, color: '#EF4444', fontSize: 13, fontWeight: '500' }}>{phoneMessage}</Text>
              )}
            </View>
          )}

          {/* STEP 4: Email Input */}
          {step === 4 && (
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', marginBottom: 12 }}>Your Email Address</Text>
              <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 32 }}>We'll send an OTP to verify your account.</Text>

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
                    autoFocus
                  />
                </View>
              </View>
              {emailStatus === 'checking' && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
                  <ActivityIndicator size="small" color="#6B7280" />
                  <Text style={{ marginLeft: 8, color: '#6B7280', fontSize: 13 }}>Checking availability...</Text>
                </View>
              )}
              {emailStatus === 'available' && (
                <Text style={{ marginLeft: 16, color: '#10B981', fontSize: 13, fontWeight: '500' }}>{emailMessage}</Text>
              )}
              {emailStatus === 'exists' && (
                <Text style={{ marginLeft: 16, color: '#EF4444', fontSize: 13, fontWeight: '500' }}>{emailMessage}</Text>
              )}
            </View>
          )}

          {/* STEP 5: Password */}
          {step === 5 && (
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', marginBottom: 12 }}>Secure your account</Text>
              <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 32 }}>Create a strong password for your admin account.</Text>

              {/* Password */}
              <View 
                style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: activeInput === 'password' ? 2 : 1, 
                  borderColor: activeInput === 'password' ? theme.colors.accent : '#E5E7EB', 
                  borderRadius: 24, 
                  paddingHorizontal: 20, 
                  height: 72, 
                  marginBottom: 16, 
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
                    autoFocus
                  />
                </View>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
                  {showPassword ? <Eye size={24} color="#6B7280" strokeWidth={1.5} /> : <EyeOff size={24} color="#6B7280" strokeWidth={1.5} />}
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <View 
                style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: activeInput === 'confirmPassword' ? 2 : 1, 
                  borderColor: activeInput === 'confirmPassword' ? theme.colors.accent : '#E5E7EB', 
                  borderRadius: 24, 
                  paddingHorizontal: 20, 
                  height: 72, 
                  marginBottom: 32, 
                  backgroundColor: '#FFFFFF',
                }}
              >
                <Lock size={24} color="#6B7280" strokeWidth={1.5} style={{ marginRight: 16 }} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 2, fontWeight: '500' }}>Confirm Password</Text>
                  <TextInput
                    style={{ fontSize: 16, color: '#111827', fontWeight: '800', padding: 0, letterSpacing: confirmPassword.length > 0 ? 3 : 0, transform: [{translateY: 2}] }}
                    placeholder="********"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setActiveInput('confirmPassword')}
                    onBlur={() => setActiveInput(null)}
                  />
                </View>
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ padding: 4 }}>
                  {showConfirmPassword ? <Eye size={24} color="#6B7280" strokeWidth={1.5} /> : <EyeOff size={24} color="#6B7280" strokeWidth={1.5} />}
                </TouchableOpacity>
              </View>

              <Text style={{ fontSize: 13, color: password.length > 0 && password.length < 8 ? '#EF4444' : '#6B7280', marginTop: -16, marginBottom: 8, marginLeft: 16 }}>
                * Password must be at least 8 characters long.
              </Text>
              
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <Text style={{ fontSize: 13, color: '#EF4444', marginBottom: 32, marginLeft: 16 }}>
                  * Passwords do not match.
                </Text>
              )}
            </View>
          )}

          {/* STEP 6: OTP */}
          {step === 6 && (
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', marginBottom: 12 }}>Verify your email</Text>
              <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 32 }}>Enter the 4-digit code sent to {email || 'your email'}.</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 32, position: 'relative' }}>
                {/* Visual OTP Simulation */}
                {[0, 1, 2, 3].map((index) => (
                  <View 
                    key={index}
                    style={{ 
                      width: 64, 
                      height: 72, 
                      borderRadius: 16, 
                      borderWidth: otp.length === index ? 2 : 1, 
                      borderColor: otp.length === index ? theme.colors.accent : '#E5E7EB',
                      backgroundColor: '#FFFFFF',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={{ fontSize: 28, fontWeight: '700', color: '#111827' }}>
                      {otp[index] || ''}
                    </Text>
                  </View>
                ))}
                
                {/* Invisible actual input for easy typing */}
                <TextInput
                  style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', zIndex: 10 }}
                  value={otp}
                  onChangeText={(val) => setOtp(val.replace(/[^0-9]/g, '').substring(0, 4))}
                  keyboardType="number-pad"
                  autoFocus
                  maxLength={4}
                />
              </View>

              <View style={{ alignItems: 'center' }}>
                {otpTimer > 0 ? (
                  <Text style={{ fontSize: 14, color: '#6B7280', fontWeight: '500' }}>
                    Resend code in <Text style={{ color: theme.colors.accent, fontWeight: '700' }}>{otpTimer}s</Text>
                  </Text>
                ) : (
                  <TouchableOpacity onPress={handleResendOtp} disabled={isLoading}>
                    <Text style={{ fontSize: 15, color: theme.colors.accent, fontWeight: '700' }}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          <View style={{ flex: 1 }} />

          <TouchableOpacity 
            style={{ 
              height: 58, 
              borderRadius: 29, 
              backgroundColor: isStepValid() ? theme.colors.accent : '#E5E7EB', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: 24,
              opacity: isStepValid() ? (isLoading ? 0.7 : 1) : 0.7,
              flexDirection: 'row'
            }}
            onPress={step === 6 ? handleSubmit : handleNext}
            disabled={!isStepValid() || isLoading}
          >
            {isLoading && <ActivityIndicator color="#FFFFFF" style={{ marginRight: 8 }} />}
            <Text style={{ color: isStepValid() ? '#FFF' : '#9CA3AF', fontSize: 17, fontWeight: '600' }}>
              {step === 6 ? 'Verify & Create Account' : 'Continue'}
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Custom Alert Modal */}
      <Modal transparent visible={alertVisible} animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.accent + '15', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              {alertTitle.toLowerCase().includes('error') || alertTitle.toLowerCase().includes('failed') ? (
                <X size={32} color={theme.colors.accent} strokeWidth={2.5} />
              ) : (
                <CheckCircle2 size={32} color={theme.colors.accent} strokeWidth={2.5} />
              )}
            </View>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 8, textAlign: 'center' }}>
              {alertTitle}
            </Text>
            <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>
              {alertMessage}
            </Text>
            <TouchableOpacity 
              onPress={() => setAlertVisible(false)}
              style={{ width: '100%', height: 50, backgroundColor: theme.colors.accent, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
