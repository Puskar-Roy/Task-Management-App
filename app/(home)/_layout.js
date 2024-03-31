import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import Sidebar from "../../components/Sidebar";

export default function Layout() {
  return (
    <Provider store={store}>
      <View className="flex flex-row h-screen">
        <StatusBar
          bg-gray-200
          min-h-full
          style="auto"
          backgroundColor="#667eea"
        />
        <Sidebar />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="allTasks" />
          <Stack.Screen name="addTasks" />
          <Stack.Screen name="pendingTask" />
          <Stack.Screen name="deployedTask" />
        </Stack>
      </View>
    </Provider>
  );
}
