import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { store } from "../src/redux/store";
import { setCredentials, setInitialized } from "../src/redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import "../global.css";

function InitialLayout() {
  const [isReady, setIsReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const sessionStr = await AsyncStorage.getItem('@auth_session');
        if (sessionStr) {
          const session = JSON.parse(sessionStr);
          dispatch(setCredentials({
            user: session.user,
            business: session.business,
            token: session.token
          }));
          dispatch(setInitialized(true));
          
          // Auto redirect to home if currently at root or inside auth
          if (segments[0] === '(auth)' || !segments[0]) {
            if (session.user.role === 'waiter') {
              router.replace('/(waiter)/orders');
            } else {
              router.replace('/(tabs)/orders');
            }
          }
        } else {
          dispatch(setInitialized(true));
          // If no session and trying to access app, send to login
          if (segments[0] !== '(auth)') {
            router.replace('/(auth)/login');
          }
        }
      } catch (error) {
        console.error('Failed to restore auth session:', error);
        dispatch(setInitialized(true));
      } finally {
        setIsReady(true);
      }
    };
    
    // Small delay to ensure router is ready
    setTimeout(() => {
      checkAuth();
    }, 50);
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#EA580C" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="order/[id]" options={{ presentation: 'modal' }} />
      <Stack.Screen name="bill/[id]" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <InitialLayout />
      </SafeAreaProvider>
    </Provider>
  );
}
