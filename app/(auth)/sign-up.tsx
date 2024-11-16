import { Alert, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import FormField from "@/components/FormField";

import { useGlobalContext } from "@/context/GlobalProvider";
import { createUser } from "@/lib/appwrite";

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

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: backgroundColor,
      }}
    >
      <FormField
        title="Username"
        value={form.username}
        handleChangeText={(e) => setForm({ ...form, username: e })}
        placeholder="your username..."
        containerStyles={styles.formFieldContainer}
      />
      <FormField
        title="Email"
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        placeholder="your email address..."
        containerStyles={styles.formFieldContainer}
      />
      <FormField
        title="Password"
        value={form.password}
        handleChangeText={(e) => setForm({ ...form, password: e })}
        placeholder="your password..."
        containerStyles={styles.formFieldContainer}
      />
      <CustomButton
        title="Sign Up"
        onPress={submit}
        containerStyles={`mt-[40vh] justify-center items-center ${tintColor}`}
        color={iconColor}
        isLoading={isSubmitting}
      />
      <View className="m-4 justify-center items-center">
        <Link href="/(auth)/sign-in" style={{ color: textColor }}>
          Already have an account? Sign in.
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formFieldContainer: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});

export default SignUp;
