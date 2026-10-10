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

Runtime-kandidaat: `c1007428a089e70d3a19f2e02dc5120950654a7b`, tree `132938fd24f0e2fafab3fa0e1d0942be074f0a71`.

Definitieve lokale Lighthouse-serie: [perf-hero-team-local.json](../perf-hero-team-local.json), alle zes routes PASS. P98–100, LCP1202–2403ms, CLS0, TBT0. Home P98/LCP2333ms. Geïsoleerde mobiele Slow4G/4xCPU-meting op de exact gebouwde kandidaat; dezelfde V3-methodiek.

Onafhankelijke review en online sluitcontrole worden vóór definitieve oplevering toegevoegd. Dit document loopt nog vooruit op die gates.

## Grenzen

De foto bevat bestaande derde-partijbewegwijzering; dat is beeldinhoud, geen door ons beweerde samenwerking. De mobiele foto is bewust uitgesneden om het team te behouden. Formulier blijft demo, noindex/nofollow/noarchive behouden, geen productiecanonical/backend. Geen fysiek iOS of gesproken VoiceOver/NVDA beschikbaar. BKW-productie/DNS/hosting en PT3 zijn niet gewijzigd.

## Eerste review en gerichte correctie

Onafhankelijke lokale review: GO0Critical/0High/0Medium,1Low. De Low betrof alleen te kleine bronselectie bij tablet-cover. Nieuwe regressie reproduceerde800px voor1422px schilderbreedte in Chromium én WebKit. `sizes` heeft nu een1422px-hint voor768–1422px. Mobiele hint blijft gelijk; geen layoutwijziging. Eén gerichte correctieronde. Volledige lokale92/92PASS, contrast35/35PASS(min5,43), unit37/lint/typecheck/buildPASS. [Review](independent-review.md), [RED-bewijs](tablet-selection-red.txt). Exacte successor en sluiting worden hieronder vastgelegd.
