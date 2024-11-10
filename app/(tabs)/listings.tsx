import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Listings = () => {
  return (
    <SafeAreaView>
      <View className="my-4 mx-4">
        <Text className="text-3xl font-bold">Listings</Text>
      </View>
    </SafeAreaView>
  );
};

export default Listings;
