# Independent review — focused teamhero

Separate gpt-6-astra reviewer, read-only. Initial frozen candidate c1007428a089e70d3a19f2e02dc5120950654a7b, tree132938fd24f0e2fafab3fa0e1d0942be074f0a71. This initial review predates the responsive-image correction below.

## Initial reviewer report

**Local GO — Critical 0 / High 0 / Medium 0 / Low 1.**

Reviewed frozen source c1007428a089e70d3a19f2e02dc5120950654a7b, tree132938fd24f0e2fafab3fa0e1d0942be074f0a71, through the local preview. No candidate-live claim is made.

The hero fulfills the owner’s requested direction: the genuine original team panorama fills one banner, with the heading, introduction, and contact action placed within it. Faces remain visible above the main copy. At320px the leftmost visible worker is partly cropped, but the central team remains recognizable. This does not warrant redesign.

Independent verification:

- Actual Chromium and WebKit rendering: all six routes at320/375/390/430/768/1024/1440,84combinations, with decoded images, no overflow, and no console errors.
- Reviewed all seven homepage captures and a fresh focused320px WebKit rendering.
- Primary CTA remains within the first screen: bottom approximately465–504px mobile,617–627px desktop/tablet. It opens Contact successfully.
- Both engines retain visible hero keyboard focus:3px light-orange outline with4px offset. WebKit’s link-inclusive Alt+Tab confirms the secondary action’s focus state at all seven widths.
- Supplied composed-photo contrast evidence records35/35passing samples, minimum5.43:1. White eyebrow text and the lower dark gradient support readable copy.
- Independently passed mobile menu focus cycle/Escape, demo validation and confirmation without submission requests, and navigation0/back950/forward650/refresh650 in both engines.
- All six routes retain preview robots directives and contain no canonical or active JSON-LD.
- Source diff confirms the visual/runtime change is confined to the home hero, image manifest, and four genuine photo variants. Interior page content, routing, form, and startup architecture are unchanged.

**Low finding — tablet image candidate is smaller than its effective painted size.**
At src/pages/SitePages.tsx:119, sizes=(max-width:760px)1100px,100vw makes both engines select teamBanner-800.webp at768px/DPR1. The560px-high object-fit:cover banner paints this panorama at approximately1422px wide, causing avoidable softness. Larger genuine variants already exist. Set sizes to account for the panorama’s effective cover width at tablet sizes. This is a responsive-image selection issue, not fabricated imagery or upscaling during asset generation. It is nonblocking for this preview.

The exact build fingerprint independently recomputed as b1c48160ab253b4866a336d352d27b0a79053f7a35fd4d5deb4c3d5a78f77c54, matching the supplied six-route Lighthouse report:P98–100,LCP1202–2403ms,CLS0,TBT0. Saved browser evidence records90passed,0unexpected/flaky/skipped. I did not rerun Lighthouse.

Current differences after freezing are limited to the release report and published-evidence helper; runtime/build source remains unchanged from c1007428. No reviewer edits, builds, commits, or deployments were performed.

Physical iOS and spoken VoiceOver/NVDA remain untested. The form remains a demo.

**Local review complete; available for live closure.**

## Implementer correction

Reproduced the Low finding in both engines with a new regression:800px selected for1421.72px painted width. Smallest correction adds a1422px sizes hint between mobile and wide desktop. Mobile hint is retained. No layout/CSS/image-generation change. Updated complete local suite and independent closure follow below.
