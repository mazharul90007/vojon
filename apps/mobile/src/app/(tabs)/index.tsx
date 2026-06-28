import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { HealthCheckResponse } from "@vojon/types";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const {
    data: health,
    isLoading,
    error,
  } = useQuery<HealthCheckResponse>({
    queryKey: ["health"],
    queryFn: () =>
      api.get<HealthCheckResponse>("/health").then((res) => res.data),
  });
  return (
    <View style={styles.container}>
      <Text>VOJON</Text>
      <Text>Connection Text</Text>

      <View style={styles.healthCheckContainer}>
        {isLoading && <ActivityIndicator size={"large"} color="#ff6b35" />}
        {health && (
          <View>
            <Text>API status: {health.status}</Text>
            <Text>
              Timestamp: {new Date(health.timestamp).toLocaleString()}
            </Text>
          </View>
        )}
        {error && (
          <View>
            <Text>Sorry! Could not connect to the API.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  healthCheckContainer: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
