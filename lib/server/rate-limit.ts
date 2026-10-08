/**
 * Fixed-window rate limiter (spec 12.2). In-memory, so limits apply per server instance;
 * use a shared store (for example Redis) if the site runs on several instances.
 */
export interface RateLimiter {
  /** Returns 0 when allowed, otherwise the seconds until the window resets. */
  check(key: string, now?: number): number;
}

export function createRateLimiter(limit: number, windowMs: number): RateLimiter {
  const windows = new Map<string, { count: number; resetAt: number }>();

  return {
    check(key, now = Date.now()) {
      if (windows.size > 10_000) {
        for (const [entryKey, entry] of windows) if (entry.resetAt <= now) windows.delete(entryKey);
      }
      const entry = windows.get(key);
      if (!entry || entry.resetAt <= now) {
        windows.set(key, { count: 1, resetAt: now + windowMs });
        return 0;
      }
      if (entry.count >= limit) return Math.ceil((entry.resetAt - now) / 1000);
      entry.count++;
      return 0;
    },
  };
}
