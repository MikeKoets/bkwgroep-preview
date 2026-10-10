# BKW V3 — teamhero op verzoek van eigenaar

Basis: `8942f4e3a21c65999e39f0ed0c0ff79cfbd25c94`, branch `codex/bkw-v3`. Publicatiedoel blijft uitsluitend de bestaande GitHub Pages-preview. Dit is een gerichte vervolgwijziging; het volledige V3-bewijs blijft als historie bewaard.

## Ontwerp

De eigenaar verkiest de oude fotobanner boven de losse V3-werkfoto onder de tekst. De echte originele team-/voertuigenpanorama is daarom opnieuw de achtergrond van één brede banner. De kop, introductie en primaire contactactie staan onderin het beeld, zodat gezichten bovenin zichtbaar blijven. Responsive uitsnede, rustige donkere contrastlaag, korte contactknop. Geen partnershipclaim bij het zichtbare Hornbach-gebouw en geen nieuwe commerciële beloften. De rest van de website, autorisatie-/formulierveiligheid, routes, scroll restoration en statische V3-performancearchitectuur blijven behouden.

## Bewijs vóór publicatie

- 37 unittests PASS; lint/typecheck/build/linkcontrole/diff PASS.
- 90 lokale Playwright-tests PASS in Chromium en WebKit, 0 retries/flaky/skipped. Alle zes routes op zeven breedtes gecontroleerd.
- Nieuwe regressie bewijst: full-width teambeeld vanaf de bovenkant van de hero, tekst/contactactie binnen dezelfde compacte banner, directe contactroute, geen oude losse fotokaart/caption.
- Zeven echte homepagecaptures320/375/390/430/768/1024/1440; nul overflow. De contactactie blijft in het eerste mobiele scherm.
- Tekstcontrast boven de werkelijk samengestelde foto+CSS-laag: alle35veld/breedtecontroles PASS, conservatief minimum5,43:1. Kleine accenttekst eerst3,32–3,78:1, gecorrigeerd naar wit; dit bewijs blijft bewaard. Oranje blijft op de grote kop en contactknop.
- Eerste screenshottool-run had88functionelePASS en2capture-fouten door ontbrekende lokale variabele; gerepareerd, volledige90/90PASS. Geen verborgen retries.
- [Beeldbron/afmetingen](image-provenance.json): bestaande geautoriseerde BKW-foto1800×709; WebP-varianten zonder upscaling. Geen stock of generatie. `scripts/prepare-team-banner.py` maakt de varianten opnieuw.

## Release-sluiting

Exacte bron, Lighthouse, onafhankelijke review en online sluitcontrole worden hier toegevoegd vóór definitieve oplevering. Tot die tijd is dit document geen publicatie-GO.

## Grenzen

De foto bevat bestaande derde-partijbewegwijzering; dat is beeldinhoud, geen door ons beweerde samenwerking. De mobiele foto is bewust uitgesneden om het team te behouden. Formulier blijft demo, noindex/nofollow/noarchive behouden, geen productiecanonical/backend. Geen fysiek iOS of gesproken VoiceOver/NVDA beschikbaar. BKW-productie/DNS/hosting en PT3 zijn niet gewijzigd.
