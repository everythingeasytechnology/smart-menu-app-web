import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Platform, KeyboardAvoidingView, Alert, ActivityIndicator, Linking } from 'react-native';
import { Plus, Users, X, Coffee, Download, RefreshCw, QrCode, CheckCircle2, ChevronDown, LayoutGrid, Edit2 } from 'lucide-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { dataCenter } from '../../data/data';
import { theme } from '@/constants/theme';

type Table = {
  id: number;
  code: string;
  qr_identifier: string;
  name: string;
  seats: number;
  category: string;
  point_type: string;
  status: string;
  is_active: boolean;
  scan_url: string;
  scanner_download_url: string;
  order_number: string | null;
  amount: number;
  items: any[];
};

export default function TableScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State for Adding Table
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCapacity, setNewCapacity] = useState('');
  const [newCategory, setNewCategory] = useState('Dining');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);

  // Modal State for QR Code
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isAddingTable, setIsAddingTable] = useState(false);
  
  const isFirstLoadRef = useRef(true);

  const fetchTables = async (showLoader = false) => {
    if (showLoader) setIsLoading(true);
    try {
      const response = await fetch(`${dataCenter.apiUrl.replace('/auth', '')}/service-points`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const json = await response.json();
      if (json.success) {
        setTables(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch tables:", error);
    } finally {
      if (showLoader) setIsLoading(false);
      isFirstLoadRef.current = false;
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const load = async () => {
        if (!token) return;
        await fetchTables(isFirstLoadRef.current);
      };
      
      load();

      const interval = setInterval(() => {
        if (isActive && token) {
          fetchTables(false);
        }
      }, 1500);

      return () => {
        isActive = false;
        clearInterval(interval);
      };
    }, [token])
  );

  const handleAddTable = async () => {
    if (!newTitle.trim() || !newCapacity.trim()) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }
    
    setIsAddingTable(true);
    try {
      const isEdit = editingTable !== null;
      const url = isEdit 
        ? `${dataCenter.apiUrl.replace('/auth', '')}/service-points/${editingTable.id}`
        : `${dataCenter.apiUrl.replace('/auth', '')}/service-points`;

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newTitle.trim(),
          seats: parseInt(newCapacity, 10) || 0,
          category: newCategory,
          point_type: 'table',
          ...(isEdit && { status: editingTable.status, is_active: editingTable.is_active })
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setModalVisible(false);
        setNewTitle('');
        setNewCapacity('');
        setNewCategory('Dining');
        setEditingTable(null);
        fetchTables(false);
      } else {
        Alert.alert('Error', data.message || `Failed to ${isEdit ? 'update' : 'add'} table`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', `An error occurred while ${editingTable ? 'updating' : 'adding'} the table`);
    } finally {
      setIsAddingTable(false);
    }
  };

  const openQrModal = (table: Table) => {
    setSelectedTable(table);
    setQrModalVisible(true);
  };

  const openEditModal = (table: Table) => {
    setEditingTable(table);
    setNewTitle(table.name);
    setNewCapacity(table.seats.toString());
    setNewCategory(table.category || 'Dining');
    setModalVisible(true);
  };

  const openAddModal = () => {
    setEditingTable(null);
    setNewTitle('');
    setNewCapacity('');
    setNewCategory('Dining');
    setModalVisible(true);
  };

  const handleDownloadQr = async () => {
    if (!selectedTable) return;
    
    if (selectedTable.scanner_download_url) {
      setQrModalVisible(false);
      Linking.openURL(selectedTable.scanner_download_url).catch((err) => {
        console.error('Failed to open URL:', err);
        Alert.alert("Error", "Could not open the download link in your browser.");
      });
    } else {
      Alert.alert("Error", "No download URL available for this table.");
    }
  };

  const renderTableCard = ({ item }: { item: Table }) => {
    const isEmpty = item.status === 'available';
    
    return (
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={() => router.push({
          pathname: `/table/${item.id}`,
          params: { tableData: JSON.stringify(item) }
        })}
        style={{ 
          flex: 1, margin: 8, padding: 16, backgroundColor: '#FFFFFF', borderRadius: 24, 
          borderWidth: 1, borderColor: isEmpty ? '#BBF7D0' : '#FFEDD5', 
          shadowColor: isEmpty ? '#22C55E' : '#F97316', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 4
        }}
      >
        {/* Top Header Row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <View style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: isEmpty ? '#DCFCE7' : '#FFEDD5' }}>
            <Text style={{ fontSize: 10, fontWeight: '800', textTransform: 'uppercase', color: isEmpty ? '#15803D' : '#C2410C' }}>
              {isEmpty ? 'Available' : 'Occupied'}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <TouchableOpacity onPress={() => openEditModal(item)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}>
              <Edit2 size={14} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openQrModal(item)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}>
              <QrCode size={14} color="#4B5563" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Center Content */}
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <View style={{ width: 64, height: 64, backgroundColor: '#FFFFFF', borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}>
            <MaterialIcons name="chair-alt" size={32} color={isEmpty ? '#16A34A' : '#EA580C'} />
          </View>
          <Text style={{ fontSize: 15, fontWeight: '800', color: '#111827', marginBottom: 6 }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 }}>
            <Users size={14} color="#6B7280" style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 13, color: '#4B5563', fontWeight: '700' }}>{item.seats} Seats</Text>
          </View>
        </View>

        {/* Bottom Status Message */}
        <View style={{ paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F3F4F6', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: isEmpty ? '#16A34A' : '#EA580C' }}>
            {isEmpty ? 'Ready for guests' : 'Guests are dining'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header Area */}
      <View style={{ paddingTop: Math.max(insets.top, 20) + 10, paddingHorizontal: 20, paddingBottom: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={{ fontSize: 27, fontWeight: '900', color: '#111827', letterSpacing: -0.5 }}>Tables</Text>
            <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Manage seating & reservations</Text>
          </View>
          <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="chair-alt" size={24} color="#EA580C" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Available / Occupied Row */}
      <View 
        style={{ paddingHorizontal: 20, paddingBottom: 16, backgroundColor: '#FAFAFA', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', zIndex: 10 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#22C55E', marginRight: 8 }} />
            <Text style={{ color: '#4B5563', fontWeight: '500', fontSize: 14 }}>Available ({tables.filter(t => t.status === 'available').length})</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#F97316', marginRight: 8 }} />
            <Text style={{ color: '#4B5563', fontWeight: '500', fontSize: 14 }}>Occupied ({tables.filter(t => t.status !== 'available').length})</Text>
          </View>
        </View>
      </View>

      {/* Grid or Empty/Loading State */}
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#EA580C" />
          <Text style={{ marginTop: 12, color: '#6B7280', fontWeight: '600' }}>Loading tables...</Text>
        </View>
      ) : tables.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>
          <View style={{ width: 80, height: 80, backgroundColor: '#F3F4F6', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <MaterialIcons name="table-restaurant" size={40} color="#9CA3AF" />
          </View>
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 8 }}>No Service Points Added</Text>
          <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 20 }}>
            You haven't added any tables or rooms yet. Tap the + button to create one.
          </Text>
        </View>
      ) : (
        <FlatList 
          data={tables}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ padding: 12, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          renderItem={renderTableCard}
          refreshing={isLoading}
          onRefresh={fetchTables}
        />
      )}

      <TouchableOpacity 
        onPress={openAddModal}
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
        <Plus size={32} color="white" />
      </TouchableOpacity>

      {/* Add Table Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 20 }}
        >
          <View style={{ backgroundColor: '#FFFFFF', width: '100%', borderRadius: 32, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.25, shadowRadius: 30, elevation: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <View>
                <Text style={{ fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 4 }}>
                  {editingTable ? 'Edit Table' : 'Add New Table'}
                </Text>
                <Text style={{ fontSize: 14, color: '#6B7280' }}>
                  {editingTable ? 'Update the details for this table' : 'Create a new table for your restaurant'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ width: 32, height: 32, backgroundColor: '#F3F4F6', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
                <X size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text style={{ color: '#6B7280', fontWeight: '600', fontSize: 12, textTransform: 'uppercase', marginBottom: 8, marginLeft: 4 }}>Table Title</Text>
            <TextInput 
              style={{ backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, paddingHorizontal: 16, height: 56, color: '#1F2937', marginBottom: 16, fontWeight: '700', fontSize: 16 }}
              placeholder="e.g. Table 10"
              placeholderTextColor="#9CA3AF"
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={{ color: '#6B7280', fontWeight: '600', fontSize: 12, textTransform: 'uppercase', marginBottom: 8, marginLeft: 4 }}>Seating Capacity</Text>
            <TextInput 
              style={{ backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, paddingHorizontal: 16, height: 56, color: '#1F2937', marginBottom: 16, fontWeight: '700', fontSize: 16 }}
              placeholder="e.g. 4"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={newCapacity}
              onChangeText={setNewCapacity}
            />

            <Text style={{ color: '#6B7280', fontWeight: '600', fontSize: 12, textTransform: 'uppercase', marginBottom: 8, marginLeft: 4 }}>Category</Text>
            <TouchableOpacity 
              onPress={() => setCategoryModalVisible(true)}
              style={{ backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, paddingHorizontal: 16, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}
            >
              <Text style={{ color: '#1F2937', fontWeight: '700', fontSize: 16 }}>{newCategory}</Text>
              <ChevronDown size={20} color="#6B7280" />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                disabled={isAddingTable}
                style={{ flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 16, borderRadius: 9999, alignItems: 'center', opacity: isAddingTable ? 0.5 : 1 }}
              >
                <Text style={{ color: '#1F2937', fontWeight: '700', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleAddTable}
                disabled={isAddingTable}
                style={{ flex: 1, backgroundColor: '#F97316', paddingVertical: 16, borderRadius: 9999, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4, opacity: isAddingTable ? 0.7 : 1 }}
              >
                {isAddingTable ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
                    {isAddingTable ? 'Saving...' : (editingTable ? 'Update Table' : 'Create Table')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Category Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => setCategoryModalVisible(false)}
          style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View style={{ backgroundColor: '#FFFFFF', width: '100%', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 20 }}>
            
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ fontSize: 24, fontWeight: '900', color: '#111827' }}>Select Category</Text>
              <TouchableOpacity onPress={() => setCategoryModalVisible(false)} style={{ width: 36, height: 36, backgroundColor: '#F3F4F6', borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}>
                <X size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              onPress={() => { setNewCategory('Dining'); setCategoryModalVisible(false); }}
              style={{ backgroundColor: newCategory === 'Dining' ? '#FFF5F0' : '#F9FAFB', borderWidth: 1, borderColor: newCategory === 'Dining' ? '#F97316' : '#E5E7EB', borderRadius: 16, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700', color: newCategory === 'Dining' ? '#EA580C' : '#1F2937' }}>Dining</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => { setNewCategory('Room'); setCategoryModalVisible(false); }}
              style={{ backgroundColor: newCategory === 'Room' ? '#FFF5F0' : '#F9FAFB', borderWidth: 1, borderColor: newCategory === 'Room' ? '#F97316' : '#E5E7EB', borderRadius: 16, padding: 16, marginBottom: 24, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700', color: newCategory === 'Room' ? '#EA580C' : '#1F2937' }}>Room</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Modal>

      {/* QR Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={qrModalVisible}
        onRequestClose={() => setQrModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: '#FFFFFF', width: '100%', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 20 }}>
            
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ fontSize: 24, fontWeight: '900', color: '#111827' }}>Table Details</Text>
              <TouchableOpacity onPress={() => setQrModalVisible(false)} style={{ width: 36, height: 36, backgroundColor: '#F3F4F6', borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}>
                <X size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>

            {selectedTable && (
              <>
                <Text style={{ fontSize: 28, fontWeight: '900', color: '#111827', marginBottom: 8 }}>{selectedTable.name}</Text>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 }}>
                    <Users size={16} color="#6B7280" style={{ marginRight: 8 }} />
                    <Text style={{ fontSize: 14, color: '#4B5563', fontWeight: '700' }}>{selectedTable.seats} Seats</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: selectedTable.status === 'available' ? '#DCFCE7' : '#FFEDD5', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 }}>
                    <Text style={{ fontSize: 14, color: selectedTable.status === 'available' ? '#15803D' : '#C2410C', fontWeight: '800', textTransform: 'uppercase' }}>
                      {selectedTable.status === 'available' ? 'Available' : 'Occupied'}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 16, width: '100%' }}>
                  <TouchableOpacity 
                    onPress={handleDownloadQr}
                    disabled={isDownloading}
                    style={{ flex: 1, backgroundColor: '#111827', height: 56, borderRadius: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6, opacity: isDownloading ? 0.7 : 1 }}
                  >
                    {isDownloading ? (
                      <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                      <>
                        <Download size={18} color="#FFFFFF" />
                        <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 15, marginLeft: 8 }}>Download Scanner</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 40 }}>
          <View style={{ backgroundColor: '#FFFFFF', width: '100%', borderRadius: 32, padding: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 20 }}>
            <View style={{ width: 72, height: 72, backgroundColor: '#DCFCE7', borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <CheckCircle2 size={40} color="#16A34A" />
            </View>
            <Text style={{ fontSize: 24, fontWeight: '900', color: '#111827', marginBottom: 8, textAlign: 'center' }}>Download Complete</Text>
            <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 28, lineHeight: 22 }}>
              The QR scanner has been successfully saved to your device's gallery.
            </Text>
            <TouchableOpacity 
              onPress={() => setSuccessModalVisible(false)}
              style={{ backgroundColor: '#F97316', width: '100%', height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#F97316', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 }}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 16 }}>Awesome!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}
