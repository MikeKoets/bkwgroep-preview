# BKW Groep redesign-preview — releaserapport

**Datum:** 10 oktober 2026  
**Status:** online preview gepubliceerd en live geverifieerd.

- Repository: `https://github.com/MikeKoets/bkwgroep-preview`
- Publieke preview: `https://mikekoets.github.io/bkwgroep-preview/`
- Eerste geverifieerde deployment: GitHub Actions-run `38004155623`

## Resultaat

De preview bevat een opnieuw ontworpen, mobile-first website met Home, Onderhoud, Slotenservice, Isolatie, Zakelijk, Contact en een eigen 404-pagina. De huisstijl gebruikt het bestaande BKW-oranje, officiële logo en oorspronkelijke bedrijfsfotografie in een rustiger, zakelijk systeem.

## Techniek

- React 19, TypeScript en Vite.
- React Router met GitHub Pages-fallback voor directe route-URL's.
- Lokale WebP-assets; geen runtime API's of externe formulieren.
- Permanente `noindex, nofollow, noarchive` en `robots.txt`-blokkade.
- Organization structured data met alleen bevestigd adres, telefoonnummer en e-mailadres.

## Inhoudelijke veiligheid

- Contactgegevens zijn gecontroleerd tegen de bestaande website.
- Geen nieuwe reviews, partners, tarieven, ervaring, garantie of certificering geclaimd.
- Het contactformulier verstuurt of bewaart niets en benoemt dat zichtbaar.
- Claims die BKW vóór productie moet herbevestigen staan in `docs/original-site-audit.md`.

## Verificatie

| Controle | Resultaat |
| --- | --- |
| Unit/componenttests | 28 tests geslaagd |
| Playwright | 19 tests geslaagd |
| Viewports | 320, 375, 390, 430, 768, 1024 en 1440 px |
| Horizontale pagina-overflow | Geen gevonden |
| Axe serious/critical | 0 op Home, Onderhoud en Contact |
| Link-/assetcontrole | 6 routes en build-assets bereikbaar |
| TypeScript | Geslaagd |
| ESLint | Geslaagd |
| Productiebuild | Geslaagd |
| GitHub Pages-workflow | Geslaagd |
| Publieke root en assets | HTTP 200 |
| Directe subroutes | Browserfallback getest; correcte URL, H1 en inhoud geladen |
| Mobiele live navigatie | Geslaagd op 390 px |
| Live mobiele overflow | 390 px viewport / 390 px documentbreedte |

## Screenshots

- `docs/screenshots/home-desktop.png`
- `docs/screenshots/home-mobile.png`
- `docs/screenshots/onderhoud-desktop.png`
- `docs/screenshots/onderhoud-mobile.png`
- `docs/screenshots/contact-desktop.png`

## Voor productie nog bevestigen

- Actuele commerciële beloften zoals responstijden, garantie en bereikbaarheid.
- Certificeringen en partnerrelaties.
- Definitieve formulierverwerking en privacygrondslag.
- Eventuele aanvullende pagina's, cases en actuele openingstijden.

## Productieovername

Gebruik na inhoudelijke goedkeuring een apart productieproject met het officiële domein, een geaccordeerde formulierverwerker en opnieuw bevestigde bedrijfsclaims. Verwijder `noindex` alleen bij die gecontroleerde productieovername. De bestaande website is tijdens deze preview niet gewijzigd.
