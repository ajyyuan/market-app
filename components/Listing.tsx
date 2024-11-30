import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "./ThemedText";
import {
  listing_t,
  modeLabels,
  listingStatus_t,
  user_t,
} from "@/lib/globalTypes";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomButton from "./CustomButton";
import { colorNameToHex, dullColor, invertColor } from "@/lib/colorsTools";
import { router } from "expo-router";

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
  viewer,
  eatery,
  order,
  addOnPrice,
  bid,
  quantity,
  createdAt,
  paymentMethod,
  mode,
  status,
  buyer,
  seller,
}: listing_t & { viewer: user_t }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);

  const requestToSell = () => {
    // request to sell
  };

  const cancel = () => {
    // cancel
  };

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;

    if (layoutHeight > 0 && layoutHeight !== height) {
      setHeight(layoutHeight);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const animatedHeight = isExpanded ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight,
    };
  });

  const iconColor = useThemeColor({}, "icon");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View
        style={{
          ...styles.container,
          flexDirection: "row",
          borderColor: iconColor,
          backgroundColor:
            status === listingStatus_t.Open
              ? backgroundColor
              : status === listingStatus_t.Pending
              ? dullColor(colorNameToHex("yellow"))
              : status === listingStatus_t.Sold
              ? dullColor(colorNameToHex("green"))
              : dullColor(backgroundColor),
        }}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={
              isExpanded ? "chevron-collapse-outline" : "chevron-expand-outline"
            }
            size={12}
            color={iconColor}
          />
        </View>
        <View style={{ flex: 1, paddingTop: 8 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <ThemedText type="subtitle">{`${eatery}`}</ThemedText>
              <ThemedText> | </ThemedText>
              <ThemedText style={{ fontSize: 12 }}>
                {modeLabels[mode].toUpperCase()}
              </ThemedText>
            </View>
            <TouchableOpacity
              onPress={() => {
                const buyerAccountId = buyer?.accountId;
                router.push(`/profile/${buyerAccountId}`);
              }}
              activeOpacity={0.8}
            >
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: buyer?.avatar }}
                  style={styles.avatarImg}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          </View>
          {status !== listingStatus_t.Open && !isExpanded ? (
            <View>
              <ThemedText style={{ fontSize: 12 }}>
                {status.toUpperCase()}
              </ThemedText>
            </View>
          ) : (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <ThemedText type="defaultSemiBold">{`\$${bid}`}</ThemedText>
              <ThemedText type="defaultSemiBold">
                {`(${quantity} block${
                  quantity > 1 ? "s" : ""
                } + \$${addOnPrice})`}
              </ThemedText>
            </View>
          )}
          <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
            <View
              onLayout={onLayout}
              style={{ position: "absolute", width: "100%" }}
            >
              <ThemedText>{order}</ThemedText>
              {status === listingStatus_t.Open &&
                (viewer.$id === buyer.$id ? (
                  <CustomButton
                    title="Cancel"
                    onPress={cancel}
                    containerStyles={{ marginTop: 8 }}
                    buttonStyles={{
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                ) : (
                  <CustomButton
                    title="Sell"
                    onPress={requestToSell}
                    containerStyles={{ marginTop: 8 }}
                    buttonStyles={{
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                ))}
            </View>
          </Animated.View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ThemedText style={{ fontSize: 12 }}>
              {`Accepts: ${paymentMethod}`}
            </ThemedText>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 8,
    borderWidth: 2,
    borderRadius: 16,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
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
