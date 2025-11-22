"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import MoodControls from "../../../components/forms/MoodControls";
import { useMental } from "../../../hooks/useMental";
import { useAI } from "../../../hooks/useAI";
import MoodHistoryChart from "../../../components/charts/MoodHistoryChart";
import { Button } from "../../../components/ui/button";
import AppHeader from "../../../components/layout/AppHeader";
import Footer from "../../../components/layout/Footer";

export default function MentalPage() {
  const { mood, setMood, stress, setStress, history } = useMental();
  const { loading, messages, send } = useAI();

  return (
    <main>
      <AppHeader />
      <div className="container-padded grid gap-6 py-10 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Mood & Stress</CardTitle></CardHeader>
          <CardContent>
            <MoodControls mood={mood} setMood={setMood} stress={stress} setStress={setStress} />
            <Button className="mt-4" onClick={() => send(`I feel mood ${mood}/10 and stress ${stress}/10. Any tips?`)}>AI Insight</Button>
            <div className="mt-2 max-h-40 overflow-y-auto rounded-2xl bg-slate-50 p-3 text-sm">
              {messages.map((m, i) => (<div key={i} className={`mb-2 rounded-2xl px-3 py-2 ${m.role === 'assistant' ? 'bg-white' : 'bg-primary text-white'}`}>{m.content}</div>))}
              {loading && <div className="animate-pulse text-slate-500">Thinking…</div>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Mood History</CardTitle></CardHeader>
          <CardContent>
            <MoodHistoryChart />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  );
}
