# BKW V3 — teamhero op verzoek van eigenaar

Basis: `8942f4e3a21c65999e39f0ed0c0ff79cfbd25c94`, branch `codex/bkw-v3`. Publicatiedoel blijft uitsluitend de bestaande GitHub Pages-preview. Dit is een gerichte vervolgwijziging; het volledige V3-bewijs blijft als historie bewaard.

## Ontwerp

De eigenaar verkiest de oude fotobanner boven de losse V3-werkfoto onder de tekst. De echte originele team-/voertuigenpanorama is daarom opnieuw de achtergrond van één brede banner. De kop, introductie en primaire contactactie staan onderin het beeld, zodat gezichten bovenin zichtbaar blijven. Responsive uitsnede, rustige donkere contrastlaag, korte contactknop. Geen partnershipclaim bij het zichtbare Hornbach-gebouw en geen nieuwe commerciële beloften. De rest van de website, autorisatie-/formulierveiligheid, routes, scroll restoration en statische V3-performancearchitectuur blijven behouden.

## Bewijs vóór publicatie

- 37 unittests PASS; lint/typecheck/build/linkcontrole/diff PASS.
- 92 lokale Playwright-tests PASS in Chromium en WebKit, 0 retries/flaky/skipped. Alle zes routes op zeven breedtes gecontroleerd.
- Nieuwe regressie bewijst: full-width teambeeld vanaf de bovenkant van de hero, tekst/contactactie binnen dezelfde compacte banner, directe contactroute, geen oude losse fotokaart/caption.
- Zeven echte homepagecaptures320/375/390/430/768/1024/1440; nul overflow. De contactactie blijft in het eerste mobiele scherm.
- Tekstcontrast boven de werkelijk samengestelde foto+CSS-laag: alle35veld/breedtecontroles PASS, conservatief minimum5,43:1. Kleine accenttekst eerst3,32–3,78:1, gecorrigeerd naar wit; dit bewijs blijft bewaard. Oranje blijft op de grote kop en contactknop.
- Eerste screenshottool-run had88functionelePASS en2capture-fouten door ontbrekende lokale variabele; gerepareerd, volledige90/90PASS; na de tabletregressie92/92PASS. Geen verborgen retries.
- [Beeldbron/afmetingen](image-provenance.json): bestaande geautoriseerde BKW-foto1800×709; WebP-varianten zonder upscaling. Geen stock of generatie. `scripts/prepare-team-banner.py` maakt de varianten opnieuw.

## Release-sluiting

Definitieve runtime-kandidaat: `a2128f4573f173d0d5ae7d327caf39ab5783338a`, tree `c1a14d7d4f3029395ef62aab17106a2f33cf0f01`. Parent: eerste beoordeelde kandidaat `c1007428a089e70d3a19f2e02dc5120950654a7b`.

Definitieve lokale Lighthouse-serie: [perf-hero-team-final-local.json](../perf-hero-team-final-local.json), alle zes routes PASS. P98–100, LCP1128–2404ms, CLS0, TBT0. Home P98/LCP2330ms. Build SHA256 `f4b46e2db66bfcc8f2cde64feffeb44987137a85c7d22a084b675d4247a39f01`. Geïsoleerde mobiele Slow4G/4xCPU-meting op de exact gebouwde kandidaat; dezelfde V3-methodiek.

Onafhankelijke lokale sluitreview: GO, 0 Critical / 0 High / 0 Medium / 0 Low. Tabletbronselectie bevestigd in beide engines. De exact beoordeelde kandidaat is gepubliceerd via [Pages-run38012205232](https://github.com/MikeKoets/bkwgroep-preview/actions/runs/38012205232); build en deployment PASS. Online sluitcontrole volgt hieronder.

## Grenzen

De foto bevat bestaande derde-partijbewegwijzering; dat is beeldinhoud, geen door ons beweerde samenwerking. De mobiele foto is bewust uitgesneden om het team te behouden. Formulier blijft demo, noindex/nofollow/noarchive behouden, geen productiecanonical/backend. Geen fysiek iOS of gesproken VoiceOver/NVDA beschikbaar. BKW-productie/DNS/hosting en PT3 zijn niet gewijzigd.

## Eerste review en gerichte correctie

Onafhankelijke lokale review: GO0Critical/0High/0Medium,1Low. De Low betrof alleen te kleine bronselectie bij tablet-cover. Nieuwe regressie reproduceerde800px voor1422px schilderbreedte in Chromium én WebKit. `sizes` heeft nu een1422px-hint voor768–1422px. Mobiele hint blijft gelijk; geen layoutwijziging. Eén gerichte correctieronde. Volledige lokale92/92PASS, contrast35/35PASS(min5,43), unit37/lint/typecheck/buildPASS. [Review](independent-review.md), [RED-bewijs](tablet-selection-red.txt). Exacte successor en sluiting worden hieronder vastgelegd.

## Voor / na

- [Vorige V3 home mobiel](../live/home-390.png) → [nieuwe home mobiel](live/home-390.png).
- [Vorige V3 home desktop](../live/home-1440.png) → [nieuwe home desktop](live/home-1440.png).
- De originele productiesite en de aangeleverde foto zijn als beeldreferentie gebruikt; alleen de GitHub Pages-preview is gepubliceerd.

## Online verificatie

[Exacte publicatiecontrole](live/published-integrity.json):80/80bestanden byte-identiek aan de lokaal goedgekeurde build. Zes routes op390/1440,12livecaptures,geen overflow; branded404PASS. [Browserrapport](live/browser-tests.json):90/90PASS,0unexpected/flaky/skipped, Chromium en WebKit. Inclusief zeven echte viewportbreedtes, menu, scroll/back/forward, anchors, directe links, refresh, demoformulier en Axe. Lokale92tests bevatten daarnaast twee lokale presentatiescreenshotcases.

| Gate | Resultaat |
|---|---|
| Unit |37PASS|
| Typecheck / lint / build / links / diff |PASS|
| Lokaal Chromium/WebKit |92PASS,0flaky|
| Live Chromium/WebKit |90PASS,0flaky|
| Responsive |320/375/390/430/768/1024/1440PASS|
| Axe Serious/Critical |0|
| Tabletbronselectie |1800px voor1422px cover, beide engines|
| Foto-tekstcontrast |35PASS,min5,43:1|
| Deployment |GitHub Actions38012205232PASS|
| Assets |80/80exact|
| Lokale onafhankelijke review |GO0C/0H/0M/0L|

## Definitieve mobiele performance

Lighthouse13.5, gesimuleerde Slow4G/4×CPU. Eén geïsoleerde serie per omgeving op de definitieve runtime. Ruwe rapporten: [lokaal](../perf-hero-team-final-local.json), [live](../perf-hero-team-final-live.json). Alle gestelde performancegrenzen PASS. Geen gelijktijdige browser/reviewbelasting.

| Route | Lokaal P / LCP ms | Live P / LCP ms | CLS lokaal/live | TBT lokaal/live ms |
|---|---|---|---|---|
|/|98 / 2330|100 / 1654|0 / 0|0 / 2|
|onderhoud/|100 / 1879|100 / 1210|0 / 0|0 / 0|
|slotenservice/|100 / 1654|100 / 1213|0 / 0|0 / 0|
|isolatie/|98 / 2404|100 / 1369|0 / 0|0 / 0|
|zakelijk/|99 / 2179|100 / 1214|0 / 0|0 / 0|
|contact/|100 / 1128|100 / 1063|0 / 0|0 / 3|

De Lighthouse-serie noemt workingTreeDirty=true vanwege uitsluitend nog niet gecommitteerde rapporten en screenshots; de runtime blijft a2128f4. Beide series gebruiken dezelfde dist-fingerprintf4b46e2db66bfcc8f2cde64feffeb44987137a85c7d22a084b675d4247a39f01. De80onlinebestanden zijn afzonderlijk byte-voor-byte geverifieerd.

## Definitieve oplevering

Onafhankelijke live review: **GO — 0 Critical / 0 High / 0 Medium / 0 Low**. [Volledig reviewbewijs](independent-review.md). Review op de echte publieke site in beide engines; tabletbeeld, home, alle routes, menu, scroll/back/forward, CTA/anchor en demoformulier opnieuw bevestigd. Geen runtimewijziging na de lokale goedkeuring.

**Gepubliceerd en online geverifieerd:** https://mikekoets.github.io/bkwgroep-preview/

Runtime SHA a2128f4573f173d0d5ae7d327caf39ab5783338a; tree c1a14d7d4f3029395ef62aab17106a2f33cf0f01. Het afsluitende bewijscommit wijzigt alleen docs/v3/; de build blijft identiek. BKW-productie, DNS, hosting en PT3 onaangeraakt. Geen verdere actie nodig voor deze preview.
