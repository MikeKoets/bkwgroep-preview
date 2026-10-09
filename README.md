# BKW Groep websitepreview

Zelfstandige redesign-preview voor [BKW Groep](https://bkwgroep.nl/). Deze repository staat volledig los van de huidige productieomgeving en van PT3.

## Pagina's

- Home
- Onderhoud
- Slotenservice
- Isolatie
- Zakelijk
- Contact

## Ontwikkeling

```bash
npm ci
npm run dev
```

## Controle

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run check:links
npm run test:e2e
```

De preview heeft permanent `noindex, nofollow`. Het contactformulier is een visuele demo: er worden geen gegevens verstuurd of opgeslagen.

## Publicatie

Een push naar `main` bouwt en publiceert uitsluitend de statische `dist`-map via GitHub Pages. Er zijn geen secrets, backend of externe formulierdiensten nodig.

## Premium V2

Het V2-bewijs staat in [docs/v2](docs/v2): gap-analyse, oorspronkelijke en verbeterde browserbeelden, beeldherkomst, regressietests en onafhankelijke review.

De preview heeft een eigen onderhoudsbedrijf-identiteit met echte BKW-fotografie, duidelijke dienstenroutes en direct mobiel bellen. Nieuwe pagina's beginnen bovenaan; historie, verversen en sectielinks zijn getest. Interne Pages-routes hebben echte statische directories.

Voor productieovername: laat BKW de actuele contactgegevens, bedrijfsclaims, foto's en juridische teksten bevestigen; kies een echte formulierverwerking met toestemming; voer een Safari/fysieke-telefooncontrole uit; stel daarna hosting, domein en indexering bewust in. Deze repository wijzigt geen productieomgeving of DNS.

Definitieve V2-oplevering en online bewijs: [release-report](docs/v2/release-report.md).
