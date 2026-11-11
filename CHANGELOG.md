# Changelog

All notable changes are recorded here, in the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
format. The repository has no release tags; `package.json` reads 0.2.0.

## [Unreleased]

## 2026-09-16

### Added
- `StepperForm` sends a `started_at` fill-start timestamp so a server can reject implausibly fast submissions.

## 2026-09-15

### Added
- `StepperForm`: a `tel` input type and a per-field `hint`.
- `StepperForm`: an optional `consent` checkbox on the review step, blocking submission until ticked.

### Changed
- `StepperForm` review step: the edit control is an icon-only pencil, and its styles are `:global()` because the rows are injected at runtime.
- `StepperForm` consent checkbox: lighter border, padding and size fixes, and font and link styles that no longer depend on the scoped attribute.

## 2026-09-14

### Added
- Initial release with `StepperForm`.
- `Accordion` and `AccordionItem` (native `<details>`), `Modal` and `SkipLink`.
- `Modal`: several triggers per dialog, a bottom-sheet mode with swipe-to-close, and a bubbling `rkmodal:open` event.

### Fixed
- `Modal`: `-webkit-backdrop-filter` prefix for older Safari.
