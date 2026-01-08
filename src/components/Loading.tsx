import React from "react";
import { ActivityIndicator, View, Text } from "react-native";

type Props = {
  message?: string;
};

export default function Loading({ message = "Loading..." }: Props) {
  return (
    <View style={{ padding: 16, gap: 12, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
      <Text>{message}</Text>
    </View>
  );
}
