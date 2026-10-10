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
