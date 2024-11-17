import { StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

export type InfoBoxProps = {
  title: string;
  subtitle?: string;
  containerStyles?: string;
};

const InfoBox = ({ title, subtitle, containerStyles }: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontWeight: "semibold",
  },
});

export default InfoBox;
