import NutritionCard from "./components/NutritionCard";
import MentalCard from "./components/MentalCard";
import AnalyticsCharts from "./components/AnalyticsCharts";
import DashboardGate from "./components/DashboardGate";
import DashboardHeader from "./components/DashboardHeader";
import Footer from "../../components/layout/Footer";
import AiAssistant from "./components/AiAssistant";

export default function DashboardPage() {
  return (
    <DashboardGate>
      <main>
        <DashboardHeader />
        <div className="container-padded grid gap-6 py-10 md:grid-cols-2">
          <NutritionCard />
          <MentalCard />
          <div className="md:col-span-2"><AnalyticsCharts /></div>
        </div>
        <Footer />
        <AiAssistant />
      </main>
    </DashboardGate>
  );
}
