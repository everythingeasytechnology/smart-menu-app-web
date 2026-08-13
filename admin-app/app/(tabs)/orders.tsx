import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';
import OrdersScreen from '../../src/screens/tabs/OrdersScreen';
import WaiterOrdersScreen from '../../src/screens/waiter/WaiterOrdersScreen';

export default function OrdersRoute() {
  const user = useSelector((state: RootState) => state.auth.user);
  return user?.role === 'waiter' ? <WaiterOrdersScreen /> : <OrdersScreen />;
}
