import { View, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import Listing from "@/components/Listing";
import { listing_t } from "@/lib/globalTypes";
import DropdownField from "@/components/DropdownField";
import CurrencyField from "@/components/CurrencyField";
import CustomButton from "@/components/CustomButton";

const Listings = () => {
  const { data: posts, refetch }: { data: listing_t[]; refetch: () => void } =
    useAppwrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const backgroundColor = useThemeColor({}, "background");

  const [filter, setFilter] = useState({
    paymentMethod: "",
    minPrice: 0.01,
    maxPrice: 30,
    quantity: "",
  });

  const filteredListings = posts.filter((listing) => {
    const price = listing.bid + listing.addOnPrice;
    return (
      (filter.paymentMethod === "" ||
        listing.paymentMethod === filter.paymentMethod) &&
      price >= filter.minPrice &&
      price <= filter.maxPrice &&
      (filter.quantity === "" || listing.quantity === parseInt(filter.quantity))
    );
  });

  const [filterOpen, setFilterOpen] = useState(false);

  const resetFilters = () => {
    setFilter({
      paymentMethod: "",
      minPrice: 0.01,
      maxPrice: 30,
      quantity: "",
    });
  };

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: backgroundColor,
      }}
    >
      <View className="m-4">
        <ThemedText type="title">Listings</ThemedText>
      </View>
      {filterOpen && (
        <>
          <View className="mx-4">
            <View>
              <DropdownField
                title="Payment Method"
                value={filter.paymentMethod}
                options={[
                  { label: "Any", value: "" },
                  { label: "Venmo", value: "Venmo" },
                  { label: "Zelle", value: "Zelle" },
                ]}
                setValue={(e) => setFilter({ ...filter, paymentMethod: e(0) })}
              />
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <CurrencyField
                  title="Min price"
                  value={filter.minPrice}
                  handleChangeText={(value) =>
                    setFilter({ ...filter, minPrice: value })
                  }
                  fieldStyles={{ width: "90%" }}
                />
                <CurrencyField
                  title="Max price"
                  value={filter.maxPrice}
                  handleChangeText={(value) =>
                    setFilter({ ...filter, maxPrice: value })
                  }
                  fieldStyles={{ width: "90%" }}
                />
              </View>
            </View>
            <View>
              <DropdownField
                title="Quantity"
                options={[
                  { label: "Any", value: "" },
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                ]}
                value={filter.quantity}
                setValue={(e) => setFilter({ ...filter, quantity: e(0) })}
              />
            </View>
            <TouchableOpacity onPress={resetFilters}>
              <ThemedText>Reset filters</ThemedText>
            </TouchableOpacity>
          </View>
        </>
      )}
      <CustomButton
        title={filterOpen ? "Hide filters" : "Show filters"}
        onPress={() => setFilterOpen(!filterOpen)}
      />
      <FlatList<listing_t>
        data={filteredListings}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="mt-2 mx-4">
            <Listing {...item} />
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
