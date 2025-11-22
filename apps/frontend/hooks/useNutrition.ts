import { useMemo, useState } from "react";
import { DUMMY } from "../lib/constants";

export type Meal = { id: string; name: string; calories: number; protein: number; carbs: number; fat: number };

export function useNutrition() {
  const [meals, setMeals] = useState<Meal[]>(DUMMY.meals);

  const totals = useMemo(() => {
    return meals.reduce(
      (acc, m) => {
        acc.calories += m.calories;
        acc.protein += m.protein;
        acc.carbs += m.carbs;
        acc.fat += m.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [meals]);

  function addMeal(input: Omit<Meal, "id">) {
    const id = Math.random().toString(36).slice(2);
    setMeals((prev) => [{ id, ...input }, ...prev]);
  }

  return { meals, addMeal, totals, weekly: DUMMY.weeklyNutrition };
}
