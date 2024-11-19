import { SafeAreaView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import "react-native-url-polyfill/auto";
import { Redirect, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/(tabs)/listings" />;

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
        onPress={() => router.replace("/(auth)/sign-in")}
        containerStyles={{
          ...styles.container,
          backgroundColor: backgroundColor,
        }}
        color={iconColor}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
