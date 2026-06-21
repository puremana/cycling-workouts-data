// Turns a workout's compact `intervals` definition into a flat list of segments
// that every file exporter (ZWO / ERG / MRC / FIT) can consume.
//
// A block in `intervals` is one of:
//   { kind, d, p }            steady effort   (p = fraction of FTP, e.g. 0.9)
//   { kind, d, p: [lo, hi] }  ramp            (linear lo -> hi)
//   { repeat, on, off, trailingOff }  interval set
//
// For a repeat block, `off` is the recovery *between* reps, so by default the
// final recovery is dropped (you roll straight into the next block). Sets that
// genuinely end on the "off" effort (e.g. over-unders, 30/30 blocks) pass
// `trailingOff: true`.
//
// Output segments are: { d, kind, p } or { d, kind, pLow, pHigh } (ramp).
// kind is one of 'warmup' | 'cooldown' | 'active' | 'rest' | 'steady' | 'ramp'.

function toSegment(block, kind) {
  if (Array.isArray(block.p)) {
    return { d: block.d, kind, pLow: block.p[0], pHigh: block.p[1] }
  }
  return { d: block.d, kind, p: block.p }
}

export function normalizeSegments(intervals) {
  const out = []
  for (const block of intervals) {
    if (block.repeat) {
      for (let i = 0; i < block.repeat; i++) {
        out.push(toSegment(block.on, 'active'))
        if (i < block.repeat - 1 || block.trailingOff) {
          out.push(toSegment(block.off, 'rest'))
        }
      }
    } else {
      const kind = block.kind || (Array.isArray(block.p) ? 'ramp' : 'steady')
      out.push(toSegment(block, kind))
    }
  }
  return out
}

export function totalSeconds(intervals) {
  return normalizeSegments(intervals).reduce((sum, s) => sum + s.d, 0)
}
