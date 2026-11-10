# Verification

Claim only what a check produced. Installation, registration, and a successful build are
not observations of what the user sees.

## Mode B (report)

- [ ] Every bullet names a file, command, or decision that appears in this session.
- [ ] No number appears that was not measured; unmeasured fields read `unavailable`.
- [ ] The report fits one screen and follows the schema order.
- [ ] Paths resolve from the workspace root and carry line refs where they matter.
- [ ] If an HTML file was produced: it opens standalone, has no network reference, and the
      placeholders are gone.

## Mode A (host view)

Build-time, all mandatory:

- [ ] `node --check` passes for every shipped JS file.
- [ ] Every JSON file parses (`JSON.parse`), including locales and the manifest.
- [ ] The client factory id equals the package name; the patch row name matches the package.
- [ ] Locale metadata exists for `meta.title` and `meta.description` in every shipped locale.
- [ ] The icon is a real image of the declared format, inside the package, ≤256 KiB.
- [ ] No import of a host client package; visible text goes through the host locale service.

Install-time:

- [ ] The install result reports `applied`; `warnings` is read, not skipped.
- [ ] The new view id appears in the live slot with its `order` and `active: true`.
- [ ] Existing shipped views are untouched (same ids, same order).

Render-time, when a page is available:

- [ ] The tab is visible, labelled in the active locale, and selects the view.
- [ ] Light and dark both read correctly; no literal colors on text or surfaces.
- [ ] The empty state, the running state, and the error block all render.
- [ ] No `slot entry crashed in '<slot>'` in the console.

## Reporting the gap

If rendered pixels could not be observed — no browser control, headless host, or a shared
session — say so in one sentence and stop there. Do not substitute a mock screenshot, a
design variant, or a second install attempt for that observation.

Also state what you changed around the install (profile settings, toggled bundles) so the
user can restore it, and never leave test-only state behind.
