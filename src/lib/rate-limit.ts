const buckets = new Map<string, Map<string, { count: number; resetAt: number }>>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [, ipMap] of buckets) {
    for (const [ip, entry] of ipMap) {
      if (now > entry.resetAt) ipMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export function checkRateLimit(
  bucketName: string,
  ip: string,
  max: number,
  windowMs: number,
): boolean {
  let ipMap = buckets.get(bucketName);
  if (!ipMap) {
    ipMap = new Map();
    buckets.set(bucketName, ipMap);
  }

  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  entry.count++;
  return entry.count <= max;
}

export function getClientIp(request: Request): string {
  const headers = request.headers;
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
