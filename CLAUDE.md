# CLAUDE.md

Notes for coding agents working in astro-rabbit-kit: a small kit of self-contained Astro components
(`Accordion`, `AccordionItem`, `Modal`, `SkipLink`, `StepperForm`) with scoped styles and vanilla-JS
behaviour, themed through CSS custom properties. Every document is indexed in
[docs/INDEX.md](docs/INDEX.md).

## Layout

- `src/components/<name>/` holds one component per directory. Each is a single `.astro` file with its
  own `<style>` and `<script>`, so a consumer can vendor it by copying the directory.
- `index.js` re-exports every component; `package.json#exports` also exposes each component by path.
  A new component needs both entries.
- `src/types/index.d.ts` carries the `StepperForm` prop types. It is older than the component: the
  header comment in `StepperForm.astro` is the complete list (it adds `tel`, `hint` and `consent`).
- `example/` is a demo site that depends on the kit through `file:..` and shows every component.

## Gate

There is no CI workflow, no test suite and no linter. The only automated check is building the demo:

```sh
cd example && npm install && npm run build
```

Run it before opening a pull request, and look at the page with `npm run dev` after a visual change.
`npm install` rewrites `example/package-lock.json`; do not commit that diff unless you changed
dependencies.

## Invariants that are easy to break

- **No runtime framework and no build step in the package.** Components ship as `.astro` source plus
  inline vanilla JS; do not add a dependency or a bundler.
- **Theming goes through the tokens** (`--accent`, `--hairline`, `--bg-warm`, `--text-*`, `--font-*`)
  and every use keeps a built-in fallback, so a component works on a site that defines none of them.
  Do not hard-code a colour without a `var(--token, fallback)`.
- **`StepperForm` payload is a server contract.** It POSTs `{ email, website, started_at, source, note }`
  as JSON; `website` is the honeypot and `started_at` feeds server-side timing checks. The draft key is
  `dr-stepper-<id>`. Renaming any of these breaks every consumer's endpoint or saved drafts.
- **Accessibility behaviour is part of the API:** `Modal` traps focus and returns it to the trigger,
  `Accordion` uses native `<details>`, motion honours `prefers-reduced-motion`.
- **The peer range is `astro` `^4.0.0 || ^5.0.0`.** The demo builds on Astro 5 only.
- **This repository is public.** No hostnames, operator paths, account names, tokens or personal
  data in any tracked file.
