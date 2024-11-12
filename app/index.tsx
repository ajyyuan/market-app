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
import CustomButton from "@/components/CustomButton";

export default function App() {
  function handlePress() {
    router.replace("/(auth)/sign-in");
  }

  return (
    <SafeAreaView className="h-full">
      <View className="m-4">
        <ThemedText type="title">Hello, world!</ThemedText>
      </View>
      <CustomButton
        title="Sign In"
        onPress={handlePress}
        containerStyles="flex-1 justify-center items-center border"
      />
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
