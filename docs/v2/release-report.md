# BKW Groep Premium V2 — releasebewijs

## Preview en identiteit

- Gecontroleerde preview: https://mikekoets.github.io/bkwgroep-preview/
- Repository: https://github.com/MikeKoets/bkwgroep-preview
- V1-basis: `267d6a4d8bda44f3dcdf2a0ca7f274680e235bb9`.
- Eerste V2: `f296c76e2fdfb8384acb07bec77c12caab761a45`.
- Definitieve websitesource: `cd379f28c6b7eb96f2c506337edebd395b0f26f5`; tree `f1efe993c2fa2bbd6ff10254f76e54040f441027`.
- Werkbranch: `codex/bkw-premium-v2`, gepubliceerd via `main`.
- Geslaagde Pages-workflow: https://github.com/MikeKoets/bkwgroep-preview/actions/runs/38006802433
- Online browsercontrole: 2026-10-09T23:57:03.275Z (UTC).

De volgende documentatiecommit bevat uitsluitend dit bewijs en screenshots; de websitecode en geproduceerde assets veranderen daardoor niet.

## Concrete veranderingen

Zes complete pagina's: Home, Onderhoud, Slotenservice, Isolatie, Zakelijk, Contact. React/TypeScript/Vite en bestaande React Router; geen toegevoegde runtime-dependencies of backend.

- Lichte, ruim ingedeelde hero met echte BKW-werkfoto, leesbare typografie en oranje merkaccent. Bijschrift onder het beeld laat de werkzaamheden zichtbaar.
- Echte dienstenfotografie in rustige kaarten, heldere routes voor particulier en zakelijk, afzonderlijke telefoonactie voor urgente vragen.
- Manrope lokaal gehost; herbruikbare kleur-, ruimte-, radius- en focus-tokens. Donkere navigatie/footer, herkenbaar BKW-logo, compacte iconen.
- Foto's op bronresolutie beoordeeld, inhoudelijk uitgesneden, bescheiden gecorrigeerd en als responsive WebP geëxporteerd. Geen stock of gegenereerde medewerkers/projecten, geen upscaling.
- Mobiele zijmenu-navigatie met focusbegrenzing, Escape, inert achtergrond en direct bellen; dienstenfoto's volbreed met leesbare tekst.
- Routewisseling begint bovenaan; sectielinks houden rekening met de sticky header. Back/forward en verversen behouden de bezochte positie. Echte statische Pages-directories en canonical directory-links voorkomen de serverredirect die geschiedenis kon wissen.

## Testresultaten

| Controle | Resultaat |
|---|---|
| Unit tests | 33 PASS |
| Lokale Chrome-browsertests | 36 PASS |
| Gepubliceerde Chrome-interactietests | 35 PASS, 0 retries/flaky |
| Typecheck / lint / productiebuild / links / diff | PASS |
| Zes routes op320/375/390/430/768/1024/1440 | PASS; geen pagina-overflow of afgekapte inhoud |
| Desktop/mobile live routebezoeken en refresh | 12/12 HTTP200, geen ontbrekende beelden/consolefouten |
| Mobiel menu, alle zes bestemmingen | PASS |
| Scroll0 bij nieuwe pagina; back950/forward650/refresh650 | PASS lokaal én live |
| Same/cross-page/direct anchors | PASS, offset88mobiel/120desktop |
| Axe zes pagina's | 0 Serious/Critical |
| Axe geopend mobiel menu | 0 overtredingen |
| Contact-demo | Geen verstuurde/opgeslagen gegevens; synthetische test |
| CSS/JS live SHA256 versus lokale dist | Byte-identiek |

De lokale36 bevatten een screenshottest; live35 testen dezelfde interacties zonder die lokale screenshots te overschrijven. Aanvullend zijn twaalf online full-page screenshots en twee homepage-viewportbeelden vastgelegd in `live/`.

## Onafhankelijke review

GPT-6 Astra, read-only, met daadwerkelijk gerenderde Chrome-beelden en interacties. Eerste review vond vier Medium-punten: mobiele kaarttekst, onduidelijke acties, donker focuscontrast en hero-uitsnede. Verwerkt in één gerichte correctieronde. Tweede beoordeling: GO,0Critical/0High/0Medium.

De online eindcontrole ontdekte vervolgens de Pages-only slashredirect bij refresh. Bewijs van de aanvankelijke32/34 wordt behouden, niet als PASS weergegeven. Tweede en laatste gerichte correctieronde: canonieke directorylinks en root-basename. Onafhankelijke technische sluitcontrole opnieuw GO,0C/0H/0M; geen nieuwe designronde. Online35/35 bewijzen de sluiting.

## Bewijs

- [Voor/na desktop](comparison-desktop.png) — origineel, V1 en V2 naast elkaar.
- [Voor/na mobiel](comparison-mobile.png).
- [Online homepage desktop](live/home-desktop.png) / [mobiel](live/home-mobile.png).
- [Online Onderhoud desktop](live/onderhoud-desktop.png) / [mobiel](live/onderhoud-mobile.png).
- [Online Contact](live/contact-desktop.png).
- [Gepubliceerde controles en assethashes](live/published-checks.json).
- [Online testrapport](live/browser-tests.json).
- [Gap-analyse](gap-analysis.md), [beeldaudit](image-audit.md), [QA](qa.md), [review](independent-review.md).

## Resterende beperkingen

1. Het formulier blijft expliciet demo. Er is geen backend, gegevensopslag of live formulierintegratie.
2. Geen fysieke iPhone/Safari- of volledige screenreadercontrole; echte Chrome viewport/touch-layouts zijn gebruikt. Performancegetallen in `local-performance.json` zijn lokale, ongethrottlede diagnostiek, geen fieldmeting of Lighthouse-score.
3. Bronfotografie beperkt enkele uitsneden. Nieuwe bedrijfsfotografie en door BKW bevestigde referenties/partners/beschikbaarheidsbeloften kunnen het vertrouwen verder versterken; er zijn geen vervangende claims verzonnen.
4. Enkele gerichte CSS-overrides kunnen later worden geconsolideerd. Ze zijn visueel en met regressies gecontroleerd.

De bestaande BKW-productiewebsite, DNS, hosting en alle PT3-projecten zijn ongewijzigd gebleven. Uitsluitend deze GitHub Pages-preview is gepubliceerd.

## Eventuele productieovername

Laat BKW actuele contactgegevens, dienstverlening, rechten op fotografie en juridische teksten bevestigen. Kies daarna expliciet echte formulierverwerking, controleer Safari/fysieke telefoon, pas base-path/hosting aan en zet indexering alleen op de gekozen productieomgeving aan. Deze preview behoudt `noindex,nofollow` en bevat geen canonical die haar als officiële site presenteert. Geen productieovername uitgevoerd.
