"use client";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function AIChatModal({ open, onOpenChange, messages, loading, onSend }: { open: boolean; onOpenChange: (v: boolean) => void; messages: { role: "user" | "assistant"; content: string }[]; loading: boolean; onSend: (t: string) => void; }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 180, damping: 18 }}>
          <DialogHeader>
            <DialogTitle>NutriSync AI</DialogTitle>
          </DialogHeader>
          <div className="mt-3 max-h-[50vh] space-y-2 overflow-y-auto rounded-2xl bg-slate-50 p-3">
            {messages.map((m, idx) => (
              <div key={idx} className={`rounded-2xl px-3 py-2 text-sm ${m.role === "assistant" ? "bg-white" : "bg-primary text-white"}`}>{m.content}</div>
            ))}
            {loading && <div className="animate-pulse rounded-2xl bg-white p-3 text-sm text-slate-500">Thinking…</div>}
          </div>
          <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); const t = String(fd.get("q") || ""); if (t) onSend(t); (e.currentTarget.querySelector("input") as HTMLInputElement).value = ""; }}>
            <Input name="q" placeholder="Ask for recommendations…" />
            <Button type="submit">Send</Button>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
