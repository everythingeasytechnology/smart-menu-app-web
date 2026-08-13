import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';
import MenuScreen from '../../src/screens/tabs/MenuScreen';
import WaiterMenuScreen from '../../src/screens/waiter/WaiterMenuScreen';

export default function MenuRoute() {
  const user = useSelector((state: RootState) => state.auth.user);
  return user?.role === 'waiter' ? <WaiterMenuScreen /> : <MenuScreen />;
}
