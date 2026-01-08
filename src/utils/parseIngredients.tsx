import type { Ingredient, MealDetails } from "../types/mealdb";

export function parseIngredients(meal: MealDetails): Ingredient[] {
  const out: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = (meal[`strIngredient${i}`] ?? "").trim();
    const measure = (meal[`strMeasure${i}`] ?? "").trim();
    if (name) out.push({ name, measure });
  }

  return out;
}
