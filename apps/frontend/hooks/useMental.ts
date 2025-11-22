import { useState } from "react";
import { DUMMY } from "../lib/constants";

export function useMental() {
  const [mood, setMood] = useState<number>(7);
  const [stress, setStress] = useState<number>(4);

  return { mood, setMood, stress, setStress, history: DUMMY.moodHistory };
}
