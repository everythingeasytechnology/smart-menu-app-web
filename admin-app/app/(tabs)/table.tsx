import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';
import TableScreen from '../../src/screens/tabs/TableScreen';
import WaiterTableScreen from '../../src/screens/waiter/WaiterTableScreen';

export default function TableRoute() {
  const user = useSelector((state: RootState) => state.auth.user);
  return user?.role === 'waiter' ? <WaiterTableScreen /> : <TableScreen />;
}
