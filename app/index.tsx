import { SafeAreaView, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import "react-native-url-polyfill/auto";
import { Redirect, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/(tabs)/listings" />;

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
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}
