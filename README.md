# Unhired — AI Resume Roaster

Unhired is a small Next.js application for creating and viewing "roasts" and browsing roast history. It integrates with Supabase for persistence, Drizzle for database migrations, and multiple AI/voice services (Google GenAI, Gemini, TTS) for generation and audio playback.

**Features**
- **Create roasts:** interactive UI for generating roast text and audio.
- **History:** persist and browse past roasts.
- **Auth:** sign-in flow and callbacks for provider integrations.
- **TTS & audio playback:** generate speech from roast text.

**Tech stack**
- **Framework:** Next.js (app router)
- **DB / ORM:** Postgres + Drizzle ORM / drizzle-kit
- **Auth / Realtime / Storage:** Supabase
- **AI / TTS:** Google GenAI / Gemini / Vapi (see `package.json` dependencies)
- **Styling:** Tailwind CSS

**Repository layout (high level)**
- `app/`: Next.js routes and pages (`/login`, `/history`, `/roast`, API routes under `app/api`)
- `components/`: React UI components (`LandingView`, `RoastView`, `HistoryView`, etc.)
- `services/`: business logic and API wrappers (`auth.service.ts`, `roast.service.ts`, `history.service.ts`, `gemini.service.ts`)
- `supabase/` and `db/`: Supabase helpers, migrations, and DB client schema
- `lib/tts`: text-to-speech helpers
- `utils/`: helper utilities (markdown, roast generation helpers)

## Getting started — local development

1. Install dependencies

```bash
npm install
```

2. Create a `.env.local` file at project root and set the required environment variables (example below).

3. (Optional) Run database migrations. This project includes `drizzle-kit` and Supabase migrations under `supabase/migrations`.

```bash
# Example, adjust for your setup
npx drizzle-kit push --url "$DATABASE_URL"
# or apply Supabase SQL migrations via the Supabase CLI
```

4. Start the dev server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment variables
Create `.env.local` with at least the following placeholders (names may vary depending on your deployment):

- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (server-side only)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key (client-side)
- `GOOGLE_API_KEY` or `GOOGLE_GENAI_KEY` — for Google GenAI / Gemini usage
- `OPENAI_API_KEY` — if using OpenAI endpoints (if applicable)

Add any other keys used by `lib/gemini`, `lib/supabase`, or `lib/tts`.

## Scripts
- **Dev:** `npm run dev` — starts Next.js dev server
- **Build:** `npm run build` — build for production
- **Start:** `npm run start` — start production server
- **Lint:** `npm run lint` — run ESLint

These scripts are defined in `package.json`.

## Database & migrations
- Migrations are under `supabase/migrations` and can be applied with Supabase CLI or `drizzle-kit` depending on your workflow.
- The project uses `drizzle-orm` for typed queries and schema definitions in `db/schema.ts`.

## Deployment
- This app targets Vercel for seamless Next.js deployments, but any platform supporting Node.js can host it. Ensure environment variables are set in your deployment target (Vercel, Fly, Render, etc.).

## Troubleshooting
- If API keys or Supabase credentials are missing, auth and data features will fail — check the browser console and server logs.
- Use `supabase` CLI to inspect your database and apply migrations.

## Contributing
- Open issues or PRs for bug fixes and improvements. Keep changes focused and include tests when possible.
