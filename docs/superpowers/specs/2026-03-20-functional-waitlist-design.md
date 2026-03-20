# Functional Waitlist with Confirmation Email

## Overview

Make the existing waitlist page functional by adding a Vercel Postgres database to store signups and Resend to send confirmation emails. The current form UI stays largely the same — we add a real submission flow behind it.

## Architecture

```
[Waitlist Form] → [POST /api/waitlist] → [Vercel Postgres + Resend]
```

Three pieces:

1. **Form** (`/app/waitlist/page.tsx`) — submits email via fetch to API route
2. **API Route** (`/app/api/waitlist/route.ts`) — validates, stores, emails
3. **Database** — single `waitlist` table in Vercel Postgres (Neon)

## Database

### Schema

```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

- `UNIQUE` on email prevents duplicates at the DB level
- No additional fields — just email and timestamp

### Provisioning

Create via Vercel dashboard: Storage > Create Database > Postgres. This auto-injects `POSTGRES_URL` and related env vars into the project.

Run the CREATE TABLE statement via the Vercel dashboard SQL editor or a seed script.

## API Route

### `POST /app/api/waitlist/route.ts`

**Request:**
```json
{ "email": "user@example.com" }
```

**Flow:**
1. Rate limit by IP (simple in-memory map, 5 requests per minute per IP)
2. Parse JSON body; reject malformed requests
3. Validate email: must contain `@` with a dot after it, max 254 characters (RFC 5321), then lowercase before insert
4. Insert into `waitlist` table
5. If unique violation (duplicate) → return 200 with "already signed up" message
6. Send confirmation email via Resend
7. Return 200 with success message

**Responses:**
- `200 { status: "success" }` — new signup
- `200 { status: "already_signed_up" }` — duplicate
- `400 { status: "error", message: "Invalid email address" }` — bad input
- `429 { status: "error", message: "Too many requests" }` — rate limited
- `500 { status: "error", message: "Something went wrong. Please try again." }` — server error

**No authentication required.** Public endpoint. Rate limited by IP to prevent abuse (DB filling, Resend quota exhaustion, email bombing).

**UI messages stay hardcoded in the component.** The API returns a `status` field; the form maps status to display message. This keeps copy in the UI layer.

## Confirmation Email

Sent via Resend SDK after successful DB insert.

**From:** `onboarding@resend.dev` (dev/testing only — configure a custom domain in Resend before going live, then set `EMAIL_FROM` env var)
**Subject:** You're on the Toffee waitlist!
**Body:** Plain text or simple HTML:

> Thanks for signing up for Toffee! We'll let you know when it's your turn.

Keep it minimal — no heavy templates, no images. A real email from a real product.

If the Resend call fails, the signup is still saved (email sending is best-effort, not transactional). The API still returns success to the user.

## Form Changes

### Current behavior
- `useState` tracks email and `submitted` state
- On submit: sets `submitted = true`, shows success message
- No network request

### New behavior
- On submit: POST to `/api/waitlist` with email
- Show loading state on button ("Joining...")
- On success: show success message (same as current)
- On duplicate: show "You're already on the list!" (friendly, not an error)
- On error: show error message, allow retry

Add a `loading` state alongside existing `email` and `submitted` states. No other UI changes needed.

## Environment Variables

| Variable | Source | Required |
|---|---|---|
| `POSTGRES_URL` | Auto-injected by Vercel Postgres | Yes |
| `RESEND_API_KEY` | Resend dashboard | Yes |
| `EMAIL_FROM` | Manual, defaults to `onboarding@resend.dev` | No |

## Dependencies

New packages to install:

- `@vercel/postgres` — Vercel's Postgres client
- `resend` — Resend SDK

## Files Changed

| File | Change |
|---|---|
| `app/api/waitlist/route.ts` | New — API route with rate limiting |
| `app/waitlist/page.tsx` | Modified — real form submission |
| `package.json` | Modified — new dependencies |
| `.env.example` | New — documents required env vars (no secrets) |
| `scripts/seed.sql` | New — version-controlled schema |

## Out of Scope

- Admin dashboard for viewing signups (query DB directly or use Vercel dashboard)
- Referral mechanics
- Unsubscribe flow
- Custom email templates
- CAPTCHA (IP rate limiting is sufficient for a pre-launch waitlist)
