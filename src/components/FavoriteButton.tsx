import React from "react";
import { Pressable, Text } from "react-native";
import type { MealPreview } from "../types/mealdb";
import { useFavorites } from "../context/FavoritesContext";

type Props = {
  meal: MealPreview;
};

export default function FavoriteButton({ meal }: Props) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(meal.idMeal);

  return (
    <Pressable
      onPress={() => (fav ? removeFavorite(meal.idMeal) : addFavorite(meal))}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#ddd",
      }}
    >
      <Text style={{ fontWeight: "800" }}>{fav ? "★" : "☆"}</Text>
    </Pressable>
  );
}
