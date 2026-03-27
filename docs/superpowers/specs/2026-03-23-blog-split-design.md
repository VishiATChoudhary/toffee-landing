# Blog Split: "The Internet Is Getting a Second Mode" into Two Posts

## Context

The current blog post at `content/blog/the-internet-is-getting-a-second-mode.mdx` is too long and covers two distinct narratives: (1) the macro industry shift toward agentic commerce, and (2) Toffee's OIAT framework and product perspective. Splitting into two focused posts improves readability and allows each narrative to land more effectively.

## Decision: "Bots are not agents" section

The "Bots are not agents" section (current lines 24–42, including `<SignalList />`) is being removed from both posts and saved for a future standalone blog post. It's a strong piece on its own but disrupts the flow of Blog 1. The `SignalList` component file should be retained for that future post.

---

## Blog 1: "The Internet Is Getting a Second Mode"

**File:** `content/blog/the-internet-is-getting-a-second-mode.mdx`
**Date:** 2026-03-18 (unchanged)
**Description:** "The companies that optimize for AI agents first will dominate the next era of commerce. Most businesses don't even know there's a race."

### Structure

1. **Opening quote** (existing line 7)
   > The web treats all non-human traffic the same: block it. That made sense when the only non-human visitors were scrapers and spam bots. It doesn't make sense when an agent is trying to buy someone a flight.

2. **Intro** (existing lines 9–21)
   - Internet built on "non-human = hostile" assumption
   - Imperva 2025: 51% non-human traffic
   - McKinsey: $3-5T agent commerce by 2030, a16z on agent interfaces
   - Anthropic: adoption skews early adopters
   - The gap = the opportunity

3. **"Why the current internet fails agents"** (existing lines 45–63)
   - Flight booking example
   - GDS oligopoly (Amadeus/Sabre/Travelport 97%)
   - McKinsey: machine-readable catalogs
   - Scraping doesn't scale (ScrapeOps, ScrapeGraphAI stats)
   - Server-side problem solved with client-side hacks

4. **New closing** (~3-4 sentences)
   - Draw from the thematic thread of the original "The Window" section (lines 148–157): a new actor with intent and purchasing power has entered the internet, most businesses still treat it as a threat, the gap between reality and readiness is where the next wave of value gets created.
   - Can lightly link forward to Blog 2 ("Read more about what the full stack looks like").

### What's removed
- "Bots are not agents" section (lines 24–42) — saved for future post
- "OIAT" section (lines 66–110) — moves to Blog 2
- "GEO is not enough" section (lines 113–125) — moves to Blog 2
- "The timeline" section (lines 128–145) — moves to Blog 2
- "The window" section (lines 148–157) — replaced by fresh closing

### Components used
- None (SignalList removed with "Bots are not agents")

---

## Blog 2: "Why GEO Is Not Enough"

**File:** `content/blog/why-geo-is-not-enough.mdx` (new)
**Date:** 2026-03-20
**Description:** "Most companies think GEO solves agentic commerce. It doesn't. Here's what the full stack actually looks like."

**Frontmatter:**
```yaml
---
title: "Why GEO Is Not Enough"
description: "Most companies think GEO solves agentic commerce. It doesn't. Here's what the full stack actually looks like."
date: "2026-03-20"
---
```

### Structure

1. **New intro** (~2-3 paragraphs)
   - Sets context: agents are arriving in commerce (can lightly reference Blog 1)
   - Most companies' response has been GEO — optimize content for AI-generated answers
   - That's a start, but it doesn't go far enough

2. **"GEO is not enough"** (from existing lines 113–125)
   - GEO = structure content for AI answers, works for discovery
   - Research shows up to 40% visibility gains (Aggarwal et al.)
   - But GEO helps agents find you, not transact with you
   - Discovery is one layer; understanding, execution, verification, measurement sit on top
   - Early SEO mistake analogy: visibility without underlying system
   - "You need the full stack."

3. **"OIAT: the four pillars of an agent-ready internet"** (from existing lines 66–110)
   - Intro: what would the internet need if rebuilt for agents? OIAT.
   - Objection handling: agents don't work yet → they fail because infrastructure doesn't exist
   - Gartner: 40% enterprise apps with agents by 2026
   - `<OIATStack />` component
   - **Observability** — can't optimize what you can't see, Quantum Metric, Dark Visitors
   - **Integration** — MCP/Skills/UCP/ACP, 97M monthly SDK downloads, protocol vs implementation gap
   - **Analytics** — observability = what happened, analytics = what it means, new metrics needed
   - **Trust & Identity** — 45B non-human identities (Strata), IAM can't distinguish good/bad (ISACA), privacy challenges

4. **"The timeline"** (from existing lines 128–145, reframed)
   - `<TimelineScrubber />` component
   - Phase 1: Human-only (1990s–2010s)
   - Phase 2: Hybrid (2024–2026) — where we are
   - Phase 3: Dual-mode (2027+)
   - Gartner: 90% B2B agent-mediated by 2028
   - Build during Phase 2 → benefit in Phase 3

5. **New closing** (~3-4 sentences)
   - Product-oriented: the infrastructure gap is the opportunity
   - GEO got you to the starting line, now build the rest
   - The companies building during the hybrid phase are the ones that win

### Components used
- `<OIATStack />`
- `<TimelineScrubber />`

---

## Files Modified

| File | Action |
|---|---|
| `content/blog/the-internet-is-getting-a-second-mode.mdx` | Trim: remove sections 24-42 and 66-157, add fresh closing |
| `content/blog/why-geo-is-not-enough.mdx` | Create: new file with reordered OIAT/GEO/Timeline content |
| `app/blog/page.tsx` | Update posts array to list both visible posts |

### Note on blog index architecture

The blog index uses a hardcoded `posts` array (client component for animations) while the sitemap uses dynamic `getAllPosts()`. This is intentional — the hardcoded array controls which posts are visible on the index page (e.g., `future-of-retail-at-wharton` exists on disk and in the sitemap for SEO but is deliberately hidden from the index). This pattern is preserved.

### Blog index (`app/blog/page.tsx`)

```ts
const posts = [
  {
    slug: "why-geo-is-not-enough",
    title: "Why GEO Is Not Enough",
    description: "Most companies think GEO solves agentic commerce. It doesn't. Here's what the full stack actually looks like.",
    date: "2026-03-20",
  },
  {
    slug: "the-internet-is-getting-a-second-mode",
    title: "The Internet Is Getting a Second Mode",
    description: "The companies that optimize for AI agents first will dominate the next era of commerce. Most businesses don't even know there's a race.",
    date: "2026-03-18",
  },
];
```

### Sitemap

No changes needed — `app/sitemap.ts` already uses `getAllPosts()` from `lib/blog.ts` which reads all `.mdx` files from `content/blog/`. The new post will be included automatically.

---

## Verification

1. `npm run build` — confirm both blog posts render without errors
2. Visit `/blog` — both posts listed, correct titles/dates/descriptions
3. Visit `/blog/the-internet-is-getting-a-second-mode` — trimmed post with fresh closing
4. Visit `/blog/why-geo-is-not-enough` — new post with reordered content, OIATStack and TimelineScrubber rendering
5. Confirm sitemap at `/sitemap.xml` includes all blog post URLs
