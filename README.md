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
| `--accent` | `#d67a4e` | progress fill, focus borders, checked pills, links |
| `--hairline` | `#3a342f` | input rules, pill borders |
| `--text-primary` / `--text-secondary` / `--text-muted` | warm greys | text hierarchy |
| `--font-display` | Georgia serif | step legends, success line |
| `--font-body` | system-ui | inputs, pills |
| `--font-mono` | ui-monospace | counters, buttons, metadata |

## Development

```bash
cd example && npm install && npm run dev
```

The example site imports the kit via a `file:` dependency and demos every component.

## License

MIT
