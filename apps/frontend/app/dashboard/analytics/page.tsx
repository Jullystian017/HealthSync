"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import FoodMoodCorrelation from "../../../components/charts/FoodMoodCorrelation";
import WeeklyNutritionChart from "../../../components/charts/WeeklyNutritionChart";
import MoodHistoryChart from "../../../components/charts/MoodHistoryChart";
import AppHeader from "../../../components/layout/AppHeader";
import Footer from "../../../components/layout/Footer";

export default function AnalyticsPage() {
  return (
    <main>
      <AppHeader />
      <div className="container-padded py-10">
        <Tabs defaultValue="weekly">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="correlation">Food–Mood</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly">
            <Card>
              <CardHeader><CardTitle>Weekly Comparison</CardTitle></CardHeader>
              <CardContent><WeeklyNutritionChart /></CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="monthly">
            <Card>
              <CardHeader><CardTitle>Monthly Trend</CardTitle></CardHeader>
              <CardContent><MoodHistoryChart /></CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="correlation">
            <Card>
              <CardHeader><CardTitle>Food–Mood Correlation</CardTitle></CardHeader>
              <CardContent><FoodMoodCorrelation /></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </main>
  );
}
