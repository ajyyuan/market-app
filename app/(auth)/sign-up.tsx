import { View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";

const SignUp = () => {
  const handlePress = () => {
    router.replace("/(tabs)/listings");
  };

  const textColor = useThemeColor({}, "text");
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
      <CustomButton
        title="Sign Up"
        onPress={handlePress}
        containerStyles={`mt-[40vh] justify-center items-center ${tintColor}`}
        color={iconColor}
      />
      <View className="m-4 justify-center items-center">
        <Link href="/(auth)/sign-in" style={{ color: textColor }}>
          Already have an account? Sign in.
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
