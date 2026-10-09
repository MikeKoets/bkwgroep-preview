# BKW Groep Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bouw en publiceer een zelfstandige, mobiele en professionele BKW Groep-redesignpreview op GitHub Pages.

**Architecture:** Een statische React/Vite-SPA gebruikt lokale getypeerde content, gedeelde presentational components en een GitHub Pages-fallback voor directe routes. Alle bedrijfsassets worden lokaal gebundeld; er is geen backend of formulierenverwerking.

**Tech Stack:** React 19, TypeScript, Vite, React Router, CSS, Vitest/Testing Library, Playwright en GitHub Actions/Pages.

**Spec:** `docs/superpowers/specs/2026-10-10-bkwgroep-preview-design.md`

## Global Constraints

- Wijzig niets aan `bkwgroep.nl`, DNS, hosting of PT3.
- Gebruik alleen verifieerbare bestaande bedrijfsinformatie en merkassets.
- Verwerk of verzend geen persoonsgegevens.
- Houd de volledige preview `noindex, nofollow`.
- Gebruik repository-base `/bkwgroep-preview/` voor build en routing.
- Voeg geen betaalde dienst, backend, analytics of secret toe.

## Review Focus

- Direct geladen subroutes moeten na GitHub Pages-fallback de juiste pagina tonen.
- Navigatie en assets moeten ook onder `/bkwgroep-preview/` werken.
- Het demoformulier mag bij submit geen netwerkverzoek doen.
- Mobiele drawer moet sluiten via link, closeknop en Escape zonder page overflow.
- Contactgegevens en sterke commerciële claims moeten exact uit de audit komen.

---

### Task 1: Scaffold, routes en previewbeveiliging

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`
- Create: `public/404.html`, `public/robots.txt`
- Create: `src/main.tsx`, `src/App.tsx`, `src/test/setup.ts`, `src/App.test.tsx`

**Interfaces:**
- Produces: zes routepaden, base-path helpers en permanente robotsmetadata.

- [ ] Schrijf falende tests voor alle routes, noindex en onbekende route.
- [ ] Draai `npm test` en bevestig de verwachte failures.
- [ ] Scaffold de minimale Vite-app en routes.
- [ ] Voeg Pages-fallback en base-pathconfiguratie toe.
- [ ] Draai tests en commit.

### Task 2: Gedeelde shell en design tokens

**Files:**
- Create: `src/components/SiteHeader.tsx`, `SiteFooter.tsx`, `Seo.tsx`, `PageHero.tsx`, `Ui.tsx`
- Create: `src/styles.css`
- Modify: `src/App.tsx`, `src/App.test.tsx`

**Interfaces:**
- Produces: `SiteHeader`, `SiteFooter`, `Seo`, `PageHero`, `ServiceCard`, `ContactCta`.

- [ ] Schrijf falende tests voor desktopnav, mobiele drawer, Escape en actieve route.
- [ ] Implementeer shell, tokens, focus, skiplink en responsive drawer.
- [ ] Controleer 320px zonder horizontale overflow in componenttest.
- [ ] Draai tests en commit.

### Task 3: Getypeerde inhoud en kernpagina's

**Files:**
- Create: `src/content/site.ts`
- Create: `src/pages/HomePage.tsx`, `MaintenancePage.tsx`, `LocksPage.tsx`, `InsulationPage.tsx`, `BusinessPage.tsx`, `ContactPage.tsx`, `NotFoundPage.tsx`
- Modify: `src/App.tsx`, `src/App.test.tsx`

**Interfaces:**
- Produces: inhoudelijke routecomponenten met gedeelde CTA- en kaartcomponenten.

- [ ] Schrijf falende tests voor H1, kerndiensten, correcte contactlinks en claimbeperkingen.
- [ ] Implementeer alle pagina's met geverifieerde Nederlandse copy.
- [ ] Voeg route-specifieke titels en descriptions toe.
- [ ] Draai tests en commit.

### Task 4: Veilig demoformulier

**Files:**
- Create: `src/components/DemoContactForm.tsx`
- Modify: `src/pages/ContactPage.tsx`, `src/App.test.tsx`

**Interfaces:**
- Produces: lokaal formulier met demo-status; geen action, fetch of opslag.

- [ ] Schrijf een falende test die submit uitvoert en bevestigt dat `fetch` niet wordt aangeroepen.
- [ ] Implementeer lokale statusmelding en reset zonder persoonsgegevens te bewaren.
- [ ] Draai tests en commit.

### Task 5: BKW-assets en beeldperformance

**Files:**
- Create: `public/assets/logo-bkw.svg`, geoptimaliseerde afbeeldingen onder `public/assets/images/`
- Modify: page- en componentbestanden met vaste beeldmaten, alt, loading en sizes.
- Create: `docs/assets-source-map.md`

**Interfaces:**
- Produces: lokale assetpaden en bronherkomst per bestand.

- [ ] Voeg assetbestaan- en alt-teksttests toe.
- [ ] Download uitsluitend in audit genoemde BKW-assets en converteer grote rasters naar WebP.
- [ ] Controleer bestandsgrootten en kapotte assetreferenties.
- [ ] Draai tests en commit.

### Task 6: Automatische kwaliteitscontrole

**Files:**
- Create: `playwright.config.ts`, `tests/site.spec.ts`, `scripts/check-links.mjs`
- Modify: `package.json`
- Create: `docs/screenshots/` via Playwright output.

**Interfaces:**
- Produces: `test:e2e`, `check:links` en screenshots op 1440px en 390px.

- [ ] Schrijf Playwrighttests voor routes, drawer, formulier en horizontale overflow.
- [ ] Test 320, 375, 390, 430, 768, 1024 en 1440px.
- [ ] Voeg axe-gebaseerde of handmatige basis-a11y assertions toe zonder fragiele pixelsnapshots.
- [ ] Genereer de vereiste screenshots en commit.

### Task 7: GitHub Pages-publicatie en livecontrole

**Files:**
- Create: `.github/workflows/deploy-pages.yml`, `README.md`
- Create: `docs/release-report.md`

**Interfaces:**
- Produces: publieke Pages-URL en reproduceerbare deployworkflow.

- [ ] Maak `MikeKoets/bkwgroep-preview` als publieke, zelfstandige repository.
- [ ] Push `main`, activeer Actions als Pages-bron en wacht op succesvolle deployment.
- [ ] Controleer preview-URL, directe routes, assets, noindex en mobiele navigatie.
- [ ] Draai volledige test, typecheck, lint, build en linkcheck opnieuw.
- [ ] Vul release-report, commit eventuele bewijsupdates en verifieer de einddeployment.
