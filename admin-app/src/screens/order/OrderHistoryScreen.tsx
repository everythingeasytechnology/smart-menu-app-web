import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform, Dimensions, ActivityIndicator, Image } from 'react-native';
import { useRouter, Stack, useFocusEffect } from 'expo-router';
import { theme } from '../../../constants/theme';
import { Clock, Utensils, MoreVertical, ArrowRight, CupSoda, ChevronLeft, CheckCircle2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const { width } = Dimensions.get('window');

export default function OrderHistoryScreen() {
  const router = useRouter();
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
    }, [token, fetchOrders])
  );

  const filteredOrders = orders.filter(order => order.order_status === 'completed');

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'drink': return <CupSoda size={18} color="#EA580C" />;
      default: return <Utensils size={18} color="#EA580C" />; 
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? insets.top + 16 : 16, paddingBottom: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>
          Completed Orders
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {isLoading && orders.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#EA580C" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
          {filteredOrders.length === 0 ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
               <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                 <CheckCircle2 size={40} color="#9CA3AF" />
               </View>
              <Text style={{ color: '#9CA3AF', fontSize: 16, fontWeight: '500' }}>No completed orders yet.</Text>
            </View>
          ) : (
            filteredOrders.map(order => {
              const totalItemsCount = order.items ? order.items.reduce((sum: number, i: any) => sum + (i.quantity || 1), 0) : 0;
              
              return (
                <TouchableOpacity 
                  key={order.id} 
                  onPress={() => router.push({
                    pathname: `/order/${order.id}`,
                    params: { orderData: JSON.stringify(order) }
                  })}
                  activeOpacity={0.9}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 16,
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
                      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                        <MaterialIcons name={order.order_type === 'dine_in' ? 'chair-alt' : 'shopping-bag'} size={20} color="#FFFFFF" />
                      </View>
                      <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                          <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827', marginRight: 8, textTransform: 'capitalize' }}>
                            {order.service_point?.name || order.order_type?.replace('_', ' ')}
                          </Text>
                          <View style={{ backgroundColor: theme.colors.primary + '15', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                            <Text style={{ fontSize: 11, fontWeight: '700', color: theme.colors.primary }}>Completed</Text>
                          </View>
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
                              <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginRight: 10, overflow: 'hidden' }}>
                                {item.image ? (
                                  <Image source={{ uri: item.image }} style={{ width: 28, height: 28 }} resizeMode="cover" />
                                ) : (
                                  getItemIcon(item.type)
                                )}
                              </View>
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: isLast ? 0 : 1, borderBottomColor: '#F3F4F6', paddingBottom: isLast ? 0 : 10 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 8 }}>
                                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }} numberOfLines={1}>{item.quantity}x {item.item_name} {item.variant_label ? `(${item.variant_label})` : ''}</Text>
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '700', color: '#64748B' }}>₹{item.total}</Text>
                              </View>
                            </View>
                          );
                        })}
                        
                        {order.items && order.items.length > 3 && (
                          <View style={{ marginTop: 12, alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, fontWeight: '700', color: theme.colors.primary }}>+{order.items.length - 3} more items</Text>
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
    </SafeAreaView>
  );
}
