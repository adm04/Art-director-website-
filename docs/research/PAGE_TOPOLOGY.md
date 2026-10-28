# Page topology — portfolio2026tostandout.framer.website

Measured at 1440×900 (desktop), 768 and 390 (mobile, shared < 810px layout). Page height 10818px desktop, 4972px mobile.

`main` background `rgb(30,30,30)`. Smooth scroll: Lenis.

| # | Section | Desktop box | Positioning | Interaction model |
|---|---------|-------------|-------------|-------------------|
| 0 | Menu | 525×88, top 20, centered | `position: fixed`, z 8 | static + link hovers |
| 1 | Hero | 1440×100vh | `position: sticky; top: 0` — stays pinned behind everything that follows | scroll-driven (card fade) |
| 2 | Work | 0→6603 tall, bg `#F5F3F1` | flow; covers hero | scroll-driven (card reveals, sidebar active state) + cursor follower on cards |
| 2a | Up Numbers ruler | 1440×70 | sticky top 0 inside Work, `mix-blend-mode: difference` | static |
| 2b | Sidebar | 274 wide, 900 tall | sticky top 0 inside Projects row | scroll-driven active item |
| 3 | Manifesto ("Text animation") | 1440×1107, transparent | flow — shows the sticky hero video through it | scroll-driven line reveals + stickers |
| 4 | About | 1440×1739, bg `#F5F3F1` | flow | scroll-driven reveals |
| 4a | Tick ruler | 1440×54 | sticky top 0 inside About, difference blend | static |
| 5 | Footer | 1440×469, bg `#F5F3F1` | flow | static + hovers |

Breakpoints from the Framer CSS: `< 810` (fluid single column, 20px gutters), `810–1199`, `1200+` (sidebar layout).

## Desktop geometry (1440)
- Hero card 389×226 centered (y 337). Tagline block 418×102 at y 727, gap 29, ruler row 42px at bottom.
- Work: ruler 70 → gap 22 → row [sidebar 274 | right column 1136, right padding 30].
  Right column: heading 506×81 → gap 54 → 8 cards 1136×727 (aspect 1.5626, radius 5) with 61px gaps → 135px end spacer.
- Sidebar names column 120 wide at x 77, vertically centered; Geist 16/19.2 w500 ls -0.64 (names), Geist 18/21.6 (dashes), gap ≈ 22.
- Manifesto: 6 lines at x 26, line boxes 165–185 tall, white Inter-Tight-like grotesk + italic serif; 6 stickers.
- About: tick row 54 → gap 5 → image strip (5 images, x 30→1410, heights 255–263, radius 4) → content at x 115, width 1211:
  intro (Geist 26/32 w500, ls -1.04, 40% black with name in black, width 605) → gap 107 →
  ongoing work row (left col 183 + gap 155 + card 873×558) → gap 107 → Work & Experience row (label + 3×2 logo grid at x 453/763/1167) → Awards row (label + 2 laurel awards at x 453/984). Bottom padding 148.
- Footer: x 115 → 1326. Heading Inter 26/32 (40% / 100%), form 516×111 white r5 padding 12 14 12 16, bottom row space-between aligned end; footer bottom padding 30.

## Mobile (< 810)
- Menu 330 wide: Work (left 26), logo (center), About (right). No social icons.
- Hero card 80% width; tagline ~79% width; hero ruler hidden.
- Work: no sidebar, sticky ruler hidden (fade gradient 31px still shown), cards full width (350 at 390), gap 34.
- Manifesto lines ~11vw type.
- About: 3 ticks, single image (image 4) full width 350×197, intro Geist 20/26, ongoing work stacked (left col then card), logos & awards rows hidden.
- Footer: stacked; link list first, address last (gap 62).
