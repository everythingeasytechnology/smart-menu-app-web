import { Tabs, Redirect } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { BarChart3, PieChart, Utensils, User } from 'lucide-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const user = useSelector((state: RootState) => state.auth.user);
  const isWaiter = user?.role === 'waiter';

  const role = user?.role?.toLowerCase() || '';
  if (['waiter', 'manager', 'cashier', 'kitchen_staff'].includes(role)) {
    return <Redirect href="/(waiter)/orders" />;
  }
  
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.dashSurface,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          color: theme.colors.dashText,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.dashTextMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarStyle: {
          backgroundColor: theme.colors.dashSurface,
          borderTopColor: '#EEEEEE',
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom + 6,
          paddingTop: 10,
        },
      }}>
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, ]}>
              <PieChart size={24} color={focused ? theme.colors.primary : theme.colors.dashTextMuted} strokeWidth={focused ? 2.5 : 2}  />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="table"
        options={{
          title: 'Tables',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, ]}>
              <MaterialIcons name="chair-alt" size={26} color={focused ? theme.colors.primary : theme.colors.dashTextMuted} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, ]}>
              <Utensils size={21} color={focused ? theme.colors.primary : theme.colors.dashTextMuted} strokeWidth={focused ? 2.5 : 2}  />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: isWaiter ? null : '/',
          title: 'Reports',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer]}>
              <BarChart3 size={24} color={focused ? theme.colors.primary : theme.colors.dashTextMuted} strokeWidth={focused ? 2.5 : 2}  />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, ]}>
              <User size={24} color={focused ? theme.colors.primary : theme.colors.dashTextMuted} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: theme.colors.primary + '20',
  }
});
