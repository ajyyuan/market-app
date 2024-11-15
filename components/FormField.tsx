import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "./ThemedText";

export type FormFieldProps = {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder?: string;
  containerStyles?: object;
};

const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  containerStyles,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={containerStyles}>
      <ThemedText type="subtitle">{title}</ThemedText>

      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
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
    borderWidth: 2,
    width: "100%",
    height: 64,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#7b7b8b",
  },
  textInput: {
    flex: 1,
    color: "black",
    fontWeight: 600,
    fontSize: 16,
  },
});

export default FormField;
