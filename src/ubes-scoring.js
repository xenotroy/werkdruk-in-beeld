// UBES-9: mean scoring and Dutch-language reference, Schaufeli & Bakker,
// UWES Preliminary Manual v1.1 (2004), pp. 33–36, Table 31.
// Item wording is deliberately separate; its use requires the applicable permission.
export const UBES_REFERENCE = {
 title:'Historische Nederlandstalige onderzoeksgroep', year:2004, n:9679,
 composition:'86% Nederland, 14% Vlaanderen; verschillende beroepsgroepen.',
 limitation:'Geen representatieve steekproef van de hele Nederlandse of Vlaamse beroepsbevolking.',
 url:'https://www.wilmarschaufeli.nl/publications/Schaufeli/Test%20Manuals/Test_manual_UWES_English.pdf#page=36'
};
export const UBES_DIMENSIONS = {
 vitality:{label:'Vitaliteit',items:[0,1,4],upper:[2.00,3.25,4.80,5.65],referenceMean:4.01},
 dedication:{label:'Toewijding',items:[2,3,6],upper:[1.33,2.90,4.70,5.69],referenceMean:3.88},
 absorption:{label:'Absorptie',items:[5,7,8],upper:[1.17,2.33,4.20,5.33],referenceMean:3.35},
 total:{label:'Bevlogenheid totaal',items:[0,1,2,3,4,5,6,7,8],upper:[1.77,2.88,4.66,5.50],referenceMean:3.74}
};
export const UBES_CATEGORIES=['Zeer laag','Laag','Gemiddeld','Hoog','Zeer hoog'];
export function roundUbes(value){return Math.round((value+Number.EPSILON)*100)/100;}
export function classifyUbes(key,rawMean){
 if(!UBES_DIMENSIONS[key]||!Number.isFinite(rawMean)||rawMean<0||rawMean>6)throw new RangeError('Ongeldige UBES-score.');
 // The manual prints two-decimal intervals: classify the displayed two-decimal
 // value so 4/3 becomes 1.33 and 16/3 becomes 5.33, not the adjacent category.
 const score=roundUbes(rawMean);
 const found=UBES_DIMENSIONS[key].upper.findIndex(upper=>score<=upper);
 const rank=found===-1?4:found;
 return {score,rank,label:UBES_CATEGORIES[rank]};
}
export function scoreUbes(answers){
 if(!Array.isArray(answers)||answers.length!==9)throw new RangeError('Er zijn precies negen antwoorden nodig.');
 if(answers.some(x=>!Number.isInteger(x)||x<0||x>6))throw new RangeError('Beantwoord alle negen vragen met een geheel getal van 0 tot en met 6.');
 return Object.fromEntries(Object.entries(UBES_DIMENSIONS).map(([key,dimension])=>{
  const sum=dimension.items.reduce((s,index)=>s+answers[index],0),rawMean=sum/dimension.items.length;
  return [key,{...classifyUbes(key,rawMean),sum,count:dimension.items.length,rawMean}];
 }));
}
// Suggestions below are editorial conversation prompts, not a validated UBES
// intervention algorithm and not an inference about someone's diagnosis/cause.
export function ubesSuggestions(scores){
 return ['vitality','dedication','absorption'].map(key=>{
  const low=scores[key].rank<2,high=scores[key].rank>2;
  const entries={
   vitality:low?['Onderzoek wat energie kost','Breng taakpieken, verstoringen en herstelruimte in kaart. Bespreek één haalbare verandering in taken, prioriteiten of pauzes.']:high?['Behoud wat energie geeft','Benoem welke werkafspraken je energie ondersteunen. Bewaak ook bij veel enthousiasme pauzes en grenzen.']:['Verken je energiepatroon','Vergelijk taken die energie kosten met taken die energie geven. Kijk welke hulpbron op drukke momenten ontbreekt.'],
   dedication:low?['Verken betekenis en betrokkenheid','Bespreek welke taken zinvol voelen, welke doelen onduidelijk zijn en waar waardering of invloed ontbreekt. Kies één werkafspraak om te proberen.']:high?['Maak betekenis zichtbaar','Benoem welke bijdrage je belangrijk vindt. Onderzoek hoe je die betrokkenheid kunt behouden zonder steeds extra taken op je te nemen.']:['Versterk betekenisvolle taken','Kies een taak waarbij je betrokkenheid voelt. Bespreek wat daarvan vaker mogelijk is en welke feedback daarbij helpt.'],
   absorption:low?['Onderzoek concentratie en taakfit','Kijk naar onderbrekingen, taakafwisseling en de aard van je werk. Probeer waar passend een beschermd werkblok; opgaan in werk is niet voor elke taak het doel.']:high?['Behoud focus én onderbreek voor herstel','Gebruik je concentratie bij passende taken. Plan bewuste stopmomenten en pauzes; verder opgaan in werk is niet automatisch beter.']:['Verken wanneer focus lukt','Vergelijk situaties met en zonder concentratie. Bespreek een kleine aanpassing in planning, verstoringen of taakindeling.']
  };
  return {dimension:key,title:entries[key][0],text:entries[key][1]};
 });
}
