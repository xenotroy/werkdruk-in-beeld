# Werkdruk in beeld

Interactieve lesapp voor HVK/MVK: de aanpak van werkdruk, een JD-R-weegschaal en de invulbare UBES-9.

[Open de lesapp](https://xenotroy.github.io/werkdruk-in-beeld/) · [JD-R-model](https://xenotroy.github.io/werkdruk-in-beeld/#model) · [UBES-9](https://xenotroy.github.io/werkdruk-in-beeld/#ubes)

## Lokaal openen

De gebouwde app staat in `dist/`. Open `dist/index.html`, of start vanuit deze map:

```sh
python3 -m http.server 8768 --directory dist
```

Open daarna http://localhost:8768/.

## Ontwikkelen

```sh
npm ci
node --test tests/*.test.js
npm run build
```

React en Tailwind worden lokaal gebundeld. `src/` bevat de interface en inhoud. `dist/naslag.html` bevat de uitgebreide naslag; `dist/assets/werkinstructie-werkdruk.pdf` is de openbare NLA-bron.

## Interactieve grafiek

Naast de JD-R-weegschaal staat een versleepbaar punt met projectielijnen: y = belasting (taakeisen), x = belastbaarheid (hulpbronnen in deze lesmetafoor). Een ring toont de afzonderlijk instelbare herstelruimte. Slepen, klikken en pijltjestoetsen werken samen met de schuifregelaars. Het modelbeeld bevat alleen figuren en directe bediening; de procesroute klapt in via Menu en staat bij JD-R/UBES standaard dicht. Langere modeltoelichting staat bij Bronnen. Belastbaarheid is hier geen meting van individuele draagkracht; het model berekent geen risicoscore.

## Persoonlijke weging

Onder het model kun je vier taakeisen en vier hulpbronnen wegen. Per factor: hoeveelheid/beschikbaarheid 0–10 en relatief persoonlijk gewicht 1×, 2× of 3×. De gewogen gemiddelden sturen grafiek en weegschaal; dit is een onderwijsrekenregel, geen gevalideerde JD-R-score. Verplaatsen van het punt verschuift de hoeveelheden met behoud van de gewichten. Een scenario zet de gewichten terug op 1×. Herstel staat apart.

Bevlogenheid en de UBES-uitkomst bieden uitklapbare begripsuitleg: vitaliteit, toewijding en absorptie, met betekenis voor individu en organisatie. De officiële vragen, scoring en normering zijn ongewijzigd.

## Onderbouwing

- [NLA-werkinstructie werkdruk, 19 december 2024](https://www.nlarbeidsinspectie.nl/documenten/2024/12/19/werkinstructie-werkstress-door-werkdruk-voorkomen-en-beperken).
- [Officiële Nederlandstalige UBES-9](https://www.wilmarschaufeli.nl/publications/Schaufeli/Tests/UWES_NL_9.pdf).
- [UWES Manual 2004, tabel 31](https://www.wilmarschaufeli.nl/publications/Schaufeli/Test%20Manuals/Test_manual_UWES_English.pdf#page=36): historische Nederlandstalige referentiegroep, geen actuele populatienorm of klinische afkapwaarde.

De JD-R-weegschaal is een onderwijsmetafoor. De UBES-9 gebruikt de oorspronkelijke items en gemiddelde scores; de praktische reflectieadviezen zijn aanvullende didactische inhoud. Antwoorden en werkafspraak blijven in het geheugen van de browsertab; de app verstuurt ze niet. Een tekstbestand wordt alleen op verzoek gedownload.

## Rechten

De UBES-vragen zijn van Schaufeli & Bakker. Gebruik is onderworpen aan de [voorwaarden van de makers](https://www.wilmarschaufeli.nl/downloads/); dit project verleent derden geen gebruikslicentie op die vragen of op andere bronmaterialen.

## GitHub Pages

De workflow `GitHub Pages` bouwt en controleert de app bij wijzigingen op `main` en publiceert alleen `dist/`. De website en repository zijn openbaar op verzoek van de eigenaar. De volledige scriptie, ontwikkelnotities en ingevulde antwoorden staan niet in de repository.

De bestaande [private Sites-versie](https://werkdruk-in-beeld-hvk-mvk.apply-8968.chatgpt.site/) is een afzonderlijke publicatie.
