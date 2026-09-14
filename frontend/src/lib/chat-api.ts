/**
 * Chat API service for the FastAPI backend.
 *
 * Backend contract:
 *   POST {BASE_URL}/chat
 *   request:  { "message": string }
 *   response: { "response": string }
 *
 * Change the backend location with the VITE_CHAT_API_URL environment variable
 * (e.g. VITE_CHAT_API_URL=https://api.example.com). No trailing slash needed.
 */

export const CHAT_API_BASE_URL: string =
  (import.meta.env["VITE_CHAT_API_URL"] as string | undefined)?.replace(/\/+$/, "") ??
  "http://127.0.0.1:8000";

export const CHAT_ENDPOINT = `${CHAT_API_BASE_URL}/chat`;

export type ChatRequest = { message: string };
export type ChatResponse = { response: string };

export class ChatApiError extends Error {
  status?: number | undefined;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ChatApiError";
    this.status = status;
  }
}

export async function sendChatMessage(
  message: string,
  options?: { signal?: AbortSignal; timeoutMs?: number },
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options?.timeoutMs ?? 45_000);
  options?.signal?.addEventListener("abort", () => controller.abort());

  try {
    const res = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ message } satisfies ChatRequest),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new ChatApiError(
        `The assistant service replied with an error (${res.status}).`,
        res.status,
      );
    }

    const data = (await res.json()) as Partial<ChatResponse>;
    if (typeof data?.response !== "string") {
      throw new ChatApiError("The assistant service returned an unexpected reply.");
    }
    return data.response;
  } catch (err) {
    if (err instanceof ChatApiError) throw err;
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ChatApiError("The assistant took too long to respond. Please try again.");
    }
    throw new ChatApiError(
      `Can't reach the assistant service at ${CHAT_ENDPOINT}. Make sure it is running.`,
    );
  } finally {
    clearTimeout(timeout);
  }
}
