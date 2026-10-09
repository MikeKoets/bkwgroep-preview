# Independent V2 review

Reviewer: independent GPT-6 Astra agent, acting as critical senior designer and frontend reviewer. Used actual Chrome-rendered before/after evidence, all six candidate pages, desktop/mobile viewport captures, local interaction checks and source review. No source editing or publishing performed by reviewer.

## Review 1

Verdict: NO-GO for premium preview. Critical 0, High 0, Medium 4, Low 2.

| Finding | Action taken in correction round 1 |
|---|---|
| 11px mobile card copy / 10px links; other copy small | Full-width photographic mobile cards, 15px descriptions and 14px actions; substantive page copy 15–16px |
| 'Meer over' service cards lead to generic contact | Explicit contact action labels for insulation/repair/prevention; direct phone link for urgent door opening |
| Dark accent focus ring 2.52:1 against dark surfaces | Light-orange outline on dark regions; regression checks actual keyboard-focused menu control |
| Tight hero crop and large caption obscure drill/action | Source aspect restored; caption moved completely beneath image; viewport comparisons refreshed |
| Minor aria-role issue on aside dialog | Neutral div with role=dialog; full open-menu axe audit now zero violations |
| Dark, repeated business building photograph | New genuine BKW fleet/workshop photo for homepage business section; modest source exposure correction for building |

Reviewer reasons an owner might prefer original: recognizable team/scale in the old hero, stronger partner/coverage/operational reassurance, larger service photos. We retain real company/work photography and enlarge the service images. We do not manufacture partner/certification/availability proof to replace unconfirmed claims.

## Regression evidence after corrections

35/35 browser tests passed. Six routes × seven widths checked for real overflow, clipped content, loaded images and console errors. No serious/critical axe violations; zero violations in open mobile dialog. Route top, same/cross-page/direct hashes, back/forward and refresh tested. Latest direct-anchor test also prevented initial history-key collisions across hard navigations.

## Review 2

**GO for publishing V2 preview. Critical 0 / High 0 / Medium 0.** No second correction round required.

Independent reviewer re-viewed original/V1/V2 comparison images, corrected desktop/mobile homepage captures and updated interior/contact pages. Verified in Chrome: 350px-wide mobile service photos, 15px descriptions / 14px actions, correct tel/contact destinations, light-orange keyboard focus and zero open-menu axe violations. Confirmed separate hard navigations get distinct history keys, refresh preserves its key and 650px position, mobile direct/cross-page anchors land below the 88px header offset.

Reviewer judged V2 a substantial improvement over V1 in photography, readable hierarchy and separation of service/business/urgent journeys. The real workshop/fleet photo improves recognizable company context.

Remaining Low limitations: corrective CSS overrides should be consolidated in future maintenance; verified commercial proof is still limited; existing photos constrain some crops; full-width mobile photographs make the homepage longer. None blocks the preview. The original may still persuade with recognizable team/partner/coverage evidence once confirmed by BKW.

Approval covers this local preview candidate. GitHub Pages still requires published verification. No physical-device/Safari claim; no independent revalidation of every BKW fact. No third review or open-ended polish loop.

## Published-host regression closure

Second and final focused correction round addresses the Pages-only refresh redirect discovered during online QA. Reviewer independently inspected the directory-link/basename diff and Chrome at390/1440. Verdict: **GO, 0 Critical / 0 High / 0 Medium**. Verified all six pages use canonical trailing-slash links (including home), correct single active navigation item, related-service exclusions, new routes scroll0, back950/forward650/refresh650 with unchanged history key, anchor offsets88mobile/120desktop. No visual review was reopened. Published host still needs identical verification after successor deployment.
