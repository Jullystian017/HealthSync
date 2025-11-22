"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useMental } from "../../../hooks/useMental";

export default function MentalCard() {
  const { mood, stress } = useMental();
  const faces = ["😞","😕","🙂","😊","😁","🤩","🧘‍♀️","💪","🔥","🚀"];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Today</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="text-4xl">{faces[mood] ?? "🙂"}</div>
          <div>
            <p className="text-sm text-slate-500">Stress</p>
            <p className="text-xl font-semibold">{stress}/10</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
