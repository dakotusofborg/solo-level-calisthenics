# Solo Level Calisthenics

A static gamified calisthenics progression dashboard inspired by RPG status systems.

## Features

- Push and pull progression trees.
- Independent column progression for each skill path.
- Benchmark-gated tier unlocks.
- Daily Push and Daily Pull workouts generated from active tiers only.
- Weekly cumulative quests.
- Visible level, rank, HP, MP, stats, and EXP progress.
- Local progress persistence through browser `localStorage`.

## Run Locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 5173
```

Then visit:

```text
http://127.0.0.1:5173/
```

## How Progression Works

Each tree column has five tiers. Tier 1 starts active. Clearing a tier benchmark unlocks the next tier in that same column only.

Daily workouts are generated from the currently active Push and Pull tiers. Once a benchmark is cleared, the daily workout moves forward to the next active tier and stops pulling from the cleared tier.

Weekly quests are cumulative targets intended to be completed across multiple days.

## Editing Skill Trees

Progression data lives in `app.js` inside the `trees` object. Update the tier exercise lists, notes, and benchmarks there.

## Persistence

All progress is stored locally in the browser. Clearing site data or using the in-app reset controls will remove saved progress.
