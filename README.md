# BookHub — Next.js Demo

A Next.js demo application for exploring books, authors, and publishers.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **In-memory data** (no database)

## Getting Started

```bash
npm install
npm run dev
```

Access at `http://localhost:3000`

## Credentials (Auth)

```
Email:    admin@bookhub.com
Password: password
```

All pages except `/login` require authentication.

---

## What Changed From Original

### 1. Genre Filtering → Query Params

**Before:** Genre filter used `useState` — state lived in memory only, lost on refresh, not shareable via URL.

**After:** Filter uses `useSearchParams` + `router.push` from `next/navigation`. Selecting "Romance" updates the URL to `/books?genre=Romance`. Refreshing the page preserves the filter. Back button works correctly.

Requires `<Suspense>` boundary in `app/books/page.tsx` for `useSearchParams` to work in Next.js App Router.

### 2. Pagination

Added to Books and Authors listings.

- Books: 6 per page
- Authors: 6 per page
- Page number stored in URL (`?page=2`) so refresh preserves position
- Filters + pagination work together (changing genre resets to page 1)

### 3. Publishers

Entirely new section with two pages:

**Listing (`/publishers`):**
- Table view with Name, Country, Founded, Book count
- "View →" link to detail page

**Detail (`/publishers/[id]`):**
- Publisher info (name, founded year, country, website)
- Grid of books published by that publisher

Publisher data lives in `lib/data.ts` alongside books and authors.

### 4. Skeleton Loader

Added `loading.tsx` files to `/books`, `/authors`, and `/publishers` routes. Next.js automatically shows these while the page loads (uses React Suspense under the hood).

To see it: open DevTools → Network → set throttling to Slow 3G → navigate between pages.

### 5. Authentication (Bonus)

Fake auth using a cookie.

- **Login page** at `/login` with hardcoded credentials
- **`proxy.ts`** (Next.js middleware) checks for `auth` cookie on every request to protected routes
- If not logged in → redirected to `/login`
- On successful login → cookie set, redirected to home

Protected routes: `/books`, `/authors`, `/publishers`

---

## Project Structure

```
nextjs-demo/
├── app/
│   ├── authors/
│   │   ├── [id]/page.tsx      # Author detail
│   │   ├── loading.tsx        # Skeleton loader
│   │   └── page.tsx           # Authors listing
│   ├── books/
│   │   ├── [id]/page.tsx      # Book detail
│   │   ├── loading.tsx        # Skeleton loader
│   │   └── page.tsx           # Books listing
│   ├── publishers/            # NEW
│   │   ├── [id]/page.tsx      # Publisher detail
│   │   ├── loading.tsx        # Skeleton loader
│   │   └── page.tsx           # Publishers listing
│   ├── login/                 # NEW
│   │   └── page.tsx           # Login page
│   ├── layout.tsx
│   └── page.tsx               # Home
├── components/
│   ├── AuthorsClient.tsx      # NEW — client component with pagination
│   ├── BookCard.tsx
│   ├── AuthorCard.tsx
│   ├── BooksClient.tsx        # UPDATED — query params + pagination
│   ├── FavoriteButton.tsx
│   ├── Navigation.tsx         # UPDATED — added Publishers link
│   ├── SearchBar.tsx
│   └── SkeletonCard.tsx       # NEW — animated loading card
├── lib/
│   └── data.ts                # UPDATED — added Publisher data + helpers
└── proxy.ts                   # NEW — auth middleware
```
