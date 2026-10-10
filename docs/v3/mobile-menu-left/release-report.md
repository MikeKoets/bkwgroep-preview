# BKW — mobiel menu links

Basis49ea84d55227e7ce3fdae3e25a3e8d640b02f382; branch codex/bkw-v3. Op verzoek eigenaar opent het bestaande mobiele/tabletmenu links.

## Wijziging

Alleen CSS: paneel in linker gridkolom, backdrop rechts, korte180msinschuifanimatie vanaf links. Bestaande routes, inhoud, knoppen, focuscyclus, Escape, inert en body-lock hergebruikt. Reduced-motion schakelt de animatie uit. Geen runtime-dependencies of componentlogica toegevoegd.

## Verificatie

Nieuwe plaatsingsregressie RED in beide engines:320px had x38,406 in plaats van0. [RED](red-test.txt). Eerste volledige run94PASS/2FAIL door locator.click die de sticky trigger zelf inscrolde. Met klikken op de daadwerkelijke zichtbare knopcoördinaten bleef scroll500→500→500 in Chromium en WebKit; bronprobleem was de testdriver. [Eerste rapport bewaard](initial-driver-scroll-failure.json). Test gebruikt nu echte tikcoördinaten en blijft positie, breedte, overflow en sluiten toetsen op320/375/390/430/768/1024.

Volledige lokale suite96/96PASS,0unexpected/flaky/skipped. Unit37PASS, lint/typecheck/productiebuild/linkcontrole/diffPASS. Beide engines, inclusief bestaande menu-focus/Escape/inert/Axe, vertraagde eerste interactie, router/scroll, demoformulier en alle zes routes/responsive.

[Browserresultaten](local-browser-tests.json), [acht daadwerkelijke menucaptures en motioncontrole](visual-check.json), [mobiel390](chromium-390.png). Bij reduced-motion is animationName=none in beide engines. Snapshot320×568 controleert de korte schermindeling; normale menuviews390/430/768×844.

Uitsluitend bestaande GitHub Pages-preview; productie BKW/DNS/hosting en PT3 onaangeraakt. Previewrobots behouden, geen backend/formulierverzending. Geen fysieke iPhone of gesproken screenreader beschikbaar. Voor deze CSS-menupositie is geen nieuwe Lighthouse-serie gedraaid; vorig home-performancebewijs blijft historie.

Online publicatie/sluitcontrole volgt hieronder.

## Gepubliceerde kandidaat

Runtimef22fdff43dbc54e054ab213594ca21b3c5778737/tree666a3b1f7d01c32ec352ffc04afb28826733d15f. [Pages-run38014363401](https://github.com/MikeKoets/bkwgroep-preview/actions/runs/38014363401) build/deploymentPASS.

[Publicatie-integriteit](live/published-integrity.json):80/80bestanden byte-identiek aan goedgekeurde dist;8nieuwe daadwerkelijke openbare menucaptures in beide engines op320/390/430/768; zero overflow. Motion-suppressie op public host bevestigd. [Gerichte online tests](live/browser-tests.json):14/14PASS,0unexpected/flaky/skipped,links openen/backdrop sluiten,navigeren,focus/Escape/inert,late eerste tik en open-menuAxe0Serious/Critical.

[Menu mobiel live](live/chromium-390.png). Gepubliceerd en online geverifieerd: https://mikekoets.github.io/bkwgroep-preview/

## Sluiting

[Onafhankelijke openbare review](independent-review.md):**GO0Critical/0High/0Medium/0Low**. Beide engines320/390:x0,rechterbackdrop,focus/Escape/inert,scroll500→500→500,reduce-motion en navigatie bevestigd. Geen runtimewijziging na de goedgekeurde kandidaat. Afsluitend bewijscommit wijzigt alleen docs/v3/mobile-menu-left. Geen open bevindingen.
