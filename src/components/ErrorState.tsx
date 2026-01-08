import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "800" }}>Error</Text>
      <Text style={{ color: "#b00020" }}>{message}</Text>

      {onRetry ? (
        <Pressable
          onPress={onRetry}
          style={{
            padding: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ fontWeight: "700" }}>Try again</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
