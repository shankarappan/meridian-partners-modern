# Team portrait replacement QA

- Source visual truth: `/Users/shankar/Downloads/Adelina.png`, `/Users/shankar/Downloads/Dave.png`, `/Users/shankar/Downloads/Arvind.png`, and `/Users/shankar/Downloads/Michelle.png`.
- Implementation screenshot: `qa-team-portraits.png`.
- Source pixels: 2400 × 1792 each.
- Web assets: centred square crops at 1200 × 1200, WebP quality 84.
- State: desktop homepage, Dave feature and team row inspected in the in-app browser.

## Full-view comparison evidence

The supplied portraits replace the existing photography in every Meridian portrait slot. Dave's new image appears in both his large profile feature and the compact team row; Adelina, Arvind, and Michelle appear in their named team cards.

## Focused region evidence

The square crops retain each person's complete head, shoulders, and professional attire. Dave's feature crop preserves his face, glasses, lapel pins, and pocket detail. The four team cards have consistent head scale and background tone with no clipped heads.

## Required fidelity surfaces

- Fonts and typography: unchanged.
- Spacing and layout rhythm: unchanged; all assets use the existing square portrait containers.
- Colors and visual tokens: unchanged; the supplied neutral studio backgrounds integrate with the warm-white page.
- Image quality and asset fidelity: supplied originals used directly as the source; centred square WebP derivatives reduce total transfer weight while retaining 1200-pixel resolution.
- Copy and content: unchanged; filenames map to the matching team names.

## Comparison history

- Initial check: all originals were 2400 × 1792 and 5–6 MB, unsuitable for direct web delivery.
- Fix: created consistent centred 1200 × 1200 crops at 66–96 KB each and updated every portrait reference.
- Post-fix evidence: browser capture confirms consistent, unclipped framing in Dave's feature and all four team cards.

## Findings

No actionable P0, P1, or P2 findings remain.

## Primary checks

- Production build passes.
- Sites worker tests pass.
- Desktop browser rendering inspected for both portrait sections.
- Existing navigation and portrait profile links remain present.

final result: passed
