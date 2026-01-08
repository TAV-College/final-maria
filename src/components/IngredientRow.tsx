import React from "react";
import { Text, View } from "react-native";
import type { Ingredient } from "../types/mealdb";

type Props = {
  ingredient: Ingredient;
};

export default function IngredientRow({ ingredient }: Props) {
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#eee",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <Text style={{ fontWeight: "700", flex: 1 }}>{ingredient.name}</Text>
      <Text style={{ color: "#555" }}>{ingredient.measure}</Text>
    </View>
  );
}
