import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Plus, Trash2, CheckCircle2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../constants/theme';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { dataCenter } from '../../data/data';

export default function AddMenuItemScreen() {
  const router = useRouter();
  const { editData } = useLocalSearchParams<{ editData: string }>();
  const insets = useSafeAreaInsets();
  const token = useSelector((state: RootState) => state.auth.token);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [type, setType] = useState<'veg' | 'non-veg'>('veg');
  const [cookingTime, setCookingTime] = useState('');
  
  const [categories, setCategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Pricing Variants
  const [variants, setVariants] = useState([{ id: Date.now().toString(), label: '', price: '' }]);
  
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${dataCenter.apiUrl.replace('/auth', '')}/categories`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) setCategories(data.data);
    })
    .catch(console.error);

    if (editData) {
      try {
        const item = JSON.parse(editData);
        setName(item.name || '');
        setDescription(item.description || '');
        setBasePrice(item.price ? item.price.toString() : '');
        setCategoryId(item.category_id || null);
        setType(item.type || 'veg');
        setCookingTime(item.cooking_time || '');
        setSortOrder(item.sort_order ? item.sort_order.toString() : '');
        if (item.image) {
          setImageUri(item.image);
        }
        if (item.variants && item.variants.length > 0) {
          setVariants(item.variants.map((v: any, index: number) => ({
            id: v.id ? v.id.toString() : Date.now().toString() + index,
            label: v.name || v.label || '',
            price: v.price ? v.price.toString() : ''
          })));
        }
      } catch (e) {
        console.error("Failed to parse editData", e);
      }
    }
  }, [token, editData]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const addVariant = () => {
    setVariants([...variants, { id: Date.now().toString(), label: '', price: '' }]);
  };

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter(v => v.id !== id));
    }
  };

  const updateVariant = (id: string, field: 'label' | 'price', value: string) => {
    setVariants(variants.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const handleSave = async () => {
    if (!name.trim() || !categoryId) {
      Alert.alert('Error', 'Item name and category are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('category_id', String(categoryId));
      formData.append('name', name.trim());
      formData.append('description', description.trim());
      formData.append('type', type);
      formData.append('price', basePrice || '0');
      formData.append('tax_rate', '0');
      formData.append('cooking_time', cookingTime.trim());
      formData.append('preset_food_image_id', '');
      formData.append('availability', '1');
      formData.append('stock', '1');
      formData.append('sort_order', sortOrder ? String(sortOrder) : '1');
      formData.append('status', 'active');

      const validVariants = variants.filter(v => v.label.trim() !== '' && v.price.trim() !== '');
      validVariants.forEach((v, index) => {
        const formattedLabel = v.label.trim().replace(/\b\w/g, char => char.toUpperCase());
        formData.append(`variants[${index}][label]`, formattedLabel);
        formData.append(`variants[${index}][price]`, v.price.trim());
      });

      if (imageUri) {
        const filename = imageUri.split('/').pop() || 'image.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const mimeType = match ? `image/${match[1]}` : `image/jpeg`;
        formData.append('image', { uri: imageUri, name: filename, type: mimeType } as any);
      }
      let apiUrl = `${dataCenter.apiUrl.replace('/auth', '')}/menu-items`;
      
      if (editData) {
        try {
          const item = JSON.parse(editData);
          apiUrl = `${dataCenter.apiUrl.replace('/auth', '')}/menu-items/${item.id}`;
          formData.append('_method', 'PUT');
        } catch(e) {}
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      
      const data = await response.json();
      console.log(data);
      if (data.success || response.ok) {
        Alert.alert('Success', `Menu item ${editData ? 'updated' : 'added'} successfully!`);
        router.back();
      } else {
        Alert.alert('Error', data.message || `Failed to ${editData ? 'update' : 'add'} menu item`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred while saving.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#F9F9F9' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View 
        className="flex-row items-center justify-between px-5 bg-[#F9F9F9] z-10 border-b border-gray-100 shadow-sm pb-4"
        style={{ paddingTop: Platform.OS === 'ios' ? 50 : insets.top + 20 }}
      >
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100">
          <ChevronLeft color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800 tracking-tight">{editData ? 'Edit Menu Item' : 'Add Menu Item'}</Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: Math.max(insets.bottom, 40) }} showsVerticalScrollIndicator={false}>
        
        {/* Item Details Card */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-gray-800 font-bold text-lg mb-4">Item Details</Text>

          {/* Image Picker */}
          <View className="mb-6 items-center">
            <TouchableOpacity 
              onPress={pickImage}
              activeOpacity={0.8}
              className="w-full h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl items-center justify-center overflow-hidden relative"
            >
              {imageUri ? (
                <>
                  <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                  <TouchableOpacity 
                    onPress={() => setImageUri(null)} 
                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-sm"
                  >
                    <Trash2 size={16} color="#EF4444" />
                  </TouchableOpacity>
                </>
              ) : (
                <View className="items-center">
                  <View className="w-12 h-12 rounded-full bg-orange-50 items-center justify-center mb-2">
                    <Plus size={24} color="#EA580C" />
                  </View>
                  <Text className="text-gray-500 font-semibold">Tap to upload item image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          <Text className="text-gray-500 font-semibold text-xs uppercase mb-2">Item Name</Text>
          <TextInput 
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 text-gray-800 mb-4 font-medium text-base"
            placeholder="e.g. Matar Paneer"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />

          <Text className="text-gray-500 font-semibold text-xs uppercase mb-2">Description</Text>
          <TextInput 
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 text-gray-800 mb-4 font-medium text-base"
            placeholder="e.g. Delicious special dish..."
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
          />

          <View className="flex-row gap-4 mb-4">
            <View style={{ flex: 1 }}>
              <Text className="text-gray-500 font-semibold text-xs uppercase mb-2">Base Price (₹)</Text>
              <TextInput 
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 text-gray-800 font-medium text-base"
                placeholder="220"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={basePrice}
                onChangeText={setBasePrice}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text className="text-gray-500 font-semibold text-xs uppercase mb-2">Sort Order</Text>
              <TextInput 
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 text-gray-800 font-medium text-base"
                placeholder="e.g. 1"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={sortOrder}
                onChangeText={setSortOrder}
              />
            </View>
          </View>

          <Text className="text-gray-500 font-semibold text-xs uppercase mb-2">Dietary Type</Text>
          <View className="flex-row gap-3 mb-4">
            <TouchableOpacity 
              onPress={() => setType('veg')}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-xl border ${type === 'veg' ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200'}`}
            >
              <View className={`w-4 h-4 border-2 rounded-sm items-center justify-center mr-2 ${type === 'veg' ? 'border-green-600' : 'border-gray-400'}`}>
                <View className={`w-2 h-2 rounded-full ${type === 'veg' ? 'bg-green-600' : 'bg-transparent'}`} />
              </View>
              <Text className={`font-bold ${type === 'veg' ? 'text-green-700' : 'text-gray-500'}`}>VEG</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setType('non-veg')}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-xl border ${type === 'non-veg' ? 'bg-red-50 border-red-500' : 'bg-white border-gray-200'}`}
            >
              <View className={`w-4 h-4 border-2 rounded-sm items-center justify-center mr-2 ${type === 'non-veg' ? 'border-red-600' : 'border-gray-400'}`}>
                <View className={`w-2 h-2 rounded-full ${type === 'non-veg' ? 'bg-red-600' : 'bg-transparent'}`} />
              </View>
              <Text className={`font-bold ${type === 'non-veg' ? 'text-red-700' : 'text-gray-500'}`}>NON-VEG</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-gray-500 font-semibold text-xs uppercase mb-2">Cooking Time (Optional)</Text>
          <TextInput 
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 text-gray-800 mb-2 font-medium text-base"
            placeholder="e.g. 15-20 mins"
            placeholderTextColor="#9CA3AF"
            value={cookingTime}
            onChangeText={setCookingTime}
          />
        </View>

        {/* Category Selection */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-gray-800 font-bold text-lg mb-2">Category</Text>
          <Text className="text-gray-500 text-xs italic mb-4">
            If you want a new category, please go to Add Category screen.
          </Text>
          
          <View className="flex-row flex-wrap gap-2">
            {categories.map(cat => (
              <TouchableOpacity 
                key={cat.id}
                onPress={() => setCategoryId(cat.id)}
                style={{ 
                  backgroundColor: categoryId === cat.id ? theme.colors.accent : '#FFFFFF',
                  borderColor: categoryId === cat.id ? theme.colors.accent : '#E5E7EB'
                }}
                className={`px-3 py-2 rounded-lg border`}
              >
                <Text style={{ color: categoryId === cat.id ? '#FFFFFF' : '#4B5563' }} className={`font-semibold`}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
            {categories.length === 0 && (
              <Text className="text-gray-400 text-sm">No categories found.</Text>
            )}
          </View>
        </View>

        {/* Dynamic Pricing / Sizes */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-800 font-bold text-lg">Sizes & Variants</Text>
            <TouchableOpacity onPress={addVariant} className="bg-orange-50 px-3 py-2 rounded-lg flex-row items-center border border-orange-200">
              <Plus size={14} color="#EA580C" />
              <Text className="text-orange-600 font-bold text-xs ml-1">Add Variant</Text>
            </TouchableOpacity>
          </View>
          
          <Text className="text-gray-500 text-xs mb-4">
            Add multiple pricing options for different portions (e.g. Half, Full). Leave blank if using Base Price.
          </Text>

          {variants.map((variant, index) => (
            <View key={variant.id} className="flex-row items-center mb-3">
              <View className="flex-1 mr-2">
                {index === 0 && <Text className="text-gray-400 text-[10px] font-bold uppercase mb-1 ml-1">Size / Label</Text>}
                <TextInput 
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 text-gray-800 font-medium text-sm"
                  placeholder="e.g. Half (300ML)"
                  placeholderTextColor="#9CA3AF"
                  value={variant.label}
                  onChangeText={(val) => updateVariant(variant.id, 'label', val)}
                  autoCapitalize="words"
                />
              </View>
              <View className="flex-[0.6]">
                {index === 0 && <Text className="text-gray-400 text-[10px] font-bold uppercase mb-1 ml-1">Price (₹)</Text>}
                <TextInput 
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 h-12 text-gray-800 font-bold text-base"
                  placeholder="0.00"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={variant.price}
                  onChangeText={(val) => updateVariant(variant.id, 'price', val)}
                />
              </View>
              {variants.length > 1 && (
                <TouchableOpacity 
                  onPress={() => removeVariant(variant.id)}
                  className="w-10 h-12 justify-center items-center ml-1 mt-auto"
                >
                  <Trash2 size={20} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          className="w-full bg-orange-500 py-4 rounded-[100px] items-center flex-row justify-center shadow-lg mb-10"
          onPress={handleSave}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? (
             <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
             <CheckCircle2 size={20} color="white" />
          )}
          <Text className="text-white font-extrabold text-lg ml-2 tracking-wide">
            {isSubmitting ? 'Saving...' : 'Save Menu Item'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
