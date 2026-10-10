# Performance-methode en afwegingen

Lighthouse13.5.0 is uitsluitend een gemotiveerde devdependency voor het gevraagde bewijs; runtime-dependencies zijn ongewijzigd. Standaard mobile profile:412×823,DPR1.75, gesimuleerde Slow4G en4xCPU. Koud profiel, één browsermeting tegelijk; geen gelijktijdige Playwright-runs. Alle effectieve instellingen, benchmark-indexen, waarschuwingen en buildfingerprints staan in de JSONbestanden. Netwerkmetingen in Lighthouse zijn labmetingen, geen velddata.

Basis: eerst live zes routes en lokaal zes routes gemeten op ongewijzigde V2. De volledige lokale serie is herhaald nadat een eerdere test-run niet meer gelijktijdig draaide; beide series zijn bewaard. Definitieve baseline staat in perf-baseline.json. Alle gerichte tussenmetingen zijn bewaard; mislukte doelwaarden worden niet uit het bewijs verwijderd.

[Officiële Lighthouse-uitleg over throttling](https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md).

## Werkelijke aanpassingen

- Bestaande React-pagina's vooraf opgebouwd als publieke HTML met ReactDOMserver tijdens de build, daarna hydration. Geen server, backend, request-time data of nieuwe runtime dependency.
- CSS-consolidatie26.72→25.84kB inclusief nieuwe fout- en startupstaten. Complete stylesheet is klein (~5.8kB gzip) en wordt inline geplaatst in de statische HTML: geen render-blocking CSS-request bij koude bezoeken. Op harde navigatie wordt deze kleine hoeveelheid opnieuw als deel van HTML opgehaald; SPA-navigatie hergebruikt dezelfde styles. External CSSasset blijft in dist voor controle van de build, maar wordt niet aangevraagd door de statische pagina's.
- Responsive highpriority hero-preload direct na charset/CSS, vóór font en scripts. Geen nutteloze logo-preload. Script krijgt low-fetchpriority in het gegenereerde HTML; Vite bewaart dat attribuut zelf niet bij het bundelen.
- Extra640/720px-fotovarianten voorkomen de sprong naar800px wanneer het echte gewenste beeld kleiner is. Herexport uit de originele, geautoriseerde BKW-bronnen; ongewijzigde uitsneden, geen upscaling. WebP70hero/78overig. Kwaliteit en compositie worden visueel beoordeeld; PSNR is aanvullend bewijs en geen vervanging van kijken.
- Manrope lokaal gesubset:24,836→23,144bytes. Font-display:swap, één gedeeld variabel bestand; geen extra gewichtsbestanden of fontrequests.
- Een kleine bootstrap laat de vooraf opgebouwde pagina eerst schilderen (twee animationframes), daarna wordt de interactieve React-bundle opgehaald. Gewone links/telefoonacties werken al via HTML. Demo-submit blijft disabled totdat hydration klaar is; de eerste menutik wordt vroeg onthouden en via hetzelfde React-eventpad geopend; dit voorkomt verloren kliks en native formulierverzending. Dit is bovendien getest met JavaScript volledig uitgeschakeld.
- Clientbundle~362.37kB/~113.58kB gzip plus bootstrap~2.23kB/~1.11kB gzip; V2~359.79kB/~112.95kB. Kleine toename komt door beschreven veldfouten/hydration. TBT wordt gemeten. Routesplitsing zou hier vooral de gezamenlijke React/router-runtime behouden en extra verzoeken introduceren; niet toegevoegd zonder bewezen voordeel.

## Reproductie

`npm ci && npm run build`, start Vite-preview op4175. `node scripts/performance.mjs baseline both` of `node scripts/performance.mjs after both`. Metingen overschrijven een bestand met dezelfde phase; gebruik een unieke phase voor diagnostiek. Vierde argument begrenst een gerichte risicohermeting, bijvoorbeeld `home,isolatie,zakelijk`; definitief bewijs gebruikt alle zes routes.

De lokale buildhash bevat alle dist-bestanden met paden en bytes. `source` is de HEAD tijdens de meting; `workingTreeDirty=true` betekent dat V3 nog niet gecommit was. Voor review wordt de definitieve bron bevroren; online assetchecks koppelen de publicatie aan de exacte build. Een documentatie-only commit kan dezelfde websitebuild opleveren; die wordt afzonderlijk benoemd.
