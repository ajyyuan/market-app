import { View, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

interface Post {
  $id: string;
  eatery: string;
  order: string;
  addOnPrice: number;
  bid: number;
  quantity: number;
  createdAt: string;
  paymentMethod: string;
  mode: string;
}

const Profile = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  function handlePress() {
    router.replace("/sign-in");
  }

  return (
    <SafeAreaView className="h-full">
      <FlatList<Post>
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="mt-2 mx-4">
            <ThemedText>
              {`${item.eatery}: ${item.order}, ${item.addOnPrice}, ${item.bid}, ${item.quantity}, ${item.createdAt}, ${item.paymentMethod}, ${item.mode}`}
            </ThemedText>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="m-4">
            <ThemedText type="title">Profile</ThemedText>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="m-4">
            <ThemedText>No Profile</ThemedText>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <CustomButton
        title="Sign Out"
        onPress={handlePress}
        containerStyles="justify-center items-center"
      />
    </SafeAreaView>
  );
};

export default Profile;
