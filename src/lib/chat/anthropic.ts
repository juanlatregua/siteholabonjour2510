import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // Uses ANTHROPIC_API_KEY env var automatically

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function streamChat(
  messages: ChatMessage[],
  systemPrompt: string,
  options?: { maxTokens?: number; temperature?: number }
): Promise<ReadableStream<Uint8Array>> {
  const maxTokens = options?.maxTokens ?? 1024;
  const temperature = options?.temperature ?? 0.7;

  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model: process.env.CHAT_MODEL || "claude-sonnet-4-20250514",
          max_tokens: maxTokens,
          temperature,
          system: systemPrompt,
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        });

        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        controller.close();
      } catch (error: unknown) {
        // Retry once on 5xx
        if (
          error instanceof Anthropic.APIError &&
          error.status >= 500
        ) {
          try {
            const retryStream = client.messages.stream({
              model: process.env.CHAT_MODEL || "claude-sonnet-4-20250514",
              max_tokens: maxTokens,
              temperature,
              system: systemPrompt,
              messages: messages.map((m) => ({
                role: m.role,
                content: m.content,
              })),
            });

            for await (const event of retryStream) {
              if (
                event.type === "content_block_delta" &&
                event.delta.type === "text_delta"
              ) {
                controller.enqueue(encoder.encode(event.delta.text));
              }
            }

            controller.close();
          } catch {
            controller.enqueue(
              encoder.encode("Lo siento, el servicio no está disponible en este momento. Por favor, inténtalo de nuevo más tarde.")
            );
            controller.close();
          }
        } else {
          controller.enqueue(
            encoder.encode("Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.")
          );
          controller.close();
        }
      }
    },
  });
}
