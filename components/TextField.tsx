import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export type TextFieldProps = {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  containerStyles?: object;
  fieldStyles?: object;
};

const TextField = ({
  title,
  value,
  handleChangeText,
  keyboardType,
  placeholder,
  containerStyles,
  fieldStyles,
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");

  return (
    <View style={containerStyles}>
      <ThemedText type="subtitle">{title}</ThemedText>

      <View
        style={{
          ...styles.fieldContainer,
          ...fieldStyles,
          borderColor: iconColor,
        }}
      >
        <TextInput
          style={{ ...styles.textInput, color: textColor }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
          returnKeyLabel="Done"
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={!showPassword ? "eye-outline" : "eye-off"}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    width: "100%",
    padding: 16,
    borderWidth: 2,
    borderRadius: 16,
    marginTop: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    fontWeight: 600,
    fontSize: 16,
  },
});

export default TextField;
