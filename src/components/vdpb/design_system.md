# Viral Digital Product Builder — Design System

A complete reference for every visual, interactive, and structural design decision used in the HTML app.

---

## 1. Design Philosophy

The interface is built around a single guiding principle: **guided clarity with premium energy**. Every screen removes noise so the user can focus on one decision at a time, while the visual identity signals confidence and desirability — the feeling of a high-end digital product, not a free tool.

Key pillars:
- **Single-focus screens** — one decision per step, no competing elements
- **Glass morphism + soft gradients** — depth without heaviness
- **Micro-animations throughout** — every interaction responds, nothing feels static
- **Pink-rose-yellow brand energy** — warm, bold, feminine-leaning but universally premium
- **Progressive disclosure** — context from previous steps is shown as breadcrumbs, not re-presented

---

## 2. Color System

All colors are defined as CSS custom properties on `:root`.

### Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `--deep-rose` | `#BE185D` | Primary brand color, labels, active states, icons |
| `--vibrant-pink` | `#DB2777` | Hover states, borders, focus rings, gradient midpoint |
| `--vivid-yellow` | `#FFD900` | Gradient endpoint, accent energy, confetti |
| `--blush` | `#FFF1F2` | Page background base |
| `--pink-light` | `#FDF2F8` | Secondary background, card hover fills |

### The Gradient

The signature gradient is used on CTAs, active step indicators, selected handout tags, the result card top bar, and all key moments of delight:

```css
--gradient: linear-gradient(135deg, #BE185D 0%, #DB2777 50%, #FFD900 100%);
```

The angle (135°) flows from top-left to bottom-right, creating a diagonal sweep that feels dynamic and directional.

### Text / Neutral Scale (Slate)

| Token | Hex | Usage |
|---|---|---|
| `--slate-900` | `#0F172A` | Primary text, headings |
| `--slate-800` | `#1E293B` | Card titles, strong labels |
| `--slate-700` | `(implicit)` | Section labels, form labels |
| `--slate-600` | `#475569` | Body text, descriptions |
| `--slate-500` | `#64748B` | Subtext, hints, placeholders |
| `--slate-400` | `#94A3B8` | Disabled text, icons, dividers |
| `--slate-200` | `#E2E8F0` | Default borders, dividers |
| `--slate-100` | `#F1F5F9` | Card arrow backgrounds, inactive areas |

### Accent / State Colors

| Token | Hex | Usage |
|---|---|---|
| `--hot-pink` | `#F43F5E` | Reserved for urgent/error states |
| `--amber` | `#FBBF24` | Result card bonus handout tags (amber tint) |
| `--amber-text` | `#B45309` | Text on amber backgrounds |
| `--glass` | `rgba(255,255,255,0.7)` | Glass morphism surfaces |

### Semantic Pink Tints (used inline, not tokenized)

- **Hover fill on cards:** `rgba(219,39,119,0.04)` — barely-there pink wash
- **Active/selected fill:** `rgba(219,39,119,0.06–0.08)` — soft pink blush
- **Focus ring:** `rgba(219,39,119,0.1)` — 4px spread, visually soft
- **Border on selected:** `rgba(219,39,119,0.2–0.3)` — muted border promotion
- **Shadow tints:** All shadows use `rgba(190,24,93, ...)` — the deep rose, so shadows feel brand-colored not gray

---

## 3. Typography

### Font Stack

Two fonts are loaded from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

| Font | Role | Weights |
|---|---|---|
| **Poppins** | UI font — all body, labels, buttons, inputs, navigation | 400, 500, 600, 700 |
| **Playfair Display** | Display/serif accent — main heading, result card title, product name result | 700 only |

The pairing works because Playfair provides editorial gravitas for hero moments, while Poppins keeps everything legible and modern throughout the interaction flow.

### Type Scale

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Main H1 (hero) | Playfair Display | `clamp(36px, 6vw, 64px)` | 700 | Gradient text, `letter-spacing: -0.02em` |
| Section H2 | Poppins | `clamp(22px, 4vw, 32px)` | 700 | Slate-900, `letter-spacing: -0.02em` |
| Result heading | Playfair Display | `28px` | 700 | Gradient text |
| Product name (result) | Playfair Display | `20px` | 700 | The "large" result value |
| Card titles (product) | Poppins | `16px` | 700 | Slate-900 |
| Body / descriptions | Poppins | `15–17px` | 400 | Slate-500, `line-height: 1.5–1.6` |
| Problem text | Poppins | `14px` | 500 | Slate-700 |
| Labels (ALL CAPS) | Poppins | `10–11px` | 700 | Deep-rose, `letter-spacing: 0.08–0.12em`, `text-transform: uppercase` |
| Step pill text | Poppins | `12px` | 600 | |
| Niche card name | Poppins | `13px` | 600 | Slate-800 |
| Button text | Poppins | `14px` | 600 | |
| Badge / tag text | Poppins | `11–13px` | 500–600 | |
| Char hint / meta | Poppins | `12px` | 400 | Slate-400 |

### Gradient Text Technique

Used on the H1 and result headings:

```css
background: var(--gradient);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## 4. Spacing & Layout

### Page Container

```css
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 80px;
}
```

80px bottom padding ensures content never gets cut off on mobile. The `z-index: 1` lifts the app above ambient background blobs.

### Section Header Rhythm

- Section label (ALL CAPS tag): `margin-bottom: 10px`
- H2 heading: directly follows
- Subtext paragraph: `margin-top: 8px`
- Full header block: `margin-bottom: 32px`

### Card Grids

| Grid | Columns | Gap |
|---|---|---|
| Niche grid | `repeat(auto-fill, minmax(200px, 1fr))` | `12px` |
| Problem grid | `repeat(auto-fill, minmax(280px, 1fr))` | `14px` |
| Format grid | `repeat(auto-fill, minmax(160px, 1fr))` | `10px` |

Products use `flex-direction: column` with `gap: 12px` (full-width list, not a grid).

### Navigation Bar (bottom of each screen)

```css
.screen-nav {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(219,39,119,0.1);
}
```

Flex row, `justify-content: space-between` — Back button left, Next/Build button right.

---

## 5. Elevation & Shadow System

All shadows are tinted with the brand rose color, not neutral gray:

```css
--shadow-sm: 0 1px 3px rgba(190,24,93,0.08), 0 1px 2px rgba(190,24,93,0.06);
--shadow:    0 4px 20px rgba(190,24,93,0.12), 0 2px 8px rgba(190,24,93,0.08);
--shadow-lg: 0 20px 60px rgba(190,24,93,0.18), 0 8px 24px rgba(190,24,93,0.1);
```

| Usage | Shadow Level |
|---|---|
| Default cards, inputs, search | `--shadow-sm` |
| Hovered/selected cards | `--shadow` |
| Result card, selected niche | `--shadow-lg` |
| Gradient buttons | `0 6px 24px rgba(190,24,93,0.35)` |
| Button hover | `0 10px 36px rgba(190,24,93,0.45)` |
| Active step number pill | `0 2px 8px rgba(190,24,93,0.4)` |
| Selected card arrow | `0 4px 12px rgba(190,24,93,0.3)` |
| Selected handout tags | `0 4px 12px rgba(190,24,93,0.3)` |
| Result check circle | `0 8px 32px rgba(190,24,93,0.35)` |

---

## 6. Ambient Background

Two full-page radial gradient blobs are rendered with CSS pseudo-elements on `body`, creating a subtle environmental glow:

```css
/* Top-right: pink bloom */
body::before {
  position: fixed;
  top: -200px; right: -200px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(219,39,119,0.08) 0%, transparent 70%);
}

/* Bottom-left: yellow bloom */
body::after {
  position: fixed;
  bottom: -200px; left: -200px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(255,217,0,0.06) 0%, transparent 70%);
}
```

Both are `pointer-events: none` and `z-index: 0` — purely decorative, never interactive. The app sits at `z-index: 1` above them.

The page background itself is a three-stop gradient:
```css
background: linear-gradient(135deg, #FFF1F2 0%, #FFFFFF 50%, #FDF2F8 100%);
```

---

## 7. Glass Morphism

Cards and interactive surfaces use glass morphism — semi-transparent white with backdrop blur:

```css
background: rgba(255,255,255,0.85–0.9);
backdrop-filter: blur(8–10px);
```

This creates layered depth: the ambient blobs show through card surfaces, keeping the background alive while maintaining legibility. Intensity increases with importance:
- Default cards: `rgba(255,255,255,0.85)`, `blur(8px)`
- Search input, selection bar: `rgba(255,255,255,0.9)`, `blur(10px)`
- Result card: `rgba(255,255,255,0.95)` — most opaque, most important

---

## 8. Border Radius System

| Element | Radius | Rationale |
|---|---|---|
| Main cards (niche, product, problem, result) | `20px` | Friendly, premium |
| Buttons, search, pills, handout tags, name chips | `100px` | Fully round — pill shape |
| Format chips | `14px` | Smaller cards, slightly tighter |
| Header badge | `100px` | Pill badge |
| Step number indicators | `50%` | Circle |
| Name suggestion box | `14px` | Compact info panel |
| Password gate modal | `28px` | Large radius = softer, modal feel |
| Result card | `28px` | Largest radius, most prominent element |
| Confetti pieces | `2px` | Subtle paper-like squares |
| Copy button | `100px` | Pill |

---

## 9. Component Library

### 9.1 Header Badge

The "STEP-BY-STEP BUILDER" label at the top of the page:

```css
.header-badge {
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(219,39,119,0.2);
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 11px; font-weight: 600;
  color: var(--deep-rose);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
}
```

Contains a pulsing dot:

```css
.dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--gradient);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}
```

### 9.2 Progress Step Pills

Five pills connected by dividers. Three visual states:

**Inactive** — gray, no fill
```css
.step-pill.inactive { color: var(--slate-400); background: rgba(255,255,255,0.5); }
.step-pill.inactive .num { background: var(--slate-200); color: var(--slate-400); }
```

**Active** — pink ring + gradient number bubble
```css
.step-pill.active { color: var(--deep-rose); background: rgba(190,24,93,0.08); border: 1px solid rgba(190,24,93,0.2); }
.step-pill.active .num { background: var(--gradient); color: white; box-shadow: 0 2px 8px rgba(190,24,93,0.4); }
```

**Done** — solid rose number with checkmark (via CSS `::after` content)
```css
.step-pill.done .num { background: var(--deep-rose); color: white; }
.step-pill.done .num::after { content: '✓'; }
```

Dividers between pills:
```css
.step-divider { width: 20px; height: 2px; background: var(--slate-200); }
.step-divider.done { background: rgba(190,24,93,0.3); }
```

### 9.3 Niche Cards

2D grid cards with emoji + name + count. Interaction: hover lifts, selected gains border + shadow.

```css
.niche-card {
  background: rgba(255,255,255,0.85);
  border: 2px solid transparent;
  border-radius: 20px;
  padding: 20px 16px;
  text-align: center;
  transition: all 0.25s ease;
}
```

A gradient overlay is prepared but hidden — it fades in subtly on hover and selected:
```css
.niche-card::before {
  content: '';
  position: absolute; inset: 0;
  background: var(--gradient);
  opacity: 0;
  transition: opacity 0.25s;
}
.niche-card:hover { transform: translateY(-3px); }
.niche-card:hover::before { opacity: 0.04; }
.niche-card.selected { border-color: var(--vibrant-pink); }
.niche-card.selected::before { opacity: 0.06; }
```

Emoji: `font-size: 28px`, centered, `margin-bottom: 8px`  
Name: `13px`, weight 600, slate-800 → deep-rose when selected

### 9.4 Product Cards

Full-width rows with a right-side arrow indicator. Hover slides right (`translateX(4px)`):

```css
.product-card {
  display: flex; align-items: center; justify-content: space-between;
  border-radius: 20px; padding: 20px 24px;
  transition: all 0.25s ease;
}
.product-card:hover { transform: translateX(4px); border-color: rgba(219,39,119,0.3); }
```

Arrow indicator (`card-arrow`): `36×36px` circle, becomes gradient on selected:
```css
.product-card.selected .card-arrow {
  background: var(--gradient);
  color: white;
  box-shadow: 0 4px 12px rgba(190,24,93,0.3);
}
```

### 9.5 Problem Cards

Grid cards with a left accent bar that reveals on hover/selected:
```css
.problem-card::after {
  position: absolute; top: 0; left: 0;
  width: 4px; height: 100%;
  background: var(--gradient);
  border-radius: 4px 0 0 4px;
  opacity: 0;
  transition: opacity 0.2s;
}
.problem-card:hover::after,
.problem-card.selected::after { opacity: 1; }
```

Check circle: empty border by default → gradient fill with white checkmark when selected:
```css
.problem-card.selected .problem-check {
  background: var(--gradient);
  border-color: transparent;
  color: white;
}
```

Hover: `translateY(-2px)` upward lift.

### 9.6 Name Suggestion Chips

Clickable pill buttons that pre-fill the name input. Three chips per problem:

```css
.name-chip {
  background: rgba(219,39,119,0.07);
  border: 1.5px solid rgba(219,39,119,0.25);
  border-radius: 50px;
  padding: 8px 16px;
  font-size: 0.82rem;
  color: #BE185D;
  transition: all 0.18s ease;
}
.name-chip:hover { background: rgba(219,39,119,0.14); transform: translateY(-1px); }
.name-chip.active {
  background: linear-gradient(135deg, #BE185D, #DB2777);
  color: white; font-weight: 600;
}
```

### 9.7 Name Input

Textarea (not input) to allow longer names, styled to match the brand:

```css
textarea {
  padding: 18px 20px;
  border: 2px solid var(--slate-200);
  border-radius: 16px;
  font-size: 16px; font-weight: 500;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  min-height: 80px; resize: none;
}
textarea:focus {
  border-color: var(--vibrant-pink);
  box-shadow: 0 0 0 4px rgba(219,39,119,0.1);
}
```

### 9.8 Format Chips

Centered cards with emoji icon + text label. Multi-select (toggle on/off):

```css
.format-chip {
  padding: 14px 16px; text-align: center;
  border: 2px solid var(--slate-200);
  border-radius: 14px;
}
.format-chip:hover { transform: translateY(-2px); }
.format-chip.selected {
  border-color: var(--vibrant-pink);
  background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(253,242,248,0.98));
}
```

Icon: `font-size: 24px`, `margin-bottom: 6px`  
Name: `12px`, weight 600 → deep-rose when selected

### 9.9 Handout Tags

Pill-shaped multi-select tags (up to 3). Selected = gradient fill:

```css
.handout-tag {
  padding: 8px 16px;
  border-radius: 100px;
  border: 2px solid var(--slate-200);
  font-size: 13px; font-weight: 500;
}
.handout-tag.selected {
  background: var(--gradient);
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 12px rgba(190,24,93,0.3);
}
```

### 9.10 Buttons

Two variants, both pill-shaped (`border-radius: 100px`):

**Primary — gradient CTA:**
```css
.btn-primary {
  background: var(--gradient);
  color: white;
  box-shadow: 0 6px 24px rgba(190,24,93,0.35);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 36px rgba(190,24,93,0.45);
}
```

**Secondary — glass/ghost:**
```css
.btn-secondary {
  background: rgba(255,255,255,0.9);
  color: var(--slate-700);
  border: 2px solid var(--slate-200);
  backdrop-filter: blur(8px);
}
.btn-secondary:hover { border-color: rgba(219,39,119,0.3); color: var(--deep-rose); }
```

**Disabled state:**
```css
.btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
```

**Button icon:** `font-size: 16px`, left of text, `gap: 8px`

### 9.11 Back Button

Minimal text-only button, no background:

```css
.back-btn {
  font-size: 13px; font-weight: 600;
  color: var(--slate-500);
  background: none; border: none; padding: 0;
}
.back-btn:hover { color: var(--deep-rose); }
```

### 9.12 Copy Button

Inline pill, transitions to green on success:

```css
.copy-btn {
  padding: 6px 14px;
  background: rgba(190,24,93,0.08);
  border: 1px solid rgba(190,24,93,0.15);
  border-radius: 100px;
  font-size: 11px; font-weight: 600;
  color: var(--deep-rose);
}
.copy-btn:hover { background: var(--deep-rose); color: white; }
.copy-btn.copied { background: #10b981; border-color: #10b981; color: white; }
```

### 9.13 Search Input

Pill-shaped, icon-prefixed:
```css
input {
  padding: 14px 20px 14px 48px;
  border: 2px solid var(--slate-200);
  border-radius: 100px;
  backdrop-filter: blur(10px);
}
input:focus {
  border-color: var(--vibrant-pink);
  box-shadow: 0 0 0 4px rgba(219,39,119,0.1);
}
```
Search icon is absolutely positioned at `left: 16px`, centered vertically.

### 9.14 Selection Breadcrumb Bar

A contextual panel showing what's been selected in previous steps:

```css
.selection-bar {
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(219,39,119,0.12);
  border-radius: 16px;
  padding: 14px 20px;
  backdrop-filter: blur(10px);
  display: flex; align-items: center; gap: 12px;
}
```

Contains `.sel-label` (uppercase, slate-400) + `.sel-value` (weight 600, slate-800) pairs separated by `.sel-sep` characters.

### 9.15 Section Label Tag

Eyebrow text above H2s:

```css
.section-label {
  font-size: 11px; font-weight: 700;
  color: var(--deep-rose);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

### 9.16 Divider with Label

A labeled section separator that stretches a line to the right:

```css
.label-section::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--slate-200);
}
```

### 9.17 Result Tags

Small inline pills for displaying selected formats and handouts in the result card:

**Pink (format/default):**
```css
.result-tag {
  padding: 4px 12px;
  background: rgba(190,24,93,0.08);
  border: 1px solid rgba(190,24,93,0.15);
  border-radius: 100px;
  font-size: 12px; color: var(--deep-rose);
}
```

**Amber (bonus handouts):**
```css
.result-tag.amber {
  background: rgba(251,191,36,0.15);
  border-color: rgba(251,191,36,0.3);
  color: var(--amber-text); /* #B45309 */
}
```

### 9.18 Result Card

The final product brief container:

```css
.result-card {
  background: rgba(255,255,255,0.95);
  border-radius: 28px;
  padding: 48px;
  border: 1px solid rgba(219,39,119,0.12);
  max-width: 760px;
  margin: 0 auto;
}
```

A 4px gradient bar runs across the top:
```css
.result-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--gradient);
}
```

The result divider between fields:
```css
.result-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(219,39,119,0.15), transparent);
}
```

The product name is rendered with `.result-value.large` → Playfair Display, 20px, weight 700.

### 9.19 Password Gate

Full-screen overlay rendered before any app content, using `z-index: 9999`. The modal itself:

```css
/* Card */
background: white;
border-radius: 28px;
padding: 48px 40px;
box-shadow: 0 25px 60px rgba(190,24,93,0.15);
max-width: 420px; width: 90%;
```

Password input gains a focus border color of `#DB2777`. The eye toggle button is absolutely positioned inside the input wrapper at `right: 14px`. The unlock button uses the full brand gradient.

---

## 10. Animation System

### Screen Transitions

Each screen fades in with a subtle upward drift:
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.screen.active { animation: fadeIn 0.4s ease; }
```

### Result Check Circle

Pops in with a spring bounce:
```css
@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

The cubic-bezier creates the characteristic overshoot/spring feel.

### Confetti Burst

Triggered on result screen. Pieces fall from the top of the viewport:
```css
@keyframes confetti-fall {
  0% { opacity: 1; transform: translateY(-20px) rotate(0deg); }
  100% { opacity: 0; transform: translateY(100vh) rotate(720deg); }
}
```

Each piece:
- `8×8px`, `border-radius: 2px` (slightly rounded square)
- Random horizontal position, random delay
- Colors drawn from the brand palette: deep-rose, vibrant-pink, vivid-yellow, plus white

### Pulsing Badge Dot

```css
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}
```
`animation: pulse 2s infinite` — slow and breathing, not frantic.

### Hover Transforms

| Element | Hover transform |
|---|---|
| Niche cards | `translateY(-3px)` |
| Problem cards | `translateY(-2px)` |
| Format chips | `translateY(-2px)` |
| Name chips | `translateY(-1px)` |
| Primary button | `translateY(-2px)` |
| Secondary button | `translateY(-1px)` |
| Product cards | `translateX(4px)` — slides right instead |

All transitions: `0.2–0.25s ease` for cards, `0.18s ease` for chips/tags.

---

## 11. UX Flow & Interaction Logic

### 5-Step Wizard

```
Step 1: Choose Niche          → 50 cards, searchable grid
Step 2: Choose Product Idea   → ~10 items per niche, full-width list
Step 3: Choose Problem        → 4 cards per product, 2-column grid
Step 4: Name Your Product     → 3 suggestion chips + free-text input
Step 5: Format & Resources    → multi-select format + multi-select handouts (up to 3)
→ Result: Product Brief
```

### Auto-Advance

Steps 2 and 3 auto-advance to the next step 300ms after selection (via `setTimeout`). This removes the need to click "Next" for the most common path and creates a satisfying flow.

Steps 4 and 5 require explicit "Next" / "Build" clicks, since they involve input.

### State Reset on Back-Navigation

Selecting a new niche resets: `selectedProduct`, `selectedProblem`, `productName`, `formats`, `handouts`.  
Selecting a new product resets: `selectedProblem`, `productName`, `formats`, `handouts`.  
Selecting a new problem resets: `productName` (so the name chips re-populate for the new problem).

### Name Pre-fill Logic

On entering Step 4, if no name is set yet, the first of the 3 problem-specific name suggestions is pre-filled into the textarea. The user can edit freely or click any of the 3 chips to swap.

### Format / Handout Multi-Select

- **Formats:** Unlimited multi-select — click to toggle on/off
- **Handouts:** Capped at 3 (matching the XLS guidance of "Choose 1–3"). If 3 are already selected, the oldest is deselected when a new one is chosen (FIFO rotation)

### Search / Filter (Step 1)

Live filter on the niche grid as the user types. Uses `textContent.toLowerCase().includes(query)` on the niche name. Non-matching cards get `display: none` via `.niche-card.hidden` class. An empty state message shows if nothing matches.

### Breadcrumb Context

Steps 2–5 show a `.selection-bar` at the top of the screen displaying what was chosen in earlier steps. This gives users orientation without needing to go back.

### Progress Bar

The pill indicators update in real-time as steps are completed. Done steps show a checkmark. The connector divider between done steps turns pink.

---

## 12. Responsive Design

Single breakpoint at `640px`:

```css
@media (max-width: 640px) {
  .header { padding: 40px 0 28px; }
  .result-card { padding: 28px 20px; }
  .niche-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  .problem-grid { grid-template-columns: 1fr; }
  .format-grid { grid-template-columns: repeat(3, 1fr); }
  .progress-container { gap: 2px; }
  .step-pill { padding: 6px 10px; font-size: 10px; }
  .step-divider { width: 10px; }
}
```

Key changes on mobile:
- Niche cards shrink to `140px` minimum (fits ~2–3 per row)
- Problem cards stack to single column
- Format grid locks to 3 columns
- Progress pills compress
- Result card padding reduces significantly
- Header top padding tightens

The `clamp()` approach on headings means font sizes scale naturally between the breakpoint and large screens without additional media queries.

---

## 13. Accessibility Notes

- All interactive elements have explicit `cursor: pointer`
- Focus states use a visible 4px ring: `box-shadow: 0 0 0 4px rgba(219,39,119,0.1)`
- Disabled buttons use `opacity: 0.4` and `cursor: not-allowed`
- The password eye toggle is a `<button type="button">` (not a div) for keyboard accessibility
- Empty state messages are provided when search returns no results
- `font-family` is explicitly set on all interactive elements (inputs, buttons) to prevent OS fallback fonts
- `line-height: 1.4–1.6` throughout body text for comfortable reading

---

## 14. External Dependencies

| Dependency | Version | Usage |
|---|---|---|
| Google Fonts | CDN | Poppins (400,500,600,700) + Playfair Display (700) |

No JavaScript libraries. No CSS frameworks. Everything is vanilla HTML/CSS/JS in a single self-contained file.

The entire app — including all 50 niches, 500 products, 2,000 problems, and 6,025 name suggestions — is embedded as a single JSON constant in the `<script>` block of the HTML file.