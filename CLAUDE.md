# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Entrenador del Pasado** - An interactive Spanish language learning app focused on teaching the three main past tenses (Pretérito Perfecto, Indefinido, and Imperfecto) through visual infographics and interactive exercises.

## Commands

```bash
# Development
npm run dev          # Start Vite dev server

# Build & Deploy
npm run build        # Compile TypeScript and build for production (outputs to dist/)

# Code Quality
npm run lint         # Run ESLint

# Preview
npm run preview      # Preview production build locally
```

## Architecture

### Layout Design
The app uses a **two-column grid layout** with:
- **Left column**: `InfografiaPasado` - Reference infographic showing all three past tenses
- **Right column**: `EntrenadorInteractivo` - Interactive exercises (fixed 500px width)
- Both components have `height: 100%` and internal scroll to fit everything on one viewport without page scrolling
- Responsive: switches to single column layout below 1200px

### Component Structure

**App.tsx**
- Root component with CSS Grid layout
- Contains two main components side-by-side

**InfografiaPasado.tsx**
- Educational reference showing three past tense types
- Each tense section has:
  - Description (always visible)
  - Collapsible "Cuándo usar" section (collapsed by default)
  - Temporal markers (always visible)
  - Collapsible "Ejemplos" section (collapsed by default)
  - Visual timeline representation
- Compact design optimized for space efficiency

**EntrenadorInteractivo.tsx**
- Interactive fill-in-the-blank exercises
- Key features:
  - **Auto-sizing inputs**: Uses CSS Grid overlay technique with invisible `.hueco-sizer` element that measures text width. The input is positioned over the sizer using `grid-area: 1 / 1`, making it exactly match the placeholder or user input width.
  - Dynamic correction feedback (correcto/semi-correcto/incorrecto)
  - Summary statistics after correction
  - Random exercise selection

### Data Flow

1. **Exercise Data** (`src/data/ejercicios.json`):
   - Large JSON file (~484KB) with exercises
   - Each exercise has `texto` with `{placeholder}` syntax and corresponding `verbos` array
   - Structure: `{ id, texto, verbos: [{ infinitivo, pronombre, formacion, tiempo }] }`

2. **Exercise Loading** (`ejercicioUtils.ts`):
   - `obtenerEjercicioAleatorio()`: Returns random exercise from JSON

3. **Answer Validation** (`correccionUtils.ts`):
   - Sophisticated comparison algorithm using Levenshtein distance
   - Three states:
     - `correcto`: Exact match (case/accent insensitive)
     - `semi-correcto`: Minor typos or missing accents
     - `incorrecto`: Wrong answer
   - Handles spacing, hyphens, and accent normalization

### Styling Architecture

- **CSS Variables** (`src/styles/variables.css`): Color scheme, spacing, typography
- **Component Styles**: Each component has its own CSS file
- **Compact Design Philosophy**: All sizes reduced for space efficiency
  - Small fonts (0.65rem - 0.8rem for details)
  - Tight spacing (var(--spacing-xs))
  - Minimal padding throughout
  - Timeline elements: 30px min-height, 12-20px points, 3px lines

### Key Implementation Details

**Auto-sizing Inputs**
The input sizing uses a Grid overlay technique:
```tsx
<span className="hueco-container">
  <span className="hueco-sizer">{textToMeasure}</span>
  <input className="hueco-input" ... />
</span>
```
- `.hueco-container` uses `display: inline-grid`
- Both elements occupy `grid-area: 1 / 1` (overlapped)
- Sizer is `visibility: hidden` but takes up space
- Input stretches to match sizer width

**Exercise Text Parsing**
Text like `"Ayer {ir} al cine"` is split on `{verb}` patterns, creating alternating text/input segments.

## TypeScript Types

Core types in `src/types/index.ts`:
- `TiempoPasado`: 'perfecto' | 'indefinido' | 'imperfecto'
- `Ejercicio`: Exercise with texto and verbos array
- `Verbo`: Verb with infinitive, pronoun, conjugation, and tense
- `EstadoCorreccion`: Validation result states
