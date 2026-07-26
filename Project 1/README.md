# Blueprint Studio — Responsive Frontend Interface

**DecodeLabs Full Stack Internship — Project 1: The Responsive Architecture**

A fully responsive, accessible portfolio-style web interface built with
**semantic HTML5, CSS3 (Grid + Flexbox), and vanilla JavaScript — no
frameworks**. Built mobile-first, expanding through tablet and desktop
breakpoints with fluid, `clamp()`-based typography.

---

## ✨ Features

- **Semantic landmarks** — `<header>`, `<nav>`, `<main>`, `<article>`,
  `<aside>`, `<footer>` used for their actual meaning, not just `<div>` soup.
- **Mobile-first responsive layout** — single column on phones, expanding
  to a two/three-column grid at `768px` (tablet) and `1024px` (desktop).
- **CSS Grid for macro layout**, **Flexbox for micro components** (nav bar,
  buttons, skill meters).
- **Fluid typography** via `clamp()` — no abrupt font-size jumps between
  breakpoints.
- **Interactive JavaScript**, all client-side state, no build tooling:
  - Accessible mobile navigation toggle (`aria-expanded`, keyboard-friendly)
  - Client-side project filtering (Frontend / Full stack / Design systems)
  - Inline contact-form validation with live error messaging
- **Accessibility (WCAG-conscious)**:
  - Skip-to-content link
  - Visible focus states (`:focus-visible`)
  - `aria-live` regions for form status and errors
  - `prefers-reduced-motion` respected
  - Sufficient color contrast on the warm, grounded 2026 palette

## 🎨 Design tokens

| Token | Hex | Role |
|---|---|---|
| Mocha Mousse | `#8B7462` | Primary accent — stability |
| Ethereal Blue | `#A0D4E0` | Secondary accent — trust |
| Moonlit Grey | `#F2F0EA` | Base background — refinement |

**Type:** Montserrat (headings, 600/700/800) · Roboto (body, 400/500/700)

## 📁 Project structure

```
.
├── index.html      # Semantic page structure
├── styles.css      # Mobile-first styles, design tokens, breakpoints
├── script.js       # Nav toggle, project filter, form validation
├── .gitignore
└── README.md
```

## 🚀 Getting started

No build step, no dependencies. Just open the file or serve it locally:

```bash
# Option 1 — just open it
open index.html         # macOS
start index.html        # Windows

# Option 2 — serve it (recommended, avoids file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 📱 Responsive breakpoints

| Breakpoint | Width | Layout change |
|---|---|---|
| Mobile (default) | `< 768px` | Single column, hamburger nav |
| Tablet | `≥ 768px` | 2-column project grid, inline nav |
| Desktop | `≥ 1024px` | 3-column project grid |

## 🧭 Roadmap / next steps

- Wire the contact form to a real backend or form service (e.g. Formspree,
  a small Node/Express endpoint)
- Add real project case studies once available
- Swap placeholder gradient thumbnails for real screenshots
- Add automated accessibility checks (e.g. `axe-core`) to CI

## 📄 License

MIT — see [LICENSE](LICENSE).
