# Blog: "The Internet Is Getting a Second Mode" Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add blog infrastructure to the Next.js landing site and publish the first blog post — "The Internet Is Getting a Second Mode" — following the approved spec at `docs/superpowers/specs/2026-03-18-internet-second-mode-blog-design.md`.

**Architecture:** File-based MDX blog using `next-mdx-remote` for rendering markdown content with React components. Blog posts live as `.mdx` files in `content/blog/`. A dynamic route `app/blog/[slug]/page.tsx` renders them. Blog index at `app/blog/page.tsx`. Reuses existing design system (CSS Modules, CSS variables, ABeeZee font). Blog pages get a clean reading layout — no gradient background, no clouds — optimized for long-form text readability.

**Tech Stack:** Next.js 16, next-mdx-remote, gray-matter (frontmatter parsing), CSS Modules, existing design tokens.

**Spec:** `docs/superpowers/specs/2026-03-18-internet-second-mode-blog-design.md`

---

## File Structure

```
content/
  blog/
    the-internet-is-getting-a-second-mode.mdx    # First blog post content

app/
  blog/
    layout.tsx                                     # Blog layout (clean bg, minimal nav)
    layout.module.css                              # Blog layout styles
    page.tsx                                       # Blog index page (list of posts)
    page.module.css                                # Blog index styles
    [slug]/
      page.tsx                                     # Dynamic blog post renderer
      page.module.css                              # Blog post styles

lib/
  blog.ts                                          # Blog utility functions (load posts, parse frontmatter)
```

---

## Task 1: Install MDX dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install next-mdx-remote and gray-matter**

```bash
npm install next-mdx-remote gray-matter
```

- [ ] **Step 2: Verify installation**

```bash
node -e "require('next-mdx-remote'); require('gray-matter'); console.log('OK')"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add next-mdx-remote and gray-matter for blog support"
```

---

## Task 2: Create blog utility functions

**Files:**
- Create: `lib/blog.ts`

- [ ] **Step 1: Create `lib/blog.ts`**

This module handles loading MDX files from the `content/blog/` directory and parsing frontmatter. It exports:
- `getPostBySlug(slug: string)` — returns frontmatter + raw MDX content for a single post
- `getAllPosts()` — returns sorted list of all posts (by date, descending) with frontmatter only

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    title: data.title,
    description: data.description,
    date: data.date,
    slug,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return {
      title: data.title,
      description: data.description,
      date: data.date,
      slug,
    };
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

- [ ] **Step 2: Verify the whole project compiles**

```bash
npx tsc --noEmit 2>&1 || echo "Check for type errors"
```

- [ ] **Step 3: Commit**

```bash
git add lib/blog.ts
git commit -m "feat: add blog utility functions for loading MDX posts"
```

---

## Task 3: Create the blog post MDX content

**Files:**
- Create: `content/blog/the-internet-is-getting-a-second-mode.mdx`

- [ ] **Step 1: Create the content directory**

```bash
mkdir -p content/blog
```

- [ ] **Step 2: Write the blog post**

Create `content/blog/the-internet-is-getting-a-second-mode.mdx` with frontmatter and the full blog content.

**IMPORTANT:** The implementer MUST read the full spec at `docs/superpowers/specs/2026-03-18-internet-second-mode-blog-design.md`, not just this summary. The spec contains the specific arguments, data interpretations, rhetorical approach, and source URLs for each section. This summary is a structural guide — the spec is the source of truth.

The content MUST follow the approved spec exactly:

**Frontmatter:**
```yaml
---
title: "The Internet Is Getting a Second Mode"
description: "The companies that optimize for AI agents first will dominate the next era of commerce. Most businesses don't even know there's a race."
date: "2026-03-18"
---
```

**Content structure (follow the spec section by section):**

1. **Opening Thesis (~200 words)** — Bold claim, Imperva 51% stat (qualified), McKinsey $3-5T, a16z quote, Anthropic bubble data, connect bubble to first-mover opportunity. No preamble.

2. **Bots Are Not Agents (~250 words)** — Three-way actor model. Core distinction: bots need context, agents create it. LLM-scraper gray zone. Visa Trusted Agent Protocol. Humans (serve), agents (facilitate), bots (block).

3. **Why The Current Internet Fails Agents (~300 words)** — Flight search example (YouGov 70%, Baymard cart abandonment, GDS oligopoly). Three reasons: data providers gatekeep (McKinsey quote), scrapers are wrong solution (ScrapeOps stats), server side needs to decide. Forward-reference to Integration Capacity.

4. **The AgentEx Framework (~400-450 words)** — Acknowledge coining the term honestly. Steelman counterargument (agents break because infra doesn't exist). Gartner 40% enterprise apps stat. Four dimensions:
   - Observability (Quantum Metric, Dark Visitors, Toffee's starting point)
   - Integration Capacity (MCP 97M+ downloads, Agentic AI Foundation, Skills, UCP, ACP, Visa TAP)
   - Analytics (observability vs analytics distinction, IEEE Spectrum agent attention economy)
   - Trust & Identity (Strata 45B identities, ISACA, Visa TAP + Skyfire KYAPay, privacy note)

5. **GEO Is Not Enough (~200 words)** — Define GEO (Aggarwal et al. KDD 2024, 40% visibility boost). One question: "can an agent find you?" Doesn't answer the rest. GEO touches Observability + Integration Capacity but is just one technique.

6. **The Timeline (~250 words)** — Phase 1: Human-Only (1990s-2010s). Phase 2: Hybrid Mode (2024-2026, where we are, where Toffee's observability lives). Phase 3: Dual-Mode (2027+, Gartner 90% B2B, $15T).

7. **Closing (~150 words)** — Return to thesis. End on: "The window is open. It won't stay open." No CTA.

**Source linking:** All citations must be hyperlinked inline using markdown link syntax `[text](url)`. Use the 25 sources from the spec's Source Index.

**Tone:** Sharp, provocative, Paul Graham style. No hedging. Every factual claim sourced. Opinions clearly stated as conviction.

**Length:** ~1750 words total.

- [ ] **Step 3: Verify frontmatter parses correctly**

```bash
node -e "
const matter = require('gray-matter');
const fs = require('fs');
const { data } = matter(fs.readFileSync('content/blog/the-internet-is-getting-a-second-mode.mdx', 'utf-8'));
console.log(data.title, data.date);
"
```

Expected: `The Internet Is Getting a Second Mode 2026-03-18`

- [ ] **Step 4: Commit**

```bash
git add content/blog/the-internet-is-getting-a-second-mode.mdx
git commit -m "feat: add first blog post - The Internet Is Getting a Second Mode"
```

---

## Task 4: Create the blog layout with clean background

**Files:**
- Create: `app/blog/layout.tsx`
- Create: `app/blog/layout.module.css`

The layout MUST come before the blog post page so that verification steps show correct visual output.

- [ ] **Step 1: Create `app/blog/layout.tsx`**

Blog pages need a different visual treatment than the landing page — clean white background, no gradient, no clouds. This layout wraps all `/blog/*` routes.

```typescript
import styles from "./layout.module.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.blogLayout}>
      <nav className={styles.nav}>
        <a href="/" className={styles.wordmark}>
          Toffee
        </a>
        <a href="/blog" className={styles.blogLink}>
          Blog
        </a>
      </nav>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `app/blog/layout.module.css`**

**Critical:** The `.blogLayout` needs `position: relative; z-index: 1;` to create a stacking context above the `body::before` grain texture (which is `position: fixed; z-index: 0;` in globals.css). Also set `color: var(--color-deep-ink)` to override the inherited white body text color.

```css
.blogLayout {
  min-height: 100vh;
  background: #fafafa;
  position: relative;
  z-index: 1;
  color: var(--color-deep-ink);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-height);
  padding: 0 24px;
  max-width: 720px;
  margin: 0 auto;
}

.wordmark {
  font-size: 1.25rem;
  color: var(--color-deep-violet);
  font-style: italic;
}

.blogLink {
  font-size: 0.875rem;
  color: var(--color-mid-purple);
}

.blogLink:hover {
  color: var(--color-deep-violet);
}
```

- [ ] **Step 3: Commit**

```bash
git add app/blog/layout.tsx app/blog/layout.module.css
git commit -m "feat: add blog layout with clean background and minimal nav"
```

---

## Task 5: Create the blog post page (dynamic route)

**Files:**
- Create: `app/blog/[slug]/page.tsx`
- Create: `app/blog/[slug]/page.module.css`

- [ ] **Step 1: Create `app/blog/[slug]/page.tsx`**

This is a **server component** (no "use client"). It:
- Uses `generateStaticParams` to pre-render all blog posts at build time
- Exports `dynamicParams = false` so unknown slugs return 404 (not a crash)
- Calls `getPostBySlug` to load content
- Uses `MDXRemote` from `next-mdx-remote/rsc` to render MDX
- Exports dynamic `generateMetadata` for SEO (title, description, og tags)

Note: If future blog posts need custom React components in MDX, add a `components` prop to `MDXRemote`. For now, the spec only uses standard markdown elements.

```typescript
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.title} — Toffee Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <time className={styles.date} dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.description}>{post.description}</p>
      </header>
      <div className={styles.content}>
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create `app/blog/[slug]/page.module.css`**

Blog post typography and layout. Optimized for long-form reading. Uses existing design tokens.

```css
.article {
  max-width: 720px;
  margin: 0 auto;
  padding: calc(var(--nav-height) + 48px) 24px 96px;
  color: var(--color-deep-ink);
}

.header {
  margin-bottom: 48px;
  border-bottom: 1px solid var(--color-light-lavender);
  padding-bottom: 32px;
}

.date {
  display: block;
  font-size: 0.875rem;
  color: var(--color-muted-grey);
  margin-bottom: 12px;
}

.title {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.15;
  color: var(--color-deep-violet);
  margin-bottom: 16px;
  font-weight: 400;
}

.description {
  font-size: 1.25rem;
  color: var(--color-mid-purple);
  line-height: 1.5;
}

/* ── Prose styles for MDX content ── */
.content {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--color-deep-ink);
}

.content h2 {
  font-size: 1.5rem;
  color: var(--color-deep-violet);
  margin-top: 48px;
  margin-bottom: 16px;
  font-weight: 400;
}

.content h3 {
  font-size: 1.25rem;
  color: var(--color-mid-purple);
  margin-top: 32px;
  margin-bottom: 12px;
  font-weight: 400;
}

.content p {
  margin-bottom: 24px;
}

.content a {
  color: var(--color-electric-blue);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.content a:hover {
  color: var(--color-soft-lavender);
}

.content strong {
  font-weight: 700;
  color: var(--color-deep-violet);
}

.content blockquote {
  border-left: 3px solid var(--color-soft-lavender);
  padding-left: 20px;
  margin: 24px 0;
  color: var(--color-mid-purple);
  font-style: italic;
}

.content ul,
.content ol {
  margin-bottom: 24px;
  padding-left: 24px;
}

.content li {
  margin-bottom: 8px;
}

.content hr {
  border: none;
  border-top: 1px solid var(--color-light-lavender);
  margin: 48px 0;
}
```

- [ ] **Step 3: Verify the page builds**

```bash
npx next build 2>&1 | tail -20
```

Expected: Build succeeds, `/blog/the-internet-is-getting-a-second-mode` appears in the output.

- [ ] **Step 4: Visual check — start dev server and verify the post renders with clean layout**

```bash
npx next dev &
sleep 3
curl -s http://localhost:3000/blog/the-internet-is-getting-a-second-mode | head -50
kill %1
```

Expected: HTML output containing the blog post title, content, and `blogLayout` class (from the layout created in Task 4).

- [ ] **Step 5: Commit**

```bash
git add app/blog/\[slug\]/page.tsx app/blog/\[slug\]/page.module.css
git commit -m "feat: add dynamic blog post page with MDX rendering"
```

---

## Task 6: Create the blog index page

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/page.module.css`

- [ ] **Step 1: Create `app/blog/page.tsx`**

Server component. Lists all blog posts sorted by date (newest first). Links to individual posts.

```typescript
import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog — Toffee",
  description: "Thoughts on the agent economy, commerce infrastructure, and the future of the internet.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Blog</h1>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.postItem}>
            <Link href={`/blog/${post.slug}`} className={styles.postLink}>
              <time className={styles.postDate} dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postDescription}>{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

- [ ] **Step 2: Create `app/blog/page.module.css`**

```css
.main {
  max-width: 720px;
  margin: 0 auto;
  padding: calc(var(--nav-height) + 48px) 24px 96px;
}

.heading {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--color-deep-violet);
  margin-bottom: 48px;
  font-weight: 400;
}

.postList {
  list-style: none;
  padding: 0;
}

.postItem {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--color-light-lavender);
}

.postItem:last-child {
  border-bottom: none;
}

.postLink {
  display: block;
  text-decoration: none;
}

.postLink:hover .postTitle {
  color: var(--color-soft-lavender);
}

.postDate {
  display: block;
  font-size: 0.875rem;
  color: var(--color-muted-grey);
  margin-bottom: 8px;
}

.postTitle {
  font-size: 1.5rem;
  color: var(--color-deep-violet);
  margin-bottom: 8px;
  font-weight: 400;
  transition: color 0.2s ease;
}

.postDescription {
  font-size: 1rem;
  color: var(--color-mid-purple);
  line-height: 1.5;
}
```

- [ ] **Step 3: Verify — blog index page renders and links to the post**

```bash
npx next dev &
sleep 3
curl -s http://localhost:3000/blog | grep "internet-is-getting-a-second-mode"
kill %1
```

Expected: Output contains a link to the blog post slug.

- [ ] **Step 4: Commit**

```bash
git add app/blog/page.tsx app/blog/page.module.css
git commit -m "feat: add blog index page listing all posts"
```

---

## Task 7: Build verification and final commit

**Files:**
- None new — verification only

- [ ] **Step 1: Run full build**

```bash
npx next build
```

Expected: Build succeeds with no errors. Output shows routes:
- `/blog` (blog index)
- `/blog/the-internet-is-getting-a-second-mode` (blog post)

- [ ] **Step 2: Start production server and verify both pages**

```bash
npx next start &
sleep 3
echo "--- Blog Index ---"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/blog
echo ""
echo "--- Blog Post ---"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/blog/the-internet-is-getting-a-second-mode
echo ""
kill %1
```

Expected: Both return `200`.

- [ ] **Step 3: Verify landing page is unaffected**

```bash
npx next start &
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
echo ""
kill %1
```

Expected: `200` — landing page still works.

- [ ] **Step 4: Push branch to remote**

```bash
git push -u origin feat/blog
```
