import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, SafeAreaView, Platform, ActivityIndicator, Modal } from 'react-native';
import { Search, Plus, Minus, X, SlidersHorizontal, ArrowDownUp, ChevronLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../../constants/theme';
import { dataCenter } from '../../data/data';

export default function MenuSelectionScreen() {
  const { id, activeOrderId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<{ [key: string]: { item: any, quantity: number } }>({});
  
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([{ name: 'All' }]);
  const [isLoading, setIsLoading] = useState(true);

  // Variant Modal State
  const [variantModalVisible, setVariantModalVisible] = useState(false);
  const [selectedItemForVariant, setSelectedItemForVariant] = useState<any>(null);

  useEffect(() => {
    let isActive = true;
    const loadData = async () => {
      setIsLoading(true);
      try {
        const sessionStr = await AsyncStorage.getItem('@auth_session');
        const session = sessionStr ? JSON.parse(sessionStr) : {};
        const token = session.token;
        if (!token) throw new Error("No token");
        
        const [itemsRes, catsRes] = await Promise.all([
          fetch(`${dataCenter.apiUrl.replace('/auth', '')}/menu-items`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${dataCenter.apiUrl.replace('/auth', '')}/categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        
        const itemsData = await itemsRes.json();
        const catsData = await catsRes.json();

        if (isActive) {
          if (itemsData.success && itemsData.data) {
            setMenuItems(itemsData.data);
          }
          if (catsData.success && catsData.data) {
            setCategories([{ name: 'All' }, ...catsData.data]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredData = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, menuItems]);

  const updateCart = (item: any, increment: boolean, variant?: any) => {
    setCart(prev => {
      const newCart = { ...prev };
      const cartKey = variant ? `${item.id}_${variant.id}` : item.id;
      const currentQty = newCart[cartKey]?.quantity || 0;
      const newQty = increment ? currentQty + 1 : currentQty - 1;

      if (newQty <= 0) {
        delete newCart[cartKey];
      } else {
        const itemToSave = variant 
          ? { ...item, price: variant.price, variant_id: variant.id, variant_label: variant.label } 
          : item;
        newCart[cartKey] = { item: itemToSave, quantity: newQty };
      }
      return newCart;
    });
  };

  const getQuantity = (itemId: string) => {
    return Object.keys(cart)
      .filter(key => key === String(itemId) || key.startsWith(`${itemId}_`))
      .reduce((sum, key) => sum + cart[key].quantity, 0);
  };

  const cartTotalItems = Object.values(cart).reduce((sum, current) => sum + current.quantity, 0);
  const cartTotalPrice = Object.values(cart).reduce((sum, current) => sum + (parseFloat(current.item.price.toString()) * current.quantity), 0);

  const handleNext = () => {
    const itemsArray = Object.values(cart);
    router.push({
      pathname: `/table/${id}/summary`,
      params: { cartItems: JSON.stringify(itemsArray), activeOrderId }
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    const qty = getQuantity(item.id);
    const isVeg = item.type === 'veg';
    const tagColor = isVeg ? '#10B981' : '#EF4444';

    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: '#FFFFFF', 
        borderRadius: 20, 
        padding: 12, 
        marginHorizontal: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F3F4F6'
      }}>
        <View style={{ width: '100%', aspectRatio: 1.2, marginBottom: 12, position: 'relative' }}>
          {item.image ? (
            <Image 
              source={{ uri: item.image }} 
              style={{ width: '100%', height: '100%', borderRadius: 16 }}
              resizeMode="cover"
            />
          ) : (
            <View style={{ width: '100%', height: '100%', borderRadius: 16, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={{uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'}} style={{width: '100%', height: '100%', borderRadius: 16}} />
            </View>
          )}

          {/* Veg/Non-Veg Tag */}
          <View style={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'white', padding: 2, borderRadius: 4 }}>
            <View style={{ width: 14, height: 14, borderWidth: 1, borderColor: tagColor, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: tagColor }} />
            </View>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 15, fontWeight: '800', color: '#111827', marginBottom: 4 }} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 12, color: '#6B7280', lineHeight: 16 }} numberOfLines={2}>
              {item.description || "Delicious special dish cooked with perfect spices."}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '900', color: '#111827' }}>₹{item.price}</Text>
            
            {qty > 0 ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#EA580C', borderRadius: 16, paddingHorizontal: 4, paddingVertical: 2 }}>
                <TouchableOpacity onPress={() => {
                  if (item.variants && item.variants.length > 0) {
                    setSelectedItemForVariant(item);
                    setVariantModalVisible(true);
                  } else {
                    updateCart(item, false);
                  }
                }} style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
                  <Minus size={14} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={{ color: '#FFFFFF', fontWeight: '800', marginHorizontal: 8, fontSize: 14 }}>{qty}</Text>
                <TouchableOpacity onPress={() => {
                  if (item.variants && item.variants.length > 0) {
                    setSelectedItemForVariant(item);
                    setVariantModalVisible(true);
                  } else {
                    updateCart(item, true);
                  }
                }} style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={14} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => {
                if (item.variants && item.variants.length > 0) {
                  setSelectedItemForVariant(item);
                  setVariantModalVisible(true);
                } else {
                  updateCart(item, true);
                }
              }} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#EA580C', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={18} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      
      {/* Header */}
      <View style={{ paddingTop: Platform.OS === 'android' ? insets.top + 16 : 10, paddingHorizontal: 20, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)/table')} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>Add Items (Table {id})</Text>
      </View>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 16, paddingHorizontal: 16, height: 54, borderWidth: 1, borderColor: '#F3F4F6' }}>
          <Search size={20} color="#6B7280" />
          <TextInput 
            style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#111827', fontWeight: '500' }}
            placeholder="Search menu or category..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={{ backgroundColor: '#E5E7EB', borderRadius: 12, padding: 4 }}>
              <X size={14} color="#4B5563" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories Filter (Pills) */}
      <View style={{ paddingBottom: 16 }}>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories.map(c => c.name)}
          keyExtractor={(item, index) => item + index.toString()}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
          renderItem={({ item }) => {
            const isActive = activeCategory === item;
            const fgColor = isActive ? '#EA580C' : '#4B5563';
            return (
              <TouchableOpacity 
                onPress={() => setActiveCategory(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: isActive ? '#EA580C' : '#E5E7EB',
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: isActive ? '700' : '600', color: fgColor }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Menu Grid */}
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 150 ,}}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 40 }}>
              <Text style={{ fontSize: 16, color: '#6B7280' }}>No items found.</Text>
            </View>
          )}
        />
      )}

      {/* Bottom Cart Bar */}
      {cartTotalItems > 0 && (
        <View style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          backgroundColor: '#FFF', 
          paddingHorizontal: 20, 
          paddingVertical: 16, 
          paddingBottom: Math.max(insets.bottom + 16, 24),
          borderTopWidth: 1, 
          borderTopColor: '#F3F4F6',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 10
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: '#6B7280', fontSize: 13, fontWeight: '600' }}>{cartTotalItems} {cartTotalItems === 1 ? 'Item' : 'Items'}</Text>
              <Text style={{ color: '#111827', fontSize: 20, fontWeight: '800' }}>₹{cartTotalPrice.toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              onPress={handleNext}
              style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 24 }}
            >
              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Variant Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={variantModalVisible}
        onRequestClose={() => {
          setVariantModalVisible(false);
          setSelectedItemForVariant(null);
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>
                Select Variant
              </Text>
              <TouchableOpacity onPress={() => {
                setVariantModalVisible(false);
                setSelectedItemForVariant(null);
              }}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <Text style={{ fontSize: 16, color: '#4B5563', marginBottom: 16, fontWeight: '600' }}>
              {selectedItemForVariant?.name}
            </Text>

            <FlatList
              data={selectedItemForVariant?.variants || []}
              keyExtractor={(v) => v.id.toString()}
              renderItem={({ item: variant }) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>
                    {variant.label} <Text style={{ color: '#6B7280', fontSize: 14 }}>- ₹{variant.price}</Text>
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 4, paddingVertical: 4 }}>
                    <TouchableOpacity 
                      onPress={() => updateCart(selectedItemForVariant, false, variant)}
                      style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 }}
                    >
                      <Minus size={16} color="#374151" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginHorizontal: 12 }}>
                      {cart[`${selectedItemForVariant?.id}_${variant.id}`]?.quantity || 0}
                    </Text>
                    <TouchableOpacity 
                      onPress={() => updateCart(selectedItemForVariant, true, variant)}
                      style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 }}
                    >
                      <Plus size={16} color="#EA580C" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            
            <TouchableOpacity 
              onPress={() => {
                setVariantModalVisible(false);
                setSelectedItemForVariant(null);
              }}
              style={{ backgroundColor: '#EA580C', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginTop: 24 }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
