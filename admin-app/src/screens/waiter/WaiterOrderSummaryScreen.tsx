import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Platform, TextInput, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Banknote, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../../constants/theme';
import CustomAlert from '../../components/CustomAlert';

export default function OrderSummaryScreen() {
  const { id, cartItems, activeOrderId } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [customerName, setCustomerName] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [items, setItems] = useState<any[]>(() => {
    try {
      return cartItems ? JSON.parse(cartItems as string) : [];
    } catch (e) {
      console.error("Failed to parse cartItems", e);
      return [];
    }
  });

  const subtotal = items.reduce((sum, current) => sum + (parseFloat(current.item.price.toString()) * current.quantity), 0);
  const tax = subtotal * 0.05; // Assuming 5% tax for example
  const total = subtotal + tax;

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const sessionStr = await AsyncStorage.getItem('@auth_session');
      const session = sessionStr ? JSON.parse(sessionStr) : {};
      const token = session.token;

      const formattedItems = items.map(cartItem => ({
        menu_item_id: cartItem.item.id,
        variant_id: cartItem.item.variant_id || null,
        quantity: cartItem.quantity,
        special_instructions: cartItem.special_instructions || null
      }));

      const body = activeOrderId 
        ? {
            order_id: Number(activeOrderId),
            items: formattedItems
          }
        : {
            customer_name: customerName || "Walk-in Customer",
            customer_phone: "",
            payment_method: "cash",
            notes: "Counter order",
            order_type: "dine_in",
            service_point_id: Number(id) || 1,
            items: formattedItems
          };

      const apiUrl = 'https://smartmenu.everythingeasy.in/api/v1/orders/direct';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAlertVisible(true);
      } else {
        Alert.alert('Error', data.message || 'Failed to submit order');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while submitting order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAlertConfirm = () => {
    setAlertVisible(false);
    router.dismissAll();
    router.replace(`/table/${id}`);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      
      {/* Top Navigation */}
      <View style={{ 
        paddingTop: Math.max(insets.top, 20) + 10, 
        paddingBottom: 16, 
        paddingHorizontal: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6'
      }}>
        <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)/table')} style={{ marginRight: 12 }}>
          <ChevronLeft color="#000000" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={{ fontSize: 19, color: '#000000', fontWeight: '500' }}>
          Order Summary 
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 180, paddingTop: 24 }} showsVerticalScrollIndicator={false}>
        
        {items.map((cartItem, index) => (
          <View key={index} style={{ borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 20, marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image 
                source={{ uri: cartItem.item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' }} 
                style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: '#F8F9FA', marginRight: 16 }} 
              />
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#111827', marginBottom: 4 }}>
                  {cartItem.item.name}
                  {cartItem.item.variant_label ? ` (${cartItem.item.variant_label})` : ''}
                </Text>
                <Text style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 12 }}>Qty: {cartItem.quantity}</Text>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#000000' }}>₹{(parseFloat(cartItem.item.price) * cartItem.quantity).toFixed(2)}</Text>
              </View>
            </View>
            
            <View style={{ marginTop: 12, backgroundColor: '#F9FAFB', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#F3F4F6' }}>
              <TextInput
                style={{ fontSize: 14, color: '#111827' }}
                placeholder="Special instructions (e.g., less spicy)"
                placeholderTextColor="#9CA3AF"
                value={cartItem.special_instructions || ''}
                onChangeText={(text) => {
                  const newItems = [...items];
                  newItems[index].special_instructions = text;
                  setItems(newItems);
                }}
              />
            </View>
          </View>
        ))}

        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#000000', marginBottom: 12 }}>Customer Details</Text>
          <View style={{ backgroundColor: '#F9FAFB', borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <User size={16} color="#6B7280" style={{ marginRight: 8 }} />
              <Text style={{ color: '#6B7280', fontSize: 14, fontWeight: '600' }}>Customer Name (Optional)</Text>
            </View>
            <TextInput
              style={{ fontSize: 16, color: '#111827', minHeight: 40 }}
              placeholder="e.g. John Doe"
              placeholderTextColor="#9CA3AF"
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>
        </View>

        <Text style={{ fontSize: 20, fontWeight: '800', color: '#000000', marginBottom: 24 }}>Payment Details</Text>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={{ fontSize: 16, color: '#6B7280' }}>Total price (estimated)</Text>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#000000' }}>₹{subtotal.toFixed(2)}</Text>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={{ fontSize: 16, color: '#6B7280' }}>Packaging fee</Text>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#000000' }}>₹0.00</Text>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 24 }}>
          <Text style={{ fontSize: 16, color: '#6B7280' }}>Tax (5%)</Text>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#000000' }}>₹{tax.toFixed(2)}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 }}>
          <Text style={{ fontSize: 17, color: '#6B7280' }}>Total payment</Text>
          <Text style={{ fontSize: 17, fontWeight: '800', color: '#000000' }}>₹{total.toFixed(2)}</Text>
        </View>

        <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', marginBottom: 8 }}>Disclaimer:</Text>
        <Text style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 20 }}>The price above is an estimate. Final price will be stated on the receipt.</Text>
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
        paddingBottom: Math.max(insets.bottom, 20), 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 10,
      }}>
        <TouchableOpacity 
          disabled={isSubmitting}
          onPress={handleSubmit} 
          style={{ width: '100%', paddingVertical: 18, borderRadius: 20, backgroundColor: theme.colors.accent, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" style={{ marginRight: 8 }} />
          ) : null}
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF' }}>
            {isSubmitting ? 'Submitting...' : activeOrderId ? 'Add Items' : 'Submit Order'}
          </Text>
        </TouchableOpacity>
      </View>

      <CustomAlert 
        visible={alertVisible}
        title={activeOrderId ? "Items Added" : "Order Placed"}
        message={activeOrderId ? `Items have been added to the order successfully!` : `Order for Table ${id} has been submitted successfully!`}
        onConfirm={handleAlertConfirm}
        confirmText="Done"
        type="success"
      />
    </KeyboardAvoidingView>
  );
}
