import React, { createContext, useContext, useMemo, useState } from "react";
import type { MealPreview } from "../types/mealdb";

type FavoritesContextValue = {
  favorites: MealPreview[];
  addFavorite: (meal: MealPreview) => void;
  removeFavorite: (idMeal: string) => void;
  isFavorite: (idMeal: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<MealPreview[]>([]);

  const value = useMemo<FavoritesContextValue>(() => {
    const isFavorite = (idMeal: string) => favorites.some(m => m.idMeal === idMeal);

    const addFavorite = (meal: MealPreview) => {
      setFavorites(prev => (prev.some(m => m.idMeal === meal.idMeal) ? prev : [meal, ...prev]));
    };

    const removeFavorite = (idMeal: string) => {
      setFavorites(prev => prev.filter(m => m.idMeal !== idMeal));
    };

    return { favorites, addFavorite, removeFavorite, isFavorite };
  }, [favorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
