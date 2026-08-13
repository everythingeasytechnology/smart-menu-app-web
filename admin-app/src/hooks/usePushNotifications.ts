import { useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { dataCenter } from "../data/data";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const EXPO_PUSH_TOKEN_KEY = "expoPushToken";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

let tokenPromise: Promise<string | null> | null = null;
let submittedTokenKey: string | null = null;

const getProjectId = () =>
  Constants.expoConfig?.extra?.eas?.projectId ||
  (Constants as any).easConfig?.projectId || 
  "fallback-project-id"; // Ensures getExpoPushTokenAsync doesn't crash if EAS isn't fully configured yet

const registerForPushNotificationsAsync = async () => {
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "ServeMate Alerts",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#ff6b35",
        sound: "default",
      });
    }

    const existingToken = await AsyncStorage.getItem(EXPO_PUSH_TOKEN_KEY);
    console.log("Existing Token:", existingToken);

    if (existingToken) {
      return existingToken;
    }

    const existingPermissions = await Notifications.getPermissionsAsync();
    let isGranted = existingPermissions.granted || existingPermissions.status === "granted";

    if (!isGranted) {
      const requestedPermissions = await Notifications.requestPermissionsAsync();
      isGranted = requestedPermissions.granted || requestedPermissions.status === "granted";
    }

    if (!isGranted) {
      console.error("Notification permission not granted!");
      return null;
    }

    const projectId = getProjectId();

    if (!projectId) {
      console.error("Project ID is missing.");
      return null;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
    await AsyncStorage.setItem(EXPO_PUSH_TOKEN_KEY, tokenData.data);
    console.log("Expo push token generated:", tokenData.data);
    return tokenData.data;
  } catch (error) {
    console.error("Error during push token generation:", error);
    return null;
  }
};

const getExpoPushToken = () => {
  if (!tokenPromise) {
    tokenPromise = registerForPushNotificationsAsync().finally(() => {
      tokenPromise = null;
    });
  }

  return tokenPromise;
};

const submitExpoPushToken = async (token: string, tokenAuth: string) => {
  try {
    const response = await fetch(`${dataCenter.apiUrl.replace('/auth', '')}/device-tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenAuth}`
      },
      body: JSON.stringify({ expo_push_token: token }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || data?.error) {
      console.error("Unable to update Expo push token:", data?.error || response.status);
    } else {
      console.log("Expo push token updated successfully:", data);
    }
  } catch (error) {
    console.error("Error updating Expo push token:", error);
  }
};

export const useExpoPushToken = (enabled = true) => {
  const tokenAuth = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (!enabled || !userId || !tokenAuth) {
      return undefined;
    }

    getExpoPushToken().then((token) => {
      if (token) {
        const nextSubmittedTokenKey = `${userId}:${token}`;
        if (submittedTokenKey === nextSubmittedTokenKey) {
          return;
        }
        submittedTokenKey = nextSubmittedTokenKey;
        submitExpoPushToken(token, tokenAuth);
      }
    });

    const notificationListener = Notifications.addNotificationReceivedListener(() => {});
    const responseListener = Notifications.addNotificationResponseReceivedListener(() => {});

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, [enabled, userId, tokenAuth]);
};
