import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

const SignIn = () => {
  const handlePress = () => {
    router.replace("/(tabs)/listings");
  };

  return (
    <SafeAreaView className="h-full">
      <CustomButton
        title="Sign In"
        onPress={handlePress}
        containerStyles="justify-center items-center"
      />
      <View className="m-4 justify-center items-center">
        <Link href="/(auth)/sign-up">New user? Create an account.</Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
