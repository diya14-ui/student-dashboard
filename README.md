# 🚀 Project Report: Student Learning Dashboard

**Prepared by:** Diya Jaswal  
**Project:** Frontend Intern Challenge - Student Dashboard Prototype  

---

## 📌 1. Project Overview
The **Student Learning Dashboard** is a futuristic, dark-themed web application designed to track and visualize student learning progress. It provides a real-time, engaging interface displaying course progress, learning streaks, and weekly study activity. The project was built to demonstrate proficiency in modern web development, specifically utilizing React Server Components and hardware-accelerated animations.

## 🎯 2. Objectives
- **Data Integration:** Securely fetch and display live course data from a PostgreSQL database.
- **Performance:** Optimize load times using Next.js Server Components.
- **User Experience:** Create a dynamic, highly responsive UI with fluid, non-blocking animations.
- **Scalability:** Build a modular architecture that strictly separates data fetching from UI rendering.

## 🛠️ 3. Technologies Used
- **Framework:** Next.js 16 (App Router)
- **Database / Backend:** Supabase (PostgreSQL + `@supabase/ssr`)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## 🏗️ 4. Architecture & Component Split

The application heavily utilizes the Next.js App Router to separate data fetching from client-side interactivity. 

| Component Layer | Responsibility | Type |
|-----------------|----------------|------|
| `app/page.tsx` | Entry point. Securely fetches course data from Supabase and passes it down as props. Handles errors gracefully. | **Server Component** |
| `lib/supabase/server.ts` | Configures the SSR client to securely read Next.js cookies without exposing keys. | **Server Utility** |
| `DashboardShell.tsx` | Manages layout state, including mobile navigation and sidebar toggles. | **Client Component** |
| `BentoDashboard.tsx` | Orchestrates the staggered entrance animations for the dashboard grid. | **Client Component** |
| Tile Components | Handle micro-interactions (hover effects, tooltips) while receiving data purely via props. | **Client Components** |

**Rationale:** Fetching data in a Server Component keeps API logic secure and prevents layout shifts on the client. Data flows seamlessly **server → props → client**. Only UI components requiring interactivity are marked with `"use client"`.

---

## 🎨 5. UI/UX Design & Animations

The design philosophy focuses on a "live" feel without overwhelming the browser:
- **Entrance Animations:** Used `staggerChildren` with spring physics for a cohesive, cascading load effect.
- **Micro-interactions:** Tiles scale up slightly with a subtle glow on hover. This uses opacity and scale transforms instead of layout-altering properties to prevent Cumulative Layout Shift (CLS).
- **Responsive Grid:** The UI adapts fluidly from a 4-column desktop layout (with a full sidebar) to a single-column stacked view with a bottom navigation bar for mobile users.

---

## 🧩 6. Key Challenges & Solutions

### Challenge 1: The Hydration Mismatch (Server vs. Client Rendering)
**The Problem:** The activity heatmap used `Math.random()` to generate dummy data. During deployment, this caused a massive React hydration mismatch error because the server generated one set of numbers, and the client generated a different set upon hydration.
**The Solution:** Implemented a **Seeded Pseudo-Random Number Generator (PRNG)**. By providing both the server and the client with the exact same mathematical seed, they generated identical sequences of activity data, perfectly syncing the render.

### Challenge 2: Heavy Charting Libraries
**The Problem:** Standard charting libraries caused SSR dimension warnings and added significant bundle bloat.
**The Solution:** Built a custom, pure CSS contribution heatmap (similar to GitHub's graph) using CSS Grid. It is extremely lightweight, causes zero layout shift, and requires no external dependencies.

### Challenge 3: Keeping Data Fresh
**The Problem:** Next.js aggressively caches pages, which is detrimental to a dashboard where progress must be real-time.
**The Solution:** Added `export const dynamic = "force-dynamic";` to the main route, ensuring the dashboard fetches the latest data directly from the Supabase database on every request.

---

## 🔮 7. Future Scope
- **Authentication:** Implement user login using Supabase Auth to personalize the dashboard.
- **Dynamic Heatmap:** Connect the activity heatmap to real backend study session data rather than simulated PRNG data.
- **Theme Toggling:** Add a light mode option for users who prefer brighter interfaces.

---

## 🚀 8. Getting Started (How to Run)

### 1. Clone & Install
```bash
npm install
```

### 2. Environment Variables
Copy the `.env.example` file to `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_STUDENT_NAME=Alex
NEXT_PUBLIC_LEARNING_STREAK=12
```

### 3. Run the Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the dashboard.
