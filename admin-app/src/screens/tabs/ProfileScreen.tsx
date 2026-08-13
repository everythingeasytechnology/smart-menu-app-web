import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Platform, Modal } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Store, Users, BarChart3, Star, Settings, ChevronRight, Edit2, ShieldCheck, FileText, IndianRupee, Calendar, LogOut, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { theme } from '../../../constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(logout());
      setLogoutModalVisible(false);
      router.replace('/(auth)/login');
    } catch (e) {
      console.error('Logout Error:', e);
    }
  };

  const menuItems = [
    { 
      id: 1, 
      title: 'Restaurant Profile', 
      subtitle: 'View and update your restaurant details',
      icon: Store, 
      bg: '#EEF2FF', 
      color: '#4F46E5' 
    },
    { 
      id: 2, 
      title: 'Staff Management', 
      subtitle: 'Manage your staff and their permissions',
      icon: Users, 
      bg: '#DCFCE7', 
      color: '#16A34A',
      onPress: () => router.push('/staff')
    },
    { 
      id: 3, 
      title: 'Financial Reports', 
      subtitle: 'View earnings and financial performance',
      icon: BarChart3, 
      bg: '#F3E8FF', 
      color: '#9333EA',
      onPress: () => router.push('/')
    },
  
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header Area */}
      <View style={{ paddingTop: Math.max(insets.top, 20) + 10, paddingHorizontal: 20, paddingBottom: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={{ fontSize: 27, fontWeight: '900', color: '#111827', letterSpacing: -0.5 }}>Profile</Text>
            <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Manage account and settings</Text>
          </View>
          <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, alignItems: 'center', justifyContent: 'center' }}>
            <User size={22} color="#EA580C" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ 
          paddingTop: 10,
          paddingHorizontal: 20,
          paddingBottom: 120
        }}
      >
       
        
        {/* Profile Info Card */}
        <View style={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: 24, 
          padding: 20, 
          flexDirection: 'row', 
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#F1F5F9',
          marginBottom: 24
        }}>
          <View style={{ marginRight: 16 }}>
            <View style={{ width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: '#E5E7EB', overflow: 'hidden' }}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' }} 
                style={{ width: '100%', height: '100%' }} 
              />
            </View>

          </View>
          
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 4 }}>{user?.name || 'User Name'}</Text>
            <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 2 }}>{user?.phone || 'No phone provided'}</Text>
            <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>{user?.email || 'No email provided'}</Text>
            
            <View style={{ alignSelf: 'flex-start', backgroundColor: '#FFF7ED', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
              <ShieldCheck size={14} color="#EA580C" style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#EA580C', textTransform: 'capitalize' }}>{user?.role || 'Verified Account'}</Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 16 }}>Account Overview</Text>

        {/* Menu Options Card */}
        <View style={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: 24, 
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderWidth: 1,
          borderColor: '#F1F5F9',
          marginBottom: 24
        }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity 
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16 }}
                onPress={item.onPress}
              >
                <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: item.bg, alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                  <item.icon size={22} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 2 }}>{item.title}</Text>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
              {index < menuItems.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#F3F4F6', marginLeft: 64 }} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Log Out Card */}
        <TouchableOpacity 
          style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: 24, 
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderWidth: 1,
            borderColor: '#F1F5F9',
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onPress={() => setLogoutModalVisible(true)}
        >
          <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: '#FEF2F2', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
            <LogOut size={22} color="#EF4444" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#EF4444', marginBottom: 2 }}>Log Out</Text>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>Sign out from your account</Text>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.primary + '15', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <LogOut size={32} color={theme.colors.primary} />
            </View>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 8, textAlign: 'center' }}>Log Out?</Text>
            <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>
              Are you sure you want to log out?
            </Text>
            
            <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
              <TouchableOpacity 
                onPress={() => setLogoutModalVisible(false)}
                style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: '#F3F4F6', alignItems: 'center' }}
              >
                <Text style={{ color: '#4B5563', fontSize: 16, fontWeight: '700' }}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleLogout}
                style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: theme.colors.primary, alignItems: 'center' }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
