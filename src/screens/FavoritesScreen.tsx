import React from "react";
import { FlatList, View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";
import { useFavorites } from "../context/FavoritesContext";
import MealCard from "../components/MealCard";

type Props = NativeStackScreenProps<RootStackParamList, "Favorites">;

export default function FavoritesScreen({ navigation }: Props) {
  const { favorites } = useFavorites();

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, gap: 12 }}
      data={favorites}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <MealCard
          meal={item}
          onPress={() => navigation.navigate("MealDetails", { mealId: item.idMeal, preview: item })}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={
        <View style={{ paddingTop: 24, gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "800" }}>No favorites yet</Text>
          <Text>Open a meal and tap the favorite button.</Text>
        </View>
      }
    />
  );
}
