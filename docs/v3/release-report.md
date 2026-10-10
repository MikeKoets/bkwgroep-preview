# BKW Groep V3 — releasebewijs

## Identiteit

Basis: `e7b2fbb93f4621d282eaf68d45afcd02ddd8dde0`. Werkbranch: `codex/bkw-v3` in de zelfstandige BKW-previewrepository.
Publicatiedoel: https://mikekoets.github.io/bkwgroep-preview/ uitsluitend via main. BKW-productie, DNS, hosting en PT3 zijn niet gewijzigd.

Definitieve kandidaat, actuele Lighthouse-serie, review en publicatie-identiteit worden na de sluitcontrole hieronder vastgelegd. Dit document is vóór de onafhankelijke review nog geen release-GO.

## Verbeteringen

- Homehero compacter: kortere kop/intro, natuurlijke regels, beter passende echte werkfoto met minder onnodige grond onderaan. CTA en beeld passen samen op mobiel; originele fotografie zonder stock/generatie/upscaling.
- Build-time prerender van zes bestaande React-pagina's plus branded404. Responsive hero-highpriority-preload, kleine CSS inline en vroege eerste beeldweergave; interactieve enhancement wordt daarna geladen.
- Eerste menutik blijft behouden vóór bootstrap/hydration. Capture vlak vóór initiële router-restoration beschermt een vroege bezoekersscroll. Latere routewissels, geschiedenis, anchors en refresh blijven router-owned.
- Demo-submit is vóór hydration en zonder JavaScript disabled. Beschreven veldfouten, focus op eerste ongeldige veld, autocomplete/inputmode en duidelijkere invoerranden. Geen gegevens verzonden/opgeslagen.
- WebKitmenu heeft volledige tabcyclus, inert/focus/Escape; touch375/390/430 en zeven echte viewportbreedtes gecontroleerd.
- Kleinere echte WebP's, extra640/720varianten, gesubset lokaal Manrope. Geen nieuwe runtime dependency. Lighthouse is gemotiveerde dev-only meettooling.
- Unieke statische/SPA-metadata, eigen OGfoto, geen actieve LocalBusiness-placeholder/canonical; noindex,nofollow,noarchive behouden. Checklist voor toekomstige productie-overname zonder activering.

## Lokale gates

Unit36/36 PASS. Browser90/90 PASS in Chromium en WebKit,0retries/0flaky. Typecheck/lint/build/linkcontrole/diff PASS. Alle zes routes op320/375/390/430/768/1024/1440: geen overflow, afgekapte inhoud, ontbrekende beelden of consolefouten. Axe0Serious/Critical inclusief geopend menu. Nieuwe controlled-delay test blokkeert beide JavaScriptbundles en sluit de eerste klik/scrollrace; JavaScript-uit test sluit native demo-submit uit.

## Bewijs

- [Hero voor/na desktop](hero-before-after-1440.png) / [mobiel](hero-before-after-390.png).
- [Desktopna](after/home-1440.png) / [mobielna](after/home-390.png).
- [Lokale browserresultaten](local-browser-tests.json), [QA](qa.md), [toetsenbord en accessibility-tree](keyboard-accessibility-tree.json), [contrast](contrast-states.json).
- [Baseline Lighthouse](perf-baseline.json), [methodiek/tussenmetingen](performance-method.md).
- [Beeldprovenance](image-provenance.json), [fotocompressie](image-optimization.json), [fontsubset](font-subset.md), [productie-overname](productie-overname.md).

## Grenzen / nog fysiek bevestigen

Lighthouse is labbewijs, geen veldpercentiel. Accessibility-tree/keyboard en Playwright-WebKit zijn geen gesproken VoiceOver/NVDA of fysiek iOS-testbewijs. Safe-area/browserbalken, daadwerkelijke bel-app-overdracht en autofill blijven fysiek te bevestigen. Hero is beperkt tot de echte bronresolutie; hogere retina-desktopkwaliteit vraagt een grotere originele foto. Het formulier blijft nadrukkelijk demo.
