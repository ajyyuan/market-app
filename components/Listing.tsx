import { StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { listing_t } from "@/lib/globalTypes";

const formatDate = (dateTime: string) => {
  const adjustedDateTime = new Date(dateTime).toLocaleString();

  const firstSlashIndex = adjustedDateTime.indexOf("/");
  const date = adjustedDateTime.substring(0, firstSlashIndex + 3);

  const time =
    adjustedDateTime.substring(
      firstSlashIndex + 10,
      adjustedDateTime.length - 6
    ) +
    " " +
    adjustedDateTime.substring(adjustedDateTime.length - 2);

  return time + " (" + date + ")";
};

const Listing = ({
  eatery,
  order,
  addOnPrice,
  bid,
  quantity,
  createdAt,
  paymentMethod,
  mode,
  buyer,
}: listing_t) => {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">{eatery}</ThemedText>
      <ThemedText type="defaultSemiBold">
        {`${order}, ${addOnPrice}, ${bid}, ${quantity}, ${formatDate(
          createdAt
        )}, ${paymentMethod}, ${mode}, ${buyer.username}`}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 16,
  },
});

export default Listing;
