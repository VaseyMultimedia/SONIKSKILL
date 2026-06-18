# VASEY.AUDIO x VASEY/AI Music Intelligence Suite

A premium, mobile-first Progressive Web App scaffold for turning raw music ideas into structured `MusicSpec` objects, deterministic QA findings, and platform-ready prompts for AI music-generation workflows.

## Product purpose

The suite replaces vague prompt text with concrete musical direction covering intent, genre, mood, tempo, key, mode, harmony, rhythm, instrumentation, vocals, arrangement, production, mix traits, negative constraints, and target-platform formatting.

## Features

- Typed Zod `MusicSpec` schema with TypeScript inference.
- Main MusicSpec Compiler interface with form sections for the MVP requirements.
- Live compiled prompt preview.
- Output tabs for Universal, Suno-style, ElevenLabs Music-style, Google Lyria/Flow-style, and JSON MusicSpec output.
- Deterministic QA panel for missing details, vague language, instrumentation overload, direct imitation risk, theory/genre conflicts, and platform length limits.
- Stubbed provider adapters through local compiler functions; no paid/live API calls are made.
- VASEY Multimedia dark cyber-studio visual system with cyan/blue accents, glass panels, circuit texture, visible focus states, mobile sticky action bar, PWA manifest, and iOS viewport polish.

## Tech stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Zod
- Vitest
- Browser Clipboard API for copy actions

## Folder structure

```txt
app/
  globals.css        # VASEY design tokens and global styles
  layout.tsx         # App metadata, viewport, PWA manifest wiring
  page.tsx           # MVP MusicSpec Compiler UI
lib/
  schemas/musicSpec.ts # Zod schema, MusicSpec type, default fixture
  music/compiler.ts    # Prompt target adapters and QA rules
public/
  manifest.webmanifest # Installable PWA metadata
test/
  compiler.test.ts     # Schema/compiler/QA tests
```

## Local setup

```bash
npm install
npm run dev
```

Useful verification commands:

```bash
npm run typecheck
npm run test
npm run build
```

## Current limitations

- Provider integrations are intentionally mocked/stubbed; no Suno, ElevenLabs, Google, or paid API calls are implemented.
- The MVP is currently a single-page compiler rather than the full multi-route dashboard/analyzer/settings suite.
- QA is deterministic and rule-based, not an external LLM review layer.
- Local persistence and import/export are planned next steps.

## Next implementation steps

1. Split the MVP into Dashboard, Builder, Analyzer, Compiler, Agents/Skills, and Settings routes.
2. Add Zustand persistence with localStorage import/export.
3. Expand music-theory modules for scale-lock validation, circle-of-fifths mapping, chord generation, genre DNA, arrangement blueprints, lyric prosody, and mix review.
4. Add internal agent registry and `/agents` + `/skills` documentation files.
5. Add richer component decomposition for reusable cards, prompt panes, chip inputs, and export buttons.
6. Connect real provider adapters only after official API requirements and keys are available.
