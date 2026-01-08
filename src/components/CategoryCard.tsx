import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import type { Category } from "../types/mealdb";

type Props = {
  category: Category;
  onPress: () => void;
};

export default function CategoryCard({ category, onPress }: Props) {
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
      <Image
        source={{ uri: category.strCategoryThumb }}
        style={{ width: 64, height: 64, borderRadius: 10 }}
      />

      <View style={{ flex: 1, gap: 6 }}>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>{category.strCategory}</Text>
        <Text numberOfLines={2} style={{ color: "#555" }}>
          {category.strCategoryDescription}
        </Text>
      </View>
    </Pressable>
  );
}
