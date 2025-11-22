export const BRAND = {
  name: "HealthSync",
  colors: { primary: "#38BDF8", dark: "#0F172A" },
};

export const DUMMY = {
  weeklyNutrition: [
    { day: "Mon", calories: 2100, protein: 120, carbs: 250, fat: 70, mood: 7 },
    { day: "Tue", calories: 1950, protein: 110, carbs: 230, fat: 65, mood: 6 },
    { day: "Wed", calories: 2000, protein: 115, carbs: 240, fat: 68, mood: 8 },
    { day: "Thu", calories: 2200, protein: 130, carbs: 260, fat: 75, mood: 7 },
    { day: "Fri", calories: 2050, protein: 118, carbs: 235, fat: 70, mood: 6 },
    { day: "Sat", calories: 2300, protein: 135, carbs: 280, fat: 80, mood: 8 },
    { day: "Sun", calories: 1900, protein: 100, carbs: 210, fat: 60, mood: 7 },
  ],
  meals: [
    { id: "1", name: "Oats & Berries", calories: 350, protein: 20, carbs: 55, fat: 8 },
    { id: "2", name: "Chicken Bowl", calories: 620, protein: 45, carbs: 60, fat: 18 },
    { id: "3", name: "Greek Yogurt", calories: 180, protein: 17, carbs: 12, fat: 5 },
  ],
  moodHistory: [
    { day: "Mon", mood: 6, stress: 5 },
    { day: "Tue", mood: 7, stress: 4 },
    { day: "Wed", mood: 8, stress: 3 },
    { day: "Thu", mood: 6, stress: 6 },
    { day: "Fri", mood: 5, stress: 7 },
    { day: "Sat", mood: 8, stress: 3 },
    { day: "Sun", mood: 7, stress: 4 },
  ],
  foodMoodCorrelation: [
    { calories: 1800, mood: 6 },
    { calories: 2000, mood: 7 },
    { calories: 2200, mood: 7.5 },
    { calories: 2400, mood: 6.5 },
    { calories: 2100, mood: 7.2 },
    { calories: 1900, mood: 6.8 },
  ],
};
