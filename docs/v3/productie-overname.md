# Productie-overname — voorbereiden, niet geactiveerd

Publicatiedoel van V3 is uitsluitend de bestaande GitHub Pages-preview. BKW-productie, hosting, DNS en PT3 zijn niet aangepast.

## Voor een eventuele latere overname

- [ ] Eigenaar beoordeelt zes pagina's, fotografie, teksten en contactroutes.
- [ ] Bevestig telefoon `085 060 66 63`, algemeen e-mail `info@bkwgroup.nl`, zakelijk contact Yoeri de Jong / `yoeri@bkwgroep.nl`, adres Noordeindseweg256A,2651LL Berkel en Rodenrijs. Beide e-maildomeinen zijn bewust behouden uit het oorspronkelijke bewijs.
- [ ] Bevestig eventuele openingstijden, servicegebied, spoedbeschikbaarheid, garanties en certificaten. Deze worden nu niet ingevuld of beloofd. TODO's blijven in documentatie, niet in de website.
- [ ] Vraag hoger resolutie van dezelfde echte hero-foto wanneer scherpte op retina-desktop belangrijk is: huidige bron1090×633, bruikbare uitsnede790×530; nooit opgeschaald.
- [ ] Regel expliciete goedkeuring voor productiehosting/DNS/domeinwijzigingen en leg herstelplan vast.
- [ ] Pas Vite-base en interne assetpaden aan aan het daadwerkelijke productiepad; test alle directe directory-URL's, slashredirects, onbekende URL's en refresh/back/forward opnieuw.
- [ ] Pas absolute OpenGraph-image-URL aan aan de productiehost. Controleer bereikbaarheid, MIME en share-preview.
- [ ] Verwijder `noindex, nofollow, noarchive` pas wanneer productieovername is goedgekeurd. Voeg dan passende productiecanonicals/sitemap toe.
- [ ] Activeer LocalBusiness pas na controle van de onderstaande template. Geen schema-placeholders in de UI of liveHTML.
- [ ] Contactformulier blijft demo. Voor een echte verzending zijn afzonderlijke afspraken over backend, beveiliging, bewaartermijnen en privacy nodig. Geen verwerking is nu aangesloten.
- [ ] Controleer op fysieke iPhone/iPad/Safari: browserbalken, notch/safe-area, schermrotatie, VoiceOver-uitspraken, daadwerkelijke telefoon-app-overdracht en autofill. WebKit-automatisering is daarvoor geen volledige vervanging.
- [ ] Meet na overname veldprestaties. Lighthouse hieronder is een labmeting, geen echtegebruikerspercentiel.

## Uitgeschakelde LocalBusiness-template

Alleen documentatie. Deze code wordt niet geïmporteerd, gebouwd of uitgevoerd. Verplichte placeholders eerst bevestigen; optionele gegevens uitsluitend toevoegen wanneer bewezen.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BKW Groep",
  "url": "TODO_VERIFIED_PRODUCTION_URL",
  "image": "TODO_VERIFIED_PRODUCTION_IMAGE_URL",
  "telephone": "+31850606663",
  "email": "info@bkwgroup.nl",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Noordeindseweg 256A",
    "postalCode": "2651 LL",
    "addressLocality": "Berkel en Rodenrijs",
    "addressCountry": "NL"
  }
}
```

Geen ratings, openingstijden, werkgebied of prijzen zonder bevestiging. De preview bevat geen actieve JSON-LD en geen canonical naar productie.
