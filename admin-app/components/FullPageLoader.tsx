import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

interface FullPageLoaderProps {
  visible: boolean;
}

export default function FullPageLoader({ visible }: FullPageLoaderProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#2160B8" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
