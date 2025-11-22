"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function MealForm({ onAdd }: { onAdd: (m: { name: string; calories: number; protein: number; carbs: number; fat: number }) => void }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  return (
    <form
      className="grid grid-cols-2 gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name) return;
        onAdd({ name, calories: Number(calories || 0), protein: Number(protein || 0), carbs: Number(carbs || 0), fat: Number(fat || 0) });
        setName(""); setCalories(""); setProtein(""); setCarbs(""); setFat("");
      }}
    >
      <div className="col-span-2">
        <Input placeholder="Meal name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <Input placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
      <Input placeholder="Protein (g)" value={protein} onChange={(e) => setProtein(e.target.value)} />
      <Input placeholder="Carbs (g)" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
      <Input placeholder="Fat (g)" value={fat} onChange={(e) => setFat(e.target.value)} />
      <div className="col-span-2"><Button type="submit" className="w-full">Add Meal</Button></div>
    </form>
  );
}
