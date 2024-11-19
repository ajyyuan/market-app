import { TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

export type CustomButtonProps = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  containerStyles?: object;
  color?: string;
};

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  color,
  isLoading,
}: CustomButtonProps) => {
  return (
    <View style={containerStyles}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          backgroundColor: `${color}`,
          padding: 16,
          opacity: isLoading ? 0.5 : 1,
        }}
        disabled={isLoading}
      >
        <ThemedText type="subtitle">{title}</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
