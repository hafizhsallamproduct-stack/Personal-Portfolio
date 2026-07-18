# Redesigning the First Step: The Flight Search Form

**2022 — Present · Native Apps (iOS + Android)**

> This case study tells the *product story* of the flight search form — the problem we set out to solve, what research told us, the decisions that followed, and how it evolved across three generations. It's deliberately a narrative, not a spec sheet.

---

## At a Glance

| | |
|---|---|
| **Product** | Flight search form — native apps (iOS + Android) |
| **My role** | Lead designer, end-to-end: research → handoff → post-launch iteration |
| **Timeline** | 2022 — Present (three generations) |
| **Team** | Design (me), Product, iOS + Android engineering |
| **The bet** | Rank the form's decisions instead of removing them — make the common path effortless, keep every power feature one tap away |

This sits inside my main remit as the designer for the flight search and booking vertical. I owned the field structure and interaction model, ran the competitive and behavioral research, produced the explorations and final designs, aligned stakeholders and engineering on scope, and stayed close through build, QA, and the iterations that followed.

---

## The Problem

The search form is the entry point for the entire booking journey. It's where the traveler tells us **where**, **when**, **who**, **which cabin**, and **how they want to pay** — and everything downstream (results, fare selection, checkout) inherits whatever happens here. When the first step is slow or confusing, the whole funnel pays for it.

By 2022 the form had a structural problem, not a styling one:

- It had **accumulated fields over years** — passengers, cabin class, payment types, trip modes, direct-only, compare-unit ads — without anyone stepping back to re-rank them. The layout reflected what had been *added*, not what the traveler needed *first*.
- It was **the highest-traffic surface in the product.** Any change here touches the largest possible audience — including millions of travelers with years of muscle memory. A confusing change is expensive in a way it isn't anywhere else.
- It carried **real complexity that still had to fit on a phone**: From / To, depart / return, three trip modes, passengers with interdependent rules, cabin, payment, direct-only, and ad placements — all without feeling cramped.

The instinct in the room was "simplify it." But simplification framed as *removal* was the trap. A meaningful share of travelers rely on multi-city, payment types, direct-only, and specific passenger mixes. The real problem wasn't *too many features* — it was that **everything was shouting at the same volume.**

> **Reframe:** the job wasn't to cut the form down. It was to give it a hierarchy.

---

## What the Research Told Me

I started by mapping the form exactly as it was — every field, every option, every conditional rule — and asking one blunt question of each: *does this need to be in front of the traveler the moment they arrive, or can it wait?*

I paired that audit with a competitive teardown of the leading metasearch and OTA apps: what each surfaces immediately, what they tuck into secondary sheets, how they handle trip modes, and how they treat the passenger / cabin / payment cluster. Then I cross-referenced it with the known pain points on our own form.

Three insights did most of the work for the rest of the project:

**1. Most travelers only touch three things.** From / To / dates is the core interaction. Everything else is a long tail. That core deserves the most visual weight and the top of the form — full stop.

**2. The secondary cluster doesn't need to be *visible*, it needs to be *reachable*.** Passengers, cabin, and payment are important but secondary. Expanded, they compete with the core fields. Collapsed into a single summarized row that opens into focused pickers, they stay one tap away without stealing attention.

**3. The fastest tap is the one the traveler never makes.** The biggest speed lever wasn't layout — it was **defaults**. Nearby airport from IP, most-popular destination by point of sale, round-trip, one adult, economy, popular payment types pre-selected. Get the defaults right and most travelers search without touching a secondary option at all.

![Audit of the existing form and the competitive teardown that surfaced the hierarchy problem.](placeholder-research-audit)

---

## The Decisions

Those insights translated into a small set of deliberate design decisions — each one a direct answer to something research surfaced:

- **Lift the core to the top.** From / To / dates gets the most weight and lives at the top. This is the only part most travelers see.
- **Make trip mode lightweight.** One-way / round-trip / multi-city is a quick toggle, not a heavy decision — with round-trip as the default since it's the most common.
- **Summarize the secondary cluster.** Passengers / cabin / payment collapse into one summarized row that expands into focused, native pickers.
- **Default aggressively, by point of sale and location.** So the common search is mostly pre-filled before the traveler does anything.
- **Native input, not custom cleverness.** Date selection, autocomplete, and the passenger stepper follow each platform's conventions rather than forcing one custom interaction everywhere.

When I walked these through with stakeholders and engineering, the conversation was where design intent met business reality — and it sharpened the bet rather than diluting it:

- **Business** pushed to protect revenue- and engagement-driving features — compare-unit ads, payment types, the full set of trip modes. None could be lost in the name of simplicity. *This reinforced the core principle:* rank, don't remove.
- **Engineering** grounded the ambition in platform constraints — the real cost of rebuilding pickers and sheets on each OS, and the most efficient sequence to build them. *This is where "shared logic, native execution" stopped being a slogan and became a build plan.*

The agreed direction came with two things written down explicitly: the business constraints (which features must stay accessible), and the native build sequence for iOS and Android.

![The agreed direction — before and after of the first step, with the secondary cluster collapsed into a single row.](placeholder-decisions)

---

## Building It: Shared Logic, Native Execution

The form is *one product conceptually* but *native in execution* — so the central engineering challenge was keeping the **logic identical** while letting the **interaction stay native** on each platform.

The same rules — max 9 passengers, infants not exceeding adults, at least one adult, defaults driven by point of sale — had to be expressed through iOS- and Android-appropriate controls without drifting apart. I handed off field by field with engineering on both platforms: autocomplete, date pickers, the trip-mode toggle, the passenger stepper and its rules, the cabin and payment pickers, and the conditional elements like direct-only and compare-unit ads.

What I learned building it:

- **The rules are the hard part, not the layout.** Passenger limits, date ranges, trip-mode-dependent fields, and point-of-sale defaults all carry edge cases that have to be specified precisely — or they silently diverge between platforms.
- **Native conventions beat custom cleverness.** Wherever we leaned into platform-standard pickers and sheets, the build was faster *and* the form felt more at home.
- **Defaults do the heavy lifting** — exactly as the research predicted.

![The redesigned first step on iOS and Android, built from design system components, with native pickers on each platform.](placeholder-build)

---

## How It Evolved: Three Generations

The most honest way to see this work is across time. This wasn't a big-bang rewrite — you don't do that to the highest-traffic surface in the product. It moved through three generations, each small enough to ship, adopt, and measure.

| | State | What changed |
|---|---|---|
| **Gen 1** | The original | Dense, accumulated over years. Options expanded and competing for attention. |
| **Gen 2** | The cleanup | First structural pass — core fields lifted to the top, secondary options grouped, visuals moved toward the new direction. |
| **Gen 3** | The current form | Fully on the design system. Clear hierarchy, summarized secondary row, native pickers, fewest-possible-taps common path — every power feature still one tap away. |

Seeing the three side by side is the clearest evidence of the principle behind the whole project: **modernize gradually, protect what works, and let the design system carry consistency.**

![The search form across three generations — from the original dense layout to the current structured form.](placeholder-three-generations)

---

## Outcomes

*The form is a live, still-evolving surface; the strongest evidence is qualitative today, with hard metrics to drop in as they land.*

- **Qualitative:** The common path (round-trip, one adult, economy) is now a near-tap-free interaction thanks to point-of-sale-driven defaults; the secondary cluster is reachable in one tap without crowding the core.
- **No regression:** Every power feature — multi-city, payment types, direct-only, passenger mixes — stayed fully accessible. Nothing was removed in the name of simplicity.
- **Consistency:** Built entirely from design system components, so iOS and Android stay coherent and future updates land in one place.
- *[Placeholder — funnel metric: search-completion / time-to-search on the common path, Gen 1 → Gen 3.]*
- *[Placeholder — adoption metric: share of searches using pre-filled defaults vs. manual entry.]*

---

## What I'd Carry Into the Next One

- **The first step sets the tone for the entire funnel.** Get the search form right and it pays off everywhere downstream; get it wrong and you feel it everywhere.
- **Simplify by ranking, not removing.** The win was hierarchy — common path effortless, power path still present.
- **Defaults are design.** The interaction a traveler never has to make is the fastest one. Location- and point-of-sale-driven defaults moved the needle more than any layout change.
- **Shared logic, native execution.** One product, but it has to feel native on each platform. Identical rules, platform-appropriate interactions.
- **Change the highest-traffic surface gradually.** Three generations, not one rewrite — each small enough to adopt and measure. That's how something this central gets modernized without breaking.

---

## Visual Index

*(Captions describe the intended visuals — drop in the corresponding screens.)*

- The three generations side by side — original dense layout → current structured form.
- The core first step (From / To / dates) given the most visual weight at the top.
- The passengers / cabin / payment cluster summarized into one row that opens into focused native pickers.
- Trip-mode handling across one-way, round-trip, and multi-city, with round-trip default.
- Platform parity — same form, same logic, native iOS and Android conventions.
- Smart defaults in action — nearby airport, popular destination, popular payment types pre-filled by point of sale.
