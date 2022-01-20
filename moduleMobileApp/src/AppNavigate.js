import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ChangeProfiles from "./components/ChangeProfiles";
import HomePage from "./components/HomePage";
import Profiles from "./components/Profiles";
import SchudeleExams from "./components/SchudeleExams";
import SearchSchudele from "./components/SearchSchudele";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigate() {
  const [isLogin, setIslogin] = useState(false);
  useEffect(() => {
    const getItem = async () => {
      setIslogin(await AsyncStorage.getItem("UserLogin"));
    };
    getItem();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={`${isLogin ? "Menu" : "Trang chủ"}`}>
        <Stack.Screen name="Trang chủ" component={HomePage} />
        <Stack.Screen name="Tìm lịch thi" component={SearchSchudele} />
        <Stack.Screen name="Menu" component={TabPage} />
        <Stack.Screen name="Tài khoản" component={ChangeProfiles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export function TabPage() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Lịch Thi"
        component={SchudeleExams}
        options={{
          tabBarLabel: "Lịch Thi",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-list"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profiles"
        component={Profiles}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
