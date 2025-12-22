# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **SitePlan AI** - a SaaS application built on the Agentic Coding Boilerplate. Users can locate properties via an interactive map, capture views, and generate AI-powered site plans showing property boundaries, buildings, and features.

**Current Phase:** UI/UX Implementation (mock data, no backend logic yet)

### Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **AI Integration**: Vercel AI SDK 5 + OpenRouter (100+ models)
- **Authentication**: BetterAuth with Google OAuth
- **Database**: PostgreSQL with Drizzle ORM
- **Maps**: Google Maps JavaScript API via `@vis.gl/react-google-maps`
- **UI**: shadcn/ui + Tailwind CSS 4 + next-themes (dark mode)

## Commands

```bash
pnpm run lint        # ESLint - ALWAYS run after changes
pnpm run typecheck   # TypeScript check - ALWAYS run after changes
pnpm run build       # Production build (runs db:migrate first)
pnpm run db:generate # Generate Drizzle migrations
pnpm run db:migrate  # Run migrations
pnpm run db:push     # Push schema changes (dev)
pnpm run db:studio   # Open Drizzle Studio GUI
```

**NEVER run `pnpm dev` yourself** - ask the user for terminal output if needed.

## Architecture

### Key Directories

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/auth/[...all]/  # BetterAuth catch-all route
│   ├── api/chat/           # OpenRouter AI chat endpoint
│   ├── site-plans/         # SitePlan AI feature pages
│   └── (protected routes)  # dashboard, profile, chat
├── components/
│   ├── auth/               # Sign-in/out, user profile
│   ├── ui/                 # shadcn/ui components
│   └── (feature components)
└── lib/
    ├── auth.ts             # BetterAuth server config
    ├── auth-client.ts      # BetterAuth client hooks
    ├── db.ts               # Drizzle database connection
    ├── schema.ts           # Drizzle schema definitions
    └── mock-data.ts        # Mock data for UI phase
```

### Authentication Patterns

**Server-side (Server Components, API routes):**
```typescript
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const session = await auth.api.getSession({ headers: await headers() })
```

**Client-side:**
```typescript
import { useSession, signIn, signOut } from "@/lib/auth-client"

const { data: session } = useSession()
```

### OpenRouter AI Integration

This project uses **OpenRouter**, NOT direct OpenAI:

```typescript
import { openrouter } from "@openrouter/ai-sdk-provider"

// Model names: "provider/model-name" (e.g., "openai/gpt-4o-mini")
const model = openrouter(process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini")
```

- Chat API: `src/app/api/chat/route.ts`
- Model list: https://openrouter.ai/models
- API keys: https://openrouter.ai/settings/keys

### Google Maps Integration

Uses `@vis.gl/react-google-maps` with `use-places-autocomplete`:

```typescript
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps"
import usePlacesAutocomplete from "use-places-autocomplete"
```

- Requires `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` env var
- Technical docs: `docs/technical/places-api-(new)/`

### Database Operations

```typescript
import { db } from "@/lib/db"
import { users, sessions } from "@/lib/schema"

// Query example
const user = await db.select().from(users).where(eq(users.id, id))
```

After schema changes: `pnpm db:generate && pnpm db:migrate`

## Project Specifications

See `specs/siteplan-ai/` for requirements and implementation plans:
- `requirements.md` - Full functional/non-functional requirements
- `implementation-plan.md` - Phased implementation approach

## Critical Rules

1. **Always validate changes**: Run `pnpm lint && pnpm typecheck` after every change
2. **Use OpenRouter, not OpenAI**: Import from `@openrouter/ai-sdk-provider`
3. **Use shadcn/ui color tokens**: `bg-background`, `text-foreground`, etc.
4. **Support dark mode**: Use Tailwind dark: variants appropriately
5. **PostgreSQL only**: Not SQLite or MySQL
6. **Server Components by default**: Use client components only when needed

## Environment Variables

```env
POSTGRES_URL=postgresql://...
BETTER_AUTH_SECRET=32-char-random-string
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=openai/gpt-4o-mini
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
```

## Documentation

Technical guides in `docs/`:
- `docs/technical/ai/streaming.md` - AI streaming implementation
- `docs/technical/ai/structured-data.md` - Structured data extraction
- `docs/technical/betterauth/` - BetterAuth integration guides
- `docs/technical/places-api-(new)/` - Google Maps/Places API guides
