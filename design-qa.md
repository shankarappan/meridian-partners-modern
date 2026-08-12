# Design QA — Meridian Partners modern website

Source visual truth: `/Users/shankar/.codex/generated_images/019ff52c-56e4-7d93-9fd3-46e62f0a9981/exec-76707f77-e6e7-4eff-8439-3ae88d526da0.png`

Implementation evidence:

- Desktop: `qa-desktop-full-v1.png` and `qa-desktop-tall-v1.png`
- Mobile: `qa-mobile-v1.png`
- Mobile navigation: `qa-mobile-menu-v1.png`
- Source/implementation comparison: `qa-side-by-side-v1.png`

Viewport and normalization:

- Source pixels: 864 × 1821, generated long-page desktop concept.
- Desktop implementation viewport: 1440 × 1000 CSS px at device scale factor 1; browser content viewport reported 1425 CSS px after scrollbar allocation.
- Desktop tall composition capture: 1425 × 2600 pixels, device scale factor 1.
- Mobile implementation viewport: 390 × 844 CSS px, device scale factor 1; browser content width 375 CSS px after scrollbar allocation.
- Side-by-side evidence normalizes both columns to 864 px width. The source concept is shorter than the final production-content page; comparison therefore evaluates section order, proportions, type hierarchy, color, imagery, and component anatomy rather than pixel-identical total height.

State:

- Desktop homepage, initial state.
- Mobile homepage, initial state.
- Mobile menu open and closed with Escape.
- Articles & Media filtered to Media.

## Full-view comparison evidence

`qa-side-by-side-v1.png` compares the selected concept and the rendered implementation. The implementation preserves the selected direction’s institutional header, asymmetric navy/Auckland hero, six-path expertise strip, three-column Dave profile, compact team row, editorial article feature/list structure, consultation band, and multi-column footer. The final page is longer because it uses verified production copy and real staff photography rather than abbreviated mock text.

## Focused region comparison evidence

- Hero/header: `qa-desktop-tall-v1.png` confirms the serif/sans hierarchy, deep navy field, restrained gold CTA, asymmetric image boundary, and Auckland focal point.
- Dave/team: `qa-desktop-full-v1.png` confirms the three-column story/portrait/credentials anatomy and real staff photography in the compact four-person strip.
- Mobile hero: `qa-mobile-v1.png` confirms legible wrapping, 28 px horizontal margins, full-width primary CTA, and no horizontal overflow.
- Mobile navigation: `qa-mobile-menu-v1.png` confirms a high-contrast full-screen menu with clear close control and consultation CTA.

## Required fidelity surfaces

### Fonts and typography

Passed. Newsreader variable provides the authoritative editorial display character of the concept; DM Sans variable provides clear navigation, metadata, and body copy. Weight, line height, and wrapping preserve the concept hierarchy. Mobile H1 wraps intentionally without clipping.

### Spacing and layout rhythm

Passed. Desktop uses a 1240 px content shell, generous section spacing, an asymmetric hero, six equal expertise columns, and a balanced three-column lawyer feature. Mobile collapses cleanly to one or two columns. Browser measurements report `scrollWidth === clientWidth` at 390 px.

### Colors and visual tokens

Passed. Deep navy, warm white, mineral grey, and restrained antique gold match the selected direction. Body copy uses high-contrast ink/white pairs; gold is reserved for emphasis, controls, and metadata. No decorative gradients, glass effects, or drop shadows were introduced.

### Image quality and asset fidelity

Passed. The logo, Auckland skyline, Dave portrait, and team portraits are authorized source assets from mplaw.nz. The lead editorial architecture image was generated specifically for the selected art direction, inspected, saved into the project, and used at an appropriate crop. No visible image asset was replaced by CSS art, emoji, or handmade SVG.

### Copy and content

Passed with intentional production correction. Mockup placeholders and invented contact/staff details were replaced with verified Meridian information. Services, consultation, profiles, media sources, and article links all resolve successfully. The Articles & Media data model is isolated in `src/data/articles.js` for future automation.

## Interaction and accessibility checks

- Primary navigation and in-page links work.
- Six expertise links, team profiles, consultation buttons, and article destinations were checked; 16 external HTTP destinations returned 200.
- Articles filters update the lead/list content; Media produces the two expected stories.
- Mobile menu opens, prevents background scrolling, traps keyboard focus, closes with Escape, and returns focus to the toggle.
- Visible focus outlines are present.
- Skip-to-content link and semantic header/main/footer landmarks are present.
- Heading hierarchy, descriptive content-image alt text, decorative team-image treatment, and `aria-pressed` filter states are present.
- Console checked at desktop and mobile: no warnings or errors.
- Reduced-motion rules disable transitions/animated scrolling.

## Comparison history

### Pass 1

- P2: The first full-page browser capture repeated sticky header/page segments in the evidence image.
- Fix: captured stable desktop and mobile viewport evidence separately and created normalized comparison evidence; the live page itself did not repeat content in the DOM and console remained clean.
- P2: Team links produced duplicated accessible names from portrait alt text plus visible names.
- Fix: marked team portraits decorative inside already-named profile links.
- P2: Filter selection was visual only.
- Fix: added `aria-pressed` to expose active filter state.

### Pass 2

No actionable P0, P1, or P2 findings remain. Intentional deviations from the concept are verified real-world content, source photography, and a longer article/footnote structure.

## Follow-up polish

- P3: A production launch can add individual service and article routes within this new site rather than opening the existing mplaw.nz pages.
- P3: Add a CMS/feed ingestion job when the future automation source is chosen.

final result: passed
