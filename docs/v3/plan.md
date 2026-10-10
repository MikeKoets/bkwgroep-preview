# BKW V3 implementation plan

Goal: improve the approved V2 preview, particularly its home hero, with measured mobile performance and cross-engine accessibility/navigation proof.
Base: e7b2fbb93f4621d282eaf68d45afcd02ddd8dde0. Branch: codex/bkw-v3. Publication target: existing GitHub Pages preview only.
Execution: native inline implementation; independent read-only candidate and live closure review. User authorized autonomous execution and preview publication.

Constraints: no BKW production/PT3/DNS/hosting changes; no new runtime dependencies; real BKW photographs only, no upscaling. Form remains demo without storage/transmission. Preserve noindex,nofollow,noarchive and no production canonical. Claims stay within confirmed source facts. Missing physical device/screenreader evidence must be disclosed.

## Tasks and contracts

1. Measurement baseline — scripts/performance.mjs; docs/v3/perf-baseline.json; actual live/local V2 screenshots. Lighthouse13.5 pinned dev-only, mobile simulated Slow4G/4xCPU, six routes each. Record LCP/CLS/TBT/performance, effective settings, versions, source, warnings and image/bundle diagnostics. Do not alter runtime source before measurement.
2. Performance/hero — src/components/Photo.tsx, src/pages/SitePages.tsx, src/App.tsx, src/styles.css, scripts/prepare-routes.mjs, fonts. Add regression for matching responsive preload, explicit intrinsic sizes, concise mobile first screen and persistent unobscured phone CTA. Route splitting only if baseline demonstrates worthwhile reduction, avoiding flash/remount/scroll regression. Preserve genuine source image provenance.
3. Accessibility/iOS — ContactDemoForm explicit field errors described by inputs; email inputmode/autocomplete, minimal existing fields, no phone field invented. Keyboard and accessibility-tree walkthrough every route; no false real VoiceOver/NVDA claim. Chromium and WebKit seven widths, plus touch375/390/430, history/anchors/menu/focus/safe-area/reduced-motion/input16px tests. Red→green for new defects/behaviors.
4. Preview production preparation — unique static/dynamic route metadata and OG using genuine own photo. Disabled LocalBusiness template docs-only. Branded standalone404 with current preview fallback/navigation preserved; invalid routes never masquerade as service pages. Productie-overname.md has explicit activation and confirmation checklist.
5. Cleanup — consolidate V2 corrective declarations into component/breakpoint rules, remove shadowed/unused CSS proved by usage analysis. Compare non-hero before/after visual outputs per width, allow only intentional contrast/form metadata changes. No new visual language.
6. Gates/release — unit/typecheck/lint/build/links/diff; both engines and all widths; measured post-change Lighthouse local and live; independent reviewer GO0C/0H/0M. Main only after local gates/review pass. Review live after publication; correct only proven issues, no polish loop. Save exact source SHA/tree/deployment, screenshots, metrics and limitations in release-report.md. Production-ready preparation is not production activation.

## Review focus

- Direct legacy slashless Pages URLs vs SPA canonical links: history keys/scroll must survive refresh.
- Slow route chunk/font/image loading: no heading/hero overflow or scroll restoration reset.
- Keyboard and mobile drawer active/same-route navigation: closed background, focus trap/Escape, persistent phone.
- Form invalid submission: focus first invalid field, errors announced/described, no external request/data persistence.
- Route OG/title on static hard visits and SPA changes: correct route, retained noindex, no canonical/active LocalBusiness placeholders.

## Ledger

- Baseline source/branch/remote identity verified; existing33unit PASS. Existing checkout is a standalone BKW repository separate from PT3. No additional managed worktree created against the PT3 task context.
- Lighthouse is dev-only evidence tooling; existing Playwright engine download is local tooling. No runtime dependency added.
