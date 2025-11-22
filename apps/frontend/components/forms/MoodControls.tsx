"use client";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";

export default function MoodControls({ mood, setMood, stress, setStress }: { mood: number; setMood: (n: number) => void; stress: number; setStress: (n: number) => void }) {
  const moods = ["😞", "😕", "🙂", "😊", "😁", "🤩", "🧘‍♀️", "💪", "🔥", "🚀"];
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm text-slate-600">Mood today</p>
        <div className="flex flex-wrap gap-2">
          {moods.map((m, i) => (
            <button key={i} className={`rounded-2xl border px-3 py-2 text-xl ${i === mood ? "border-primary bg-primary/10" : "border-slate-200"}`} onClick={() => setMood(i)}>
              {m}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
          <p>Stress</p>
          <Badge color={stress > 6 ? "warning" : "default"}>{stress}/10</Badge>
        </div>
        <Slider defaultValue={[stress]} max={10} step={1} onValueChange={(v) => setStress(v[0] ?? 0)} />
      </div>
    </div>
  );
}
