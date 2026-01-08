import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";
import { fetchMealsByCategory } from "../api/mealdb";
import type { MealPreview } from "../types/mealdb";
import Loading from "../components/Loading";
import MealCard from "../components/MealCard";
import ErrorState from "../components/ErrorState";

type Props = NativeStackScreenProps<RootStackParamList, "Meals">;

export default function MealsScreen({ route, navigation }: Props) {
  const { category } = route.params;

  const [meals, setMeals] = useState<MealPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({ title: category });
  }, [category, navigation]);

  const load = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchMealsByCategory(category);
      setMeals(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

  }, [category]);

  if (loading) return <Loading message="Loading meals..." />;

  if (error) return <ErrorState message={error} onRetry={load} />;

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, gap: 12 }}
      data={meals}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <MealCard
          meal={item}
          onPress={() => navigation.navigate("MealDetails", { mealId: item.idMeal, preview: item })}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={
        <View style={{ paddingTop: 24 }}>
          <Text>No meals found.</Text>
        </View>
      }
    />
  );
}
