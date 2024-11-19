import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import DropDownPicker from "react-native-dropdown-picker";

export type DropdownFieldProps = {
  title: string;
  value: any;
  options: any[];
  setValue: (text: any) => void;
  containerStyles?: object;
};

const DropdownField = ({
  title,
  value,
  options,
  setValue,
  containerStyles,
}: DropdownFieldProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);

  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <View style={containerStyles}>
      <ThemedText type="subtitle">{title}</ThemedText>

      <View style={{ ...styles.fieldContainer, borderColor: iconColor }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{ borderWidth: 0, backgroundColor: backgroundColor }}
          labelStyle={{ color: textColor }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    width: "100%",
    height: 64,
    borderWidth: 2,
    borderRadius: 16,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default DropdownField;
