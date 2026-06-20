-- Student Dashboard seed schema and data
-- Run this in the Supabase SQL Editor for a fresh project.

create extension if not exists "pgcrypto";

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Allow public read access on courses"
  on public.courses
  for select
  to anon, authenticated
  using (true);

insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'BookOpen'),
  ('Next.js Mastery', 62, 'Monitor'),
  ('Tailwind CSS Pro', 48, 'Palette'),
  ('TypeScript Essentials', 91, 'Code');
