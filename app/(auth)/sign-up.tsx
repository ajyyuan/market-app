import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const handlePress = () => {
    router.replace("/(tabs)/listings");
  };

  return (
    <SafeAreaView>
      <View className="my-4 mx-4">
        <TouchableOpacity onPress={handlePress}>
          <ThemedText type="subtitle">Sign Up</ThemedText>
        </TouchableOpacity>
      </View>
      <View className="my-4 mx-4">
        <Link href="/(auth)/sign-in">Already have an account? Sign in.</Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
