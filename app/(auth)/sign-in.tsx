import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import TextField from "@/components/TextField";

import { useGlobalContext } from "@/context/GlobalProvider";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { ThemedText } from "@/components/ThemedText";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);

      const result = await getCurrentUser();

      setUser(result);
      setIsLoggedIn(true);

      router.replace("/(tabs)/listings");
    } catch (error) {
      Alert.alert("Error", "Invalid email or password");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const backgroundColor = useThemeColor({}, "background");

  const { height: viewportHeight } = useWindowDimensions();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={{
          height: "100%",
          backgroundColor: backgroundColor,
        }}
      >
        <View className="mt-[20vh]">
          <TextField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            placeholder="your email address..."
            containerStyles={styles.textFieldContainer}
          />
          <TextField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder="your password..."
            containerStyles={styles.textFieldContainer}
          />
        </View>

        <CustomButton
          title="Sign In"
          onPress={submit}
          containerStyles={{
            ...styles.buttonContainer,
            marginTop: 0.1 * viewportHeight,
            backgroundColor: backgroundColor,
          }}
          color={iconColor}
          isLoading={isSubmitting}
        />

        <View className="m-4 justify-center items-center flex-row gap-2">
          <ThemedText style={{ fontSize: 14 }}>New user?</ThemedText>
          <Link
            href="/(auth)/sign-up"
            style={{ fontWeight: "bold", color: textColor }}
          >
            Create an account.
          </Link>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textFieldContainer: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignIn;
