import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Plus, LayoutList, X, ChevronLeft, Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { dataCenter } from '../../data/data';

type Category = {
  id: number;
  name: string;
  description: string | null;
  sort_order: number;
  status: string;
};

export default function CategoriesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const fetchCategories = async (showLoader = false) => {
    if (showLoader) setIsLoading(true);
    try {
      const response = await fetch(`${dataCenter.apiUrl.replace('/auth', '')}/categories`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setCategoriesList(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      if (showLoader) setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCategories(true);
    }, [token])
  );

  const filteredCategoriesList = useMemo(() => {
    return categoriesList.filter(item => {
      const query = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(query);
    });
  }, [categoriesList, searchQuery]);

  const openAddModal = () => {
    setName('');
    setDescription('');
    setSortOrder('');
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Category name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${dataCenter.apiUrl.replace('/auth', '')}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          sort_order: sortOrder ? Number(sortOrder) : 1,
          active: true,
          status: 'active'
        })
      });
      
      const data = await response.json();
      
      if (data.success || response.ok) {
        setModalVisible(false);
        fetchCategories(false);
        Alert.alert('Success', 'Category added successfully!');
      } else {
        Alert.alert('Error', data.message || 'Failed to add category');
      }
    } catch (error) {
      console.error('Add category error:', error);
      Alert.alert('Error', 'An unexpected error occurred while adding category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCategoryCard = ({ item }: { item: Category }) => {
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
        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#FFF5F0', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
          <LayoutList size={32} color="#EA580C" />
        </View>
        
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 4 }}>{item.name}</Text>
          <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }} numberOfLines={2}>
            {item.description || 'No description provided'}
          </Text>
          
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ backgroundColor: '#F3F4F6', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
               <Text style={{ fontSize: 11, fontWeight: '700', color: '#4B5563' }}>Sort Order: {item.sort_order || 1}</Text>
            </View>
          </View>
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
          <Text style={{ fontSize: 21, fontWeight: '800', color: '#111827' }}>Category Management</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16, backgroundColor: '#FFFFFF' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#F1F5F9', borderRadius: 16, paddingHorizontal: 16, height: 50 }}>
          <Search size={20} color="#9CA3AF" />
          <TextInput 
            style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#111827' }}
            placeholder="Search categories by name..."
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
            <Text style={{ marginTop: 12, color: '#6B7280', fontWeight: '500' }}>Loading categories...</Text>
          </View>
        ) : filteredCategoriesList.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -60 }}>
            <View style={{ width: 80, height: 80, backgroundColor: '#F3F4F6', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <LayoutList size={40} color="#9CA3AF" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 8, textAlign: 'center' }}>
              {searchQuery ? 'No Results Found' : 'No Categories Added'}
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center' }}>
              {searchQuery ? 'Try adjusting your search query.' : "You haven't added any categories yet."}
            </Text>
          </View>
        ) : (
          <FlatList 
            data={filteredCategoriesList}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ padding: 20, paddingBottom: 120, paddingTop:10 }}
            showsVerticalScrollIndicator={false}
            renderItem={renderCategoryCard}
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

      {/* Add Category Modal */}
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
                Add New Category
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ width: 32, height: 32, backgroundColor: '#F3F4F6', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 13, fontWeight: '700', textTransform: 'uppercase', color: '#6B7280', marginBottom: 8, marginLeft: 4 }}>Category Name</Text>
            <TextInput 
              style={{ backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, paddingHorizontal: 16, height: 56, fontSize: 16, color: '#111827', marginBottom: 16, fontWeight: '500' }}
              placeholder="e.g. Starters"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />

            <Text style={{ fontSize: 13, fontWeight: '700', textTransform: 'uppercase', color: '#6B7280', marginBottom: 8, marginLeft: 4 }}>Description</Text>
            <TextInput 
              style={{ backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, paddingHorizontal: 16, height: 56, fontSize: 16, color: '#111827', fontWeight: '500', marginBottom: 16 }}
              placeholder="e.g. Starter items"
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
            />

            <Text style={{ fontSize: 13, fontWeight: '700', textTransform: 'uppercase', color: '#6B7280', marginBottom: 8, marginLeft: 4 }}>Sort Order (Position)</Text>
            <TextInput 
              style={{ backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, paddingHorizontal: 16, height: 56, fontSize: 16, color: '#111827', fontWeight: '500', marginBottom: 24 }}
              placeholder="e.g. 1"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={sortOrder}
              onChangeText={setSortOrder}
            />

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
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>Add Category</Text>
                )}
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
}
