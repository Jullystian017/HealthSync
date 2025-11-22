import { useCallback, useState } from "react";
import { api } from "../lib/api";

type Message = { role: "user" | "assistant"; content: string };

export function useAI() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your NutriSync AI. How can I help today?" },
  ]);

  const send = useCallback(async (text: string) => {
    const user: Message = { role: "user", content: text };
    setMessages((m) => [...m, user]);
    setLoading(true);
    try {
      if (process.env.NEXT_PUBLIC_API_URL) {
        const res = await api("/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: text }),
        });
        setMessages((m) => [...m, { role: "assistant", content: res.reply || "Here's a helpful suggestion based on your data." }]);
      } else {
        await new Promise((r) => setTimeout(r, 800));
        setMessages((m) => [...m, { role: "assistant", content: "Try adding 20g more protein and a short walk to improve energy." }]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { open, setOpen, loading, messages, send };
}
