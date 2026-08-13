import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { CheckCircle2, AlertCircle } from 'lucide-react-native';
import { theme } from '../../constants/theme';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
  type?: 'success' | 'warning' | 'info';
}

export default function CustomAlert({ 
  visible, 
  title, 
  message, 
  onConfirm, 
  confirmText = 'OK', 
  onCancel, 
  cancelText = 'Cancel',
  type = 'success'
}: CustomAlertProps) {
  
  const iconColor = type === 'warning' ? '#F59E0B' : theme.colors.primary;
  
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel || onConfirm}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <View style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: 340, borderRadius: 24, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 }}>
          
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: `${iconColor}15`, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            {type === 'success' ? <CheckCircle2 size={32} color={iconColor} /> : <AlertCircle size={32} color={iconColor} />}
          </View>
          
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 8, textAlign: 'center' }}>{title}</Text>
          <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>{message}</Text>
          
          <View style={{ flexDirection: 'row', width: '100%', gap: 12 }}>
            {onCancel && (
              <TouchableOpacity 
                onPress={onCancel}
                style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: '#F3F4F6', alignItems: 'center' }}
              >
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#4B5563' }}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              onPress={onConfirm}
              style={{ flex: 1, paddingVertical: 14, borderRadius: 16, backgroundColor: iconColor, alignItems: 'center', shadowColor: iconColor, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
