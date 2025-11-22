"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import MealForm from "../../../components/forms/MealForm";
import { useNutrition } from "../../../hooks/useNutrition";
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog";
import { useAI } from "../../../hooks/useAI";
import AppHeader from "../../../components/layout/AppHeader";
import Footer from "../../../components/layout/Footer";

export default function NutritionPage() {
  const { meals, addMeal, totals } = useNutrition();
  const { open, setOpen, messages, loading, send } = useAI();

  return (
    <main>
      <AppHeader />
      <div className="container-padded py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Track Meal</CardTitle></CardHeader>
            <CardContent>
              <MealForm onAdd={(m) => addMeal(m)} />
              <div className="mt-3 text-sm text-slate-600">Daily total: {totals.calories} kcal</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Meals Today</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {meals.map((m) => (
                  <li key={m.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-3">
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-slate-500">{m.calories} kcal • P{m.protein} C{m.carbs} F{m.fat}</p>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild><Button variant="outline">AI breakdown</Button></DialogTrigger>
                      <DialogContent>
                        <div className="space-y-2">
                          <p className="text-sm text-slate-600">Analyzing: <span className="font-medium">{m.name}</span></p>
                          <Button onClick={() => send(`Analyze meal: ${m.name}, calories ${m.calories}, macros P${m.protein} C${m.carbs} F${m.fat}`)}>Generate insights</Button>
                          <div className="max-h-60 overflow-y-auto rounded-2xl bg-slate-50 p-3 text-sm">
                            {messages.map((msg, i) => (
                              <div key={i} className={`mb-2 rounded-2xl px-3 py-2 ${msg.role === 'assistant' ? 'bg-white' : 'bg-primary text-white'}`}>{msg.content}</div>
                            ))}
                            {loading && <div className="animate-pulse text-slate-500">Thinking…</div>}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  );
}
