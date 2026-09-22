/**
 * Chat API service for the FastAPI backend.
 *
 * Backend:
 *   POST http://127.0.0.1:8000/chat
 *
 * Request:
 *   { "message": "Tell me about Shreya" }
 *
 * Response:
 *   { "response": "Shreya Bhattacharya is..." }
 */

export const CHAT_API_BASE_URL = "http://127.0.0.1:8000";

export const CHAT_ENDPOINT = `${CHAT_API_BASE_URL}/chat`;

export type ChatRequest = {
  message: string;
};

export type ChatResponse = {
  response: string;
};

export class ChatApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ChatApiError";
    this.status = status;
  }
}

export async function sendChatMessage(
  message: string,
  options?: {
    signal?: AbortSignal;
    timeoutMs?: number;
  },
): Promise<string> {
  const controller = new AbortController();

  const timeout = setTimeout(
    () => controller.abort(),
    options?.timeoutMs ?? 45_000,
  );

  // Allow the caller to cancel the request.
  const abortHandler = () => {
    controller.abort();
  };

  options?.signal?.addEventListener("abort", abortHandler);

  try {
    const response = await fetch(CHAT_ENDPOINT, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        message,
      } satisfies ChatRequest),

      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ChatApiError(
        `The assistant service replied with an error (${response.status}).`,
        response.status,
      );
    }

    const data: ChatResponse = await response.json();

    if (!data || typeof data.response !== "string") {
      throw new ChatApiError(
        "The assistant returned an invalid response.",
      );
    }

    if (!data.response.trim()) {
      throw new ChatApiError(
        "The assistant returned an empty response.",
      );
    }

    return data.response;
  } catch (error) {
    if (error instanceof ChatApiError) {
      throw error;
    }

    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw new ChatApiError(
        "The assistant took too long to respond. Please try again.",
      );
    }

    throw new ChatApiError(
      `Can't reach the assistant service at ${CHAT_ENDPOINT}. Make sure it is running.`,
    );
  } finally {
    clearTimeout(timeout);

    options?.signal?.removeEventListener(
      "abort",
      abortHandler,
    );
  }
}