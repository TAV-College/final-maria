import type { Category, MealPreview, MealDetails } from "../types/mealdb";

const BASE = "https://www.themealdb.com/api/json/v1/1";

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/categories.php`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.categories as Category[];
}

export async function fetchMealsByCategory(category: string): Promise<MealPreview[]> {
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error("Failed to fetch meals");
  const data = await res.json();
  return (data.meals ?? []) as MealPreview[];
}

export async function fetchMealDetails(mealId: string): Promise<MealDetails> {
  const res = await fetch(`${BASE}/lookup.php?i=${encodeURIComponent(mealId)}`);
  if (!res.ok) throw new Error("Failed to fetch meal details");
  const data = await res.json();
  return data.meals[0] as MealDetails;
}
