"use client";
import { BotMessageSquare } from "lucide-react";
import { Button } from "../ui/button";

export default function AIFab({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="secondary" size="lg" onClick={onClick} className="fixed bottom-6 right-6 h-12 rounded-full shadow-soft">
      <BotMessageSquare className="mr-2 h-5 w-5" /> AI Assistant
    </Button>
  );
}
