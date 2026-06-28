import axios from "axios";
import { Platform } from "react-native";

function getApiBaseUrl(): string | undefined {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!envUrl) return undefined;

  if (Platform.OS === "android") {
    return envUrl.replace("localhost", "10.0.2.2");
  }

  return envUrl;
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});
