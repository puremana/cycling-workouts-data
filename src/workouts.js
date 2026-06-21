import { normalizeSegments, totalSeconds } from './segments.js'
import { endurance } from './categories/endurance.js'
import { middle } from './categories/middle.js'
import { vo2 } from './categories/vo2.js'
import { anaerobic } from './categories/anaerobic.js'

// Cycling workout library. Workouts live in one file per category under
// ./categories/ — add new sessions there. Each workout has:
//
// category:    'endurance' | 'middle' | 'vo2' | 'anaerobic'
// subcategory: id from `subcategories[category]` below
// headline:    what the workout actually does (the main set) — shown as the title
// title:       general name for the session — shown as the subtitle
// level:       'beginner' | 'intermediate' | 'advanced' | 'pro' — who the
//              session suits, not how hard it feels (see `levels` below)
// tss:         approximate Training Stress Score
// steps:       human-readable breakdown of the session
// intervals:   machine-readable structure used to generate .zwo/.erg/.fit/.mrc
//              (power values are fractions of FTP; durations in seconds)
//
// `duration` (minutes) and `segments` are derived from `intervals` at the bottom.

export const categories = [
  {
    id: 'endurance',
    label: 'Endurance',
    blurb: 'Builds aerobic capacity and develops the peripheral adaptations that support sustained performance.',
  },
  {
    id: 'middle',
    label: 'Middle Intensity',
    blurb: 'Develops muscular endurance and fatigue resistance by accumulating substantial work near your maximal lactate steady state.',
  },
  {
    id: 'vo2',
    label: 'VO2',
    blurb: 'Improves maximal oxygen uptake by targeting cardiac output, oxygen delivery, and maximum aerobic power.',
  },
  {
    id: 'anaerobic',
    label: 'Anaerobic Capacity',
    blurb: 'Develops short, explosive power and tolerance for going deep in the red.',
  },
]

// Second-level focus within each category. Shown below the active category.
export const subcategories = {
  endurance: [
    { id: 'recovery', label: 'Recovery' },
    { id: 'zone2', label: 'Zone 2' },
    { id: 'lt1', label: 'LT1' },
  ],
  middle: [
    { id: 'tempo', label: 'Tempo' },
    { id: 'sweetspot', label: 'Sweet Spot' },
    { id: 'threshold', label: 'Threshold' },
  ],
  vo2: [
    { id: 'short', label: 'Short (≤ 3 min)' },
    { id: 'long', label: 'Long (≥ 4 min)' },
    { id: 'onoff', label: 'On/Off' },
  ],
  anaerobic: [
    { id: 'sprints', label: 'Sprints' },
    { id: 'repeats', label: 'Repeats' },
    { id: 'efforts', label: '1-min Efforts' },
  ],
}

// Rider level describes WHO a session suits, not how hard it feels. A beginner's
// 30 min recovery spin and a pro's 90 min base ride are both "easy" rides — the
// level reflects training experience, typical volume, and complexity.
export const levelIntro =
  'Levels describe who a session suits — based on training experience and volume — not how hard it feels. A 30 min recovery spin and a 2 hr base ride can both be easy.'

export const levels = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: 'New to structured training. Shorter, simpler sessions to build the habit.',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'Comfortable with intervals and 60–90 min sessions on a regular schedule.',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: 'Training consistently with higher volume and demanding interval sets.',
  },
  {
    id: 'pro',
    label: 'Pro',
    description: 'Very high training load — long or maximal sessions for elite / racing riders.',
  },
]

// Length buckets used by the sidebar filter (minutes, inclusive lower bound).
export const lengthBuckets = [
  { id: 'short', label: '< 45 min', min: 0, max: 44 },
  { id: 'mid', label: '45–75 min', min: 45, max: 75 },
  { id: 'long', label: '76–120 min', min: 76, max: 120 },
  { id: 'epic', label: '> 120 min', min: 121, max: Infinity },
]

export const workouts = [...endurance, ...middle, ...vo2, ...anaerobic]

// Derive flat segments + total duration from each workout's interval structure.
for (const w of workouts) {
  w.segments = normalizeSegments(w.intervals)
  w.duration = Math.round(totalSeconds(w.intervals) / 60)
}
