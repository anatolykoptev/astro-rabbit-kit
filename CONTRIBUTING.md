# Contributing

Issues and pull requests are welcome. Report a security problem privately, as described in
[SECURITY.md](SECURITY.md), not in an issue. By taking part you agree to the
[Code of Conduct](CODE_OF_CONDUCT.md).

## Build and check

The kit has no build step of its own; the demo site in `example/` is how you run it.

```sh
cd example
npm install
npm run dev      # local dev server with every component
npm run build    # the check: the demo must build
```

There is no test suite and no CI workflow, so run the build yourself before you open a pull request,
and look at the component in the browser (keyboard, narrow screen and reduced motion for anything
interactive).

## Changes

- One component per directory under `src/components/<name>/`, as a single self-contained `.astro` file.
- A new component is exported from `index.js` and from `package.json#exports`, gets a section in
  [README.md](README.md) with its props, and appears in `example/`.
- Style through the documented CSS tokens with a `var(--token, fallback)`; add no dependencies.
- Changing the `StepperForm` request payload, its draft key or a prop name breaks consumers: say so in
  the pull request and add a changelog entry.

## Commits and pull requests

Write a short imperative subject that names the component (`stepper-form: ...`, `Modal: ...`), as the
history does, and explain the reason in the body. Keep a pull request to one change, and add a line to
[CHANGELOG.md](CHANGELOG.md) under `Unreleased`.

## Licence

MIT ([LICENSE](LICENSE)); contributions are accepted under the same terms.
