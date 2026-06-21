# cycling-workouts-data

Structured cycling workout library: the workout definitions plus the logic that
derives flat playback segments from each workout's interval structure. Designed to be
shared across projects (e.g. a web app and other tools).

## Install

As a git dependency (pin to a tag):

```bash
npm install github:puremana/cycling-workouts-data#v0.1.0
```

## Usage

```js
import {
  workouts,        // array of workouts, each with derived `segments` + `duration`
  categories,      // top-level categories
  subcategories,   // second-level focus, keyed by category id
  levels,          // rider levels (who a session suits)
  levelIntro,      // intro copy for the levels concept
  lengthBuckets,   // duration filter buckets (minutes)
  normalizeSegments, totalSeconds,  // segment logic (for live editing, etc.)
  wu, cd,          // authoring helpers for warmup/cooldown ramps
} from 'cycling-workouts-data'

const first = workouts[0]
console.log(first.headline, first.duration, first.segments.length)
```

## Data model

Each workout has:

- `category`:    `'endurance' | 'middle' | 'vo2' | 'anaerobic'`
- `subcategory`: id from `subcategories[category]`
- `headline`:    what the workout does (the main set) — the title
- `title`:       general name for the session — the subtitle
- `level`:       `'beginner' | 'intermediate' | 'advanced' | 'pro'`
- `tss`:         approximate Training Stress Score
- `steps`:       human-readable breakdown
- `intervals`:   machine-readable structure (power = fraction of FTP; durations in seconds)
- `segments`:    flat segment list derived from `intervals` (added on import)
- `duration`:    total minutes derived from `intervals` (added on import)

## Adding workouts

Workouts live one file per category under [`src/categories/`](src/categories/). Add a
session to the relevant file using the field reference in
[`src/workouts.js`](src/workouts.js). Use the `wu(d)` / `cd(d)` helpers from
[`src/helpers.js`](src/helpers.js) for warmup/cooldown ramps. The `segments` and
`duration` fields are derived automatically — don't set them by hand.

## Releasing

Bump `version` in `package.json`, commit, then tag:

```bash
git tag v0.1.1 && git push --tags
```

Consumers bump the `#vX.Y.Z` ref in their `package.json` and reinstall.
