# Behaviors — measured via Playwright (scripts/behaviors.mjs, scripts/hover.mjs, scripts/cursor.mjs)

All animations are **scroll-linked** (values at a scroll position are identical after 260ms and after 2.5s), not time-triggered.
Progress `p` = clamp((startVh·vh − layoutTop) / ((startVh − endVh)·vh), 0, 1), where layoutTop is the element's untransformed top in the viewport. Opacity and translateY interpolate linearly with `p`.

| Element | from → to | startVh → endVh (top of element in viewport) |
|---|---|---|
| Project cards (8) | opacity .6→1, y 30→0 | 1.002 → 0.801 |
| Manifesto lines (6) | opacity 0→1, y 66→0 | 0.81 → 0.604 |
| Stickers | ride with their line (same p, same 66px travel) | — |
| About image strip | opacity .6→1, y 50→0 | 1.002 → 0.71 |
| About intro paragraph | opacity 0→1, y 44→0 | 1.002 → 0.71 |
| About ongoing-work card | opacity .6→1, y 50→0 | 0.879 → 0.71 |
| Logos row | opacity 0→1, y 35→0 | 0.955 → 0.785 |
| Awards row | opacity 0→1, y 25→0 | 0.955 → 0.785 |

Sticker → line pairing: fire-frog→line1, kitty→line2, trust-me→line3, orange-frog→line4, duck→line5, me-and-you→line6.

## Hero exit (page-scroll driven)
Each layer: opacity 1→0 and translateY 0→62px over its own `scrollY` window.
- bottom ruler: 0 → 0.077·vh (0 → 69px)
- tagline: 0.101·vh → 0.191·vh (91 → 172px)
- card: 0.252·vh → 1.06·vh (227 → 954px)

## Sidebar active state
List is [name0, dash0, name1, dash1, …, name7]. Colour `rgba(0,0,0,.35)` → `rgb(0,0,0)`.
- name i is active while card i's layout top ∈ (−0.356·vh, 0.522·vh]
- dash i is active while card i's layout top ∈ (−0.8·vh, −0.022·vh]
Clicking a name scrolls to that card (anchors `#gap-*`).

## Hover
- Project cards & about card: native cursor hidden (`cursor: none`); a fixed white label follows the pointer, centered on it:
  white bg, padding 7px 15px, radius 0, text "View work" Geist 18/21.6 w400 ls −0.72 `rgba(0,0,0,.8)`, z 13, pointer-events none. Slight spring lag.
- Email submit: two stacked ArrowRight icons — the arrow slides out right and the second slides in (hover).
- Nav/footer links, banner, sidebar names: no computed-style change on hover (cursor pointer only).

## Global
- Lenis smooth scroll (`html.lenis`).
- Ruler rows use white text with `mix-blend-mode: difference` → appear white over the hero video and near-black over `#F5F3F1`.
- Menu has a 5-layer soft shadow: `0 7px 16px rgba(0,0,0,.05), 0 29px 29px rgba(0,0,0,.05), 0 65px 39px rgba(0,0,0,.03), 0 116px 46px rgba(0,0,0,.01)`.
- Videos: autoplay, loop, muted, `object-fit: cover`.
