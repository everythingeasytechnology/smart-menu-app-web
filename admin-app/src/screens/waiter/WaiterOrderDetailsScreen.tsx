import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Platform, ActivityIndicator, Alert, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Plus, Banknote, MoreVertical, Clock, CheckCircle, AlertCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../../constants/theme';
import OrderDetailsView from '../../components/OrderDetailsView';

export default function OrderDetailsScreen() {
  const { id, orderData } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const parsedOrder = useMemo(() => {
    try {
      if (orderData && typeof orderData === 'string') {
        return JSON.parse(orderData);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }, [orderData]);

  const [order, setOrder] = useState<any>(parsedOrder);
  const [isUpdating, setIsUpdating] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const updateOrderStatus = async (body: any) => {
    if (!order) return;
    try {
      setIsUpdating(true);
      const sessionStr = await AsyncStorage.getItem('@auth_session');
      const session = sessionStr ? JSON.parse(sessionStr) : {};
      const token = session.token;
      
      const response = await fetch(`https://smartmenu.everythingeasy.in/api/v1/orders/${order.id}/status`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (data.success && data.data) {
        setOrder(data.data);
      } else {
        Alert.alert('Error', data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while updating status');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!order) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, color: '#6B7280' }}>Invalid or missing order data.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20, padding: 12, backgroundColor: theme.colors.primary, borderRadius: 12 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentStatus = order.order_status || 'pending';
  const displayId = order.display_order_id || `#${id}`;

  const handleAction = () => {
    if (currentStatus === 'pending' || currentStatus === 'confirmed') {
      updateOrderStatus({ status: 'preparing' });
    } else if (currentStatus === 'preparing') {
      updateOrderStatus({ status: 'ready' });
    } else if (currentStatus === 'ready') {
      updateOrderStatus({ status: 'served' });
    } else if (currentStatus === 'served' || currentStatus === 'completed') {
      setPaymentModalVisible(true);
    }
  };
  
  const handleCompleteOrder = () => {
    setPaymentModalVisible(false);
    updateOrderStatus({ status: 'completed' });
  };
  
  const handleCancelAction = () => {
    setCancelModalVisible(true);
  };

  const confirmCancelOrder = () => {
    setCancelModalVisible(false);
    updateOrderStatus({ status: 'cancelled' });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      
      {/* Top Navigation */}
      <View style={{ 
        paddingTop: Math.max(insets.top, 20) + 10, 
        paddingBottom: 16, 
        paddingHorizontal: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#FFFFFF'
      }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <ChevronLeft color="#000000" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={{ fontSize: 19, color: '#000000', fontWeight: '500' }}>
          Order {displayId}
        </Text>
      </View>

      <OrderDetailsView
        order={order}
        currentStatus={currentStatus}
        isUpdating={isUpdating}
        updateOrderStatus={updateOrderStatus}
        handleAction={handleAction}
        handleCancelAction={handleCancelAction}
        bottomPadding={0}
      />
      
      {/* Payment Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={paymentModalVisible}
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.primary + '15', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <CheckCircle size={32} color={theme.colors.primary} />
            </View>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 8, textAlign: 'center' }}>Complete Order?</Text>
            <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>
              Are you sure you want to mark this order as completed? Ensure payment is collected.
            </Text>
            
            <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
              <TouchableOpacity 
                onPress={() => setPaymentModalVisible(false)}
                style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: '#F3F4F6', alignItems: 'center' }}
              >
                <Text style={{ color: '#4B5563', fontSize: 16, fontWeight: '700' }}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleCompleteOrder}
                style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: theme.colors.primary, alignItems: 'center' }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Complete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={cancelModalVisible}
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <AlertCircle size={32} color="#EF4444" />
            </View>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 8, textAlign: 'center' }}>Cancel Order?</Text>
            <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>
              Are you sure you want to cancel this order? This action cannot be undone.
            </Text>
            
            <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
              <TouchableOpacity 
                onPress={() => setCancelModalVisible(false)}
                style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: '#F3F4F6', alignItems: 'center' }}
              >
                <Text style={{ color: '#4B5563', fontSize: 16, fontWeight: '700' }}>No, keep it</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={confirmCancelOrder}
                style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: '#EF4444', alignItems: 'center' }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Yes, Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
