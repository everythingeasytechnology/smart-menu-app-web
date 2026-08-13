import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { theme } from '../../../constants/theme';
import { MoreHorizontal, ArrowUp, Circle, Search, Bell, Menu, FileText, CheckCircle2, Edit, Trash2, Filter, Download, Clock, ChefHat, IndianRupee, Calendar, TrendingUp, LayoutGrid, Activity, Utensils, ChevronDown, ShoppingBag, BarChart3 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');

const ORDER_STATS = [
  { id: 'pending', title: 'Pending', value: 14, icon: Clock, color: '#FF9800', bg: '#FFF3E0' },
  { id: 'preparing', title: 'Preparing', value: 30, icon: ChefHat, color: '#2196F3', bg: '#E3F2FD' },
  { id: 'served', title: 'Served', value: 10, icon: CheckCircle2, color: '#4CAF50', bg: '#E8F5E9' },
];

const RECENT_ORDERS = [
  { id: '1024', table: 'Table 4', items: '2x Burger, 1x Cola', total: '₹240', status: 'Pending', time: '12:30 PM', color: '#FF9800', bg: '#FFF3E0' },
  { id: '1023', table: 'Table 1', items: '1x Pizza, 2x Sprite', total: '₹185', status: 'Preparing', time: '12:15 PM', color: '#2196F3', bg: '#E3F2FD' },
  { id: '1022', table: 'Table 7', items: '3x Sushi Roll', total: '₹350', status: 'Served', time: '11:50 AM', color: '#4CAF50', bg: '#E8F5E9' },
];

const TOP_ITEMS = [
  { name: 'Butter Chicken', sold: 145, percentage: 85 },
  { name: 'Garlic Naan', sold: 120, percentage: 70 },
  { name: 'Paneer Tikka', sold: 95, percentage: 55 },
  { name: 'Cold Coffee', sold: 80, percentage: 45 },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ paddingTop: Math.max(insets.top, 20) + 10, paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={{ fontSize: 27, fontWeight: '900', color: '#111827', letterSpacing: -0.5 }}>Reports</Text>
            <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Business overview and performance</Text>
          </View>
          <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 size={22} color="#EA580C" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        
        {/* Total Revenue Card */}
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2, overflow: 'hidden' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <View>
              <Text style={{ color: '#111827', fontSize: 18, fontWeight: '800', marginBottom: 4 }}>This Month's Revenue</Text>
              <Text style={{ color: '#6B7280', fontSize: 13 }}>Revenue for the current month.</Text>
            </View>
            <View style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}>
              <IndianRupee size={18} color="#374151" />
            </View>
          </View>
          
          <Text style={{ color: '#111827', fontSize: 36, fontWeight: '900', marginBottom: 20, letterSpacing: -0.5 }}>₹ 2,44,500</Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginRight: 10 }}>
              <ArrowUp size={12} color="#10B981" style={{ marginRight: 4 }} />
              <Text style={{ color: '#10B981', fontSize: 13, fontWeight: '800' }}>12%</Text>
            </View>
            <Text style={{ color: '#6B7280', fontSize: 13, fontWeight: '500' }}>Overall growth</Text>
          </View>

          {/* Line Chart */}
          <View style={{ position: 'absolute', bottom: -15, right: -40, opacity: 0.9 }}>
            <LineChart
              areaChart
              curved
              data={[
                { value: 10, hideDataPoint: true },
                { value: 40, hideDataPoint: true },
                { value: 35, hideDataPoint: true },
                { value: 60, customDataPoint: () => <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: 'white', borderWidth: 2, borderColor: '#EA580C'}} /> },
                { value: 50, customDataPoint: () => <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: 'white', borderWidth: 2, borderColor: '#EA580C'}} /> },
                { value: 95, customDataPoint: () => <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: 'white', borderWidth: 2, borderColor: '#EA580C'}} /> },
              ]}
              width={200}
              height={100}
              hideRules
              hideYAxisText
              hideAxesAndRules
              initialSpacing={0}
              color="#EA580C"
              thickness={3}
              startFillColor="#EA580C"
              endFillColor="#EA580C"
              startOpacity={0.3}
              endOpacity={0.0}
            />
          </View>
        </View>

        {/* Orders & Tables Row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          
          {/* Orders Card */}
          <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, marginRight: 8, borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <View>
                <Text style={{ color: '#111827', fontSize: 16, fontWeight: '800', marginBottom: 2 }}>Orders</Text>
                <Text style={{ color: '#6B7280', fontSize: 11 }}>Today's overview</Text>
              </View>
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFF5F0', alignItems: 'center', justifyContent: 'center' }}>
                <Utensils size={16} color="#EA580C" />
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 16 }}>
              <Text style={{ color: '#111827', fontSize: 32, fontWeight: '900', letterSpacing: -1 }}>
                {ORDER_STATS.reduce((acc, curr) => acc + curr.value, 0)}
              </Text>
              <Text style={{ color: '#6B7280', fontSize: 13, fontWeight: '600', marginLeft: 6 }}>Total</Text>
            </View>
            
            {/* Progress Bar */}
            <View style={{ height: 6, width: '100%', borderRadius: 3, backgroundColor: '#F3F4F6', flexDirection: 'row', overflow: 'hidden', marginBottom: 12 }}>
              {ORDER_STATS.map(stat => (
                <View key={stat.id} style={{ flex: stat.value, backgroundColor: stat.color }} />
              ))}
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {ORDER_STATS.map(stat => (
                <View key={stat.id} style={{ alignItems: 'flex-start' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: stat.color, marginRight: 4 }} />
                    <Text style={{ color: '#111827', fontSize: 12, fontWeight: '800' }}>{stat.value}</Text>
                  </View>
                  <Text style={{ color: '#6B7280', fontSize: 10, fontWeight: '500' }}>{stat.title}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tables Card */}
          <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, marginLeft: 8, borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <View>
                <Text style={{ color: '#111827', fontSize: 16, fontWeight: '800', marginBottom: 2 }}>Tables</Text>
                <Text style={{ color: '#6B7280', fontSize: 11 }}>Active seating.</Text>
              </View>
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFF5F0', alignItems: 'center', justifyContent: 'center' }}>
                <LayoutGrid size={16} color="#EA580C" />
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 16 }}>
              <Text style={{ color: '#111827', fontSize: 32, fontWeight: '900', letterSpacing: -1 }}>12</Text>
              <Text style={{ color: '#6B7280', fontSize: 14, fontWeight: '600', marginLeft: 6 }}>/ 20</Text>
            </View>

            {/* Donut Chart and Legend */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <PieChart
                  donut
                  radius={35}
                  innerRadius={25}
                  data={[
                    {value: 12, color: '#EA580C'},
                    {value: 8, color: '#FFEDD5'},
                    {value: 0, color: '#F3F4F6'}
                  ]}
                />
              </View>
              <View style={{ flex: 1.2, paddingLeft: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#EA580C', marginRight: 6 }} />
                    <Text style={{ fontSize: 11, color: '#6B7280', fontWeight: '500' }}>Occupied</Text>
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#111827' }}>12</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFEDD5', marginRight: 6 }} />
                    <Text style={{ fontSize: 11, color: '#6B7280', fontWeight: '500' }}>Available</Text>
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#111827' }}>8</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#F3F4F6', marginRight: 6 }} />
                    <Text style={{ fontSize: 11, color: '#6B7280', fontWeight: '500' }}>Reserved</Text>
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#111827' }}>0</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Order Statistics */}
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <View>
              <Text style={{ color: '#111827', fontSize: 18, fontWeight: '800', marginBottom: 4 }}>Order Statistics</Text>
              <Text style={{ color: '#6B7280', fontSize: 13 }}>Current status of all orders</Text>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#374151', marginRight: 8 }}>This Month</Text>
              <ChevronDown size={14} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            {/* Full Doughnut Graphic */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <PieChart
                donut
                radius={70}
                innerRadius={55}
                data={[
                  {value: 14, color: '#F59E0B'},
                  {value: 30, color: '#3B82F6'},
                  {value: 98, color: '#10B981'},
                ]}
                centerLabelComponent={() => {
                  return (
                    <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize: 11, color: '#6B7280', fontWeight: '600', marginBottom: 2}}>Total</Text>
                      <Text style={{fontSize: 24, fontWeight: '900', color: '#111827'}}>142</Text>
                    </View>
                  );
                }}
              />
            </View>

            {/* Legend */}
            <View style={{ flex: 0.8, paddingLeft: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#F59E0B', marginRight: 8 }} />
                  <Text style={{ fontSize: 13, color: '#4B5563', fontWeight: '600' }}>Pending</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: '800', color: '#111827' }}>14</Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#3B82F6', marginRight: 8 }} />
                  <Text style={{ fontSize: 13, color: '#4B5563', fontWeight: '600' }}>Preparing</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: '800', color: '#111827' }}>30</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981', marginRight: 8 }} />
                  <Text style={{ fontSize: 13, color: '#4B5563', fontWeight: '600' }}>Served</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: '800', color: '#111827' }}>98</Text>
              </View>
            </View>
          </View>

          {/* Bottom Stats Row */}
          <View style={{ flexDirection: 'row', backgroundColor: '#FFF5F0', borderRadius: 16, padding: 16 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFE4D6', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <ShoppingBag size={16} color="#EA580C" />
              </View>
              <View>
                <Text style={{ fontSize: 11, color: '#6B7280', fontWeight: '500', marginBottom: 2 }}>Avg. Order Value</Text>
                <Text style={{ fontSize: 14, fontWeight: '800', color: '#EA580C' }}>₹1,725</Text>
              </View>
            </View>
            
            <View style={{ width: 1, backgroundColor: '#FDBA74', opacity: 0.3, marginHorizontal: 8 }} />
            
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFE4D6', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <CheckCircle2 size={16} color="#EA580C" />
              </View>
              <View>
                <Text style={{ fontSize: 11, color: '#6B7280', fontWeight: '500', marginBottom: 2 }}>Completed Orders</Text>
                <Text style={{ fontSize: 14, fontWeight: '800', color: '#EA580C' }}>98</Text>
              </View>
            </View>
          </View>
          
        </View>

        {/* Recent Orders (Replaces Product Transactions) */}
        <View style={{ backgroundColor: '#FFF', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <View>
              <Text style={{ color: '#111827', fontSize: 18, fontWeight: '700', marginBottom: 4 }}>Recent Orders</Text>
              <Text style={{ color: '#6B7280', fontSize: 13 }}>Latest table orders in real time.</Text>
            </View>
            <TouchableOpacity 
              onPress={() => router.push('/orders')} 
              style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, backgroundColor: theme.colors.primary + '15', alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ color: theme.colors.primary, fontSize: 13, fontWeight: '700' }}>View All</Text>
            </TouchableOpacity>
          </View>

          {RECENT_ORDERS.map((order, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: index === RECENT_ORDERS.length - 1 ? 0 : 1, borderBottomColor: '#F3F4F6' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: order.bg, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: '#E5E7EB' }}>
                  {order.status === 'Pending' ? <Clock size={20} color={order.color} /> : order.status === 'Preparing' ? <ChefHat size={20} color={order.color} /> : <CheckCircle2 size={20} color={order.color} />}
                </View>
                <View>
                  <Text style={{ color: '#111827', fontSize: 15, fontWeight: '700', marginBottom: 2 }}>Order #{order.id}</Text>
                  <Text style={{ color: '#6B7280', fontSize: 12 }}>{order.table} • {order.items}</Text>
                </View>
              </View>
              
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: '#111827', fontSize: 15, fontWeight: '800', marginBottom: 6 }}>{order.total}</Text>
                <View style={{ backgroundColor: order.bg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, flexDirection: 'row', alignItems: 'center' }}>
                  <Circle size={6} color={order.color} fill={order.color} style={{ marginRight: 4 }} />
                  <Text style={{ color: order.color, fontSize: 10, fontWeight: '700' }}>{order.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        
   {/* Top Selling Items */}
        <View style={{ backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginTop: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <View>
              <Text style={{ color: '#111827', fontSize: 18, fontWeight: '700', marginBottom: 4 }}>Top Selling Items</Text>
              <Text style={{ color: '#6B7280', fontSize: 13 }}>Most popular dishes this month.</Text>
            </View>
           
          </View>

          <View>
            {TOP_ITEMS.map((item, index) => (
              <View key={index} style={{ marginBottom: index === TOP_ITEMS.length - 1 ? 0 : 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ color: '#374151', fontSize: 14, fontWeight: '600' }}>{item.name}</Text>
                  <Text style={{ color: '#111827', fontSize: 14, fontWeight: '800' }}>{item.sold} sold</Text>
                </View>
                <View style={{ height: 8, backgroundColor: '#F3F4F6', borderRadius: 4, overflow: 'hidden' }}>
                  <View style={{ width: `${item.percentage}%`, height: '100%', backgroundColor: theme.colors.primary, borderRadius: 4 }} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

