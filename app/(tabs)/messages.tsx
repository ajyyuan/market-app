import { FlatList, RefreshControl, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useGlobalContext } from "@/context/GlobalProvider";
import { chat_t } from "@/lib/globalTypes";
import useAppwrite from "@/lib/useAppwrite";
import { getUserChats } from "@/lib/appwrite";
import { splitDateTime } from "@/components/Listing";

const Messages = () => {
  const { user } = useGlobalContext();

  const { data: chats, refetch } = useAppwrite(() =>
    getUserChats(user.accountId)
  );

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
      <View className="m-4">
        <ThemedText type="title">Messages</ThemedText>
      </View>
      <FlatList<chat_t>
        data={chats}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          // console.log(item);
          // console.log(item.self);
          // console.log(item.members && item.members[0]);

          return (
            <View className="m-4">
              <View>
                <ThemedText>{`${item.other1.username}`}</ThemedText>
              </View>
              <View className="flex-row justify-between">
                <ThemedText>{`${item.lastSender}: ${item.lastMessage}`}</ThemedText>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <ThemedText style={{ fontSize: 12 }}>
                    {splitDateTime(item.lastMessageTime).time}
                  </ThemedText>
                  <ThemedText style={{ fontSize: 12 }}> | </ThemedText>
                  <ThemedText style={{ fontSize: 12 }}>
                    {splitDateTime(item.lastMessageTime).date}
                  </ThemedText>
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <View>
            <ThemedText>You have no messages</ThemedText>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Messages;
