// Definities op basis van NLA/UBES; situaties zijn didactische voorbeelden.
export const MODEL_CONCEPTS = {
 eisen: {
  title:'Taakeisen', definition:'Wat het werk van je vraagt en inspanning kost.',
  examples:[
   ['Hoeveelheid & tempo','Werk voor twee mensen moeten doen in één dienst.'],
   ['Emotionele belasting','Omgaan met agressieve klanten of een ingrijpend incident.'],
   ['Concentratie & verstoringen','Nauwkeurig controleren terwijl de telefoon steeds gaat.'],
   ['Tegenstrijdige verwachtingen','Twee leidinggevenden geven verschillende prioriteiten.']
  ], note:'Een taakeis is niet vanzelf schadelijk. Kijk naar intensiteit, duur, hulpbronnen en herstel.',page:13,source:'NLA · werkdrukbronnen, p. 13'
 },
 bronnen: {
  title:'Hulpbronnen', definition:'Wat helpt om het werk goed te doen en met de eisen om te gaan.',
  examples:[
   ['Autonomie','Zelf de volgorde van taken kunnen aanpassen bij een piek.'],
   ['Sociale steun','Een collega springt bij; je leidinggevende helpt prioriteren.'],
   ['Competentie & middelen','Je bent ingewerkt en de benodigde apparatuur werkt.'],
   ['Duidelijkheid & feedback','Je weet wat wordt verwacht en hoort wat goed gaat.']
  ],note:'Hulpbronnen kunnen belasting dempen én motivatie en bevlogenheid ondersteunen.',page:13,source:'NLA · energiebronnen, p. 13'
 },
 klachten: {
  title:'Klachten & stresssignalen',definition:'Mogelijke reacties op aanhoudende belasting.',
  examples:[
   ['Uitputting','Na een dienst leeg zijn en nauwelijks energie overhebben.'],
   ['Concentratieproblemen','Instructies opnieuw moeten lezen of het overzicht verliezen.'],
   ['Emotionele spanning','Sneller geprikkeld reageren op gewone vragen.'],
   ['Sociaal functioneren','Contact vermijden of minder goed samenwerken.']
  ],note:'Een signaal bewijst geen diagnose of werkgerelateerde oorzaak. Onderzoek de samenhang met het werk.',page:4,source:'NLA · gevolgen van werkstress, p. 4 en 13'
 },
 bevlogenheid: {
  title:'Bevlogenheid',definition:'Je energiek en betrokken voelen, en met plezier opgaan in je werk.',
  examples:[
   ['Vitaliteit · energie','Een lastige klus energiek oppakken en na tegenslag weer verder kunnen.'],
   ['Toewijding · betekenis','Trots zijn op je bijdrage en enthousiast zijn over wat je doet.'],
   ['Absorptie · opgaan in het werk','Met zoveel plezier en aandacht werken dat de tijd ongemerkt voorbijgaat.']
  ],note:'Geen klachten hebben is niet hetzelfde als bevlogen zijn. De UBES-9 meet bevlogenheid.',url:'https://www.wilmarschaufeli.nl/publications/Schaufeli/Test%20Manuals/Handleiding_UBES.pdf#page=5',source:'Schaufeli & Bakker · UBES-handleiding, p. 4–6'
 },
 herstel: {
  title:'Rust & herstel',definition:'Ruimte om na inspanning te herstellen en mentaal los te komen van het werk.',
  examples:[
   ['Tijdens het werk','Een echte pauze kunnen nemen doordat iemand het werk overneemt.'],
   ['Na een zware taak','Na een emotioneel gesprek even herstellen voordat het volgende begint.'],
   ['Na werktijd','De werktelefoon wegleggen zonder dat een reactie wordt verwacht.'],
   ['Tussen diensten','Een rooster dat ruimte laat voor slaap, ontspanning en privéleven.']
  ],note:'Een pauzeafspraak op papier is pas bruikbaar als het werk het nemen van pauze mogelijk maakt.',page:15,source:'NLA · rust en herstel, bijlage 2, p. 15'
 }
};
