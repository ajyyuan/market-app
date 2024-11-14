import { TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

export type CustomButtonProps = {
  title: string;
  onPress: () => void;
  containerStyles?: string;
  color?: string;
};

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  color,
}: CustomButtonProps) => {
  return (
    <View className={containerStyles}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          backgroundColor: `${color}`,
          padding: 16,
        }}
      >
        <ThemedText type="subtitle">{title}</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
