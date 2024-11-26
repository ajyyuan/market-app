import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserPosts, signOut } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemedText } from "@/components/ThemedText";
import InfoBox from "@/components/InfoBox";

import { useGlobalContext } from "@/context/GlobalProvider";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { listing_t } from "@/lib/globalTypes";
import Listing from "@/components/Listing";

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
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  const iconColor = useThemeColor({}, "icon");
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
            <Listing {...item} viewer={user} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Ionicons name="log-out-outline" size={24} color={iconColor} />
            </TouchableOpacity>
            <View className="w-16 h-16 border rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[95%] h-[95%] rounded-lg"
                resizeMode="cover"
              />
              {/* if blocks sold > [_], show "blocks sold: ..." */}
              {/* MAKE A LEADERBOARD??! */}
            </View>
            <InfoBox title={user?.username} containerStyles="mt-4" />
            <View className="flex-row">
              <StarRatingDisplay rating={user.rating} starSize={20} />
            </View>
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
    </SafeAreaView>
  );
};

export default Profile;
