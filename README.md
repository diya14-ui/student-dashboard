# Student Learning Dashboard

A futuristic, dark-mode student dashboard prototype built for the Frontend Intern Challenge. The app fetches live course data from Supabase, renders it with Next.js Server Components, and delivers hardware-friendly animations with Framer Motion.

## Tech Stack

- **Next.js 16** (App Router)
- **Supabase** (PostgreSQL + `@supabase/ssr`)
- **Tailwind CSS v4**
- **Framer Motion**
- **Lucide React**

## Features

- Bento grid dashboard with hero, activity heatmap, and dynamic course tiles
- Server-side Supabase fetching via `@supabase/ssr`
- Staggered entrance animations with spring physics
- Collapsible sidebar with `layoutId` nav highlight (desktop/tablet)
- Bottom navigation bar on mobile
- Dark-themed loading skeletons and graceful error UI
- Animated progress bars using transform-only scaling (no layout shift)

## Architecture

### Server / Client Split

| Layer | Responsibility |
|-------|----------------|
| `app/page.tsx` | Async Server Component — fetches courses, throws on failure |
| `lib/supabase/server.ts` | Supabase SSR client using Next.js cookies |
| `lib/courses.ts` | Data access helper for the `courses` table |
| `component/DashboardShell.tsx` | Client layout shell (sidebar + mobile nav state) |
| `component/BentoDashboard.tsx` | Client orchestrator for staggered tile animations |
| Tile components | Client components for Framer Motion interactions |

Data flows **server → props → client**. No course data is hardcoded in the UI layer.

### Animations

- **Entrance:** Parent `motion.section` uses `staggerChildren` with spring-based item variants (`stiffness: 300`, `damping: 20`).
- **Hover:** Tiles scale with spring physics; glow is applied via opacity transitions (no positional layout shifts).
- **Progress bars:** Animate with `scaleX` from the left edge inside a fixed-size track.
- **Navigation:** Active item highlight uses Framer Motion `layoutId` for a snapping background pill.

### Responsive Layout

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>1024px) | Full sidebar with labels, 4-column bento grid |
| Tablet (768–1024px) | Icon-only sidebar, 2-column bento grid |
| Mobile (<768px) | Bottom nav bar, single-column stacked bento |

## Getting Started

### 1. Clone and install

```bash
npm install
```

### 2. Set up Supabase

1. Create a free [Supabase](https://supabase.com) project.
2. Run `supabase/seed.sql` in the SQL Editor to create and seed the `courses` table.
3. Copy `.env.example` to `.env.local` and fill in your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_STUDENT_NAME=Alex
NEXT_PUBLIC_LEARNING_STREAK=12
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database Schema

```sql
courses (
  id          uuid primary key,
  title       text,
  progress    integer,      -- 0–100
  icon_name   text,         -- Lucide icon name, e.g. "BookOpen"
  created_at  timestamptz
)
```

Supported icons: `BookOpen`, `Monitor`, `Palette`, `Code`, `Layers` (defaults to `BookOpen` if unknown).

## Deployment

Deploy to [Vercel](https://vercel.com) and add the same environment variables from `.env.local` in your project settings.

## Challenges & Decisions

- **SSR + charts:** Recharts caused SSR dimension warnings, so the activity tile uses a pure CSS contribution heatmap instead — lighter and zero layout shift.
- **Transform-only motion:** Hover and progress animations avoid `top`/`margin`/`width` changes on layout-affecting elements to prevent repaints and CLS.
- **`force-dynamic`:** The dashboard route opts out of static prerendering so course progress always reflects live database values.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
