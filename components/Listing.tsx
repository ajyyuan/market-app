import { Image, StyleSheet, View } from "react-native";
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

  return { time, date };
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ThemedText type="subtitle">{eatery}</ThemedText>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: buyer?.avatar }}
            style={styles.avatarImg}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ThemedText type="defaultSemiBold">{`\$${bid}`}</ThemedText>
        <ThemedText type="defaultSemiBold">
          {`(${quantity} block${quantity > 1 ? "s" : ""} + \$${addOnPrice})`}
        </ThemedText>
      </View>
      <ThemedText>{order}</ThemedText>
      {/* <ThemedText>{paymentMethod}</ThemedText> */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ThemedText>{mode}</ThemedText>
        <View style={{ flexDirection: "row" }}>
          <ThemedText style={{ fontSize: 12 }}>
            {formatDate(createdAt).time}
          </ThemedText>
          <ThemedText style={{ fontSize: 12 }}> | </ThemedText>
          <ThemedText style={{ fontSize: 12 }}>
            {formatDate(createdAt).date}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 16,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImg: {
    width: "95%",
    height: "95%",
    borderRadius: 8,
  },
});

export default Listing;
