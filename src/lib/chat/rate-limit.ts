interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const sessionLimits = new Map<string, RateLimitEntry>();
const ipLimits = new Map<string, RateLimitEntry>();

// Clean up stale entries every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of sessionLimits) {
      if (entry.resetAt < now) sessionLimits.delete(key);
    }
    for (const [key, entry] of ipLimits) {
      if (entry.resetAt < now) ipLimits.delete(key);
    }
  }, 10 * 60 * 1000);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // seconds
}

export function checkRateLimit(
  sessionId: string,
  ip: string,
  maxPerSession = 30,
  maxPerDay = 100
): RateLimitResult {
  const now = Date.now();

  // Check session limit
  let sessionEntry = sessionLimits.get(sessionId);
  if (!sessionEntry || sessionEntry.resetAt < now) {
    sessionEntry = { count: 0, resetAt: now + 60 * 60 * 1000 }; // 1 hour session
    sessionLimits.set(sessionId, sessionEntry);
  }

  // Check IP daily limit
  let ipEntry = ipLimits.get(ip);
  if (!ipEntry || ipEntry.resetAt < now) {
    ipEntry = { count: 0, resetAt: now + 24 * 60 * 60 * 1000 }; // 24 hours
    ipLimits.set(ip, ipEntry);
  }

  if (sessionEntry.count >= maxPerSession) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil((sessionEntry.resetAt - now) / 1000),
    };
  }

  if (ipEntry.count >= maxPerDay) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil((ipEntry.resetAt - now) / 1000),
    };
  }

  sessionEntry.count++;
  ipEntry.count++;

  return {
    allowed: true,
    remaining: Math.min(
      maxPerSession - sessionEntry.count,
      maxPerDay - ipEntry.count
    ),
    resetIn: Math.ceil(
      (Math.min(sessionEntry.resetAt, ipEntry.resetAt) - now) / 1000
    ),
  };
}
