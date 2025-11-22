"use client";
import AIFab from "../../../components/ai/AIFab";
import AIChatModal from "../../../components/ai/AIChatModal";
import { useAI } from "../../../hooks/useAI";

export default function AiAssistant() {
  const { open, setOpen, messages, loading, send } = useAI();
  return (
    <>
      <AIFab onClick={() => setOpen(true)} />
      <AIChatModal open={open} onOpenChange={setOpen} messages={messages} loading={loading} onSend={send} />
    </>
  );
}
