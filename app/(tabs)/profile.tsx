import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView>
      <View className="my-4 mx-4">
        <Text className="text-3xl font-bold">Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
