"use client";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { DUMMY } from "../../lib/constants";

export default function MoodHistoryChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <AreaChart data={DUMMY.moodHistory} margin={{ left: 16, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Area type="monotone" dataKey="mood" stroke="#2FAE8F" fill="#2FAE8F22" strokeWidth={2} />
          <Area type="monotone" dataKey="stress" stroke="#0F172A" fill="#0F172A11" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
