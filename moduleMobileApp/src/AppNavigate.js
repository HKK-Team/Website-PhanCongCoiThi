import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./components/HomePage";
import SearchSchudele from "./components/SearchSchudele";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SchudeleExams from "./components/SchudeleExams";
const Stack = createNativeStackNavigator();

export default function AppNavigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Trang chủ">
        <Stack.Screen name="Trang chủ" component={HomePage} />
        <Stack.Screen name="Tìm lịch thi" component={SearchSchudele} />
        <Stack.Screen name="Lịch thi" component={SchudeleExams} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
