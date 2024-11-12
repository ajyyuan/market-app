import { TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

export type CustomButtonProps = {
  title: string;
  onPress: () => void;
  containerStyles?: string;
};

const CustomButton = ({
  title,
  onPress,
  containerStyles,
}: CustomButtonProps) => {
  return (
    <View className={containerStyles}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        className="border rounded-xl bg-blue-300 p-4"
      >
        <ThemedText type="subtitle">{title}</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
