"use client";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { DUMMY } from "../../lib/constants";

export default function WeeklyNutritionChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={DUMMY.weeklyNutrition} margin={{ left: 16, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Line type="monotone" dataKey="calories" stroke="#2FAE8F" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="mood" stroke="#0F172A" strokeWidth={2} dot={false} yAxisId={0} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
