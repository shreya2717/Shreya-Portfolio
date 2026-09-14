import { useEffect, useRef, useState } from "react";
import { sendChatMessage, ChatApiError } from "@/lib/chat-api";
import { SUGGESTED_QUESTIONS } from "@/data/profile";

type Msg = { id: string; role: "user" | "assistant"; text: string };

const GREETING: Msg = {
  id: "greeting",
  role: "assistant",
  text: "Hi, I'm Shreya's assistant. Ask me about her projects, skills, education, achievements, or why she'd be a strong fit for your team.",
};

export function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, error]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || loading) return;

    setError(null);
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text },
    ]);
    setLoading(true);

    try {
      const answer = await sendChatMessage(text);
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", text: answer },
      ]);
    } catch (err) {
      setError(
        err instanceof ChatApiError
          ? err.message
          : "Something went wrong reaching the assistant. Please try again.",
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div
      id="chat"
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 shadow-panel backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between border-b border-border bg-surface/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-ink font-mono text-[10px] font-semibold text-primary-foreground ring-1 ring-heading/10">
            AI
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight text-heading">Shreya Assistant</div>
            <div className="font-mono text-[11px] text-faint">fastapi · /chat</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-success-ink">
          <span className="size-1.5 rounded-full bg-success" /> online
        </div>
      </div>

      <div
        ref={transcriptRef}
        aria-live="polite"
        className="flex min-h-[300px] max-h-[380px] flex-1 flex-col gap-4 overflow-y-auto px-4 py-5"
      >
        {messages.map((m) =>
          m.role === "assistant" ? (
            <div
              key={m.id}
              className="max-w-[85%] animate-fade-up self-start whitespace-pre-wrap rounded-2xl rounded-tl-md bg-muted px-4 py-2.5 text-sm leading-relaxed text-foreground"
            >
              {m.text}
            </div>
          ) : (
            <div
              key={m.id}
              className="max-w-[85%] animate-fade-up self-end whitespace-pre-wrap rounded-2xl rounded-tr-md bg-contrast px-4 py-2.5 text-sm leading-relaxed text-contrast-foreground"
            >
              {m.text}
            </div>
          ),
        )}

        {loading && (
          <div className="flex max-w-[85%] animate-fade-up items-center gap-1 self-start rounded-2xl rounded-tl-md bg-muted px-4 py-3">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-faint" />
            <span
              className="size-1.5 animate-pulse-soft rounded-full bg-faint"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="size-1.5 animate-pulse-soft rounded-full bg-faint"
              style={{ animationDelay: "0.3s" }}
            />
            <span className="sr-only">Thinking…</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto border-t border-border px-4 pt-3 pb-1">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => ask(q)}
            disabled={loading}
            className="shrink-0 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs text-muted-foreground transition-transform hover:-translate-y-0.5 hover:border-primary-border disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {error && (
        <div
          role="alert"
          className="mx-4 mt-2 flex items-center gap-2 rounded-lg border border-destructive-border bg-destructive-soft px-3 py-2 text-xs text-destructive-ink"
        >
          <span className="font-mono text-destructive">!</span> {error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <label htmlFor="chat-input" className="sr-only">
          Ask Shreya anything
        </label>
        <input
          id="chat-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Shreya anything…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-lg border border-border bg-surface/80 px-3 py-2.5 text-sm text-foreground placeholder:text-faint focus:border-ring focus:outline-none focus:ring-2 focus:ring-primary-soft"
        />
        <button
          type="submit"
          disabled={loading || input.trim().length === 0}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-contrast px-3 py-2 text-sm font-medium text-contrast-foreground transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
        >
          {loading ? "Sending" : "Send"} <span className="font-mono text-xs">↵</span>
        </button>
      </form>
    </div>
  );
}
