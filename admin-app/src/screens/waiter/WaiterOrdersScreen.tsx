import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform, Dimensions, ActivityIndicator, Image } from 'react-native';
import { useRouter, Stack, useFocusEffect } from 'expo-router';
import { theme } from '../../../constants/theme';
import { Clock, ChefHat, Utensils, MoreVertical, ArrowRight, Filter, ChevronDown, CupSoda, Wallet, ClipboardList, PieChart, CheckCircle2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const { width } = Dimensions.get('window');

const TABS = [
  { id: 'pending', label: 'Pending', icon: ClipboardList },
  { id: 'preparing', label: 'Preparing', icon: ChefHat },
  { id: 'served', label: 'Served', icon: Utensils },
];

export default function OrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('pending');
  const insets = useSafeAreaInsets();
  
  const token = useSelector((state: RootState) => state.auth.token);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = useCallback(async (showLoader = false) => {
    if (showLoader) setIsLoading(true);
    try {
      const res = await fetch('https://smartmenu.everythingeasy.in/api/v1/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (showLoader) setIsLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      if (!token) return;
      
      fetchOrders(true);

      const interval = setInterval(() => {
        fetchOrders(false);
      }, 1500);

      return () => clearInterval(interval);
    }, [token, fetchOrders])
  );

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'pending') {
      return order.order_status === 'pending' || order.order_status === 'confirmed';
    }
    if (activeTab === 'preparing') {
      return order.order_status === 'preparing' || order.order_status === 'ready';
    }
    return order.order_status === activeTab;
  });

  const getActionData = (status: string) => {
    switch (status) {
      case 'pending': 
      case 'confirmed':
        return { text: 'Start preparing', icon: ChefHat, bg: '#EA580C' };
      case 'preparing': 
        return { text: 'Mark as ready', icon: ChefHat, bg: '#2563EB' };
      case 'ready': 
        return { text: 'Mark as served', icon: Utensils, bg: '#2563EB' };
      case 'served': 
        return { text: 'Process payment', icon: Wallet, bg: '#16A34A' };
      default: 
        return { text: 'View order', icon: Clock, bg: '#4B5563' };
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'drink': return <CupSoda size={18} color="#EA580C" />;
      default: return <Utensils size={18} color="#EA580C" />; 
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ paddingTop: Math.max(insets.top, 20) + 10, paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={{ fontSize: 27, fontWeight: '900', color: '#111827', letterSpacing: -0.5 }}>Orders</Text>
            <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Manage and track orders</Text>
          </View>
          <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, alignItems: 'center', justifyContent: 'center' }}>
            <PieChart size={22} color="#EA580C" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Selector */}
      <View style={{ paddingHorizontal: 16, marginTop: 0, marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
          {TABS.map(tab => {
            const count = orders.filter(o => {
              if (tab.id === 'pending') {
                return o.order_status === 'pending' || o.order_status === 'confirmed';
              }
              if (tab.id === 'preparing') {
                return o.order_status === 'preparing' || o.order_status === 'ready';
              }
              return o.order_status === tab.id;
            }).length;
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 4,
                  backgroundColor: isActive ? '#FFF5F0' : 'transparent',
                  borderRadius: 12,
                }}
              >
                <View style={{ position: 'relative', marginBottom: 6 }}>
                  <View style={{ width: 32, height: 32, borderRadius: isActive ? 16 : 10, backgroundColor: isActive ? '#EA580C' : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} color={isActive ? '#FFFFFF' : '#94A3B8'} />
                  </View>
                  {count > 0 && (
                    <View style={{
                      position: 'absolute',
                      top: -4,
                      right: -8,
                      backgroundColor: isActive ? '#DC2626' : '#94A3B8',
                      borderRadius: 10,
                      minWidth: 16,
                      height: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 4,
                      borderWidth: 1,
                      borderColor: '#FFFFFF',
                      zIndex: 10
                    }}>
                      <Text style={{ fontSize: 9, fontWeight: '800', color: '#FFFFFF' }}>
                        {count}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: isActive ? '#EA580C' : '#64748B' }}>
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {isLoading && orders.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#EA580C" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          {filteredOrders.length === 0 ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
              <Text style={{ color: '#94A3B8', fontSize: 16, fontWeight: '500' }}>No {activeTab} orders.</Text>
            </View>
          ) : (
            filteredOrders.map(order => {
              const action = getActionData(order.order_status);
              
              // Helper to safely calculate items count
              const totalItemsCount = order.items ? order.items.reduce((sum: number, i: any) => sum + (i.quantity || 1), 0) : 0;
              
              return (
                <TouchableOpacity 
                  key={order.id} 
                  onPress={() => router.push({
                    pathname: `/waiter-order/${order.id}`,
                    params: { orderData: JSON.stringify(order) }
                  })}
                  activeOpacity={0.9}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 16,
                    borderLeftWidth: 3,
                    borderLeftColor: 'white',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  {/* Header */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#EA580C', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                        <MaterialIcons name={order.order_type === 'dine_in' ? 'chair-alt' : 'shopping-bag'} size={20} color="#FFFFFF" />
                      </View>
                      <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                          <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827', marginRight: 8, textTransform: 'capitalize' }}>
                            {order.service_point?.name || order.order_type?.replace('_', ' ')}
                          </Text>
                          {order.order_status === 'pending' && (
                            <View style={{ backgroundColor: '#FFF5F0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                              <Text style={{ fontSize: 11, fontWeight: '700', color: '#EA580C' }}>New</Text>
                            </View>
                          )}
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Clock size={12} color="#9CA3AF" style={{ marginRight: 4 }} />
                          <Text style={{ fontSize: 12, color: '#9CA3AF', fontWeight: '500' }}>
                            {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <View>
                          <Text style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 1 }}>Order ID</Text>
                          <Text style={{ fontSize: 14, fontWeight: '800', color: '#111827' }}>{order.display_order_id}</Text>
                        </View>
                        <TouchableOpacity style={{ marginLeft: 10 }}>
                          <MoreVertical size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* Divider */}
                  <View style={{ height: 1, backgroundColor: '#F3F4F6', marginBottom: 12, marginHorizontal: -12, width: width - 32 }} />

                  {/* Items & Total Section */}
                  <View style={{ marginBottom: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      
                      {/* Items List */}
                      <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text style={{ fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 10 }}>Items ({totalItemsCount})</Text>
                        
                        {order.items && order.items.slice(0, 3).map((item: any, index: number) => {
                          const isLast = index === Math.min(order.items.length, 3) - 1;
                          return (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: isLast ? 0 : 10 }}>
                              <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: '#FFF5F0', alignItems: 'center', justifyContent: 'center', marginRight: 10, overflow: 'hidden' }}>
                                {item.image ? (
                                  <Image source={{ uri: item.image }} style={{ width: 28, height: 28 }} resizeMode="cover" />
                                ) : (
                                  getItemIcon(item.type)
                                )}
                              </View>
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: isLast ? 0 : 1, borderBottomColor: '#F3F4F6', paddingBottom: isLast ? 0 : 10 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 8 }}>
                                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }} numberOfLines={1}>{item.quantity}x {item.item_name} {item.variant_label ? `(${item.variant_label})` : ''}</Text>
                                  {item.status && (
                                    <View style={{ marginLeft: 8, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: item.status === 'served' ? '#DCFCE7' : item.status === 'preparing' ? '#FEF3C7' : item.status === 'ready' ? '#DBEAFE' : item.status === 'cancelled' ? '#FEE2E2' : '#F3F4F6' }}>
                                      <Text style={{ fontSize: 9, fontWeight: '700', textTransform: 'capitalize', color: item.status === 'served' ? '#16A34A' : item.status === 'preparing' ? '#D97706' : item.status === 'ready' ? '#2563EB' : item.status === 'cancelled' ? '#EF4444' : '#6B7280' }}>
                                        {item.status}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '700', color: '#64748B' }}>₹{item.total}</Text>
                              </View>
                            </View>
                          );
                        })}
                        
                        {order.items && order.items.length > 3 && (
                          <View style={{ marginTop: 12, alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, fontWeight: '700', color: '#EA580C' }}>+{order.items.length - 3} more items</Text>
                          </View>
                        )}
                      </View>
                  
                    </View>
                  </View>

                  {/* Footer Action */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 16 }}>
                    <View>
                      <Text style={{ fontSize: 13, fontWeight: '600', color: '#9CA3AF', marginBottom: 2 }}>Total Amount</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>₹{order.total}</Text>
                        <View style={{ backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginLeft: 8 }}>
                          <Text style={{ color: '#4B5563', fontSize: 12, fontWeight: '600', textTransform: 'capitalize' }}>{order.payment_status}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ width: 40, height: 40, backgroundColor: '#F9FAFB', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowRight size={20} color="#6B7280" />
                    </View>
                  </View>

                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      )}

      {/* Floating Action Button for History */}
      <TouchableOpacity 
        onPress={() => router.push('/waiter-order/history')}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          backgroundColor: theme.colors.primary,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Clock size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>History</Text>
      </TouchableOpacity>
    </View>
  );
}
