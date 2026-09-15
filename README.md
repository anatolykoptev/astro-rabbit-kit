# astro-rabbit-kit

Composable Astro component primitives. Scoped styles, vanilla-JS behaviour, no runtime framework. Themeable through CSS custom properties with built-in fallbacks — drop a component into any Astro site and it works, override the tokens and it blends in.

## Install

```bash
npm install github:anatolykoptev/astro-rabbit-kit
```

```astro
---
import { StepperForm } from 'astro-rabbit-kit'
---
```

Or vendor it: copy `src/components/<name>/` into your project — every component is a single self-contained `.astro` file.

## Components

### `Accordion` + `AccordionItem`

Ruled disclosure list on native `<details>/<summary>` — no JS needed. Animated via `::details-content`, honours `prefers-reduced-motion`.

```astro
<Accordion>
  <AccordionItem marker="01" title="Is it completely dark?">Yes — …</AccordionItem>
  <AccordionItem marker="02" title="Can I stop at any time?">Always. …</AccordionItem>
</Accordion>
```

Props on `AccordionItem`: `title`, `marker` (leading mono index), `open`, `name` (set the same value on siblings for single-open behaviour).

### `Modal`

Accessible `<dialog>` with focus trap, backdrop-click and Esc dismissal, and focus return to the trigger.

```astro
<button id="screening-btn">Read the full screening criteria</button>
<Modal triggerId="screening-btn" title="Screening criteria">
  <p>…</p>
</Modal>
```

**Multiple triggers** — use `trigger` with a CSS selector instead of `triggerId`:

```astro
<Modal trigger="[data-open-apply]" title="Apply">…</Modal>
```

**Bottom sheet** — `sheet` docks the dialog to the bottom edge on narrow screens (≤700px), adds a grab handle and swipe-down-to-close:

```astro
<Modal trigger="[data-open-apply]" title="Apply" sheet>
  <StepperForm … />
</Modal>
```

On open, the dialog emits a bubbling `rkmodal:open` CustomEvent with `{ trigger }` in `detail` — useful for pre-filling fields from `data-*` attributes on the clicked trigger.

### `SkipLink`

Keyboard-only "skip to content" link. On activation, moves focus to `target` (default `#main-content`, falls back to the first `h1`).

```astro
<SkipLink /> <!-- first element inside <body> -->
```

### `StepperForm`

Conversational multi-step form: one question per screen, progress indicator, per-step validation, auto-advance on radio choices, draft persistence in `localStorage`, a generated review step with per-field "Change" links, honeypot, and a success state that replaces the form.

```astro
<StepperForm
  id="apply"
  endpoint="/api/waitlist"
  source="my-site"
  noteTemplate="[my-site] {name} | {plan} | {note}"
  submitLabel="Send my application"
  doneLine="We read every application personally."
  steps={[
    { key: 'name', legend: 'First, what should we call you?', label: 'Full name', autocomplete: 'name' },
    { key: 'email', legend: 'Where can we reach you?', type: 'email', label: 'Email', autocomplete: 'email', required: true, error: 'Check that email once more.' },
    { key: 'plan', legend: 'Which plan?', type: 'pills', options: ['Basic', 'Pro', 'Not sure'] },
    { key: 'note', legend: 'Anything else?', type: 'textarea', label: 'A few sentences are enough' },
  ]}
/>
```

**Behaviour**

- A review step is appended automatically after your `steps`.
- `Enter` advances; `Back` returns; radio steps auto-advance after ~260ms.
- Email fields validate on blur and before advancing.
- Answers persist to `localStorage` (`dr-stepper-<id>`) and clear on success.
- Multiple instances on one page are isolated by `id`.

**Payload contract** — POSTs JSON to `endpoint`:

```json
{ "email": "<value of the first type=email field>", "website": "<honeypot>", "source": "<source>", "note": "<noteTemplate with {key} interpolation>" }
```

**Step config** — see `src/types/index.d.ts`.

## Theming

Components read these tokens and fall back to built-in defaults when absent:

| Token | Fallback | Used for |
|---|---|---|
| `--accent` | `#d67a4e` | progress fill, focus borders, checked pills, markers, links |
| `--hairline` | `#3a342f` | input rules, pill borders, accordion rules, modal border |
| `--bg-warm` | `#14110f` | modal + skip-link surface |
| `--text-primary` / `--text-secondary` / `--text-muted` | warm greys | text hierarchy |
| `--font-display` | Georgia serif | step legends, accordion titles, modal title |
| `--font-body` | system-ui | inputs, pills, body copy |
| `--font-mono` | ui-monospace | counters, buttons, markers, metadata |

For light-background sections, reassign the tokens on the section class — every component follows automatically:

```css
.on-light {
  --text-primary: #18140f;
  --text-secondary: #57504a;
  --text-muted: #57504a;
  --hairline: #d8cebe;
  --accent: #8f3f22;
}
```

## Development

```bash
cd example && npm install && npm run dev
```

The example site imports the kit via a `file:` dependency and demos every component.

## License

MIT
