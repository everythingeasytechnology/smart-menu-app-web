import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Banknote, MoreVertical } from 'lucide-react-native';
import { theme } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface OrderDetailsViewProps {
  order: any;
  currentStatus: string;
  isUpdating: boolean;
  updateOrderStatus: (body: any) => void;
  handleAction: () => void;
  handleCancelAction: () => void;
  bottomPadding?: number;
  onAddItems?: () => void;
}

export default function OrderDetailsView({ 
  order, 
  currentStatus, 
  isUpdating, 
  updateOrderStatus, 
  handleAction, 
  handleCancelAction,
  bottomPadding = 20,
  onAddItems
}: OrderDetailsViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: bottomPadding + 220, paddingTop: 24 }} showsVerticalScrollIndicator={false}>
        
        {order.items && order.items.map((item: any, index: number) => {
          const isPreparingCurrent = item.status === 'preparing';
          const isReadyCurrent = item.status === 'ready';
          const isServedCurrent = item.status === 'served';

          return (
            <View key={index} style={{ borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 20, marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: '#FFF5F0', marginRight: 16, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
                  {item.image ? (
                    <Image 
                      source={{ uri: item.image }} 
                      style={{ width: '100%', height: '100%' }} 
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={{ color: '#EA580C', fontWeight: 'bold' }}>{item.item_name?.charAt(0)}</Text>
                  )}
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 17, fontWeight: '500', color: '#111827', marginBottom: 4 }}>{item.item_name} {item.variant_label ? `(${item.variant_label})` : ''}</Text>
                  <Text style={{ fontSize: 13, color: '#9CA3AF', marginBottom: item.special_instructions ? 6 : 12 }}>Qty: {item.quantity}</Text>
                  {item.special_instructions && (
                    <View style={{ backgroundColor: '#FFFBEB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 12, borderWidth: 1, borderColor: '#FEF3C7' }}>
                      <Text style={{ fontSize: 11, fontWeight: '600', color: '#D97706' }}>Note: {item.special_instructions}</Text>
                    </View>
                  )}
                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#000000' }}>₹{item.total}</Text>
                </View>
              </View>

              {currentStatus === 'completed' ? null : item.status !== 'cancelled' ? (
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TouchableOpacity 
                    disabled={isPreparingCurrent || isUpdating}
                    onPress={() => updateOrderStatus({ items: [{ id: item.id, status: 'preparing' }] })}
                    style={{ flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center', backgroundColor: isPreparingCurrent ? '#F3F4F6' : '#FEF3C7' }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: isPreparingCurrent ? '#9CA3AF' : '#D97706' }}>Preparing</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    disabled={isReadyCurrent || isUpdating}
                    onPress={() => updateOrderStatus({ items: [{ id: item.id, status: 'ready' }] })}
                    style={{ flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center', backgroundColor: isReadyCurrent ? '#F3F4F6' : '#DBEAFE' }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: isReadyCurrent ? '#9CA3AF' : '#2563EB' }}>Ready</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    disabled={isServedCurrent || isUpdating}
                    onPress={() => updateOrderStatus({ items: [{ id: item.id, status: 'served' }] })}
                    style={{ flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center', backgroundColor: isServedCurrent ? '#F3F4F6' : '#DCFCE7' }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: isServedCurrent ? '#9CA3AF' : '#16A34A' }}>Served</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                 <View style={{ paddingVertical: 10, borderRadius: 8, alignItems: 'center', backgroundColor: '#FEE2E2' }}>
                   <Text style={{ fontSize: 13, fontWeight: '700', color: '#EF4444' }}>Cancelled</Text>
                 </View>
              )}
            </View>
          );
        })}

        <Text style={{ fontSize: 20, fontWeight: '800', color: '#000000', marginBottom: 24 }}>Payments details</Text>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={{ fontSize: 16, color: '#6B7280' }}>Subtotal</Text>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#000000' }}>₹{order.subtotal || 0}</Text>
        </View>
        
        {order.discount > 0 && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ fontSize: 16, color: '#6B7280' }}>Discount</Text>
            <Text style={{ fontSize: 16, fontWeight: '800', color: '#10B981' }}>-₹{order.discount}</Text>
          </View>
        )}
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 24 }}>
          <Text style={{ fontSize: 16, color: '#6B7280' }}>Tax</Text>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#000000' }}>₹{order.tax || 0}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 }}>
          <Text style={{ fontSize: 17, color: '#6B7280' }}>Total payment</Text>
          <Text style={{ fontSize: 17, fontWeight: '800', color: '#000000' }}>₹{order.total || 0}</Text>
        </View>

     
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 20, 
        paddingTop: 16, 
        paddingBottom: Math.max(insets.bottom, 20) + (bottomPadding || 0),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 10,
      }}>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ backgroundColor: '#DCFCE7', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#BBF7D0' }}>
            <Banknote color="#059669" size={24} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#000000', marginRight: 12 }}>₹ {order.total}</Text>
            <MoreVertical color="#9CA3AF" size={24} />
          </View>
        </View>

        {currentStatus !== 'completed' && (
          (currentStatus === 'pending' || currentStatus === 'confirmed') ? (
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity 
                disabled={isUpdating}
                onPress={handleCancelAction} 
                style={{ flex: 1, paddingVertical: 18, borderRadius: 20, backgroundColor: theme.colors.accent + '15', alignItems: 'center' }}
              >
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.accent }}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                disabled={isUpdating}
                onPress={handleAction} 
                style={{ flex: 1, paddingVertical: 18, borderRadius: 20, backgroundColor: theme.colors.accent, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
              >
                {isUpdating && <ActivityIndicator color="#FFFFFF" style={{ marginRight: 8 }} />}
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF' }}>Accept Order</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
              <TouchableOpacity 
                disabled={isUpdating}
                onPress={handleAction} 
                style={{ flex: 1, paddingVertical: 18, borderRadius: 20, backgroundColor: currentStatus === 'served' ? '#10B981' : theme.colors.accent, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
              >
                {isUpdating && <ActivityIndicator color="#FFFFFF" style={{ marginRight: 8 }} />}
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF' }}>
                  {currentStatus === 'preparing' ? 'Mark All Ready' : 
                   currentStatus === 'ready' ? 'Mark All Served' : 
                   currentStatus === 'served' ? 'Complete Order' : 'Update Status'}
                </Text>
              </TouchableOpacity>

              {onAddItems && (
                <TouchableOpacity 
                  disabled={isUpdating}
                  onPress={onAddItems}
                  style={{ flex: 1, paddingVertical: 18, borderRadius: 20, backgroundColor: theme.colors.accent, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF' }}>
                    Add Items
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )
        )}
      </View>
      
      {/* Loading Overlay */}
      {isUpdating && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '600', color: theme.colors.primary }}>Updating...</Text>
        </View>
      )}
    </View>
  );
}
