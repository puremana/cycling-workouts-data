// Public API for the cycling workouts data package.
//
// The `workouts` array is exported with `segments` and `duration` already derived
// on each workout (the derivation runs when ./src/workouts.js is imported), so
// consumers can use it directly without re-implementing the segment logic.

export {
  categories,
  subcategories,
  levels,
  levelIntro,
  lengthBuckets,
  workouts,
} from './src/workouts.js'

// Segment logic, for consumers that derive their own structures (e.g. live editing).
export { normalizeSegments, totalSeconds } from './src/segments.js'

// Authoring helpers for building a workout's `intervals` (warmup / cooldown ramps).
export { wu, cd } from './src/helpers.js'
