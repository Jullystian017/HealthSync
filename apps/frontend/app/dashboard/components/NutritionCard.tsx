"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useNutrition } from "../../../hooks/useNutrition";
import { kFormat } from "../../../lib/utils";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function NutritionCard() {
  const { totals } = useNutrition();
  const macroData = [
    { name: "Protein", value: totals.protein },
    { name: "Carbs", value: totals.carbs },
    { name: "Fat", value: totals.fat },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Calories</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{kFormat(totals.calories)} kcal</p>
        <div className="mt-4 h-40 w-full">
          <ResponsiveContainer>
            <BarChart data={macroData} margin={{ left: 10, right: 10 }}>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="value" fill="#2FAE8F" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
