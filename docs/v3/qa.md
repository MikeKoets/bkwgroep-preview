# V3 QA — kandidaatbewijs

Basis: e7b2fbb93f4621d282eaf68d45afcd02ddd8dde0. BKW-previewrepository, branchcodex/bkw-v3. Alle testgegevens in het formulier zijn synthetisch.

## Lokale verificatie

- Unit:36 PASS; typecheck, lint, productiebuild en linkcontrole PASS.
- Playwright:90/90 PASS,0flaky,0retries. Chromium(Chrome) én WebKit27.2. Complete zes routes op320/375/390/430/768/1024/1440, met echte viewportwijzigingen, geladen beelden, console- en overflowcontroles. `local-browser-tests.json` bevat de volledige geslaagde run.
- Oude scrollregressies blijven PASS: nieuwe route bovenaan, back/forward/refresh op390/1440, same/cross/direct anchors en sticky-header-offset.
- Axe:0Serious/Critical op alle zes routes; geopend menu ook375/390/430 in beide engines.
- Formulier: naam/e-mail/vraag; autocomplete/name/email, emailtype/inputmode, expliciete veldfouten via aria-describedby/aria-invalid, focus eerste ongeldige veld en alert/status. Blanco, whitespace-only en ongeldige e-mail getest, daarna geldige correctie. Geen fetch/XHR/POST, geen opslag door het formulier. Demo-melding blijft staan.
- Metadata: zes unieke titels/descriptions al in HTTPHTML; OpenGraphfoto1200×630 met eigen BKW-beeld; juiste imagepreload/srcset/sizes per route. `noindex, nofollow, noarchive` op alle routes; geen canonical of actieve structured data. 404 is een echte BKW-pagina.
- iOS-gerichte touch-WebKit375/390/430: menu past, taps openen, focuscyclus bevat alle links, Escape herstelt focus/inert; velden≥16px; zichtbare telactie. Reducedmotion schakelt transitions/animations uit. Drawer gebruikt100vh fallback, max100dvh, veilige boven/onderpadding. Geen backdrop-filter in deze site.

## Handmatige aanvullende controles

`keyboard-accessibility-tree.json` is een walkthrough met echte browser-toetsenbordevents plus Chromium's accessibility tree: zes routes, skiplink→main, zichtbare focus, H1, landmarks, genoemde links en beschreven formuliervelden/fouten. WebKit met touchconfiguratie apart opgenomen. Dit is **geen gesproken VoiceOver- of NVDA-test**; fysieke toestellen en spraakweergave zijn niet beschikbaar als bewijs.

`contrast-states.json`: primaire knoppen, tekstlinks, navigatie, footer en demoknop bij default/hover/focus. Alle gemeten normale tekststaten≥4.5:1. Licht oranje focusring op donkere ondergrond is behouden; merk-oranje wordt met donkere knoptekst gebruikt. Demo-submit is disabled in de statische HTML totdat hydration klaar is. Een menutik wordt al in de head opgevangen en na hydration verwerkt, ook als de bootstrap nog niet geladen is. De submit behoudt witte tekst op donkere achtergrond; de disabled-staat wordt ook met JavaScript uitgeschakeld getest. Invoerveldranden hebben minimaal3:1 tegen de witte invoerachtergrond. Axe controleert daarnaast alle gerenderde tekst.

## Visuele vergelijking

42before- en42after-viewports,12full-pagebeelden per versie. Hero is bewust veranderd: kortere kop, minder hoogte, volledige echte werkfoto en bijschrift buiten het beeld. Geen nieuw designstelsel. Dienstenpagina's behouden de compositie en oorspronkelijke spacing. `screenshot-comparison.json` legt pixelverschillen vast; kleine verschillen in letterrendering zijn geen pixel-identieke garantie. Alle zeven breedtes zijn afzonderlijk gecontroleerd. Contact heeft bewust beschreven foutweergave gekregen.

## Fouten gevonden en gesloten vóór publicatie

1. Vier nieuwe V3-regressies eerst RED: te hoge mobiele hero, ontbrekende beschreven formulierfouten, ontbrekende statische OG/metadata, oude 404redirect.
2. De eerste volledige run vond lokale hydrationfouten op slashloze directe dienstroutes. Vite gaf homeHTML terug; Pages gebruikt een directoryredirect. Gerichte previewmiddleware spiegelt die redirect en geeft de branded404 voor onbekende routes. De volledige suite sluit dit met0consolefouten.
3. WebKit sloeg zonder eigen volledige tabcyclus links over volgens Safari's toetsenbordvoorkeuren. Het menu begrenst nu iedere Tab/ShiftTab-stap, inclusief links. Dezelfde bestaande regressie is opnieuw PASS in beide engines.
4. Niet-home-mobile-CTAspacing was tijdens CSS-consolidatie4px verschoven; vóór de definitieve test teruggebracht naar V2. Alleen home gebruikt compactere spacing.

5. Statische demo-submit was vóór hydration native submitbaar. De knop wordt pas na hydration ingeschakeld; een extra test met JavaScript uitgeschakeld sluit ook impliciete Enter-submit uit. Dit is eerst RED en daarna GREEN getest.

6. Uitgestelde hydration maakte een zeer vroege klik/scroll kwetsbaar. De eerste menutik wordt vóór de bootstrap onthouden; pre-hydration scroll wordt na de initiële router-restoration hersteld. Een extra test blokkeert zowel bootstrap als interactieve bundle, klikt en scrolt vóór vrijgave, en controleert daarna menu, nieuwe route0 en back950.

## Performance en online sluiting

Lighthouse live/lokaal vóór en na: afzonderlijke JSONbestanden en perf-comparison.json. Gesimuleerde mobiele Slow4G/4xCPU, koud profiel, zes routes, serialisatie zonder gelijktijdige browsertests. Dit zijn labmetingen. Zie release-report.md voor definitieve resultaten en review/livebewijs.
