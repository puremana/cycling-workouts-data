// Shared helpers for building a workout's `intervals` structure.
// Power values are fractions of FTP; durations are in seconds.

export const wu = (d, lo = 0.4, hi = 0.6) => ({ kind: 'warmup', d, p: [lo, hi] })
export const cd = (d, hi = 0.6, lo = 0.4) => ({ kind: 'cooldown', d, p: [hi, lo] })
