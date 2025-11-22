"use client";
import { ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { DUMMY } from "../../lib/constants";

export default function FoodMoodCorrelation() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <ScatterChart margin={{ left: 16, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="calories" name="Calories" stroke="#64748b" />
          <YAxis dataKey="mood" name="Mood" stroke="#64748b" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={DUMMY.foodMoodCorrelation} fill="#2FAE8F" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
