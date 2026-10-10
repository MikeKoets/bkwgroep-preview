# BKW — schermvullend donker openingsdeel

Basis292b26073359936e52ae62375f579cd82b7f378f, branch codex/bkw-v3. Eigenaar meldt een lichte balk in de eerste viewport; de bestaande vaste hero460/560px liet de volgende lichte dienstensectie al zien.

## Gerichte wijziging

Home hero en bestaande belstrook delen een donker flex-openingsdeel, minimaal de actuele schermhoogte minus de bestaande headerhoogte. De foto groeit; de belstrook blijft onderaan.100dvh volgt de mobiele browserbalk, met100vh-fallback. Bestaande minimale inhoudshoogte bewaart de CTA op korte schermen; inhoud wordt nooit verborgen om een scherm te vullen. Diensten verschijnen na scrollen. Headerhoogtes82/72 en utility33/0 zijn dezelfde waarden als vóór deze wijziging, nu gedeeld als tokens.

Responsive sizes houdt rekening met de grotere coverhoogte: verhouding1800/709≈2,54; mobiele header+belstrook≈228px en desktop/tablet≈216px. Geen andere foto, upscaling, kleuren, copy, routes, afhankelijkheden of bedrijfsclaims toegevoegd.

## Lokale verificatie

Nieuwe regressie RED in beide engines: lichte sectie begon op687px bij375×812. Na correctie GREEN voor320×568,375×812,390×844,430×932,768×1024,1024×900,1440×1000 plus mobiele hoogtewissel700→950. Contactactie blijft zichtbaar, dienstensectie onder eerste viewport, anchor correct, geen overflow. Bronselectie gecontroleerd tegen daadwerkelijke coverbreedte (max1800bron;1%tolerantie voor afgeronde variante-afmetingen).

37unitPASS; lint/typecheck/build/links/diffPASS. Volledige lokale suite94/94PASS,0unexpected/flaky/skipped, Chromium en WebKit. Zes routes op zeven breedtes, Axe/menu/scroll/formulierveiligheid. Nieuwe daadwerkelijke zeven captures op900px hoogte en desktop/mobiel-presentatiecaptures; eerdere screenshots blijven behouden. Foto-tekstcontrast35/35PASS,minimum7,64:1.

[RED](red-test.txt), [browserresultaten](local-browser-tests.json), [contrast](photo-text-contrast.json), [mobiel](home-390.png), [desktop](home-1440.png).

## Grenzen

Publicatie uitsluitend bestaande GitHub Pages-preview. BKW-productie/DNS/hosting en PT3 onaangeraakt. Noindex/nofollow/noarchive, geen canonical/actieveJSON-LD; formulier blijft demo zonder verwerking/verzending. Echt fysiek Safari-toestel en gesproken screenreader niet beschikbaar; WebKit en viewportwissel zijn automatisch getest.

Definitieve kandidaat, performance, onafhankelijke review en publicatiebewijs worden hieronder vastgelegd.

## Bevroren kandidaat

Runtimebafecef6fc421e40e94baba69896789f2473e6db; tree4a120991616239d189ba298d24620584ca378272. [Nieuwe home-performance](../perf-hero-full-opening-local.json): mobiele Lighthouse98,LCP2329ms,CLS0,TBT1ms. Buildfingerprint1f23d5a441ae759d4f7f79e7e6d36180771c3bc312e49abcbd7a68cafe787ff6. Alleen home-performance opnieuw gemeten voor deze gerichte hoogtewijziging; de ongewijzigde dienst-/contactinhoud heeft bestaand V3-performancebewijs. Navigatie/formulier/Axe/responsiveness van alle zes routes zijn wél opnieuw getest in94browsercases.

## Online bewijs

[Pages-run38013069220](https://github.com/MikeKoets/bkwgroep-preview/actions/runs/38013069220): build/deploymentPASS op exact bafecef6. [Publicatiecontrole](live/published-integrity.json):80/80dist-bestanden byte-identiek,12echte captures van alle zes routes390/1440,geen overflow,brandedHTTP404PASS. [Gerichte online V3-browsertests](live/browser-tests.json):22/22PASS,0unexpected/flaky/skipped, beide engines. Alle nieuwe hoogte-/beeldregressies, viewportwissel, anchor,metadata/preload, menu/eersteinteractie,reduce-motion en demoformulier. Volledige lokale94suite is behouden; online vervolg is bewust op de concrete gewijzigde risico's gericht.

[Mobiele live home-performance](../perf-hero-full-opening-live.json):100,LCP1652ms,CLS0,TBT6ms. Lokale home98/LCP2329/CLS0/TBT1. Beide exact dezelfde gebouwde fingerprint. Live workingTreeDirty betreft alleen rapporten/screenshots, geen runtimeverschil.

[Voor: vorige banner mobiel](../hero-team-update/live/home-390.png) → [na: schermvullend donker mobiel](live/home-390.png). [Nieuwe desktop](live/home-1440.png).

Onafhankelijke lokale review:GO0C/0H/0M/0L. [Reviewbewijs](independent-review.md).

## Definitieve sluiting

**Onafhankelijke live GO:0Critical/0High/0Medium/0Low.** In beide engines bevestigd:390×844 diensten844px/contactCTA661px;1440×1000 diensten1000px/CTA841px; resize700→950→700 volgt exact. Geen runtimewijziging na goedkeuring.

**Gepubliceerd en geverifieerd:** https://mikekoets.github.io/bkwgroep-preview/

Runtimebafecef6fc421e40e94baba69896789f2473e6db/tree4a120991616239d189ba298d24620584ca378272. Afsluitende commit voegt uitsluitend docs/v3/bewijs toe. Geen open bevindingen; fysiek iOS/gesproken screenreader blijven niet geverifieerd. BKW-productie en PT3 onaangeraakt.
