import { SafeAreaView, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import "react-native-url-polyfill/auto";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function App() {
  function handlePress() {
    router.replace("/(auth)/sign-in");
  }

  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: backgroundColor,
      }}
    >
      <View className="m-4">
        <ThemedText type="title">Hello, world!</ThemedText>
      </View>
      <CustomButton
        title="Sign In"
        onPress={handlePress}
        containerStyles={`flex-1 justify-center items-center border bg-[${tintColor}]`}
        color={iconColor}
      />
    </SafeAreaView>
  );
}
