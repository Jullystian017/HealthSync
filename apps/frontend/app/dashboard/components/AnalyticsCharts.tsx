"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import WeeklyNutritionChart from "../../../components/charts/WeeklyNutritionChart";

export default function AnalyticsCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <WeeklyNutritionChart />
      </CardContent>
    </Card>
  );
}
