import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

const Messages = () => {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: backgroundColor,
      }}
    >
      <View className="m-4">
        <ThemedText type="title">Messages</ThemedText>
      </View>
    </SafeAreaView>
  );
};

export default Messages;
