import { TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

export type CustomButtonProps = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  containerStyles?: object;
  buttonStyles?: object;
  color?: string;
  textColor?: string;
};

const CustomButton = ({
  title,
  onPress,
  isLoading,
  containerStyles,
  buttonStyles,
  color,
  textColor,
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
          ...buttonStyles,
        }}
        disabled={isLoading}
      >
        {textColor ? (
          <ThemedText type="subtitle" style={{ color: `${textColor}` }}>
            {title}
          </ThemedText>
        ) : (
          <ThemedText type="subtitle">{title}</ThemedText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
