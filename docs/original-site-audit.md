# BKW Groep — audit bestaande website

**Uitgevoerd:** 10 oktober 2026  
**Bron:** uitsluitend publiek toegankelijke pagina's en assets op `https://bkwgroep.nl`  
**Doel:** feitelijke basis voor een zelfstandige GitHub Pages-preview. De productieomgeving is niet gewijzigd.

## Bevestigde identiteit en contactgegevens

- Handelsnaam op de website: **BKW Groep**.
- Adres: **Noordeindseweg 256A, 2651 LL Berkel en Rodenrijs**.
- Telefoon: **085 060 66 63** (`tel:+31850606663`).
- Algemeen e-mailadres: **info@bkwgroup.nl**.
- Zakelijke contactpersoon op de huidige zakelijke pagina: **Yoeri de Jong, Manager**, `yoeri@bkwgroep.nl`.
- Sociale kanalen: Facebook `bkwgroep`, LinkedIn `bkw-group`, Instagram `bkwgroup` en YouTube `@bkwgroup8106`.

## Actuele navigatie en route-inventaris

De primaire navigatie bevat:

| Route | Functie | Huidige titel |
| --- | --- | --- |
| `/` | Homepage | BKW Groep \| Voor isolatie, onderhoud, slotendiensten en meer! |
| `/onderhoud/` | Woning- en vastgoedonderhoud | Professioneel woningonderhoud \| BKW Onderhoud |
| `/slotenservice/` | Slotenservice en inbraakpreventie | Slotenservice in Berkel en Rodenrijs \| BKW Sloten |
| `/zakelijk/` | Zakelijke dienstverlening | BKW Zakelijk \| Onderhoud en isolatie voor grote panden |
| `/contact/` | Contact | Contact opnemen met BKW Groep in Berkel en Rodenrijs |

Aanvullend in sitemap/footer:

- `/zakelijk/spouwmuurisolatie-voor-vves/`
- contact- en bedanktpagina's
- `/blogs/`
- `/vacatures/`
- `/algemene-voorwaarden/`
- `/privacyverklaring/`
- campagnepagina's voor Hornbach en Pijnacker-Nootdorp

De redesign-preview concentreert zich op Home, Onderhoud, Slotenservice, Isolatie, Zakelijk en Contact. Juridische links blijven naar de geldende productiepagina's verwijzen; campagnes, blogs en bedanktpagina's zijn geen onderdeel van de preview.

## Bevestigde diensten en inhoud

### Onderhoud

- Bouwkundige calamiteiten, water- en elektrastoringen.
- Mutatieonderhoud.
- Woningverbetering.
- Verbouwing en renovatie.
- De huidige pagina noemt bereikbaarheid buiten kantoortijden, spoedgevallen, vaste prijs vooraf, geen voorrijkosten en duurzame materialen.

### Slotenservice

- Deuren en sloten openen.
- Noodafsluiting en herstel van inbraakschade.
- Sloten vervangen.
- Advies over inbraakpreventie.
- Inspecties volgens richtlijnen van Politiekeurmerk Veilig Wonen en toepassing van SKG-materiaal worden op de huidige pagina genoemd.
- De huidige pagina noemt 20–30 minuten aanrijdtijd, vaste prijs en twee jaar garantie. Deze commerciële claims moeten vóór productie opnieuw door BKW worden bevestigd.

### Isolatie en verduurzaming

- De homepage en zakelijke pagina positioneren BKW als partner voor woningisolatie.
- De huidige site bevat uitgebreide inhoud over spouwmuur-, dak-, vloer- en bodemisolatie en subsidiemogelijkheden.
- De huidige site noemt Insula-goedgekeurde materialen en een Insula-certificering op specifieke isolatiepagina's. Certificeringsstatus moet vóór productie actueel worden bevestigd.

### Zakelijk

- Doelgroepen: VvE's, woningcorporaties, gemeentes, aannemers en installatiebedrijven.
- Diensten: grootschalig onderhoud, mutatieonderhoud, storingsdienst, renovatie en isolatie.
- De huidige pagina noemt 24-uurs bereikbaarheid, korte doorlooptijden en ondersteuning bij subsidiemogelijkheden.

## Merk en visuele middelen

- Herkenbare combinatie van **BKW-oranje**, wit en donker antraciet.
- Huidige primaire kleuren uit de CSS: `#f26b32`/`#fd6b2c`, `#373737` en `#eef3f1`.
- Het bestaande witte/oranje BKW-logo is als SVG in de publieke stylesheet aanwezig en mag volgens de opdracht worden hergebruikt.
- Beschikbare eigen fotografie toont BKW-medewerkers, voertuigen, onderhoud, slotenwerk, isolatiewerk en zakelijke gebouwen.
- De foto's bevatten soms al een donkere diagonale vorm. De preview verwerkt die bewust in de compositie en presenteert ze niet als los projectbewijs.

## Bestaande conversiepunten

- Klikbaar telefoonnummer in header en spoedsecties.
- Knoppen voor adviesgesprek en contact.
- Contactformulier.
- Zakelijke kennismakingsaanvraag.
- Sterke noodhulp-CTA op onderhoud en slotenservice.

De preview houdt bellen en e-mailen actief. Het formulier is uitsluitend een lokale visuele demo en verstuurt of bewaart geen gegevens.

## SEO-observaties

- De kernpagina's hebben bruikbare titels, omschrijvingen en een overwegend logische H1/H2-structuur.
- Veel afbeeldingen missen beschrijvende alt-teksten.
- De inhoud bevat herhaling en zeer brede claims.
- De preview krijgt unieke route-metadata, semantische HTML, beschrijvende alt-teksten en Organization/LocalBusiness-structured data met alleen bevestigde contactgegevens.
- De volledige preview krijgt `noindex, nofollow` en geen productiecanonical.

## UX- en technische bevindingen

### Sterk

- Eigen, herkenbare bedrijfsfotografie.
- Direct zichtbare telefoon- en advies-CTA.
- Duidelijke dienstenscheiding.
- Consistente merkaccenten.

### Te verbeteren

- De grote cookiedialoog bedekt op desktop en mobiel vrijwel de volledige eerste indruk.
- De header is op kleinere schermen zwaar en de navigatie mist visuele rust.
- Typografie, regelbreedte en sectiehiërarchie ogen gedateerd.
- Meerdere secties en CTA's herhalen dezelfde boodschap zonder duidelijk prioriteitsverschil.
- Partnercarrousels en decoratieve diagonalen zorgen op sommige pagina's voor extra visuele drukte.
- Formulieren zijn lang en niet passend voor een veilige demo.
- Afbeeldingen worden regelmatig zonder functionele alt-tekst aangeboden.
- De bestaande sitemap bevat campagne- en bedanktroutes die geen plaats in de primaire informatiearchitectuur nodig hebben.

## Niet zelfstandig als actueel feit overnemen

De onderstaande zaken staan op de huidige website, maar worden in de preview terughoudend gebruikt en moeten vóór productie door BKW worden bevestigd:

- actuele partnerschappen en gebruik van partnerlogo's;
- 20–30 minuten aanrijdtijd;
- twee jaar garantie;
- huidige certificeringen;
- 'snelste service van Nederland';
- magazijnen in vier steden;
- exacte 24/7- en feestdagenbeschikbaarheid per dienst;
- klantreacties en referenties.

Er worden geen beoordelingen, tarieven, ervaringsjaren of projectresultaten toegevoegd die niet op de bestaande website verifieerbaar zijn.
