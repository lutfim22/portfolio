# Portfolio Design System

Status: The owner approved proposal 01 in chat. Tokens, self-hosted fonts, the responsive prototype, and abstract artwork are delivered in a focused design PR; GitHub merge approval remains separate.

## Identity
**Premium Hybrid / Engineering Journey** — modern editorial clarity with subtle futuristic depth. The visual language should feel crafted and technically credible, not like a generic template.

## Theme and Palette
- Default dark mode, with an equally polished light mode.
- Primary accent family: violet and magenta, used selectively for emphasis, focus, and visual storytelling.
- Neutral surfaces, restrained glass effects, and cinematic ambient aurora primarily in the hero.
- Define exact accessible color tokens and contrast ratios during visual prototyping; no arbitrary unreviewed hex palette is mandated yet.
- Persist user theme preference; respect system preferences when no explicit choice is saved.

## Typography
- Headings: Space Grotesk.
- Body: Geist or Inter (select based on real render testing).
- Code/technical metadata: a legible monospaced family.
- Clear scale and line length; maintain legibility in both languages and on narrow mobile screens.

## Layout and Components
- Floating glass navbar with accessible mobile navigation.
- Generous whitespace, purposeful grids, editorial project sections, selective asymmetric compositions.
- Hero with LM monogram, strong statement, two CTAs, and subtle ambient visual effects.
- Project cards/showcases with project role, technology, and approved qualitative outcomes.
- Interactive timeline with expandable panels; never hide essential content behind hover-only behavior.
- Contact links should be obvious, keyboard reachable, and easy to copy.

## Motion
- Subtle entrance/reveal animations, progressive enhancement, and purposeful timeline transitions.
- Respect `prefers-reduced-motion`; no essential information depends on animation.
- Avoid scroll-jacking, excessive parallax, or GPU-heavy decorative effects on mobile.

## Accessibility
- WCAG 2.2 AA target; semantic landmarks and heading hierarchy.
- Visible focus indicators, accessible labels, sensible reading order, touch target sizing, and sufficient contrast.
- Fully usable menu, timeline, theme switcher, and language switcher by keyboard and assistive technology.
- Avoid motion, blur, and contrast combinations that impair readability.

## Responsive Strategy
- Mobile-first layouts; adapt cards and timeline panels to small screens.
- Desktop may use editorial multi-column composition; mobile must preserve reading order.
- Test empty states, long bilingual strings, loading, error states, and reduced-motion modes.

## CV Visual Relationship
- Premium Visual CV borrows typography and violet accents but prioritizes print readability.
- ATS CV intentionally avoids decorative layout, icons, photos, and complex columns.
- Both CVs: A4, two-page maximum target, experience-led, same factual content.

## Design Approval Sequence
1. Design-system specification and sample components.
2. High-fidelity homepage mockup, including desktop/mobile and dark/light variants.
3. Interactive prototype covering navigation, timeline, theme, and localization.
4. Owner approval before production implementation.

Exact colors, spacing scales, and interaction durations are implementation proposals requiring visual validation, not preapproved facts.

Concrete specimens and contrast evidence: [design review guide](design-review/README.md).
