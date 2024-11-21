import { View, FlatList, RefreshControl } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import Listing from "@/components/Listing";
import { listing_t } from "@/lib/globalTypes";

const Listings = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: backgroundColor,
      }}
    >
      <FlatList<listing_t>
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="mt-2 mx-4">
            <Listing {...item} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="m-4">
            <ThemedText type="title">Listings</ThemedText>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="m-4">
            <ThemedText>No Listings</ThemedText>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Listings;
