import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import "react-native-url-polyfill/auto";
import { router } from "expo-router";

export default function App() {
  function handlePress() {
    router.replace("/(auth)/sign-in");
  }

  return (
    <SafeAreaView className="h-full">
      <View className="my-4 mx-4">
        <ThemedText type="title">Hello, world!</ThemedText>
      </View>
      <View className="flex-1 justify-center items-center border">
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.5}
          className="border rounded-xl bg-blue-300 p-4"
        >
          <ThemedText type="subtitle">Sign In</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
