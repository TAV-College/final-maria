import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import type { MealPreview } from "../types/mealdb";

type Props = {
  meal: MealPreview;
  onPress: () => void;
};

export default function MealCard({ meal, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          padding: 12,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#ddd",
          backgroundColor: "#fff",
          opacity: pressed ? 0.8 : 1,
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
        },
      ]}
    >
      <Image source={{ uri: meal.strMealThumb }} style={{ width: 64, height: 64, borderRadius: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "700" }} numberOfLines={2}>
          {meal.strMeal}
        </Text>
      </View>
    </Pressable>
  );
}
