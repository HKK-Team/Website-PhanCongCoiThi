import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./components/HomePage";
import SearchSchudele from "./components/SearchSchudele";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function AppNavigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SearchSchudele" component={SearchSchudele} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
