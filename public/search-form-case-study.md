# Redesigning the First Step: The Journey of the Search Form

**2022 — Present · Native Apps (iOS + Android)**

> This case study follows the *journey* of redesigning the flight search form rather than cataloguing every spec detail. The search form is the most-used surface in the product, so the real story is how we changed it without breaking the habits of millions of travelers — and how it evolved across three generations as our design system and product needs matured.
>
> For the deeper interaction specs and edge cases, we can dig in during the interview 😊

---

## My Role

I led the design of the Flights search form on native apps (iOS + Android), owning it end-to-end from research through to developer handoff and post-launch iteration. This sits inside my main remit as the designer for the flight search and booking vertical.

Day-to-day on this project, I ran the competitive and behavioral research, defined the field structure and interaction model, produced the explorations and final designs, aligned stakeholders and engineering on scope, and stayed close through build and QA. Because the search form is shared conceptually with web and mobile web, I also worked to keep the experience coherent across touchpoints while respecting what's native to each platform.

---

## Background

The search form is the entry point for the entire search journey — where the user tells us where they want to go, when, with how many people, in which cabin, and how they want to pay. Everything downstream (results, fare selection, checkout) depends on what happens here. If the first step is confusing or slow, the whole funnel suffers.

By 2022 the existing app search form had grown dense. It had accumulated fields and options over years — passengers, cabin class, payment types, trip modes, direct-only, compare unit ads — without a structural rethink. The layout reflected what had been *added*, not what the traveler actually needed *first*. At the same time, we were modernizing the broader product through the Wego Design System, and the search form was the highest-visibility surface to bring onto the new foundations.

This gave us a clear opportunity: not just to re-skin the form, but to rethink the hierarchy of the first step and rebuild it on the updated design language.

---

## Success Criteria

The work was structured so that "better" meant something measurable and something qualitative at the same time.

**CLARITY** — The form should make the essential decisions (where, when, who) obvious at a glance, with secondary options available but not competing for attention.

**SPEED** — A returning traveler doing the most common search (round-trip, one adult, economy) should be able to do it with the fewest possible taps, on the smallest screen.

**CONSISTENCY** — The form should be built entirely from updated design system foundations and components, so it looks and behaves like one product across iOS and Android.

**NO REGRESSION** — Power features used by a meaningful share of travelers (multi-city, payment types, direct-only, passenger mixes) must remain fully accessible, not buried or removed.

---

## The Challenge

A few things made this harder than "just redesign a form":

- **It's the highest-traffic surface in the product.** Any change to it touches the largest possible audience, including people with years of muscle memory. A confusing change here is expensive.
- **The form carries a lot of complexity.** From / To, depart / return, trip modes (one-way, round-trip, multi-city), passengers (adult / child / infant with rules), cabin class, payment types, direct-only, and compare unit ads — all of it has to fit on a phone screen without feeling cramped.
- **Native parity.** iOS and Android have different conventions for pickers, date selection, and bottom sheets. The form had to feel native on each while staying the same product.
- **We couldn't break the funnel.** Search is the top of the booking funnel. The redesign had to be introduced carefully and measured, not shipped as a big-bang rewrite.

![Early concept exploring a lighter, more structured layout for the first step.](placeholder-early-concept)

---

## Design Research and Exploration

I started by mapping the form as it actually was — every field, every option, every conditional rule — and asking a blunt question for each one: *does this need to be in front of the traveler at the moment they first arrive, or can it wait?*

I ran a competitive analysis across the leading flight metasearch and OTA apps, comparing how each one structured the first step: what they surface immediately, what they tuck into secondary sheets, how they handle trip modes, and how they treat the passenger / cabin / payment cluster. I paired this with a review of the known pain points on our own form — where the layout density and field grouping were creating friction.

A few patterns emerged that shaped the direction:

- The **From / To / dates** core is the only thing most travelers touch. It deserves the most visual weight and the top of the form.
- **Trip mode** (one-way / round-trip / multi-city) is a quick toggle, not a heavy decision — it belongs as a lightweight control, with round-trip as the default since it's the most common.
- The **passengers / cabin / payment** cluster is important but secondary. It works best collapsed into a single summarized row that opens into focused pickers, rather than sitting expanded and competing with the core fields.
- **Platform-appropriate input.** Date selection, autocomplete, and the passenger stepper should follow native patterns on each OS rather than forcing a single custom interaction everywhere.

From there I built explorations rooted in the design system foundations — typography, color, spacing, and the shared component set — so that the form wasn't a one-off but a true application of the system on its most important surface.

---

## Design Approval

I shared a small set of concepts with stakeholders and engineering, walking through the reasoning: what moves to the top, what collapses, what stays, and why. This was the moment where the design intent met business reality.

On the business side, the key concern was protecting features that drive revenue and engagement — compare unit ads, payment types, and the full set of trip modes — none of which could be lost in the name of simplicity. On the engineering side, I worked to understand native constraints on each platform, the effort of rebuilding pickers and sheets, and the most efficient way to sequence the build.

**Key takeaways:**

- **Simplify the surface, not the capability.** The goal was to make the common path effortless while keeping every power feature one tap away — not to remove anything.
- **Trade-offs are inevitable.** Some ideal interactions had to bend to platform conventions and build cost. Accepting the right small compromises kept the project moving.

**Result:**

- Approved direction for the redesigned form
- Documented business constraints (revenue-driving features that must stay accessible)
- Clear understanding of native platform constraints and the build sequence for iOS and Android

![Approval deck showing the before-and-after of the search form's first step.](placeholder-approval-deck)

---

## Development, Testing and Documentation

With the direction approved, I worked field by field with engineering across both platforms, handing off the structure, states, and behavior for each part of the form: the autocomplete fields, the date pickers, the trip-mode toggle, the passenger stepper with its rules, the cabin and payment pickers, and the conditional elements like direct-only and compare unit ads.

Because the form is shared in concept across touchpoints but native in execution, a lot of the work was making sure the *logic* stayed identical while the *interaction* stayed native — the same rules (max 9 passengers, infants not exceeding adults, at least one adult, defaults by point of sale) expressed through iOS and Android-appropriate controls.

**Key takeaways:**

- **The rules are the hard part, not the layout.** Passenger limits, date ranges, trip-mode-dependent fields, and point-of-sale-driven defaults all carry edge cases that have to be specified precisely or they drift between platforms.
- **Defaults do the heavy lifting.** Smart defaults — nearby airport from IP, most-popular destination by point of sale, round-trip, one adult, economy, popular payment types — let most travelers search without touching the secondary options at all.
- **Native conventions beat custom cleverness.** Where we leaned into platform-standard pickers and sheets, build was faster and the form felt more at home.

**Results:**

- Redesigned search form built on design system foundations across iOS and Android
- Consistent field logic and validation rules documented for both platforms
- Smart defaults driven by point of sale and location
- Specification of every field, state, and edge case for handoff
- Design hand-off ready for engineering on both platforms

![The redesigned first step on iOS and Android, built from design system components.](placeholder-build)

---

## The Three Generations

The most useful way to see this work is across time. The search form has moved through three generations: from the original dense layout, through an intermediate cleanup, to the current cleaner, more structured form that fully applies the updated design system foundations.

- **Generation 1 — the original.** Dense, accumulated over years, with options expanded and competing for attention.
- **Generation 2 — the cleanup.** First structural pass: core fields lifted to the top, secondary options grouped, visuals brought closer to the new direction.
- **Generation 3 — the current form.** Fully on the design system. Clear hierarchy, summarized secondary row, native pickers, and a common path that takes the fewest possible taps — while every power feature remains one tap away.

Seeing the three side by side is the clearest evidence of the principle behind the whole project: **modernize gradually, protect what works, and let the design system do the heavy lifting on consistency.**

![The search form across three generations — from the original dense layout to the current structured form.](placeholder-three-generations)

---

## Project Takeaways (What I Learned)

- **The first step sets the tone for everything after it.** Getting the search form right pays off down the entire funnel; getting it wrong is felt everywhere.
- **Simplify the surface, keep the capability.** The win wasn't removing features — it was ranking them, so the common path is effortless and the power path is still there.
- **Defaults are design.** The fastest interaction is the one the traveler never has to make. Good defaults, driven by location and point of sale, do more for speed than any layout change.
- **Shared logic, native execution.** The form is one product, but it has to feel native on each platform. Keeping the rules identical while letting the interactions be platform-appropriate is the balance.
- **Change the highest-traffic surface gradually.** Three generations, not one rewrite. Each step was small enough to adopt and measure, which is how something this central gets modernized without breaking.
- **The design system makes consistency cheap.** Building the form from shared foundations meant iOS and Android stayed coherent almost for free, and future updates land in one place.

---

## Visual Outcomes

*(Captions describe the intended visuals — drop in the corresponding screens.)*

- The search form across three generations — from the original dense layout to the current cleaner, more structured form that applies the updated design system foundations.
- The core first step — From / To / dates — given the most visual weight at the top of the form.
- The passengers, cabin, and payment cluster summarized into a single row that opens into focused, native pickers.
- Trip-mode handling across one-way, round-trip, and multi-city, with round-trip as the default.
- Platform parity — the same form, the same logic, expressed through native iOS and Android conventions.
- Smart defaults in action — nearby airport, popular destination, and popular payment types pre-filled by point of sale.
