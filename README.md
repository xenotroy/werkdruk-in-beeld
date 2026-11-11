# Werkdruk in beeld

Interactieve lesapp voor HVK/MVK: de aanpak van werkdruk, een JD-R-weegschaal en de invulbare UBES-9.

[Open de huidige private lesapp](https://werkdruk-in-beeld-hvk-mvk.apply-8968.chatgpt.site/) · [UBES-9](https://werkdruk-in-beeld-hvk-mvk.apply-8968.chatgpt.site/#ubes)

## Lokaal openen

De gebouwde app staat in `dist/`. Open `dist/index.html`, of start vanuit deze map:

```sh
python3 -m http.server 8768 --directory dist
```

Open daarna http://localhost:8768/.

## Ontwikkelen

```sh
npm ci
node --test tests/ubes-scoring.test.js
npm run build
```

React en Tailwind worden lokaal gebundeld. `src/` bevat de interface en inhoud. `dist/naslag.html` bevat de uitgebreide naslag; `dist/assets/werkinstructie-werkdruk.pdf` is de openbare NLA-bron.

## Onderbouwing

- [NLA-werkinstructie werkdruk, 19 december 2024](https://www.nlarbeidsinspectie.nl/documenten/2024/12/19/werkinstructie-werkstress-door-werkdruk-voorkomen-en-beperken).
- [Officiële Nederlandstalige UBES-9](https://www.wilmarschaufeli.nl/publications/Schaufeli/Tests/UWES_NL_9.pdf).
- [UWES Manual 2004, tabel 31](https://www.wilmarschaufeli.nl/publications/Schaufeli/Test%20Manuals/Test_manual_UWES_English.pdf#page=36): historische Nederlandstalige referentiegroep, geen actuele populatienorm of klinische afkapwaarde.

De JD-R-weegschaal is een onderwijsmetafoor. De UBES-9 gebruikt de oorspronkelijke items en gemiddelde scores; de praktische reflectieadviezen zijn aanvullende didactische inhoud. Antwoorden en werkafspraak blijven in het geheugen van de browsertab; de app verstuurt ze niet. Een tekstbestand wordt alleen op verzoek gedownload.

## Rechten

De UBES-vragen zijn van Schaufeli & Bakker. Gebruik is onderworpen aan de [voorwaarden van de makers](https://www.wilmarschaufeli.nl/downloads/); dit project verleent derden geen gebruikslicentie op die vragen of op andere bronmaterialen.

## GitHub Pages

De workflow `GitHub Pages` bouwt en controleert de app en publiceert alleen `dist/`. Publicatie moet eerst worden ingesteld in de repository. De huidige repository is privé; Pages is nog niet ingeschakeld.
