# BKW Groep Preview — ontwerp

## Doel

Een publieke, noindex GitHub Pages-preview bouwen die de bestaande BKW Groep-site overtuigend moderniseert zonder productie, DNS, formulieren of PT3 aan te raken. De eigenaar moet de preview rechtstreeks op telefoon en desktop kunnen beoordelen.

## Informatiearchitectuur

- **Home:** propositie, primaire diensten, bewezen werkwijze, zakelijke sectie en contact-CTA.
- **Onderhoud:** storingsdienst, mutatieonderhoud, woningverbetering en renovatie.
- **Slotenservice:** noodsituaties, openen, noodafsluiting, vervanging en preventie.
- **Isolatie:** woningisolatie, typen werkzaamheden, advies en zakelijke koppeling.
- **Zakelijk:** doelgroepen, onderhoud, storingen, renovatie en isolatie.
- **Contact:** klikbare telefoon/e-mail/adres en een duidelijk gemarkeerd niet-verzendend demoformulier.
- Juridische links verwijzen naar de bestaande productiepagina's; campagnes en blogs blijven buiten scope.

## Ontwerprichting

De site behoudt het BKW-oranje en witte logo, gecombineerd met donker grafiet, warm gebroken wit en koele neutrale grijstinten. De vormtaal is recht en technisch: beperkte radius, stevige typografie, dunne lijnen, subtiele schaduwen en een enkele diagonale beeldvorm die aansluit op de bestaande assets. Oranje markeert acties en status; het is geen decoratieve achtergrondkleur voor hele secties.

Op desktop staat een compacte utilitybalk boven een sticky navigatie. Op mobiel opent één knop een volledig toegankelijke zijdrawer. Hero's gebruiken echte BKW-fotografie met een rustige donkere laag en korte, inhoudelijke copy. Secties hebben duidelijke verticale ritmes; kaarten blijven plat en vermijden geneste panelen.

## Architectuur

- React 19, TypeScript en Vite.
- `react-router-dom` met basename uit Vite's base-path.
- GitHub Pages-fallback via `404.html`, zodat directe routes terugkeren naar de SPA en hun leesbare pad behouden.
- Inhoud in een getypeerd lokaal contentbestand; geen CMS, backend of API.
- Routecomponenten zetten titel en meta description in de browser.
- Eén global stylesheet met semantische tokens en consistente responsive breakpoints.
- Eigen, lokaal opgeslagen BKW-assets; geen runtime-afhankelijkheid van `bkwgroep.nl`.

## Componenten

- `SiteHeader`: utilitybalk, primaire navigatie, mobiel drawer en actieve route.
- `SiteFooter`: contactgegevens, navigatie, sociale links en geldende juridische links.
- `Seo`: titel, description en routecontext; index bevat permanente noindex-robotsmetadata.
- `PageHero`: herbruikbare routehero met echte afbeelding en CTA's.
- `ServiceCard`, `FeatureList`, `ProcessSteps`, `ContactCta`: gedeelde contentpatronen.
- `DemoContactForm`: lokale interactie, geen netwerkverzoek en geen opslag.

## Inhoud en claims

Tekst wordt herschreven voor helder Nederlands, maar blijft inhoudelijk binnen de huidige publieke informatie. Claims met tijd, garantie, certificering of partnerschap worden alleen letterlijk en terughoudend gebruikt wanneer nodig; de audit markeert wat vóór productie moet worden herbevestigd. Geen klantreviews, cijfers of fictieve projecten.

## Toegankelijkheid

- Skiplink, landmarks en logische headingvolgorde.
- Zichtbare `:focus-visible`-stijlen.
- Mobiele drawer met `aria-expanded`, Escape-sluiting en scroll-lock.
- Bedienbare knoppen van minimaal 44px hoog.
- Alt-teksten beschrijven wat de BKW-foto laat zien.
- Animaties respecteren `prefers-reduced-motion`.

## Performance

- Bestaande foto's worden naar WebP geconverteerd en passend geschaald.
- Hero-assets worden eager geladen; beelden onder de vouw lazy.
- Eén iconbibliotheek, geen carrousel- of animatieframework.
- Responsive `sizes`, vaste dimensies en `object-fit` beperken layoutverschuiving.

## Previewveiligheid

- `robots: noindex, nofollow, noarchive` en een `robots.txt` die crawlers blokkeert.
- Geen canonical naar bkwgroep.nl.
- Formulier heeft `onSubmit` zonder `fetch`, `action` of externe integratie.
- Geen analytics, cookies, klantdata of secrets.

## Acceptatie

- Alle zes routes renderen en navigeren vanaf de repository-base.
- Direct openen/verversen van routes werkt via de Pages-fallback.
- Geen horizontale overflow op 320, 375, 390, 430, 768, 1024 en 1440px.
- Telefoon, e-mail en adres zijn gelijk aan de huidige website.
- Test, typecheck, lint, build, linkcheck en Playwright-smoketests slagen.
- Desktop- en mobiele screenshots worden opgeslagen onder `docs/screenshots/`.
- De publieke GitHub Pages-URL retourneert de preview en assets daadwerkelijk.
