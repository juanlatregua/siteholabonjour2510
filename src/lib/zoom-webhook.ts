// lib/zoom-webhook.ts — Zoom webhook signature verification helpers
import { createHmac } from "crypto";

const ZOOM_WEBHOOK_SECRET = () => process.env.ZOOM_WEBHOOK_SECRET_TOKEN || "";

/**
 * Verify Zoom webhook event signature (HMAC SHA-256).
 * https://developers.zoom.us/docs/api/rest/webhook-reference/#verify-webhook-events
 */
export function verifyZoomSignature(
  body: string,
  timestamp: string,
  signature: string,
): boolean {
  const secret = ZOOM_WEBHOOK_SECRET();
  if (!secret) return false;

  const message = `v0:${timestamp}:${body}`;
  const hash = createHmac("sha256", secret).update(message).digest("hex");
  const expected = `v0=${hash}`;

  return expected === signature;
}

/**
 * Generate hash for Zoom CRC (URL validation) challenge.
 * Zoom sends a plainToken; we return hashForValidation = HMAC-SHA256(secret, plainToken).
 */
export function generateCRCResponse(plainToken: string): string {
  const secret = ZOOM_WEBHOOK_SECRET();
  return createHmac("sha256", secret).update(plainToken).digest("hex");
}
