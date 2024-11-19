import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import CurrencyInput from "react-native-currency-input";

export type CurrencyFieldProps = {
  title: string;
  value: number;
  handleChangeText: (text: number) => void;
  containerStyles?: object;
};

const CurrencyField = ({
  title,
  value,
  handleChangeText,
  containerStyles,
}: CurrencyFieldProps) => {
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <View style={containerStyles}>
      <ThemedText type="subtitle">{title}</ThemedText>

      <View style={{ ...styles.fieldContainer, borderColor: iconColor }}>
        <CurrencyInput
          value={value}
          onChangeValue={handleChangeText}
          prefix="$"
          delimiter=","
          separator="."
          precision={2}
          keyboardType="number-pad"
          style={{
            backgroundColor: backgroundColor,
            color: textColor,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    width: "100%",
    height: 64,
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

export default CurrencyField;
