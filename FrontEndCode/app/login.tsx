import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import AppButton from "@/components/navigation/AppButton";
import { Link, useRouter } from "expo-router";
import BackButton from "@/components/navigation/BackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;

  // Define the type for login data
  type LoginData = {
    emailOrUsername: string;
    password: string;
  };

  // Add state to manage form inputs and error messages
  const [loginData, setLoginData] = useState<LoginData>({
    emailOrUsername: "",
    password: "",
  });
  const [isLoginButtonEnabled, setIsLoginButtonEnabled] = useState(false);
  const [error, setError] = useState("");

  // Function to handle field changes
  const handleLoginInputChange = (field: keyof LoginData, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
    const allFieldsFilled = Object.values({
      ...loginData,
      [field]: value,
    }).every((val) => val.trim() !== "");
    setIsLoginButtonEnabled(allFieldsFilled);
  };

  // Function to handle login submission
  const onSignIn = async () => {
    console.log(loginData);
    try {
      const response = await fetch(
        "https://bubblewomenserver-50023240811.development.catalystappsail.in/api/login",
        // "http://localhost:9000/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: loginData.emailOrUsername,
            password: loginData.password,
          }),
          // mode: "no-cors",
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const { token } = data; // Adjust this according to your response structure
        await AsyncStorage.setItem("jwtToken", token);

        router.push("/AppDashboard");
      } else {
        setError("Email/username or password does not match");
      }
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrapper}>
          {/* Back Button */}
          <View
            style={[
              styles.backButtonWrapper,
              Platform.OS === "web" ? { left: screenWidth * 0.5 - 200 } : {},
            ]}
          >
            <BackButton />
          </View>

          {/* Image */}
          <Image
            source={require("@/assets/images/login.png")}
            style={styles.image}
            resizeMode="contain"
          />

          {/* Form */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>
              Enter your details to sign in to your account
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email or username"
              placeholderTextColor="#463f3a"
              value={loginData.emailOrUsername}
              onChangeText={(value) =>
                handleLoginInputChange("emailOrUsername", value)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Passcode"
              placeholderTextColor="#463f3a"
              secureTextEntry={true}
              value={loginData.password}
              onChangeText={(value) =>
                handleLoginInputChange("password", value)
              }
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <AppButton
              title="Sign in"
              onPress={onSignIn}
              disabled={!isLoginButtonEnabled}
            />
            <Text style={styles.footerText}>
              Don't Have an account?
              <Link style={styles.registerLink} href={"/register"}>
                {" "}
                Register
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  backButtonWrapper: {
    position: "absolute",
    top: 20,
    zIndex: 10,
    ...Platform.select({
      web: {
        top: 20,
      },
      ios: {
        top: 50,
        left: 20,
      },
      android: {
        top: 50,
        left: 20,
      },
    }),
  },
  image: {
    width: "100%",
    height: "48%",
    marginBottom: 0,
    paddingBottom: 0,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 0,
    paddingTop: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#6b6b6b",
  },
  input: {
    borderWidth: 1,
    borderColor: "#463f3a",
    borderRadius: 7,
    paddingVertical: 14,
    paddingHorizontal: 24,
    fontSize: 16,
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
  },
  registerLink: {
    color: "#000000",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default Login;
