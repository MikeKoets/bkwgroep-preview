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
