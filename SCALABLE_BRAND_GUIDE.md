# Scalable Capital Brand Guide (Extracted)

Reference for building the test assignment presentation and POC demo.

---

## Colors

### Primary Palette
| Name | Hex | Usage |
|------|-----|-------|
| Emerald Primary | `#089688` | Primary brand color, buttons, links, highlights |
| Emerald Accent | `#07D2A6` | Gradients, hover states, accent elements |
| Emerald Light | `#0AEAB0` | Light accent, success states |

### Dark Palette
| Name | Hex | Usage |
|------|-----|-------|
| Dark Base | `#0B0F14` | App dark mode background |
| Dark Surface | `#1A1F26` | Cards, panels on dark background |
| Dark Elevated | `#252B33` | Elevated surfaces, modals |

### Light Palette
| Name | Hex | Usage |
|------|-----|-------|
| White | `#FFFFFF` | Web background, text on dark |
| Light Grey | `#F5F7FA` | Section backgrounds, alternating rows |
| Medium Grey | `#8A94A6` | Secondary text, labels |
| Border Grey | `#E2E8F0` | Borders, dividers |

### Semantic Colors
| Name | Hex | Usage |
|------|-----|-------|
| Success | `#07D2A6` | Positive values, gains |
| Error | `#E53E3E` | Negative values, losses, alerts |
| Warning | `#F6AD55` | Caution, pending states |

---

## Typography

**Primary Font:** Inter (Google Fonts fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)

| Element | Weight | Size | Line Height |
|---------|--------|------|-------------|
| H1 (page title) | 700 | 48px | 1.1 |
| H2 (section title) | 700 | 32px | 1.2 |
| H3 (subsection) | 600 | 24px | 1.3 |
| Body | 400 | 16px | 1.6 |
| Body Small | 400 | 14px | 1.5 |
| Caption | 500 | 12px | 1.4 |
| Button | 600 | 14px | 1.0 |
| Code/Mono | 400 (JetBrains Mono) | 13px | 1.5 |

---

## UI Patterns

### Cards
- Background: `#FFFFFF` (light) / `#1A1F26` (dark)
- Border-radius: `12px`
- Shadow: `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)`
- Padding: `24px`

### Buttons
- Primary: bg `#089688`, text `#FFFFFF`, border-radius `8px`, padding `12px 24px`
- Primary hover: bg `#07D2A6`
- Secondary: bg transparent, border `1px solid #089688`, text `#089688`

### Navigation
- Sticky top bar, height `64px`
- Background: `#FFFFFF` with `backdrop-filter: blur(8px)` and slight transparency
- Border-bottom: `1px solid #E2E8F0`

### Chat UI (for POC demo)
- Chat container: dark background `#0B0F14`
- User message: bg `#089688`, text white, border-radius `16px 16px 4px 16px`
- Agent message: bg `#1A1F26`, text white, border-radius `16px 16px 16px 4px`
- Typing indicator: three animated dots in emerald

---

## CSS Variables (ready for HTML)

```css
:root {
  /* Colors */
  --sc-emerald: #089688;
  --sc-emerald-accent: #07D2A6;
  --sc-emerald-light: #0AEAB0;
  --sc-dark-base: #0B0F14;
  --sc-dark-surface: #1A1F26;
  --sc-dark-elevated: #252B33;
  --sc-white: #FFFFFF;
  --sc-light-grey: #F5F7FA;
  --sc-medium-grey: #8A94A6;
  --sc-border: #E2E8F0;
  --sc-success: #07D2A6;
  --sc-error: #E53E3E;
  --sc-warning: #F6AD55;

  /* Typography */
  --sc-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --sc-font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Spacing */
  --sc-radius-sm: 8px;
  --sc-radius-md: 12px;
  --sc-radius-lg: 16px;
  --sc-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
  --sc-shadow-lg: 0 4px 12px rgba(0,0,0,0.12);
}
```

---

## Tone of Voice

- Professional but approachable
- Clear and concise -- "Simple is hard" (Scalable value #5)
- No jargon unless necessary
- Data-driven: lead with numbers
- Confident, not boastful -- "We are humble" (Scalable value #14)

---

## Sources

- Website: https://de.scalable.capital/en
- Values: https://de.scalable.capital/en/values-principles
- Dribbble: https://dribbble.com/scalablecapital (teal/dark palette confirmed)
- App design: Dark mode with emerald accents, clean card-based layouts
