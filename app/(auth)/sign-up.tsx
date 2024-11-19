import { Alert, StyleSheet, useWindowDimensions, View } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import TextField from "@/components/TextField";

import { useGlobalContext } from "@/context/GlobalProvider";
import { createUser } from "@/lib/appwrite";
import { ThemedText } from "@/components/ThemedText";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      setUser(result);
      setIsLoggedIn(true);

      router.replace("/(tabs)/listings");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");
  const backgroundColor = useThemeColor({}, "background");

  const { height: viewportHeight } = useWindowDimensions();

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: backgroundColor,
      }}
    >
      <View className="mt-[10vh]">
        <TextField
          title="Username"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          placeholder="your username..."
          containerStyles={styles.textFieldContainer}
        />
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
        title="Sign Up"
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
        <ThemedText style={{ fontSize: 14 }}>
          Already have an account?
        </ThemedText>
        <Link
          href="/(auth)/sign-in"
          style={{ fontWeight: "bold", color: textColor }}
        >
          Sign in.
        </Link>
      </View>
    </SafeAreaView>
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

export default SignUp;
