# BKW Premium V2 — design and implementation plan

> Use the executing-plans workflow to execute this plan. Owner authorized autonomous design, implementation and publication to the existing preview.

Base: 267d6a4d8bda44f3dcdf2a0ca7f274680e235bb9; branch codex/bkw-premium-v2. Scope: this repository only.

## Design
Editorial technical identity: off-white canvas, charcoal masthead, original BKW orange used as a precise accent, self-hosted typography, squared image frames and restrained radius. Split hero separates readable copy from real photography. No fictional workers, projects, testimonials or unsupported availability claims.
Homepage progression: proposition → urgent contact strip → four photographic services → transparent coordination → distinct business route → concise contact. Each section adds a visitor decision. Interior pages share the identity but use service-specific content and photography. Contact removes its redundant hero CTA.

## Sequence
1. Capture both live sites at desktop/mobile, reject optional cookies on original; document gaps and image decisions.
2. Reproduce retained route scroll in a failing browser regression, implement history-entry restoration and anchors, test mobile/direct/refresh/back/forward.
3. Download original full-resolution assets; build responsive WebP crops and manifest; self-host licensed fonts.
4. Rebuild homepage, hero, service presentation, navigation/dialog focus, footer and all service/contact layouts.
5. Run unit, typecheck, lint, build, link checks; all six pages at 320/375/390/430/768/1024/1440; accessibility, image, console and local form privacy checks; capture after screenshots.
6. Independent designer/frontend review using actual screenshots, at most two focused correction rounds; regressions after corrections.
7. Commit, push existing main after checking concurrent changes, verify Pages workflow and published browser including direct routes, anchors, mobile menu and restoration. Report exact SHA and limits.

## Gates
No unintended production or PT3 changes. No data submission from demo. No horizontal clipping to hide overflow. No unsupported facts. No broken assets. New routes start top; anchors and history work. Final browser evidence must come from published V2.
