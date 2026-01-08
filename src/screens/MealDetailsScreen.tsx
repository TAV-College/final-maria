import React, { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";
import { fetchMealDetails } from "../api/mealdb";
import type { MealDetails } from "../types/mealdb";
import { parseIngredients } from "../utils/parseIngredients";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import IngredientRow from "../components/IngredientRow";
import FavoriteButton from "../components/FavoriteButton";

type Props = NativeStackScreenProps<RootStackParamList, "MealDetails">;

export default function MealDetailsScreen({ route, navigation }: Props) {
  const { mealId, preview } = route.params;

  const [meal, setMeal] = useState<MealDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ingredients = useMemo(() => (meal ? parseIngredients(meal) : []), [meal]);

  const load = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchMealDetails(mealId);
      setMeal(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: preview?.strMeal ?? "Meal Details" });
  }, [navigation, preview?.strMeal]);

  useEffect(() => {
    load();
  }, [mealId]);

  if (loading) return <Loading message="Loading details..." />;

  if (error) return <ErrorState message={error} onRetry={load} />;

  if (!meal) return <ErrorState message="Meal not found." onRetry={load} />;

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
      <Image
        source={{ uri: meal.strMealThumb }}
        style={{ width: "100%", height: 220, borderRadius: 14 }}
      />

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 22, fontWeight: "800", flex: 1, paddingRight: 12 }}>
          {meal.strMeal}
        </Text>

        <FavoriteButton
          meal={{
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
          }}
        />
      </View>

      <Text style={{ color: "#555" }}>
        {meal.strCategory ? `Category: ${meal.strCategory}` : ""}
        {meal.strArea ? `  •  Area: ${meal.strArea}` : ""}
      </Text>

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "800" }}>Ingredients</Text>

        {ingredients.map((ing) => (
          <IngredientRow key={`${meal.idMeal}-${ing.name}`} ingredient={ing} />
        ))}
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "800" }}>Instructions</Text>
        <Text style={{ lineHeight: 20 }}>{meal.strInstructions ?? "No instructions."}</Text>
      </View>
    </ScrollView>
  );
}
