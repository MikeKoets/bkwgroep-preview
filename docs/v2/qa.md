# BKW V2 verification

## Scope and evidence

Original live BKW and live V1 rendered in actual Chrome: all primary routes, desktop 1440 and mobile 390. Initial and consent-dismissed original captures retained under `before/`; V1 captures retained unchanged. Current V2 has six complete routes. Candidate photographs decoded before final screenshots; no empty lazy-image areas are accepted as visual evidence.

## Scroll regression

The new-page regression failed on V1: expected scrollY 0, actual 1250 after clicking Onderhoud. The fix uses the existing React Router data router's ScrollRestoration, keyed by history entry and stored per browser session. New navigation resets; same-page and cross-page hashes honor the sticky-header offset; back/forward and refresh restore visited positions. New-page keyboard focus uses preventScroll and does not override POP restoration.

An initial history test itself moved the page before clicking: Playwright's automatic scrollIntoView on sticky header controls shifted 950 to 542 (desktop) / 520 (mobile). Actual pointer clicks at visible coordinates and DOM-click diagnostics confirmed the router was correctly preserving the position at navigation. The regression now uses actual pointer coordinates for sticky controls; no expected values were weakened.

## Automated checks

- Typecheck, ESLint, production build and git diff check pass.
- Unit tests cover all routes, verified contact details, no-submit demo, menu behavior, preview noindex and responsive local asset provenance/integrity.
- Browser tests cover all six pages at 320, 375, 390, 430, 768, 1024 and 1440 px. Genuine layout widths checked without global overflow hiding; critical content bounding boxes also checked.
- Scroll/navigation/history/refresh/hash regression tests at desktop/mobile.
- All images decoded, no missing assets or browser console errors.
- Axe on all six pages: zero Serious/Critical violations. Mobile drawer has focus trap, Escape/return focus, aria-modal and inert background.
- Form test checks no fetch/XHR/document submission or non-GET request while using synthetic preview data. Photo GET requests do not count as form submissions. No live email, call or external action executed.
- All core routes have static directories in the Pages artifact, avoiding the legacy 404 hop on direct visits; the unknown-route fallback remains.

## Corrections found by QA

1. V1 route scroll preserved: reproduced, corrected, regression tested.
2. Accent small text contrast on muted CTA surface 4.44:1: darkened shared token; axe cleared.
3. Long Onderhoud H1 at 320 px: constrained responsive grid and adjusted narrow typography; overflow cleared.
4. Missing default favicon request: explicit local brand favicon; browser console cleared.
5. Early screenshots captured unloaded lazy images: capture pipeline now eagerly decodes all images before evidence collection.

## Performance and privacy

Local build JS approximately 113 kB gzip; CSS approximately 5.9 kB gzip before final formatting. One self-hosted variable WOFF2, no external font requests. Responsive WebP, no image upscaling; largest individual variant below 550 kB. No added runtime dependencies or backend. No tracking scripts, analytics or cookie integrations. No contact data saved or transmitted by the form. Telephone/mailto links are active but were only inspected during QA.

## Verification limits

Viewports are actual browser layouts, not scaled desktop images. Chrome desktop/mobile viewport and touch checks are automated; no claim of a physical iPhone or exhaustive assistive-technology audit. Production remains unchanged. Form intentionally stays a marked demo. Availability, response-time, certification, partner and reference claims require BKW's confirmation before production use.

Final local result: **33 unit tests + 35 browser tests PASS**. Typecheck, lint, build, link check and diff check PASS. Independent review: GO, 0 Critical / 0 High / 0 Medium after one correction round. See `independent-review.md`.

Further regression: hard document navigations without a router-generated key used the shared `default` key and could inherit another page's saved position instead of a new direct anchor. `main.tsx` assigns unique keys only to keyless native history entries; reload retains existing keys and React Router owns subsequent PUSH/POP entries. Direct/cross-page anchor tests and independent review confirm this.

Final published checks will be recorded after deployment, with compiled-asset fingerprint matching to the local production build.

## Published-host correction (second and final focused correction round)

Initial V2 publication f296c76 passed 32/34 published interaction tests but failed both refresh-restoration tests: SPA `/onderhoud` refreshed through a Pages 301 to `/onderhoud/`. Chrome discarded the original history state/key; stored scroll650 remained under the old key and the new key restored0. Actual navigation response/state diagnostics confirmed this, rather than a timing or test-click issue. Initial failed report is retained in `live/initial-browser-tests.json`.

Correction: all internal page links now point directly to the Pages directory URL, including a trailing slash in the router basename for root links. No visual or content redesign. Existing back/forward and refresh expectations stay950/650; URL checks now require the canonical trailing slash. New all-six-pages link regression failed before correction (27 slashless links on homepage) and passed after it. Legacy slashless direct URLs remain compatible via the host redirect; first direct visits start at the top.

Updated final local gates: 33 unit tests; 36 Chrome browser tests, including the canonical-link regression. Typecheck, lint, build, link and diff checks passed. Published successor results recorded separately after deployment.
