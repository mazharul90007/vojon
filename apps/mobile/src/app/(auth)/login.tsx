import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { router } from "expo-router";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Please fill in all fields");
      setIsLoading(true);
    }

    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch {
      Alert.alert("Login failed", "Invalid email or password ");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Pressable
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={"#fff"} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.push("/register")}>
          <Text style={styles.link}>Do not have an account? Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: "#0a7ea4",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  link: {
    color: "#0a7ea4",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
});
