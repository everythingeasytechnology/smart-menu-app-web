import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';
import ProfileScreen from '../../src/screens/tabs/ProfileScreen';
import WaiterProfileScreen from '../../src/screens/waiter/WaiterProfileScreen';

export default function ProfileRoute() {
  const user = useSelector((state: RootState) => state.auth.user);
  return user?.role === 'waiter' ? <WaiterProfileScreen /> : <ProfileScreen />;
}
