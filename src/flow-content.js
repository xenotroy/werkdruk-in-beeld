import { STEPS } from './content.js';
const FLOW = [
  {
    id:'inventariseren', title:'Inventariseren', short:'Wat speelt er?', question:'Hoe inventariseer je werkdruk?', source:STEPS[0],
    inputTitle:'Werk & signalen', outputTitle:'Onderzoeksresultaten',
    input:['Bestaande RI&E, eerdere onderzoeken en signalen van werknemers.','Taken, functies, teams, roosters en werkprocessen.','Werkgegevens, zoals bezetting, piekbelasting en verstoringen. Verzuim is een aanvullend signaal.'],
    output:[['Onderzoeksopzet','Wie is onderzocht, met welke methode, welke onderwerpen en welke deelname?'],['Resultaten per relevante groep','Taakeisen, hulpbronnen, herstel en ervaren gevolgen; met behoud van anonimiteit.'],['Gecontroleerde uitkomsten','Besproken met werknemers en gecontroleerd op juistheid en volledigheid; ontbrekende informatie benoemd.']],
    requirements:[STEPS[0].requirements[0],STEPS[0].requirements[1],STEPS[0].requirements[2],STEPS[0].requirements[3],STEPS[0].requirements[5]],
    route:['Bepaal groepen','Kies methode','Onderzoek & bespreek'],
    approach:'Combineer passende vragenlijsten, interviews, teambesprekingen en werkgegevens. Gebruik het JD-R-model om taakeisen en hulpbronnen te ordenen; onderzoek ook herstel en ervaren gevolgen.',
    questions:STEPS[0].questions, hint:'Inhoud · groepen · respons', ref:'NLA p. 5–6 · bijlage 4, p. 17–18', page:5
  },
  {
    id:'beoordelen', title:'Beoordelen', short:'Waar zit het risico?', question:'Hoe beoordeel je de risico’s?', source:STEPS[0],
    inputTitle:'Gegevens & ervaringen', outputTitle:'Onderbouwde RI&E',
    input:['Onderzoeksresultaten en ervaringen van werknemers.','Inzicht in deelname, ontbrekende groepen en beperkingen.','Passende interpretatie van het gebruikte meetinstrument.'],
    output:[['Risico en oorzaak','Beschrijf wat het werk vraagt, welke hulpbronnen ontbreken en hoe herstel en stress hiermee samenhangen.'],['Groep en prioriteit','Maak duidelijk waar het risico speelt en welke knelpunten aandacht vragen.'],['Onderbouwing en vervolg','Leg je oordeel en onzekerheden vast; bepaal of maatregelen of aanvullend onderzoek nodig zijn. Verwijs vanuit de RI&E naar verdiepend onderzoek.']],
    requirements:[['Samenhang beoordelen','Beoordeel de verhouding tussen taakeisen en hulpbronnen, ervaren werkstress en mogelijkheden voor rust en herstel. Een tevredenheidscijfer of losse score is geen volledige risicobeoordeling.'],['Verschillen zichtbaar maken','Beoordeel patronen op organisatieniveau én per relevante afdeling, team of functie. Houd rekening met individuele verschillen, zonder individuele gezondheidsinformatie openbaar te maken.'],STEPS[0].requirements[4],['Oordeel onderbouwen','Maak zichtbaar welke gegevens de conclusie dragen en wat onzeker blijft. Bij onvoldoende inzicht is aanvullend onderzoek nodig.']],
    route:['Vergelijk bronnen','Duid het patroon','Onderbouw het risico'],
    approach:'Gebruik de interpretatie van een geschikt meetinstrument en passende referentiewaarden. Combineer die met duur en intensiteit van de belasting, herstel en werknemerservaringen. De werkinstructie schrijft geen universele numerieke risicogrens voor.',
    questions:[['Groep / functie','Welke taakeisen zijn hoog en welke hulpbronnen schieten tekort?','Zoek samenhang en verschillen; trek taakeisen en hulpbronnen niet rekenkundig van elkaar af.'],['Werknemers','Herkennen werknemers het patroon en de vermoedelijke oorzaak?','Vergelijk ervaringen met roosters, taken, bezetting en verstoringen.'],['Onderzoekskwaliteit','Welke conclusie kun je dragen en welk bewijs ontbreekt?','Respons, dekking, anonimiteit en volledigheid bepalen hoe ver je oordeel kan gaan.']],
    hint:'Samenhang · verschillen · onderbouwing', ref:'NLA p. 5–6 · bijlage 4, p. 17–18', page:5
  },
  {
    id:'beheersen', title:'Beheersen', short:'Wat verander je?', question:'Hoe beheers je werkdruk?', source:STEPS[1],
    inputTitle:'Risico’s & oorzaken', outputTitle:'Uitgevoerd plan van aanpak',
    input:['De beoordeelde risico’s, oorzaken en betrokken groepen.','Ervaringen en ideeën van werknemers en leidinggevenden.','Passende oplossingen uit de wetenschap en een relevante arbocatalogus.'],
    output:STEPS[1].evidence, requirements:STEPS[1].requirements,
    route:['Pak oorzaak aan','Maak afspraken','Voer uit'],
    approach:'Begin bij werkorganisatie, capaciteit, prioriteiten en middelen. Werk teamspecifieke knelpunten uit met het team. Voeg individueel maatwerk toe waar nodig. Leg maatregel en termijn vast; benoem voor praktische sturing ook wie de uitvoering en evaluatie oppakt.',
    questions:STEPS[1].questions, hint:'Oorzaak · maatregelen · uitvoering', ref:'NLA p. 7–8', page:7
  },
  {
    id:'evalueren', title:'Evalueren', short:'Werkt de aanpak?', question:'Hoe evalueer en verbeter je?', source:STEPS[2],
    inputTitle:'Uitvoering & effect', outputTitle:'Conclusie & bijstelling',
    input:['Het oorspronkelijke knelpunt en de gekozen maatregel.','Gegevens over uitvoering, bereik en ervaringen van werknemers.','Een vergelijkbare meting of vastgelegde dialoog over het effect.'],
    output:STEPS[2].evidence, requirements:STEPS[2].requirements,
    route:['Check uitvoering','Check effect','Stel bij'],
    approach:'Vergelijk het resultaat met het oorspronkelijke knelpunt. Onderzoek zowel de werking van maatregelen als de hele beleidscyclus. Bepaal wat je behoudt, aanpast of opnieuw onderzoekt.',
    questions:STEPS[2].questions, hint:'Uitvoering · effect · beleidscyclus', ref:'NLA p. 8 · bijlage 7, p. 23', page:8
  }
];

const MODEL_NODES = {
  eisen:['Taakeisen','Wat kost inspanning? Denk aan hoeveelheid werk, tempo, emotionele belasting en onderbrekingen. Onderzoek hoe intensief en hoe langdurig dit speelt.'],
  bronnen:['Hulpbronnen','Wat helpt om het werk goed te doen? Denk aan autonomie, steun, feedback en competentie. Hulpbronnen ondersteunen motivatie en kunnen de gevolgen van hoge taakeisen beperken.'],
  uitputting:['Uitputting','Langdurig hoge belasting kan bijdragen aan uitputting en klachten. Onvoldoende herstel kan dit versterken. Het model voorspelt geen individuele diagnose.'],
  bevlogenheid:['Bevlogenheid','Vitaliteit, toewijding en absorptie. De UBES-9 meet deze uitkomst; daarmee zijn taakeisen, hulpbronnen en herstel nog niet onderzocht.'],
  herstel:['Rust & herstel','Kunnen werknemers pauzeren, na inspanning herstellen en buiten werktijd mentaal loskomen? Herstel is hier als aanvullende onderzoekslens bij JD-R weergegeven.']
};

export { FLOW, MODEL_NODES };

const BRIEF_REQUIREMENTS={
 inventariseren:[['Bronnen én gevolgen','Onderzoek taakeisen, hulpbronnen, ervaren stress en herstel.'],['Relevante groepen','Maak verschillen tussen teams en functies zichtbaar; behoud anonimiteit.'],['Bruikbare methode','Onderbouw methode, deelname en representativiteit. Bespreek uitkomsten met werknemers.'],['Respons is geen eindoordeel','P. 6: >50%. Bijlage 4: ≥50% bij alleen vragenlijsten. Beoordeel altijd de dekking.']],
 beoordelen:[['Samenhang','Beoordeel eisen, bronnen, stress en herstel in hun onderlinge verband.'],['Verschillen','Kijk naar organisatie, afdeling, functie en individuele verschillen.'],['Onderbouwing','Leg vast welk bewijs het oordeel draagt, ook bij “geen risico”.'],['Onzekerheid','Ontbreekt inzicht? Doe aanvullend onderzoek. Er is geen universele numerieke risicogrens.']],
 beheersen:[['Oorzaakgericht','Koppel maatregelen aan vastgestelde knelpunten en de stand van de wetenschap.'],['Bronaanpak','Begin bij werkorganisatie en collectieve maatregelen; vul aan met individueel maatwerk.'],['Herstel','Maak rust en herstel daadwerkelijk mogelijk.'],['Uitvoering','Leg maatregelen en termijnen vast in het PvA. Voer ze uit.']],
 evalueren:[['Uitvoering','Is de maatregel ingevoerd en wordt de bedoelde groep bereikt?'],['Effect','Verminderen de oorspronkelijke knelpunten? Betrek de ervaringen van werknemers.'],['Beleidscyclus','Evalueer ook het proces van onderzoek, keuzes en opvolging.'],['Bijstelling','Pas aan bij onvoldoende effect. Er geldt geen universele meetfrequentie.']]
};
export { BRIEF_REQUIREMENTS };
