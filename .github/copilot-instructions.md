# Balatro Odyssey Wiki — AI Coding Agent Instructions

## Project Overview

**Balatro Odyssey Wiki** is the official interactive documentation site for the **Balatro Odyssey** mod — a massive Balatro mod adding 1,000 unique Jokers, 100 Decks, 200 Vouchers, 100 Tarots, 100 Planets, 100 Spectrals, 100 Blinds, 50 Tags, and 17 Card Enhancements.

The goal of this site is to give players a beautiful, fast, searchable reference for all mod content — including sprites, descriptions in EN and PT-BR, rarity badges, and group filters.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Astro** (static site generation) |
| Styling | **Tailwind CSS** |
| Language | **TypeScript** |
| Interactivity | Vanilla JS or minimal Preact islands (only where needed) |
| Deployment | **GitHub Pages** |
| Data | Extracted JSON from the mod's Lua localization files |

**NEVER use heavy frameworks (Next.js, Nuxt, SvelteKit) — this is a static site.**
**NEVER add client-side JS unless absolutely necessary for filtering/search/language toggle functionality.**

---

## Repository Structure

```
balatro-odyssey-wiki/
├── .github/
│   └── copilot-instructions.md
├── public/
│   └── assets/                   # Copied sprites from the mod repo (2x folder)
│       ├── jokers/               # odyssey_j_[group]_[name].png
│       ├── decks/                # odyssey_d_[name].png
│       ├── tarots/               # odyssey_tarot_[N].png
│       ├── planets/              # odyssey_planet_[N].png
│       ├── spectrals/            # odyssey_spectral_[N].png
│       ├── blinds/               # odyssey_blind_[N].png
│       └── vouchers/             # odyssey_v_[name].png
├── src/
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── jokers/
│   │   │   ├── index.astro       # Full joker gallery with filters
│   │   │   └── [key].astro       # Individual joker page
│   │   ├── decks/
│   │   │   ├── index.astro
│   │   │   └── [key].astro
│   │   ├── tarots/index.astro
│   │   ├── planets/index.astro
│   │   ├── spectrals/index.astro
│   │   ├── vouchers/index.astro
│   │   ├── blinds/index.astro
│   │   └── changelog.astro
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.astro      # Base HTML layout with nav/footer
│   │   │   └── Nav.astro         # Includes the language toggle button
│   │   ├── cards/
│   │   │   ├── JokerCard.astro
│   │   │   ├── DeckCard.astro
│   │   │   └── ConsumableCard.astro  # Shared for tarots/planets/spectrals
│   │   ├── ui/
│   │   │   ├── FilterBar.astro   # Filter by group/rarity
│   │   │   ├── SearchBox.astro
│   │   │   ├── RarityBadge.astro
│   │   │   └── LangToggle.astro  # EN / PT-BR toggle button
│   │   └── sections/
│   │       └── HeroSection.astro
│   ├── data/                     # Generated JSON — DO NOT EDIT MANUALLY
│   │   ├── jokers.json
│   │   ├── decks.json
│   │   ├── tarots.json
│   │   ├── planets.json
│   │   ├── spectrals.json
│   │   ├── vouchers.json
│   │   ├── blinds.json
│   │   └── enhancements.json
│   ├── i18n/
│   │   ├── en-US.ts              # Static UI strings in English (DEFAULT)
│   │   └── pt-BR.ts              # Static UI strings in Portuguese
│   └── utils/
│       ├── formatDescription.ts  # Strips/converts Lua color tags to HTML spans
│       └── rarityColors.ts       # Maps rarity int → CSS class
├── scripts/
│   └── extract_data.py           # Parses mod Lua files → generates src/data/*.json
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions workflow — builds and deploys to gh-pages branch
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Sprite Assets — ALWAYS Use the 2x Folder

The mod repo contains sprites in two resolutions:
- `assets/1x/` — base resolution (71×95px for jokers)
- `assets/2x/` — **double resolution (142×190px for jokers)** ← USE THIS

**ALWAYS copy sprites from `assets/2x/` of the mod repo into `public/assets/` of the wiki.**
Never use `1x` sprites — they are too small for crisp display on modern screens.

The file names are identical in both folders. The only difference is the resolution.

### Sprite Display Sizes

| Content Type | Source size (2x) | CSS display size |
|---|---|---|
| Jokers | 142×190px | 71×95px (or 142×190px for detail view) |
| Decks | Same as above | 71×95px |
| Tarots/Planets/Spectrals | Varies | Use natural size, max-width constrained |
| Blinds | Varies | Use natural size |
| Vouchers | Varies | Use natural size |

Using `2x` source files displayed at `1x` CSS sizes produces sharp, retina-quality rendering on all screens.

---

## Data Source — The Mod Repository

The mod repository is at: `https://github.com/[owner]/balatro-odyssey`

All content data originates from two sources in the mod repo:

| File | Content |
|---|---|
| `src/localization/en-us.lua` | All names and descriptions in English |
| `src/localization/pt_BR.lua` | All names and descriptions in Portuguese |
| `assets/2x/*.png` | All sprites, committed to the public repo |

### Localization Key Patterns

| Content Type | Loc key prefix | Example key |
|---|---|---|
| Jokers | `j_odyssey_j_[group]_[name]` | `j_odyssey_j_singularity_solitary` |
| Tarots | `c_odyssey_[N]` | `c_odyssey_1` |
| Planets | `c_odyssey_planet_[N]` | `c_odyssey_planet_1` |
| Spectrals | `c_odyssey_spectral_[N]` | `c_odyssey_spectral_1` |
| Vouchers | `v_odyssey_[name]` | `v_odyssey_magician` |
| Decks | `b_odyssey_[name]` | `b_odyssey_nebula` |
| Blinds | `bl_odyssey_[N]` | `bl_odyssey_1` |

### Sprite Naming Conventions

| Content Type | Sprite pattern | Example |
|---|---|---|
| Jokers | `odyssey_j_[group]_[name].png` | `odyssey_j_singularity_solitary.png` |
| Decks | `odyssey_d_[name].png` | `odyssey_d_nebula.png` |
| Tarots | `odyssey_tarot_[N].png` | `odyssey_tarot_1.png` |
| Planets | `odyssey_planet_[N].png` | `odyssey_planet_1.png` |
| Spectrals | `odyssey_spectral_[N].png` | `odyssey_spectral_1.png` |
| Blinds | `odyssey_blind_[N].png` | `odyssey_blind_1.png` |
| Vouchers | `odyssey_v_[name].png` | `odyssey_v_magician.png` |

---

## JSON Data Schemas

### Joker

```typescript
interface Joker {
  key: string;             // e.g. "j_singularity_solitary"
  group: string;           // e.g. "singularity" — extracted from key
  rarity: 1 | 2 | 3 | 4;  // 1=Common, 2=Uncommon, 3=Rare, 4=Legendary
  cost: number;
  sprite: string;          // e.g. "odyssey_j_singularity_solitary.png"
  name_en: string;
  name_pt: string;
  desc_en: string[];       // Array of text lines (raw Lua format)
  desc_pt: string[];
  blueprint_compat: boolean;
  eternal_compat: boolean;
}
```

### Deck

```typescript
interface Deck {
  key: string;             // e.g. "nebula"
  sprite: string;          // e.g. "odyssey_d_nebula.png"
  name_en: string;
  name_pt: string;
  desc_en: string[];
  desc_pt: string[];
}
```

### Consumable (Tarot / Planet / Spectral)

```typescript
interface Consumable {
  id: number;              // Sequential number (1-100)
  type: "tarot" | "planet" | "spectral";
  sprite: string;          // e.g. "odyssey_tarot_1.png"
  name_en: string;
  name_pt: string;
  desc_en: string[];
  desc_pt: string[];
  max_hand?: number;       // For tarots: how many cards to select
}
```

### Voucher

```typescript
interface Voucher {
  key: string;             // e.g. "magician"
  tier: 1 | 2;             // 1=base, 2=upgraded version
  pair_key?: string;       // Key of the paired voucher (upgrade or base)
  sprite: string;
  name_en: string;
  name_pt: string;
  desc_en: string[];
  desc_pt: string[];
  cost: number;
}
```

---

## Internationalization (i18n)

### Default Language: English

- **English (EN) is the default language** for all users when they first visit the site.
- Users can switch to **Portuguese (PT-BR)** at any time using the language toggle button.
- The chosen language is persisted in `localStorage` under the key `wiki_lang`.
- All pages must re-render content in the selected language without a page reload.

### Language Toggle Component

The `LangToggle.astro` component must:
- Be visible in the top navigation bar on every page.
- Display the **current active language** (e.g. `EN` / `PT`).
- On click, switch to the other language, update `localStorage`, and update all visible item names and descriptions on the page without a full reload.
- Use a minimal, clean style — a pill toggle or a flag + text label. Do not use dropdowns.

Example UX:
```
[ EN | PT ]   ← pill-style toggle, active side is highlighted
```

### How Language Switching Works

Since Astro generates static HTML, language switching is handled client-side:
- All card components render **both** `data-en` and `data-pt` attributes (or both text elements with a CSS class) into the DOM at build time.
- A small `lang.ts` client script reads `localStorage` on page load and applies the `lang-pt` or `lang-en` class to `<html>` or a wrapper element.
- CSS targets `.lang-en [data-pt]` and `.lang-pt [data-en]` to show/hide the correct content.

```html
<!-- Example rendered output for a joker name -->
<span class="item-name" data-en="Solitary" data-pt="Solitário"></span>
```

```js
// lang.ts (client script, ~10 lines)
const lang = localStorage.getItem('wiki_lang') || 'en';
document.documentElement.setAttribute('data-lang', lang);
```

```css
/* Show only the active language */
[data-lang="en"] .name-pt { display: none; }
[data-lang="pt"] .name-en { display: none; }
```

### Static UI Strings

All navigation labels, filter labels, page titles, and button text must be in both languages:

```typescript
// src/i18n/en-US.ts (DEFAULT)
export const ui = {
  nav: {
    home: "Home",
    jokers: "Jokers",
    decks: "Decks",
    tarots: "Tarots",
    planets: "Planets",
    spectrals: "Spectrals",
    vouchers: "Vouchers",
    blinds: "Blinds",
    changelog: "Changelog",
  },
  filters: {
    rarity: "Rarity",
    group: "Group",
    all: "All",
    search: "Search...",
    common: "Common",
    uncommon: "Uncommon",
    rare: "Rare",
    legendary: "Legendary",
  },
  card: {
    cost: "Cost",
    blueprint: "Blueprint Compatible",
    eternal: "Eternal Compatible",
  }
}

// src/i18n/pt-BR.ts
export const ui = {
  nav: {
    home: "Início",
    jokers: "Curingas",
    decks: "Baralhos",
    tarots: "Tarôs",
    planets: "Planetas",
    spectrals: "Espectrais",
    vouchers: "Cupons",
    blinds: "Blinds",
    changelog: "Changelog",
  },
  filters: {
    rarity: "Raridade",
    group: "Grupo",
    all: "Todos",
    search: "Buscar...",
    common: "Comum",
    uncommon: "Incomum",
    rare: "Raro",
    legendary: "Lendário",
  },
  card: {
    cost: "Custo",
    blueprint: "Compatível com Blueprint",
    eternal: "Compatível com Eterno",
  }
}
```

### Rule: Both Languages Always
Every user-visible string MUST exist in both `en-US.ts` and `pt-BR.ts`. Never ship a component that only works in one language. If a translation is missing, use the English text as fallback — never leave a blank.

---

## Data Extraction Script (`scripts/extract_data.py`)

This script reads the mod's Lua localization files and generates the JSON data files.

**NEVER edit `src/data/*.json` manually** — always regenerate via this script.

### How to run

```bash
# Set the path to the mod repo
MOD_REPO=../balatro-odyssey python3 scripts/extract_data.py
```

### What the script must do

1. Parse `en-us.lua` and `pt_BR.lua` from the mod repo.
2. For each key, extract: name, text lines, and determine content type from key prefix.
3. For jokers: extract `group` and `name` from the key pattern `j_odyssey_j_[group]_[name]`.
4. Match each item to its sprite file using the naming conventions in this document.
5. Output one JSON file per content type to `src/data/`.
6. Sprite paths in the JSON should be relative to `public/assets/`, e.g. `jokers/odyssey_j_singularity_solitary.png`.

### Lua description text

Descriptions are arrays of text lines with inline Balatro formatting codes:
- `{C:mult}+10 Multi{}` — red text
- `{C:chips}+50 Chips{}` — orange text
- `{X:mult,C:white} X2 {} Mult` — XMult white-on-red styling
- `{C:attention}text{}` — yellow highlight
- `{C:money}$10{}` — money yellow
- `{C:inactive}(text){}` — grey secondary text
- `{C:green}text{}` — green (used for probabilities)
- `#1#`, `#2#` — runtime variable placeholders

The `formatDescription.ts` utility handles stripping these for plain text or converting them to styled HTML spans.

---

## Description Rendering

Two modes are required:

### Plain text (for search indexing)
Strip all `{...}` tags and `{}` closers. Replace `#1#`, `#2#`, etc. with `?`.

### Rich HTML (for display)
Convert Balatro color tags to styled Tailwind spans:

| Lua tag | Tailwind classes |
|---|---|
| `{C:mult}` | `text-red-400` |
| `{C:chips}` | `text-orange-400` |
| `{C:attention}` | `text-yellow-300` |
| `{C:money}` | `text-yellow-400` |
| `{C:inactive}` | `text-gray-400` |
| `{C:green}` | `text-green-400` |
| `{X:mult,C:white}` | `bg-red-600 text-white px-1 rounded text-sm font-bold` |
| `{C:tarot}` | `text-purple-400` |
| `{C:planet}` | `text-blue-400` |
| `{C:spectral}` | `text-cyan-400` |
| `{C:hearts}` | `text-red-500` |
| `{C:diamonds}` | `text-orange-500` |
| `{C:spades}` | `text-slate-300` |
| `{C:clubs}` | `text-green-500` |
| `{C:dark_edition}` | `text-purple-300` |

`{}` closers end the styled span. Each opening tag must have a matching closing `</span>`.

---

## Rarity System

| Value | EN Name | PT Name | Border/badge color |
|---|---|---|---|
| 1 | Common | Comum | `border-blue-400` / `text-blue-300` |
| 2 | Uncommon | Incomum | `border-green-400` / `text-green-400` |
| 3 | Rare | Raro | `border-red-400` / `text-red-400` |
| 4 | Legendary | Lendário | `border-yellow-400` / `text-yellow-400` |

Legendary cards should also have a subtle animated glow effect on the card border.

---

## Joker Groups

There are 22 groups. Always use the English technical key in code. Display the localized name based on the active language.

| Technical key | EN display | PT display |
|---|---|---|
| `singularity` | Singularity | Singularidade |
| `quantum` | Quantum | Quântico |
| `temporal` | Temporal | Temporal |
| `dimensions` | Dimensions | Dimensões |
| `corruption` | Corruption | Corrupção |
| `chaos` | Chaos | Caos |
| `economy` | Economy | Economia |
| `transformations` | Transformations | Transformações |
| `luck_and_probability` | Luck & Probability | Sorte e Probabilidade |
| `pos` | Positioning | Posicionamento |
| `hand_and_discard` | Hand & Discard | Mão e Descarte |
| `elemental` | Elemental | Elemental |
| `tribal` | Tribal | Tribal |
| `social` | Social | Social |
| `cond` | Conditions | Condições |
| `time` | Time | Tempo |
| `paradox` | Paradoxes | Paradoxos |
| `celestial` | Celestial | Celestial |
| `anomaly` | Anomaly | Anomalia |
| `glitch` | Glitch | Glitch |
| `professions` | Professions | Profissões |
| `final` | Final | Final |

---

## Visual Design Guidelines

### Theme
**Dark cosmic aesthetic** adapted from the reference design system. The site uses a deep dark purple-navy palette with a vibrant purple primary and teal accent — matching both the card game's aesthetic and the mod's cosmic identity.

---

### Color Palette (CSS Custom Properties)

Define these in `tailwind.config.mjs` as custom colors and reference them throughout:

```css
:root {
  --primary:      #6c47ff;               /* Purple — buttons, links, accents */
  --primary-dark: #4f2fe0;               /* Darker purple — hover states */
  --accent:       #00d4aa;               /* Teal — labels, highlights, checkmarks */
  --dark:         #0d0d1a;               /* Body background (deepest) */
  --dark2:        #13132a;               /* Secondary background */
  --dark3:        #1c1c3a;               /* Tertiary surfaces */
  --card:         #18183a;               /* Card/panel background */
  --text:         #e8e8f0;               /* Primary text */
  --muted:        #9090b0;               /* Secondary/descriptive text */
  --border:       rgba(108,71,255,0.25); /* Subtle purple border */
}
```

In `tailwind.config.mjs`, extend the theme:
```js
theme: {
  extend: {
    colors: {
      primary:      '#6c47ff',
      'primary-dark': '#4f2fe0',
      accent:       '#00d4aa',
      dark:         '#0d0d1a',
      dark2:        '#13132a',
      dark3:        '#1c1c3a',
      card:         '#18183a',
      muted:        '#9090b0',
    },
  },
}
```

---

### Typography

- **Font family**: `'Segoe UI', system-ui, sans-serif` — clean, modern, no webfont dependency.
- **Body line-height**: `1.6`
- **Hero H1**: `clamp(2.2rem, 5vw, 3.8rem)`, `font-weight: 900`, `line-height: 1.15`
- **Section titles**: `clamp(1.6rem, 3vw, 2.4rem)`, `font-weight: 800`
- **Section label** (small caps above title): `0.8rem`, `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: 0.1em`, colored with `--accent`
- **Card names**: `1.0–1.05rem`, `font-weight: 700`
- **Muted/secondary text**: `color: var(--muted)`, `font-size: 0.85–0.9rem`
- **Nav links**: `0.95rem`, `color: var(--muted)`, transition to `#fff` on hover

---

### Navigation Bar

```
height: 64px
position: sticky; top: 0; z-index: 100
background: rgba(13,13,26,0.92)
backdrop-filter: blur(12px)
border-bottom: 1px solid var(--border)
padding: 0 5%
```

The nav must contain: **Logo** (left) | **Nav links** (center) | **Language toggle + CTA** (right).
On mobile (`max-width: 600px`), hide the nav link list — collapse to a burger or just show logo + toggle.

---

### Hero Section

```css
min-height: 92vh;
text-align: center;
padding: 6rem 5% 4rem;
background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,71,255,0.18) 0%, transparent 70%);
```

- **Badge above h1**: `background: rgba(108,71,255,0.15)`, `border: 1px solid var(--border)`, `color: var(--accent)`, `border-radius: 999px`, `padding: 0.35rem 1rem`, `font-size: 0.82rem`, `font-weight: 700`, uppercase.
- **h1 accent word**: color `var(--primary)`.
- **Subtitle**: `color: var(--muted)`, `font-size: 1.15rem`, `max-width: 600px`, centered.

---

### Sections (General)

```css
padding: 5rem 5%;
max-width: 1200px;
margin: 0 auto;
```

Every major content section uses the same padding and max-width. Each section starts with a small label in `--accent` color, then a large title, then optional subtitle in `--muted`.

---

### Cards & Panels

All card-like elements (item cards, feature cards, plan cards) share this base style:

```css
background: var(--card);           /* #18183a */
border: 1px solid var(--border);   /* rgba(108,71,255,0.25) */
border-radius: 16px;               /* use 14px for smaller cards */
padding: 1.8rem;                   /* or 1.3rem for compact cards */
transition: transform 0.2s, border-color 0.2s;
```

**Hover state**:
```css
transform: translateY(-4px);
border-color: var(--primary);      /* border brightens to full purple */
```

**Featured/highlighted card** (e.g. a "featured" deck or legendary joker):
```css
border-color: var(--primary);
background: linear-gradient(145deg, rgba(108,71,255,0.12), var(--card));
```

**Accent hover** (for consumable-type cards, use teal instead of purple):
```css
hover:border-color: var(--accent);
```

---

### Card Component Layout (Joker / Deck / Consumable)

```
┌──────────────────────────┐
│      [Sprite Image]      │  ← 2x source, displayed at 1x CSS size
│  ┌── [Group Badge] ───┐  │  ← small pill, accent color
│  │ Name (active lang) │  │  ← 1rem, font-weight 700
│  │────────────────────│  │
│  │ Description line 1 │  │  ← rich HTML spans, muted color
│  │ Description line 2 │  │
│  └────────────────────┘  │
│  [Rarity Badge]  [$Cost] │  ← bottom row
└──────────────────────────┘
```

---

### Buttons

**Primary button:**
```css
background: var(--primary);
color: #fff;
padding: 0.85rem 2rem;
border-radius: 10px;
font-weight: 700;
font-size: 1rem;
transition: background 0.2s, transform 0.2s;
/* hover: */ background: var(--primary-dark); transform: translateY(-2px);
```

**Outline button:**
```css
border: 1px solid var(--border);
color: var(--text);
padding: 0.85rem 2rem;
border-radius: 10px;
font-weight: 600;
/* hover: */ background: rgba(108,71,255,0.1);
```

---

### Badges & Tags

**Section label** (e.g. "Jokers", "Decks" above a section title):
```css
color: var(--accent);
font-size: 0.8rem;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.1em;
```

**Content type tag** (e.g. Tarot, Planet, Spectral):
```css
background: rgba(0,212,170,0.12);
color: var(--accent);
font-size: 0.72rem;
font-weight: 700;
padding: 0.2rem 0.6rem;
border-radius: 6px;
text-transform: uppercase;
letter-spacing: 0.05em;
```

**Rarity badge** — pill variant:
```css
background: rgba([rarity-color],0.12);
border: 1px solid [rarity-color];
color: [rarity-color];
padding: 0.2rem 0.7rem;
border-radius: 999px;
font-size: 0.75rem;
font-weight: 700;
```

---

### Bottom CTA Section

A full-width band between content and footer:
```css
text-align: center;
padding: 6rem 5%;
background: linear-gradient(135deg, rgba(108,71,255,0.15) 0%, rgba(0,212,170,0.08) 100%);
border-top: 1px solid var(--border);
border-bottom: 1px solid var(--border);
```

---

### Step Indicators (Numbered Steps)

Used in "How It Works" or similar sequential content:
```css
/* Circle number bubble */
width: 44px; height: 44px;
background: var(--primary);
border-radius: 50%;
display: flex; align-items: center; justify-content: center;
font-weight: 900; font-size: 1.1rem;
```

Can be repurposed for showing card index or pagination indicators.

---

### Grids

| Use case | Template columns | Gap |
|---|---|---|
| Feature cards | `repeat(auto-fit, minmax(260px, 1fr))` | `1.5rem` |
| Item cards (jokers) | `repeat(auto-fill, minmax(160px, 1fr))` | `1rem` |
| Consumables / smaller | `repeat(auto-fit, minmax(220px, 1fr))` | `1rem` |
| Content sections | `repeat(auto-fit, minmax(200px, 1fr))` | `1rem` |

Desktop target: 5–6 columns for joker gallery. Mobile (`max-width: 600px`): 2–3 columns.

---

### Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `max-width: 600px` | Hide nav links, single-column hero stats, 2-col card grid |
| `min-width: 1024px` | Full navigation, 5-6 col joker grid |

---

### Image Rendering

```html
<!-- Always set width/height to 1x display size, use 2x source for retina sharpness -->
<img
  src="/assets/jokers/odyssey_j_singularity_solitary.png"
  width="71"
  height="95"
  alt="Solitary"
  loading="lazy"
  onerror="this.style.opacity='0.2'"
/>
```

Sprites should carry a subtle drop shadow consistent with the card surface:
```css
filter: drop-shadow(0 4px 12px rgba(108,71,255,0.3));
```

---

### Legendary Card Glow Animation

```css
@keyframes legendary-glow {
  0%, 100% { box-shadow: 0 0 8px #f59e0b; }
  50%       { box-shadow: 0 0 20px #f59e0b, 0 0 40px #f59e0b44; }
}
```

---

### Footer

```css
text-align: center;
padding: 2rem 5%;
color: var(--muted);
font-size: 0.85rem;
border-top: 1px solid var(--border);
```

---

## GitHub Pages Configuration

O site é hospedado via **GitHub Pages** usando o branch `gh-pages`, gerado automaticamente pelo GitHub Actions a cada push em `main`.

### Workflow de Deploy (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### Configuração do `astro.config.mjs`

Se o repositório não estiver na raiz do domínio (ex: `fenomelini.github.io/balatro-odyssey-wiki`), configure o `base`:

```js
export default defineConfig({
  site: 'https://fenomelini.github.io',
  base: '/balatro-odyssey-wiki',
});
```

Se usar domínio customizado (ex: `wiki.balatrodyssey.com`), remova o `base` e use apenas `site`.

### Como funciona o deploy

1. Push para `main` → GitHub Actions dispara automaticamente
2. Actions instala Node 20 + Python 3.11, roda `npm run build`
3. O diretório `dist/` é publicado no branch `gh-pages`
4. GitHub Pages serve o conteúdo do branch `gh-pages`

Nunca edite o branch `gh-pages` manualmente — ele é gerado automaticamente.

---

## Build & Development Workflow

```bash
# Install dependencies
npm install

# Extract data from mod repo (run whenever mod content changes)
MOD_REPO=../balatro-odyssey python3 scripts/extract_data.py

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Critical Rules

### Rule #1: Data flows ONE direction
```
Mod repo Lua files → extract_data.py → src/data/*.json → Astro components
```
NEVER hardcode item data in components. ALWAYS read from the JSON files.

### Rule #2: src/data/ is generated, never hand-edited
Any manual edits to `src/data/*.json` will be overwritten on the next `extract_data.py` run. Fix the script, not the JSON.

### Rule #3: ALWAYS use 2x sprites
Copy sprites from the mod's `assets/2x/` folder. NEVER use `assets/1x/`. Display them at half their native resolution in CSS for retina-sharp rendering.

### Rule #4: Sprites come from public/assets/
Assets must be in `public/assets/[type]/[filename]` and referenced as `/assets/[type]/[filename]`. Never use external URLs for sprites.

### Rule #5: No broken images — ever
Every `<img>` tag for a sprite MUST have an `onerror` handler that shows a styled placeholder (e.g. a dark card with a `?` glyph) instead of a broken image icon.

### Rule #6: Variable placeholders in descriptions
When a description contains `#1#`, `#2#`, etc., display them as `?` styled with `{C:attention}` styling or their documented default value if known. NEVER leave raw `#1#` visible to users.

### Rule #7: NEVER invent content
If an item's data is not in the extracted JSON, show a "data unavailable" state. Never make up names, effects, or descriptions.

### Rule #8: Performance — paginate the joker gallery
With 1,000+ jokers, the gallery MUST be paginated (e.g. 50 per page via Astro static paths) or use client-side virtual scroll. Never render 1,000 cards simultaneously in the DOM.

### Rule #9: English is default — Portuguese is optional
The site loads in English by default. The language toggle in the nav allows switching to PT-BR. Both languages must always be embedded in the DOM (via `data-en` / `data-pt` attributes) at build time — no async language loading.

### Rule #10: Changelog comes from the mod repo
The `/changelog` page sources its content from the mod repo's `CHANGELOG.md`. Parse it at build time. Do not duplicate or rewrite the changelog manually.

---

## File Naming Conventions

- Astro components: `PascalCase.astro` (e.g. `JokerCard.astro`)
- TypeScript utilities: `camelCase.ts` (e.g. `formatDescription.ts`)
- Pages: `kebab-case.astro` or Astro dynamic routes `[key].astro`
- JSON data files: `snake_case.json` (e.g. `jokers.json`)
- CSS: Tailwind utility classes only — no separate `.css` files unless absolutely necessary

---

## Commit Message Convention

- `feat:` — new page or feature
- `fix:` — bug or visual fix
- `style:` — visual/CSS changes
- `data:` — data extraction script changes
- `docs:` — readme updates
- `chore:` — build config, dependencies

---

## What This Site Is NOT

- NOT a game client or simulator
- NOT a mod installer
- NOT a place to report bugs (link to the mod's GitHub Issues for that)
- NOT a replacement for in-game tooltips — it is a reference companion
