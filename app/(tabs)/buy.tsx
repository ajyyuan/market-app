import {
  Alert,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import TextField from "@/components/TextField";
import DropdownField from "@/components/DropdownField";

import CurrencyField from "@/components/CurrencyField";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { createListing } from "@/lib/appwrite";

const Buy = () => {
  const { user } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    eatery: "",
    order: "",
    addOnPrice: 0,
    bid: 0,
    quantity: 1,
    paymentMethod: "",
    mode: "",
  });

  const submit = async () => {
    if (
      form.eatery === "" ||
      form.order === "" ||
      form.paymentMethod === "" ||
      form.mode === ""
    ) {
      return Alert.alert("Please fill in all the fields");
    }
    if (form.addOnPrice < 0 || form.addOnPrice > 10) {
      return Alert.alert("Add-on price must be between 0 and 10");
    }
    if (form.bid < 0.01 || form.bid > 100) {
      return Alert.alert("Bid must be between 0.01 and 100");
    }
    if (form.quantity !== 1 && form.quantity !== 2) {
      return Alert.alert("Quantity must be either 1 or 2");
    }

    setIsSubmitting(true);

    try {
      await createListing({
        ...form,
        buyer: user.$id,
      });

      Alert.alert("Success", "Bid posted");
      router.push("/listings");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } finally {
      setForm({
        eatery: "",
        order: "",
        addOnPrice: 0,
        bid: 0,
        quantity: 1,
        paymentMethod: "",
        mode: "",
      });

      setIsSubmitting(false);
    }
  };

  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={{
          height: "100%",
          backgroundColor: backgroundColor,
        }}
      >
        <View className="m-4 mb-0">
          <ThemedText type="title">Buy</ThemedText>
        </View>

        <ScrollView className="m-4 pt-4">
          <TextField
            title="Eatery"
            value={form.eatery}
            handleChangeText={(e) => setForm({ ...form, eatery: e })}
          />
          <TextField
            title="Order"
            value={form.order}
            handleChangeText={(e) => setForm({ ...form, order: e })}
          />
          <TextField
            title="Add-ons ($)"
            value={form.addOnPrice.toString()}
            handleChangeText={(e) =>
              setForm({ ...form, addOnPrice: e === "" ? 0 : parseInt(e) })
            }
            keyboardType="number-pad"
          />
          <CurrencyField
            title="Bid"
            value={form.bid}
            handleChangeText={(e) => setForm({ ...form, bid: e ?? 0 })}
          />
          <DropdownField
            title="Quantity"
            value={form.quantity}
            options={[
              { label: "1", value: 1 },
              { label: "2", value: 2 },
            ]}
            setValue={(e) => setForm({ ...form, quantity: e(0) })}
          />
          <DropdownField
            title="Payment Method"
            value={form.paymentMethod}
            options={[
              { label: "Venmo", value: "Venmo" },
              { label: "Zelle", value: "Zelle" },
              { label: "any", value: "any" },
            ]}
            setValue={(e) => setForm({ ...form, paymentMethod: e(0) })}
          />
          <DropdownField
            title="Mode"
            value={form.mode}
            options={[
              { label: "Remote", value: "remote" },
              { label: "In-Person", value: "in_person" },
            ]}
            setValue={(e) => setForm({ ...form, mode: e(0) })}
          />
          <CustomButton
            title="Make bid"
            onPress={submit}
            isLoading={isSubmitting}
            containerStyles={{ marginTop: 40 }}
            color={tintColor}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Buy;
