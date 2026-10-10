# Independent V3 review — local gate

Reviewer: separate gpt-6-astra agent, read-only. No repository mutations or publication.

**GO for publishing the frozen V3 preview candidate.**

Severity counts: **Critical 0 / High 0 / Medium 0 / Low 0.** No actionable release defects found. No correction round requested.

Reviewed source `f3eca45be9f51cbebb2c309c983e2f43a229500c`, tree `edd335c5fffa42c6b9bb07f1162ad1c2b5457b3f`, at `http://127.0.0.1:4175/bkwgroep-preview/`. Runtime files remained identical to that source. All six served HTML documents matched `dist` byte for byte. Independently recomputed build fingerprint `9b3bcfd3f748ecab995f7eccebc18360cf0a26ce442a838bdb697a511889da47` matches the approved Lighthouse report.

I read the requested V2/V3 documentation, inspected original/V2/V3 images through view_image, and used installed Playwright for actual Chromium and WebKit rendering and interaction. Fresh desktop Chromium and mobile WebKit screenshots also confirmed the current hero.

Independent checks completed:

- All six routes at 320/375/390/430/768/1024/1440 in both engines: **84 combinations**, with no horizontal overflow, clipped key text/controls, broken images, console errors, or incorrect preview indexing.
- Both engines at 390/1440: new route **0**, back **950**, forward **650**, refresh **650**. Direct home anchor lands at approximately **88 px mobile / 120 px desktop**.
- Both engines with bootstrap and main bundles deliberately blocked: first menu tap preserved, pre-hydration scroll **950** preserved, subsequent route **0**, back **950**.
- Mobile menu: every navigation/contact control participates in the tab cycle; Escape restores trigger focus and removes background inertness.
- All six pages and the open menu: independent Axe audits returned **zero violations** in both engines. Skip links reach and focus main content. WebKit uses its link-inclusive **Alt+Tab** behavior outside the drawer; ordinary Tab’s default link skipping was not misclassified as a site defect.
- Synthetic contact form: empty/invalid fields receive appropriate focus and errors; successful demo confirmation remains explicit; **no submission requests or entered-data storage**. JavaScript-disabled Enter caused no submission. Current input border is rgb(134,144,135), approximately **3.31:1** against white.
- Preview robots directives remain noindex, nofollow, noarchive; no canonical or active JSON-LD. Source dependency changes add no runtime dependency.

The hero is a meaningful improvement over V2: shorter text, more natural heading wrapping, visible work context, and a complete photograph plus primary action within the 390 px mobile screen. The established typography, colors, service structure, and distinct urgent telephone journey remain coherent. The genuine source photograph has finite resolution, but the inspected presentation does not create a release defect.

I explicitly considered why the owner might still prefer the original site. Its team panorama, partner logos, coverage information, and availability claims give stronger immediate evidence of organizational scale and reassurance. That remains a content-verification opportunity, not a reason to restore the older hero or introduce unconfirmed claims. V3 retains authentic work, fleet, and workshop imagery without manufacturing that evidence.

The supplied final Lighthouse evidence passes every stated threshold across six routes: **P 96–100, LCP 1203–2411 ms, CLS 0, TBT 0–116.5 ms**. Home is **P96 / LCP2411 / TBT116.5**, not TBT0. I verified report identity and build linkage; I did not rerun Lighthouse. The saved browser report records **90 expected / 0 unexpected / 0 flaky / 0 skipped**.

This is a **local preview GO**, pending published-host closure. It does not claim physical iOS testing, spoken VoiceOver/NVDA validation, field performance, or a working production form. No repository files were changed, rebuilt, committed, or published during this review.

**Local review complete. Available for the requested read-only live closure.**


# Independent V3 live closure

**LIVE GO — Critical 0 / High 0 / Medium 0 / Low 0.** No blockers or corrections required.

Independently reviewed the actual published site at https://mikekoets.github.io/bkwgroep-preview/ in Chromium and WebKit.

Published source `e431e6c04a41a6031c544fd36a6b02bb1acfcf66` contains the previously approved runtime `f3eca45be9f51cbebb2c309c983e2f43a229500c`. The intervening changes are review/evidence tooling and documentation. I independently fetched and byte-checked 13 published files: all six route HTML documents, branded 404, both JavaScript bundles, CSS, font, hero photograph, and OG image. All match local dist and the integrity report. The supplied full report records **76/76 identical files**.

Independent live checks passed:

- All six routes at **390 and 1440**, in both engines: **24 route/viewport visits plus refreshes**, with no overflow, missing images, console errors on valid pages, or incorrect preview metadata.
- Navigation scroll **0**, back **950**, forward **650**, refresh **650**, in both engines at both widths.
- Home anchor offsets approximately **88 px mobile / 120 px desktop**.
- Legacy slashless service URL resolves to its directory URL; subsequent refresh preserves **650 px**.
- Unknown URL returns **HTTP 404**, displays the branded missing-page view, and successfully returns home.
- Mobile menu keyboard cycle, Escape, restored trigger focus, and background inert cleanup.
- Synthetic demo validation and confirmation with **no submission requests or entered-data storage**.
- With JavaScript disabled, submit remains disabled and Enter causes **no document submission**, in both engines.
- noindex, nofollow, noarchive retained; no canonical or active JSON-LD.

Fresh mobile WebKit rendering and the published desktop image confirm the approved V3 hero is live.

The supplied online browser report records **88 passed, 0 unexpected, 0 flaky, 0 skipped**. The final live Lighthouse report is linked to the same build fingerprint and records all six routes at **P100**, **LCP 1064–1378 ms**, **CLS 0**, and **TBT 0–1.5 ms**. I inspected this evidence without rerunning Lighthouse.

Approval covers this published preview. Physical iOS and spoken VoiceOver/NVDA remain untested; the form remains an explicit demo. No files were edited, built, committed, or published during this closure.

**Independent live closure complete.**
