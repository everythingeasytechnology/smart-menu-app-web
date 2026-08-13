import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Platform, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Plus, Coffee, ChevronLeft, Clock, User, ReceiptText } from 'lucide-react-native';
import OrderDetailsView from '../../components/OrderDetailsView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { dataCenter } from '../../data/data';

export default function TableOrdersScreen() {
  const { id, tableData } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const token = useSelector((state: RootState) => state.auth.token);

  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  let table: any = null;
  try {
    if (tableData) {
      table = JSON.parse(tableData as string);
    }
  } catch (e) {
    console.error(e);
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchOrders = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${dataCenter.apiUrl.replace('/auth', '')}/orders/service-point/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (isActive && data.success) {
            const allOrders = data.data || [];
            setOrders(allOrders.filter((o: any) => o.order_status !== 'completed'));
          }
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          if (isActive) setIsLoading(false);
        }
      };

      fetchOrders();

      return () => {
        isActive = false;
      };
    }, [id, token])
  );

  const [isUpdating, setIsUpdating] = useState(false);

  const updateOrderStatus = async (body: any, orderId: number) => {
    try {
      setIsUpdating(true);
      const sessionStr = await AsyncStorage.getItem('@auth_session');
      const session = sessionStr ? JSON.parse(sessionStr) : {};
      const authToken = session.token || token;
      
      const response = await fetch(`https://smartmenu.everythingeasy.in/api/v1/orders/${orderId}/status`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (data.success && data.data) {
        setOrders(prev => {
          const newOrders = [...prev];
          const idx = newOrders.findIndex(o => o.id === orderId);
          if (idx !== -1) newOrders[idx] = data.data;
          return newOrders;
        });
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAction = (order: any) => {
    const currentStatus = order.order_status || 'pending';
    if (currentStatus === 'pending' || currentStatus === 'confirmed') {
      updateOrderStatus({ status: 'preparing' }, order.id);
    } else if (currentStatus === 'preparing') {
      updateOrderStatus({ status: 'ready' }, order.id);
    } else if (currentStatus === 'ready') {
      updateOrderStatus({ status: 'served' }, order.id);
    } else if (currentStatus === 'served' || currentStatus === 'completed') {
      // Direct them to order details screen for payment flow if they want to complete it, 
      // or we can just complete it directly.
      updateOrderStatus({ status: 'completed' }, order.id);
    }
  };
  
  const handleCancelAction = (order: any) => {
    updateOrderStatus({ status: 'cancelled' }, order.id);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'preparing': return '#F59E0B'; // Orange
      case 'ready': return '#10B981'; // Green
      case 'served': return '#6B7280'; // Gray
      default: return '#3B82F6'; // Blue
    }
  };

  const renderOrderItem = ({ item }: { item: any }) => {
    const statusColor = getStatusColor(item.order_status);
    
    // Parse time
    const date = new Date(item.created_at);
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <TouchableOpacity 
        onPress={() => router.push({ 
          pathname: `/waiter-order/[id]`, 
          params: { id: item.id, orderData: JSON.stringify(item) } 
        })}
        style={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: 20, 
          padding: 16, 
          marginBottom: 16,
          borderWidth: 1,
          borderColor: '#F3F4F6',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2
        }}
      >
        {/* Header: Order ID & Status */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ReceiptText size={20} color="#111827" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827' }}>{item.display_order_id}</Text>
          </View>
          <View style={{ backgroundColor: statusColor + '15', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
            <Text style={{ color: statusColor, fontSize: 12, fontWeight: '700', textTransform: 'capitalize' }}>
              {item.order_status}
            </Text>
          </View>
        </View>

        {/* Details: Customer & Time */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <User size={14} color="#6B7280" style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '500' }}>
              {item.customer_name || 'Walk-in'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Clock size={14} color="#6B7280" style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '500' }}>{timeString}</Text>
          </View>
        </View>

        {/* Items Summary */}
        <View style={{ backgroundColor: '#F9FAFB', padding: 12, borderRadius: 12, marginBottom: 16 }}>
          <Text style={{ fontSize: 13, color: '#4B5563', lineHeight: 20 }} numberOfLines={2}>
            {item.items?.map((i: any) => `${i.quantity}x ${i.item_name}`).join(', ') || 'No items listed'}
          </Text>
        </View>

        {/* Footer: Payment & Total */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ 
              width: 8, height: 8, borderRadius: 4, 
              backgroundColor: item.payment_status === 'paid' ? '#10B981' : '#EF4444', 
              marginRight: 6 
            }} />
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#4B5563', textTransform: 'capitalize' }}>
              {item.payment_status || 'Unpaid'}
            </Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: '900', color: '#111827' }}>₹{item.total}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? insets.top + 16 : 16, paddingBottom: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
        <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)/table')} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>
          {table ? `${table.name} Orders` : `Table ${id} Orders`}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : orders.length > 0 ? (
        <View style={{ flex: 1 }}>
          <OrderDetailsView
            order={orders[0]}
            currentStatus={orders[0].order_status || 'pending'}
            isUpdating={isUpdating}
            updateOrderStatus={(body) => updateOrderStatus(body, orders[0].id)}
            handleAction={() => handleAction(orders[0])}
            handleCancelAction={() => handleCancelAction(orders[0])}
            onAddItems={() => router.push({ pathname: `/waiter-table/${id}/add-order`, params: { activeOrderId: orders[0].id } })}
          />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, marginTop: -60 }}>
          <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: theme.colors.primary + '15', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Coffee size={48} color={theme.colors.primary} strokeWidth={1.5} />
          </View>
          <Text style={{ fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 12, textAlign: 'center' }}>No Active Orders</Text>
          <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 32, lineHeight: 22 }}>
            This table doesn't have any active orders right now. Tap below to start a new order.
          </Text>
          
          <TouchableOpacity 
            onPress={() => router.push(`/waiter-table/${id}/add-order`)}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary, paddingHorizontal: 32, paddingVertical: 16, borderRadius: 30, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 }}
          >
            <Plus size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>Add New Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
