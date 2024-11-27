import { View, FlatList, RefreshControl, Image } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser, getUserPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

import { ThemedText } from "@/components/ThemedText";
import InfoBox from "@/components/InfoBox";

import { useGlobalContext } from "@/context/GlobalProvider";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { listing_t } from "@/lib/globalTypes";
import Listing from "@/components/Listing";

const Profile = () => {
  const { user } = useGlobalContext();

  const { user: profileId } = useLocalSearchParams<{ user: string }>();

  const { data: profile, isLoading: profileLoading } = useAppwrite(() =>
    getUser(profileId)
  );

  const {
    data: posts,
    refetch,
    isLoading: postsLoading,
  } = useAppwrite(() => getUserPosts(profile.$id));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    refetch();
  }, [profile]);

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
            <View className="w-16 h-16 border rounded-lg justify-center items-center">
              <Image
                source={{ uri: profile?.avatar }}
                className="w-[95%] h-[95%] rounded-lg"
                resizeMode="cover"
              />
              {/* if blocks sold > [_], show "blocks sold: ..." */}
              {/* MAKE A LEADERBOARD??! */}
            </View>
            <InfoBox title={profile?.username} containerStyles="mt-4" />
            <View>
              {profile?.rating ? (
                <StarRatingDisplay rating={profile.rating} starSize={20} />
              ) : (
                <ThemedText>No rating yet.</ThemedText>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="m-4">
            {profileLoading || postsLoading ? (
              <ThemedText>Loading...</ThemedText>
            ) : (
              <ThemedText>No Listings</ThemedText>
            )}
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
