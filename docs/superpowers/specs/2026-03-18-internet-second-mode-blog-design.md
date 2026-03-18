# Blog Design Spec: "The Internet Is Getting a Second Mode"

## Overview

A thought leadership blog post establishing Toffee's thesis on the future of the internet: the shift from a human-only web to a dual-mode internet (Human Mode + Agent Mode), and why companies that optimize for agents first will have a massive first-mover advantage.

## Meta

- **Type:** Thought leadership / vision piece
- **Target audience:** Broader tech/startup community (YC, a16z style)
- **Tone:** Sharp, provocative, bold claims with grounded citations (Paul Graham style)
- **Length:** ~1750 words
- **Working title:** "The Internet Is Getting a Second Mode"

## Structure

### Section 1: The Opening Thesis (~200 words)

**Purpose:** Bold claim + evidence + stakes.

Open with the punch: the companies that optimize for AI agents first will dominate the next era of commerce. Most businesses don't even know there's a race.

Ground it immediately with data:
- Imperva 2025 Bad Bot Report: non-human traffic overtook human traffic for the first time at 51% (source: https://cpl.thalesgroup.com/about-us/newsroom/2025-imperva-bad-bot-report-ai-internet-traffic). **Important caveat:** most of that 51% is still traditional bot traffic — scrapers, crawlers, spam. But the composition is shifting. The new entrants are agents, and they're qualitatively different (Section 2 draws this line).
- McKinsey projects agents will mediate $3-5T in consumer commerce by 2030 (source: https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants)
- a16z's 2026 AI outlook: "In 2026, people will start interfacing with the web through their agents" (source: https://a16z.com/notes-on-ai-apps-in-2026/)

Then the nuance: Anthropic's AI Fluency Index (Feb 2026) shows the sample "likely skews towards early adopters" — AI power users are in a bubble. Anthropic Economic Index (Sept 2025) shows adoption correlates with wealth (1% higher GDP = 1.8% higher Claude usage). Most of the world hasn't felt this shift yet.
- Source: https://www.anthropic.com/research/AI-fluency-index
- Source: https://www.anthropic.com/research/anthropic-economic-index-september-2025-report

**Explicitly connect the bubble to the opportunity:** That asymmetry *is* the first-mover advantage. The businesses that recognize this shift now — while competitors are still asleep — get to build for the agent economy before it's crowded. By the time the mainstream catches on, the early movers will already have the infrastructure, the data, and the optimization flywheel running.

Close with the framing: the internet is moving from a single mode (human) to a dual mode (human + agent). This blog lays out what that means, what's needed, and why acting now matters.

**Tone:** No preamble, no "in this blog post we will discuss." Just the claim, the evidence, the stakes.

---

### Section 2: Bots Are Not Agents (~250 words)

**Purpose:** Draw the critical distinction. Establish the three-way actor model (humans, agents, bots).

The internet has had non-human actors for decades — scrapers, crawlers, spam bots. They're a nuisance. The industry's response was defensive: CAPTCHAs, rate limiting, bot detection, robots.txt. Non-human traffic was treated as hostile by default.

Agents are fundamentally different. The core distinction: **bots need context. Agents create it.** A bot follows a script — "go to this URL, extract this CSS selector, return the price." When the page changes, the bot breaks. An agent has intent, reasons about goals, adapts to what it finds.

**Address the gray zone:** Yes, some sophisticated scrapers now use LLMs to adapt to page changes. That doesn't make them agents. The distinction isn't about technical sophistication — it's about intent. An agent acts on behalf of a specific user toward a goal. A bot extracts data for whoever deployed it. The LLM-powered scraper is a smarter bot, not a dumber agent.

Sources:
- ScienceDirect/arXiv taxonomy paper: "AI Agents vs. Agentic AI: A Conceptual Taxonomy, Applications and Challenges" (https://www.sciencedirect.com/science/article/pii/S1566253525006712)
- Visa Trusted Agent Protocol: built specifically to "distinguish a legitimate, credentialed agent from an anonymous bot" (https://investor.visa.com/news/news-details/2025/Visa-Introduces-Trusted-Agent-Protocol-An-Ecosystem-Led-Framework-for-AI-Commerce/default.aspx)
- IEEE Spectrum — "The Agentic Web": "The Web today is very much designed for humans... agents don't operate like humans" (https://spectrum.ieee.org/agentic-web)

The stance: the web's current binary (human = good, non-human = bad) is broken. We need a three-way distinction: humans (serve), agents (facilitate), bots (block). The inability to make this distinction is what's holding back the agent-ready internet.

We want to facilitate non-malicious agents acting on behalf of real users. We don't want bots. The internet currently can't tell the difference — and that's the problem.

**Tone:** Confident, slightly contrarian. "Everyone lumps these together. That's a mistake."

---

### Section 3: Why The Current Internet Fails Agents (~300 words)

**Purpose:** Ground the abstract in a concrete example, then zoom out to systemic critique.

Open with the flight search example. You want to book a flight. You open 6 tabs, compare prices, check dates, read fine print. It's painful. Now imagine your agent doing this for you. Sounds great — except it can't.

Sources for the flight example:
- YouGov 2025: 70% of US travelers find booking stress-inducing (https://yougov.com/en-us/reports/51330-us-travel-stress-report-2025)
- Baymard Institute: average online cart abandonment rate is ~70%, airlines significantly higher (https://baymard.com/lists/cart-abandonment-rate)
- GDS oligopoly: Amadeus/Sabre/Travelport control ~97% of bookings (https://www.businesstravelnews.com/State-of-the-Industry/2025/Part-2-CONTENT-FRAGMENTATION)

**Three reasons why the current internet fails agents:**

1. **Data providers gatekeep.** Access is expensive, restricted, designed for legacy integrations. Not unique to travel — it's the pattern across commerce. McKinsey: "If a catalog, policies, and value proposition are not machine-readable, agents — and by extension, shoppers — simply will not find you" (source: https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants).

2. **Scrapers are the wrong solution.** Scraping is brittle by design. ScrapeOps: 10-15% of crawlers need weekly fixes. Maintenance eats 60-70% of total cost. Legally it's a minefield (hiQ v. LinkedIn). Scraping is a client-side hack for a server-side problem.
   - Source: https://scrapeops.io/web-scraping-playbook/web-scraping-market-report-2025/
   - Source: https://scrapegraphai.com/blog/economics-of-web-scraping

3. **The server side needs to decide.** The entity that owns the data should decide how to make it accessible to agents. Not scrapers guessing at DOM structures. Fundamental inversion needed: from clients extracting data to servers publishing it. The protocols are emerging (detailed in Section 4: Integration Capacity), but adoption at the storefront level is where everything stalls.

**Tone:** Relatable frustration (flight example), then systemic critique.

---

### Section 4: The AgentEx Framework (~400 words)

**Purpose:** The core intellectual contribution. Name and define what the agent-ready internet needs.

Frame: "We optimized the internet for human experience (UX). Now we need to optimize for agent experience — AgentEx."

**Acknowledge the naming:** Be explicit that this is a framework we're proposing. "No one has named this yet. Here's our attempt." Intellectual honesty about coining a term builds more credibility with the target audience than presenting it as established fact.

**Steelman the counterargument:** Before diving into the dimensions, briefly address the skeptic: "Agents haven't reliably delivered yet. Most demos are impressive; most real-world agent workflows still break. That's true — and it's precisely the point. They break because the infrastructure doesn't exist. The internet wasn't built for them. AgentEx is what needs to be built so agents can actually work." This turns the strongest objection into evidence for your thesis.

Cite Gartner: 40% of enterprise apps will feature task-specific AI agents by end of 2026, up from less than 5% in 2025 (source: https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025). The demand side is exploding. The supply side (infrastructure) is lagging.

**Four dimensions:**

**1. Observability** — You can't optimize what you can't see. Today's analytics are built for humans — page views, click-through rates, session duration. None of that maps to how agents interact with your site. You need to know: which agents are visiting? What components are they parsing? Where do they succeed or fail? Are they converting?

This is where Toffee starts — real agent interaction observability. Not just checking if you show up in ChatGPT results. Actual data on how agents interact with components of your website.

Sources:
- Quantum Metric: "your next website visitor might not be human... brands need the ability to detect and segment AI traffic" (https://www.quantummetric.com/blog/how-to-build-an-ai-agent-ready-website)
- Dark Visitors: https://darkvisitors.com/

**2. Integration Capacity** — New protocols for structured agent-server communication. MCP (97M+ monthly SDK downloads, backed by Anthropic, OpenAI, Google, Microsoft under the Agentic AI Foundation). Skills, UCP, ACP — different bets on how agents and services should talk. Visa's Trusted Agent Protocol for commerce. The industry is racing to build the plumbing. What's missing is adoption at the storefront level.

Sources:
- MCP adoption: https://www.pento.ai/blog/a-year-of-mcp-2025-review
- Agentic AI Foundation: https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
- Visa Trusted Agent Protocol: https://investor.visa.com/news/news-details/2025/Visa-Introduces-Trusted-Agent-Protocol-An-Ecosystem-Led-Framework-for-AI-Commerce/default.aspx

**3. Analytics** — Different from observability. Observability is "what happened." Analytics is "what does it mean." Agent conversion funnels look nothing like human ones. An agent doesn't browse — it evaluates, compares, decides. New metrics needed: agent discoverability score, data structure quality, machine-readability index, agent conversion rate. The entire analytics stack needs rethinking for a non-human actor.

Source:
- IEEE Spectrum on "agent attention economy": https://spectrum.ieee.org/ai-agent-economy

**4. Trust & Identity** — How do you distinguish a legitimate agent acting on behalf of a real user from a malicious bot? The internet needs an identity layer for agents. This includes authentication (is this agent who it claims to be?), authorization (what is it allowed to do?), and accountability (who is responsible when it acts?).

**Brief note on privacy:** When an agent acts on your behalf across multiple storefronts, it potentially leaks preference data, purchasing behavior, and intent signals across parties. The identity layer must also be a privacy layer — agents need to authenticate without over-sharing.

Sources:
- Strata: 45B+ non-human identities deployed by end of 2025 (https://www.strata.io/blog/agentic-identity/new-identity-playbook-ai-agents-not-nhi-8b/)
- ISACA: traditional IAM "cannot distinguish between good bots and bad bots" (https://www.isaca.org/resources/news-and-trends/industry-news/2025/the-looming-authorization-crisis-why-traditional-iam-fails-agentic-ai)
- Visa Trusted Agent Protocol + Skyfire KYAPay: https://www.businesswire.com/news/home/20251218520399/en/Skyfire-Demonstrates-Secure-Agentic-Commerce-Purchase-Using-the-KYAPay-Protocol-and-Visa-Intelligent-Commerce

**Tone:** Authoritative, structured. Naming things that don't have names yet.

---

### Section 5: GEO Is Not Enough (~200 words)

**Purpose:** Zoom in on the one piece most people know, show it's just a sliver.

Introduce GEO — Generative Engine Optimization. Cite the foundational Aggarwal et al. KDD 2024 paper: the practice of structuring content to improve visibility in AI-generated responses (ChatGPT, Perplexity, Gemini). Can boost source visibility by up to 40%. SEO's natural successor — instead of ranking in Google's blue links, you're showing up in an LLM's answer.

Sources:
- Aggarwal et al. KDD 2024: https://arxiv.org/abs/2311.09735
- ACM proceedings (source index #25): https://dl.acm.org/doi/10.1145/3637528.3671900

GEO is real and it matters. But it answers exactly one question: "can an agent find you?"

It doesn't answer: can an agent understand your product data? Can it transact on your site? Can you tell it apart from a bot? Can you measure what it did on your storefront?

GEO lives inside the AgentEx framework — it touches Observability (discoverability is a precondition for observation) and Integration Capacity (structured content is how agents consume your data). But it's still just one technique within a much larger system. The companies that treat GEO as the whole strategy will be like the companies that thought SEO was the whole digital strategy. You need the full framework.

**Tone:** Respectful of GEO, but clear that it's insufficient.

---

### Section 6: The Timeline (~250 words)

**Purpose:** Map the phases and show where we are. Visual/narrative element.

Three phases:

**Phase 1: Human-Only Internet (1990s–2010s)**
The web was built for humans. Browsers, links, forms, shopping carts. Non-human traffic existed only as a nuisance — scrapers and spam bots. The response was defensive: CAPTCHAs, rate limiting, bot detection. The assumption: legitimate traffic is human.

**Phase 2: Hybrid Mode (Now — 2024–2026)**
Agents are emerging but the internet hasn't adapted. Non-human traffic crossed 51% (Imperva 2025). AI agents are trying to shop, book, research — but they're hitting walls built to keep bots out. Businesses are asking "how do I show up in ChatGPT?" (GEO) but haven't grasped the full picture (AgentEx). Toffee's first product — agent observability — lives here. You can't transition to the next phase if you can't see what's happening in this one.

**Phase 3: Dual-Mode Internet (2027+)**
The internet runs in two modes: Human Mode and Agent Mode. Storefronts serve both. Protocols (MCP, Skills, UCP, ACP, Visa Trusted Agent Protocol) are mature and adopted. Agent identity is solved. Analytics are bifurcated. The companies that optimized early — during the hybrid phase — are the ones capturing the $3-5T in agent-mediated commerce (McKinsey).

Source:
- Gartner: 90% of B2B buying AI-agent intermediated by 2028, $15T in B2B spend (https://www.digitalcommerce360.com/2025/11/28/gartner-ai-agents-15-trillion-in-b2b-purchases-by-2028/)

**Tone:** Inevitable but not utopian. The question is who gets there first.

---

### Section 7: The Closing (~150 words)

**Purpose:** Return to the thesis. No new arguments — just the punch.

The internet is bifurcating. A new actor is here — not a bot, not a human, but an agent acting with intent on behalf of real users with real money. The infrastructure to serve this actor is being built right now. Protocols are proliferating. The first observability tools are emerging. The frameworks are being named.

But most businesses are asleep. Anthropic's data shows power users are in a bubble. McKinsey says if you're not machine-readable, agents won't find you. Gartner says 90% of B2B buying will be agent-intermediated by 2028.

The window is open. It won't stay open.

**No CTA, no "sign up for Toffee." The thesis speaks for itself. End on "The window is open. It won't stay open." — that's the last line.**

---

## Source Index

| # | Source | URL |
|---|--------|-----|
| 1 | Imperva 2025 Bad Bot Report | https://cpl.thalesgroup.com/about-us/newsroom/2025-imperva-bad-bot-report-ai-internet-traffic |
| 2 | McKinsey — Agentic Commerce Opportunity | https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants |
| 3 | Anthropic AI Fluency Index (Feb 2026) | https://www.anthropic.com/research/AI-fluency-index |
| 4 | Anthropic Economic Index (Sept 2025) | https://www.anthropic.com/research/anthropic-economic-index-september-2025-report |
| 5 | ScienceDirect — AI Agents vs. Agentic AI Taxonomy | https://www.sciencedirect.com/science/article/pii/S1566253525006712 |
| 6 | Visa Trusted Agent Protocol | https://investor.visa.com/news/news-details/2025/Visa-Introduces-Trusted-Agent-Protocol-An-Ecosystem-Led-Framework-for-AI-Commerce/default.aspx |
| 7 | YouGov US Travel Stress Report 2025 | https://yougov.com/en-us/reports/51330-us-travel-stress-report-2025 |
| 8 | Baymard Institute — Cart Abandonment Rate | https://baymard.com/lists/cart-abandonment-rate |
| 9 | Business Travel News — Content Fragmentation | https://www.businesstravelnews.com/State-of-the-Industry/2025/Part-2-CONTENT-FRAGMENTATION |
| 10 | ScrapeOps — Web Scraping Market Report 2025 | https://scrapeops.io/web-scraping-playbook/web-scraping-market-report-2025/ |
| 11 | ScrapeGraphAI — Economics of Web Scraping | https://scrapegraphai.com/blog/economics-of-web-scraping |
| 12 | MCP Year in Review | https://www.pento.ai/blog/a-year-of-mcp-2025-review |
| 13 | Anthropic — Agentic AI Foundation | https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation |
| 14 | Quantum Metric — AI Agent-Ready Websites | https://www.quantummetric.com/blog/how-to-build-an-ai-agent-ready-website |
| 15 | Dark Visitors | https://darkvisitors.com/ |
| 16 | IEEE Spectrum — AI Agent Economy | https://spectrum.ieee.org/ai-agent-economy |
| 17 | Strata — AI Agent Identity Playbook | https://www.strata.io/blog/agentic-identity/new-identity-playbook-ai-agents-not-nhi-8b/ |
| 18 | ISACA — Authorization Crisis for Agentic AI | https://www.isaca.org/resources/news-and-trends/industry-news/2025/the-looming-authorization-crisis-why-traditional-iam-fails-agentic-ai |
| 19 | Skyfire KYAPay Protocol | https://www.businesswire.com/news/home/20251218520399/en/Skyfire-Demonstrates-Secure-Agentic-Commerce-Purchase-Using-the-KYAPay-Protocol-and-Visa-Intelligent-Commerce |
| 20 | Aggarwal et al. — GEO (KDD 2024) | https://arxiv.org/abs/2311.09735 |
| 21 | Gartner — $15T B2B via AI Agents by 2028 | https://www.digitalcommerce360.com/2025/11/28/gartner-ai-agents-15-trillion-in-b2b-purchases-by-2028/ |
| 22 | IEEE Spectrum — The Agentic Web | https://spectrum.ieee.org/agentic-web |
| 23 | a16z — Notes on AI Apps 2026 | https://a16z.com/notes-on-ai-apps-in-2026/ |
| 24 | Gartner — 40% Enterprise Apps with AI Agents by 2026 | https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025 |
| 25 | Aggarwal et al. — GEO (ACM KDD 2024 proceedings) | https://dl.acm.org/doi/10.1145/3637528.3671900 |
