import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, SafeAreaView, Platform, ActivityIndicator, Modal, KeyboardAvoidingView } from 'react-native';
import { Search, Plus, X, UtensilsCrossed, Leaf, Beef, Utensils, ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect, Stack } from 'expo-router';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { dataCenter } from '../../data/data';

type MenuItem = {
  id: number;
  category_id: number;
  name: string;
  description: string;
  category: string;
  type: string;
  price: number;
  tax_rate: number;
  preparation_time_minutes: number;
  cooking_time: string;
  image: string | null;
  available: boolean;
  sort_order: number;
  status: string;
  variants: any[];
};

type Category = {
  id: number;
  name: string;
  code: string;
  icon?: any;
};

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Custom Alert State
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleAddItem = () => {
    if (categories.length === 0) {
      showAlert('Category Required', 'Please add at least one category before adding menu items. Click on "View All" to add one.');
    } else {
      router.push('/menu/add');
    }
  };

  const handleEditClick = (item: MenuItem) => {
    router.push({
      pathname: '/menu/add',
      params: { editData: JSON.stringify(item) }
    });
  };
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const loadData = async () => {
        setIsLoading(true);
        try {
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
          console.log(itemsData);
          
          const catsData = await catsRes.json();

          if (isActive) {
            if (itemsData.success && itemsData.data) {
              setMenuItems(itemsData.data);
            } else {
              setMenuItems([]);
            }
            if (catsData.success && catsData.data) {
              setCategories(catsData.data);
            } else {
              setCategories([]);
            }
          }
        } catch (error) {
          console.error("Failed to fetch menu data:", error);
          if (isActive) {
            setMenuItems([]);
            setCategories([]);
          }

        } finally {
          if (isActive) setIsLoading(false);
        }
      };

      loadData();

      return () => {
        isActive = false;
      };
    }, [token])
  );

  const filteredData = useMemo(() => {
    return menuItems.filter(item => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(query) || (item.category && item.category.toLowerCase().includes(query));
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, menuItems]);



  const renderItem = ({ item }: { item: MenuItem }) => {
    const isVeg = item.type === 'veg';
    const tagColor = isVeg ? '#10B981' : '#EF4444';

    return (
      <TouchableOpacity 
        onPress={() => handleEditClick(item)}
        activeOpacity={0.8}
        style={{ 
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
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header Area */}
      <View style={{ paddingTop: Math.max(insets.top, 20) + 10, paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={{ fontSize: 27, fontWeight: '900', color: '#111827', letterSpacing: -0.5 }}>Menu</Text>
            <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Browse and add items to orders</Text>
          </View>
          <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Utensils size={22} color="#EA580C" />
          </TouchableOpacity>
        </View>
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
        
      {/* Categories Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>Categories</Text>
        <TouchableOpacity onPress={() => router.push('/menu/categories')}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: theme.colors.primary }}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Filter (Pills) */}
      <View style={{ paddingBottom: 16 }}>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['All', ...categories.map(c => c.name)]}
          keyExtractor={(item) => item}
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

      {/* Menu Items Grid or Loading/Empty State */}
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 12, color: '#6B7280', fontWeight: '500' }}>Loading menu items...</Text>
        </View>
      ) : menuItems.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, marginTop: -60 }}>
          <View style={{ width: 80, height: 80, backgroundColor: '#F3F4F6', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <UtensilsCrossed size={40} color="#9CA3AF" />
          </View>
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 8, textAlign: 'center' }}>No Items Found</Text>
          <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center' }}>You haven't added any dishes yet.</Text>
        </View>
      ) : filteredData.length > 0 ? (
        <FlatList 
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 100, paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, marginTop: -60 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 8, textAlign: 'center' }}>No items found</Text>
          <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center' }}>
            There are no menu items in this category or matching your search.
          </Text>
        </View>
      )}

      {/* Floating Add Button (Bottom Right) */}
      <TouchableOpacity 
        onPress={handleAddItem}
       style={{ 
                        position: 'absolute', 
                        bottom: '2%',
                        right: "4%", 
                        width: 60, 
                        height: 60, 
                        backgroundColor: theme.colors.primary, 
                        borderRadius: 32, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                      }}
      >
        <Plus size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Custom Alert Modal */}
      <Modal transparent visible={alertVisible} animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.primary + '15', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              {alertTitle.toLowerCase().includes('error') || alertTitle.toLowerCase().includes('failed') || alertTitle.toLowerCase().includes('required') ? (
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
