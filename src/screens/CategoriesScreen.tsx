import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { fetchCategories } from "../api/mealdb";
import type { Category } from "../types/mealdb";
import CategoryCard from "../components/CategoryCard";
import Loading from "../components/Loading";
import type { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Categories">;

export default function CategoriesScreen({ navigation }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchCategories();
        if (isMounted) setCategories(data);
      } catch (e) {
        if (isMounted) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Favorites")} style={{ padding: 8 }}>
          <Text style={{ fontWeight: "700" }}>Favorites</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  if (loading) return <Loading message="Loading categories..." />;

  if (error) {
    return (
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>Something went wrong</Text>
        <Text style={{ color: "#b00020" }}>{error}</Text>

        <Pressable
          onPress={() => {
           
            setLoading(true);
            setError(null);
            fetchCategories()
              .then(setCategories)
              .catch((e) => setError(e instanceof Error ? e.message : "Unknown error"))
              .finally(() => setLoading(false));
          }}
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
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, gap: 12 }}
      data={categories}
      keyExtractor={(item) => item.idCategory} 
      renderItem={({ item }) => (
        <CategoryCard
          category={item}
          onPress={() => navigation.navigate("Meals", { category: item.strCategory })}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}
