import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Plus, Users, X, Edit2, Trash2, ChevronLeft, ChevronDown, Eye, EyeOff, Search, User, Briefcase, CheckCircle2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { dataCenter } from '../../data/data';

type Staff = {
  id: number;
  business_id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
};

export default function StaffManagementScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editStaffId, setEditStaffId] = useState<number | null>(null);

  // Custom Alert State
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('waiter');
  const [roleModalVisible, setRoleModalVisible] = useState(false);

  const fetchStaff = async (showLoader = false) => {
    if (showLoader) setIsLoading(true);
    try {
      const response = await fetch(`${dataCenter.apiUrl.replace('/auth', '')}/staff`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setStaffList(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    } finally {
      if (showLoader) setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStaff(true);
    }, [token])
  );

  const filteredStaffList = useMemo(() => {
    return staffList.filter(item => {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.phone.includes(query)
      );
    });
  }, [staffList, searchQuery]);

  const openAddModal = () => {
    setEditStaffId(null);
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setRole('waiter');
    setModalVisible(true);
  };

  const openEditModal = (staff: Staff) => {
    setEditStaffId(staff.id);
    setName(staff.name);
    setEmail(staff.email);
    setPhone(staff.phone);
    setPassword(''); // leave empty to not change
    setRole(staff.role);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    const trimmedPassword = password.trim();
    if (!name.trim() || !email.trim() || !phone.trim() || !role.trim()) {
      showAlert('Error', 'Name, email, phone, and role are required');
      return;
    }

    if (!editStaffId && (!trimmedPassword || trimmedPassword.length < 8)) {
      showAlert('Error', 'Password must be at least 8 characters long');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const url = editStaffId 
        ? `${dataCenter.apiUrl.replace('/auth', '')}/staff/${editStaffId}` 
        : `${dataCenter.apiUrl.replace('/auth', '')}/staff`;
        
      const method = editStaffId ? 'PUT' : 'POST';
      
      const bodyData: any = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: role.trim(),
        status: 'active',
      };
      
      if (trimmedPassword) {
        bodyData.password = trimmedPassword;
        bodyData.password_confirmation = trimmedPassword;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      });
      
      const data = await response.json();
      
      if (data.success || response.ok) {
        setModalVisible(false);
        fetchStaff(false);
        showAlert('Success', `Staff member ${editStaffId ? 'updated' : 'added'} successfully!`);
      } else {
        let errorMessage = data.message || `Failed to ${editStaffId ? 'update' : 'add'} staff member`;
        if (data.errors) {
          const firstErrorKey = Object.keys(data.errors)[0];
          if (firstErrorKey && data.errors[firstErrorKey].length > 0) {
            errorMessage = data.errors[firstErrorKey][0];
          }
        }
        showAlert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Add staff error:', error);
      showAlert('Error', 'An unexpected error occurred while saving staff details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStaffCard = ({ item }: { item: Staff }) => {
    const isManager = item.role.toLowerCase() === 'manager';
    const isInactive = item.status.toLowerCase() === 'inactive';
    
    return (
      <View style={{ 
        backgroundColor: '#FFFFFF', 
        borderRadius: 16, 
        padding: 16, 
        marginBottom: 16, 
        flexDirection: 'row', 
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
      }}>
        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: isManager ? '#FFF5F0' : '#F0FDF4', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
          <User size={32} color={isManager ? '#EA580C' : '#16A34A'} />
        </View>
        
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 2 }}>{item.name}</Text>
          <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>{item.email}</Text>
          <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>{item.phone}</Text>
          
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ backgroundColor: '#F3F4F6', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
               <Briefcase size={12} color="#4B5563" style={{ marginRight: 4 }} />
               <Text style={{ fontSize: 11, fontWeight: '700', color: '#4B5563', textTransform: 'capitalize' }}>{item.role}</Text>
            </View>
            <View style={{ backgroundColor: isInactive ? '#FEF2F2' : '#F0FDF4', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
               <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: isInactive ? '#EF4444' : '#16A34A', marginRight: 4 }} />
               <Text style={{ fontSize: 11, fontWeight: '700', color: isInactive ? '#EF4444' : '#16A34A', textTransform: 'capitalize' }}>{item.status}</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity onPress={() => openEditModal(item)} style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center' }}>
            <Edit2 size={18} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#FEF2F2', alignItems: 'center', justifyContent: 'center' }}>
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      
      {/* Header */}
      <View style={{ 
        paddingTop: Math.max(insets.top, 20) + 10, 
        paddingHorizontal: 20, 
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <ChevronLeft color="#111827" size={26} />
          </TouchableOpacity>
          <Text style={{ fontSize: 21, fontWeight: '800', color: '#111827' }}>Staff Management</Text>
        </View>
      
      </View>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16, backgroundColor: '#FFFFFF' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#F1F5F9', borderRadius: 16, paddingHorizontal: 16, height: 50 }}>
          <Search size={20} color="#9CA3AF" />
          <TextInput 
            style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#111827' }}
            placeholder="Search staff by name, role or contact..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* List */}
      <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
        {isLoading ? (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={{ marginTop: 12, color: '#6B7280', fontWeight: '500' }}>Loading staff members...</Text>
          </View>
        ) : filteredStaffList.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 80, height: 80, backgroundColor: '#F3F4F6', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Users size={40} color="#9CA3AF" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 8 }}>
              {searchQuery ? 'No Results Found' : 'No Staff Added'}
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              {searchQuery ? 'Try adjusting your search query.' : "You haven't added any staff members yet."}
            </Text>
          </View>
        ) : (
          <FlatList 
            data={filteredStaffList}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ padding: 20, paddingBottom: 120, paddingTop:10 }}
            showsVerticalScrollIndicator={false}
            renderItem={renderStaffCard}
          />
        )}
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity 
        onPress={openAddModal}
        style={{ 
          position: 'absolute', 
          bottom: Math.max(insets.bottom, 20) + 20, 
          right: 20, 
          width: 60, 
          height: 60, 
          backgroundColor: theme.colors.primary, 
          borderRadius: 30, 
          alignItems: 'center', 
          justifyContent: 'center', 
          shadowColor: '#EA580C', 
          shadowOffset: { width: 0, height: 8 }, 
          shadowOpacity: 0.3, 
          shadowRadius: 16, 
          elevation: 10 
        }}
      >
        <Plus size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add Staff Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}
        >
          <View style={{ backgroundColor: '#FFFFFF', width: '100%', borderRadius: 32, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 }}>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827' }}>
                {editStaffId ? 'Edit Staff' : 'Add New Staff'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ width: 32, height: 32, backgroundColor: '#F3F4F6', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 13, fontWeight: '700', textTransform: 'uppercase', color: '#6B7280', marginBottom: 8, marginLeft: 4 }}>Full Name</Text>
            <TextInput 
              style={{ backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, paddingHorizontal: 16, height: 56, fontSize: 16, color: '#111827', marginBottom: 16, fontWeight: '500' }}
              placeholder="e.g. John Doe"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />

            <Text style={{ fontSize: 13, fontWeight: '700', textTransform: 'uppercase', color: '#6B7280', marginBottom: 8, marginLeft: 4 }}>Email</Text>
            <TextInput 
              style={{ backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, paddingHorizontal: 16, height: 56, fontSize: 16, color: '#111827', fontWeight: '500', marginBottom: 16 }}
              placeholder="john@email.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', textTransform: 'uppercase', color: '#6B7280', marginBottom: 8, marginLeft: 4 }}>Phone</Text>
                <TextInput 
                  style={{ backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, paddingHorizontal: 16, height: 56, fontSize: 16, color: '#111827', fontWeight: '500' }}
                  placeholder="9999999999"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', textTransform: 'uppercase', color: '#6B7280', marginBottom: 8, marginLeft: 4 }}>Role</Text>
                <TouchableOpacity 
                  onPress={() => setRoleModalVisible(true)}
                  style={{ backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, paddingHorizontal: 16, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '500', color: '#111827', textTransform: 'capitalize' }}>{role.replace('_', ' ')}</Text>
                  <ChevronDown size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={{ fontSize: 13, fontWeight: '700', textTransform: 'uppercase', color: '#6B7280', marginBottom: 8, marginLeft: 4 }}>
              {editStaffId ? 'New Password (Optional)' : 'Password'}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, paddingHorizontal: 16, height: 56, marginBottom: 24 }}>
              <TextInput 
                style={{ flex: 1, fontSize: 16, color: '#111827', fontWeight: '500' }}
                placeholder={editStaffId ? "Leave empty to keep current" : "Min 8 chars"}
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
                {showPassword ? <EyeOff size={20} color="#6B7280" /> : <Eye size={20} color="#6B7280" />}
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                disabled={isSubmitting}
                style={{ flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 16, borderRadius: 20, alignItems: 'center', opacity: isSubmitting ? 0.5 : 1 }}
              >
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#4B5563' }}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={{ flex: 1, backgroundColor: theme.colors.primary, paddingVertical: 16, borderRadius: 20, alignItems: 'center', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>{editStaffId ? 'Update Staff' : 'Add Staff'}</Text>
                )}
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Role Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={roleModalVisible}
        onRequestClose={() => setRoleModalVisible(false)}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => setRoleModalVisible(false)}
          style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ backgroundColor: '#FFFFFF', width: '100%', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 20 }}>
            
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>Select Role</Text>
              <TouchableOpacity onPress={() => setRoleModalVisible(false)} style={{ width: 32, height: 32, backgroundColor: '#F3F4F6', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} color="#4B5563" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              onPress={() => { setRole('waiter'); setRoleModalVisible(false); }}
              style={{ backgroundColor: role === 'waiter' ? '#FFF5F0' : '#F9FAFB', borderWidth: 1, borderColor: role === 'waiter' ? '#F97316' : '#E5E7EB', borderRadius: 12, padding: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: role === 'waiter' ? '#EA580C' : '#1F2937', textTransform: 'capitalize' }}>Waiter</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => { setRole('manager'); setRoleModalVisible(false); }}
              style={{ backgroundColor: role === 'manager' ? '#FFF5F0' : '#F9FAFB', borderWidth: 1, borderColor: role === 'manager' ? '#F97316' : '#E5E7EB', borderRadius: 12, padding: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: role === 'manager' ? '#EA580C' : '#1F2937', textTransform: 'capitalize' }}>Manager</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => { setRole('cashier'); setRoleModalVisible(false); }}
              style={{ backgroundColor: role === 'cashier' ? '#FFF5F0' : '#F9FAFB', borderWidth: 1, borderColor: role === 'cashier' ? '#F97316' : '#E5E7EB', borderRadius: 12, padding: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: role === 'cashier' ? '#EA580C' : '#1F2937', textTransform: 'capitalize' }}>Cashier</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => { setRole('kitchen_staff'); setRoleModalVisible(false); }}
              style={{ backgroundColor: role === 'kitchen_staff' ? '#FFF5F0' : '#F9FAFB', borderWidth: 1, borderColor: role === 'kitchen_staff' ? '#F97316' : '#E5E7EB', borderRadius: 12, padding: 12, marginBottom: 16, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: role === 'kitchen_staff' ? '#EA580C' : '#1F2937', textTransform: 'capitalize' }}>Kitchen Staff</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Modal>

      {/* Custom Alert Modal */}
      <Modal transparent visible={alertVisible} animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.primary + '15', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              {alertTitle.toLowerCase().includes('error') || alertTitle.toLowerCase().includes('failed') ? (
                <X size={32} color={theme.colors.primary} strokeWidth={2.5} />
              ) : (
                <CheckCircle2 size={32} color={theme.colors.primary} strokeWidth={2.5} />
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
              style={{ width: '100%', height: 50, backgroundColor: theme.colors.primary, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}
