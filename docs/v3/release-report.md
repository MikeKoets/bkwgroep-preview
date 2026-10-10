# BKW Groep V3 — releasebewijs

> Latere gerichte hero-update op verzoek van de eigenaar: [teamhero-release](hero-team-update/release-report.md). Onderstaande identiteit, metingen en screenshots zijn het oorspronkelijke V3-releasebewijs; ze worden niet als bewijs voor de latere fotobanner gebruikt.

## Preview en identiteit

Basis: `e7b2fbb93f4621d282eaf68d45afcd02ddd8dde0`. Werkbranch: `codex/bkw-v3` in de zelfstandige BKW-previewrepository.
Publicatiedoel: https://mikekoets.github.io/bkwgroep-preview/ uitsluitend via main. BKW-productie, DNS, hosting en PT3 zijn niet gewijzigd.

- Gecontroleerde runtime-kandidaat: `f3eca45be9f51cbebb2c309c983e2f43a229500c`; tree `edd335c5fffa42c6b9bb07f1162ad1c2b5457b3f`.
- Eerste V3-publicatie: `e431e6c04a41a6031c544fd36a6b02bb1acfcf66`. Uitsluitend aanvullend lokaal bewijs ten opzichte van de runtime-kandidaat.
- Geslaagde Pages-workflow: https://github.com/MikeKoets/bkwgroep-preview/actions/runs/38010478615
- Dist SHA256: `9b3bcfd3f748ecab995f7eccebc18360cf0a26ce442a838bdb697a511889da47`.

**V3-preview release GO.** Lokale én onafhankelijke online sluitcontrole PASS. De laatste bewijscommit wijzigt uitsluitend documentatie/screenshots/verificatietooling; de websitebuild blijft gelijk.

## Verbeteringen

- Homehero compacter: kortere kop/intro, natuurlijke regels, beter passende echte werkfoto met minder onnodige grond onderaan. CTA en beeld passen samen op mobiel; originele fotografie zonder stock/generatie/upscaling.
- Build-time prerender van zes bestaande React-pagina's plus branded404. Responsive hero-highpriority-preload, kleine CSS inline en vroege eerste beeldweergave; interactieve enhancement wordt daarna geladen.
- Eerste menutik blijft behouden vóór bootstrap/hydration. Capture vlak vóór initiële router-restoration beschermt een vroege bezoekersscroll. Latere routewissels, geschiedenis, anchors en refresh blijven router-owned.
- Demo-submit is vóór hydration en zonder JavaScript disabled. Beschreven veldfouten, focus op eerste ongeldige veld, autocomplete/inputmode en duidelijkere invoerranden. Geen gegevens verzonden/opgeslagen.
- WebKitmenu heeft volledige tabcyclus, inert/focus/Escape; touch375/390/430 en zeven echte viewportbreedtes gecontroleerd.
- Kleinere echte WebP's, extra640/720varianten, gesubset lokaal Manrope. Geen nieuwe runtime dependency. Lighthouse is gemotiveerde dev-only meettooling.
- Unieke statische/SPA-metadata, eigen OGfoto, geen actieve LocalBusiness-placeholder/canonical; noindex,nofollow,noarchive behouden. Checklist voor toekomstige productie-overname zonder activering.

## Testresultaten

| Controle | Resultaat |
|---|---|
| Unit tests | 36/36 PASS |
| Lokale Chromium/WebKit-browsertests | 90/90 PASS, 0 retries/flaky/skipped |
| Online Chromium/WebKit-interactietests | 88/88 PASS, 0 retries/flaky/skipped |
| Typecheck / lint / productiebuild / links / diff | PASS |
| 6 routes × 7 breedtes × 2 engines | PASS; geen overflow, afgekapte inhoud, ontbrekende beelden of consolefouten |
| Axe alle routes en geopend menu | 0 Serious/Critical |
| Nieuw0, back950, forward650, refresh650; anchors | PASS lokaal én live |
| Eerste menutik en scroll vóór beide scripts | PASS lokaal én live, gecontroleerd vertraagde responses |
| Contactdemo incl. JS-uit en vroege hydration | Geen verzending/opslag; synthetische testgegevens |
| Hover/focus/disabled-tekst en invoerranden | Tekst≥4,5:1, invoerrand≥3:1 |
| Gepubliceerde bestanden versus lokale dist | Alle 76 byte-identiek |
| Directe pagina's / branded404 | 12/12 desktop/mobile HTTP200; onbekende route HTTP404 |
| Lighthouse lokale en online zes routes | Alle 12 meetdoelen PASS |

De online 88 sluiten uitsluitend de twee lokale screenshotcases uit. Twaalf onafhankelijke online captures tonen alle zes routes op 390/1440. De nieuwe delayed-startup-regressie blokkeert beide JSbundles; de JS-uit-regressie controleert dat Enter geen formulierverzoek doet.

## Performance vóór/na

Lighthouse 13.5.0, mobile 412×823/DPR1,75, gesimuleerde Slow 4G/4x CPU, koud profiel, metingen één voor één zonder andere browserruns. Performance is een labscore; geen veldpercentiel. V2 was online al snel: onderstaande cijfers maken het extra voordeel controleerbaar zonder een slecht uitgangspunt te suggereren.

| Omgeving / route | P V2→V3 | LCP V2→V3 (ms) | V3 CLS | V3 TBT (ms) |
|---|---:|---:|---:|---:|
| lokaal / home | 91→96 | 3382→2411 | 0 | 116.5 |
| local / onderhoud/ | 97→100 | 2558→1881 | 0 | 0 |
| local / slotenservice/ | 98→100 | 2257→1656 | 0 | 0 |
| local / isolatie/ | 95→98 | 2781→2404 | 0 | 0 |
| local / zakelijk/ | 95→99 | 2855→2253 | 0 | 0 |
| local / contact/ | 99→100 | 2105→1203 | 0 | 0 |
| live / home | 99→100 | 2104→1378 | 0 | 1.5 |
| live / onderhoud/ | 99→100 | 1810→1214 | 0 | 0 |
| live / slotenservice/ | 99→100 | 1917→1210 | 0 | 1 |
| live / isolatie/ | 99→100 | 2112→1360 | 0 | 0 |
| live / zakelijk/ | 99→100 | 2114→1226 | 0 | 0 |
| live / contact/ | 100→100 | 1661→1064 | 0 | 0 |

Doelen: P≥90, LCP<2500ms, CLS<0,05, TBT<200ms. Alle zes routes halen deze doelen lokaal én online. TBT van de lokale home is 116,5ms; dit is geen nulclaim. Baseline/tussenmetingen blijven bewaard. [Volledige vergelijking](perf-comparison.json), [definitief lokaal](perf-approved-local.json), [definitief online](perf-approved-live.json).

## Bewijs

- [Hero voor/na desktop](hero-before-after-1440.png) / [mobiel](hero-before-after-390.png).
- [Online homepage desktop](live/home-1440.png) / [mobiel](live/home-390.png).
- [Online Onderhoud desktop](live/onderhoud-1440.png) / [mobiel](live/onderhoud-390.png), [Contact](live/contact-1440.png).
- [Online browserresultaten](live/browser-tests.json), [76bestanden/directe routes/404](live/published-integrity.json).
- [Lokale browserresultaten](local-browser-tests.json), [QA](qa.md), [toetsenbord en accessibility-tree](keyboard-accessibility-tree.json), [contrast](contrast-states.json).
- [Baseline Lighthouse](perf-baseline.json), [methodiek/tussenmetingen](performance-method.md).
- [Beeldprovenance](image-provenance.json), [fotocompressie](image-optimization.json), [fontsubset](font-subset.md), [productie-overname](productie-overname.md).

## Grenzen / nog fysiek bevestigen

Lighthouse is labbewijs, geen veldpercentiel. Accessibility-tree/keyboard en Playwright-WebKit zijn geen gesproken VoiceOver/NVDA of fysiek iOS-testbewijs. Safe-area/browserbalken, daadwerkelijke bel-app-overdracht en autofill blijven fysiek te bevestigen. Hero is beperkt tot de echte bronresolutie; hogere retina-desktopkwaliteit vraagt een grotere originele foto. Het formulier blijft nadrukkelijk demo.

## Onafhankelijke review

Een afzonderlijk gpt-6-astra-model beoordeelde broncode, werkelijk gerenderde Chromium/WebKit-schermen, voor/na-beelden en de nieuwe interacties read-only. Lokale GO: **0 Critical / 0 High / 0 Medium / 0 Low**, geen correctieronde gevraagd. De reviewer controleerde onafhankelijk alle 84 route/breedtecombinaties, scroll/geschiedenis, eerste klik vóór hydration, het menu, Axe, demoformulier en bron/build-identiteit. Lighthouse werd door de reviewer op identiteit gecontroleerd, niet opnieuw gemeten. Volledig verslag in [independent-review.md](independent-review.md). Onafhankelijke live-sluiting: **GO, 0 Critical / 0 High / 0 Medium / 0 Low**. De reviewer bezocht alle zes routes op 390/1440 in beide engines plus refreshes, controleerde dertien gepubliceerde bestanden onafhankelijk, en herhaalde scroll/menu/formulier/JS-uit/404checks op het echte Pages-adres. Geen correctieronde nodig.

## Eventuele productieovername

Geen productieovername uitgevoerd. Zie [productie-overname.md](productie-overname.md): contact/diensten/beeldrechten bevestigen, echte formulierverwerking afzonderlijk besluiten, fysiek iOS en gesproken screenreader controleren, hosting/base-path aanpassen en alleen op gekozen productieomgeving indexering activeren. LocalBusiness is uitsluitend een uitgeschakeld documentatietemplate; geen placeholders in de UI of actieve JSON-LD. De preview houdt noindex,nofollow,noarchive en geen canonical.

De laatste bewijscommit bevat alleen docs, screenshots en read-only verificatietooling. De frontend/buildbestanden blijven ongewijzigd ten opzichte van de gereviewde runtime-kandidaat. De exacte commit van het bewijs is in de GitHub-geschiedenis te vinden; de hierboven vastgelegde runtime- en eerste deploymentidentiteit veranderen daardoor niet.
