import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { FLOW, BRIEF_REQUIREMENTS } from './flow-content.js';
import { STEPS, INVENTORY } from './content.js';
import { MODEL_CONCEPTS } from './model-concepts.js';
import UbesPanel, {freshUbesState} from './ubes-panel.jsx';
import DemandResourcePlot, {modelNumber} from './demand-resource-plot.jsx';
import {freshModel,moveModel} from './model-weights.js';
import ModelWeights from './model-weight-panel.jsx';
import {EngagementConcepts} from './engagement-concepts.jsx';

const PDF='assets/werkinstructie-werkdruk.pdf';
const Source=({page=5,children})=><a className="source-link" href={`${PDF}#page=${page}`} target="_blank" rel="noopener">{children||`NLA · p. ${page}`} ↗</a>;
const List=({items})=><ul className="explanation-list">{items.map(([title,text],i)=><li key={i}><h3>{title}</h3><p>{text}</p></li>)}</ul>;
function Fold({title,hint,children}) {return <details className="fold"><summary><span>{title}</span>{hint&&<small>{hint}</small>}<span className="disclosure" aria-hidden="true"/></summary><div className="fold-body">{children}</div></details>}
function PanelHead({eyebrow,title,lead,back}) {return <><button className="back-overview" onClick={back}>← Terug naar overzicht</button><p className="eyebrow">{eyebrow}</p><h2 tabIndex="-1" className="panel-title">{title}</h2>{lead&&<p className="panel-lead">{lead}</p>}</>}
function Enforcement({s}) {return <><p className="legal-ref">{s.law}</p><p>{s.enforce}</p><p className="aside-note">{s.extra}</p><a className="text-link" href="naslag.html#handhaving">Hoe kiest de inspecteur het handhavingsinstrument? ↗</a></>}
function ResponseNote(){return <div className="aside-note"><h3>En die 50% respons?</h3><p>P. 6 noemt <b>meer dan 50%</b>; bijlage 4 noemt bij alleen vragenlijstonderzoek <b>minstens de helft</b>. Dit is een inspectie-uitwerking, geen percentage in de wet.</p><p>Exact 50% geeft dus geen automatisch voldoende-oordeel. Onderbouw ook spreiding, inhoud en representativiteit. Vul zo nodig aan met interviews of groepsgesprekken; tel dezelfde werknemer niet zomaar dubbel.</p><Source page={17}>Bijlage 4 · kwaliteit van onderzoek</Source></div>}
function StageDetail({stage,back,onModel,onExample}) {return <>
  <PanelHead eyebrow={`STAP ${FLOW.indexOf(stage)+1} / 4`} title={stage.title} lead={stage.question} back={back}/>
  <div className="detail-folds">
    <Fold title="Input" hint={stage.inputTitle}><ul className="simple-list">{stage.input.map(x=><li key={x}>{x}</li>)}</ul></Fold>
    <Fold title="Output" hint={stage.outputTitle}><List items={stage.output}/></Fold>
    <Fold title="Eisen" hint="Wat moet voldoende zijn?"><p className="legal-ref">{stage.source.law} · uitwerking in de NLA-werkinstructie</p><List items={BRIEF_REQUIREMENTS[stage.id]}/><p className="more-detail"><a href={`naslag.html#${stage.source.id}`}>Volledige eisen, toelichting en uitzonderingen ↗</a></p><Source page={stage.page}>{stage.ref}</Source></Fold>
    <Fold title="Aanpak" hint="Hoe doe je dit?"><div className="method-route">{stage.route.map((x,i)=><React.Fragment key={x}><span>{x}</span>{i<2&&<i aria-hidden="true">→</i>}</React.Fragment>)}</div><p>{stage.approach}</p>{stage.id==='inventariseren'&&<><button className="plain-action" onClick={onModel}>Onderzoek het JD-R-model ↗</button><div className="inventory-keywords">Taakeisen · hulpbronnen · herstel · gevolgen</div></>}<h3 className="subheading">Vragen om te stellen</h3><ul className="questions">{stage.questions.map(([role,q,help])=><li key={q}><small>{role}</small><p>{q}</p></li>)}</ul><button className="plain-action" onClick={()=>onExample(stage)}>Bekijk een voorbeeld →</button></Fold>
    <Fold title="Handhaving" hint="Wat als dit tekortschiet?"><Enforcement s={stage.source}/><Source page={stage.page}>{stage.ref}</Source></Fold>
  </div>
  <p className="panel-source"><Source page={stage.page}>{stage.ref}</Source></p>
  {stage.id==='evalueren'&&<p className="cycle-note">↶ Onvoldoende effect? Onderzoek de oorzaak en stel de aanpak bij.</p>}
</>}
function Law({back}) {return <><PanelHead eyebrow="KADER" title="Wettelijke eisen" lead="De werkgever moet werkstress door werkdruk voorkomen of beperken." back={back}/><List items={[
 ['Arbowet 3 lid 2 · Beleid','Voorkom psychosociale arbeidsbelasting; beperk die waar voorkomen niet mogelijk is.'],
 ['Arbowet 5 · RI&E en plan van aanpak','Leg risico’s, maatregelen en uitvoeringstermijnen vast. Actualiseer waar nodig.'],
 ['Arbobesluit 2.15 lid 1 · Beoordelen en beheersen','Beoordeel PSA-risico’s. Kies en voer maatregelen uit volgens de stand van de wetenschap.'],
 ['Arbobesluit 2.15 lid 2 · Voorlichten','Geef voorlichting en onderricht over risico’s en maatregelen.'],['Arbowet 8 lid 4 · Toezicht','Zie toe op naleving van instructies en maatregelen.']
 ]}/><p className="aside-note">De wet verplicht. De NLA-werkinstructie concretiseert. JD-R is een hulpmiddel, geen verplicht model.</p><div className="link-row"><a href="https://wetten.overheid.nl/BWBR0010346/" target="_blank" rel="noopener">Arbowet ↗</a><a href="https://wetten.overheid.nl/BWBR0008498/" target="_blank" rel="noopener">Arbobesluit ↗</a><Source page={4}/></div></>}
function Continuous({id,back}) {const s=STEPS.find(x=>x.id===id);return <><PanelHead eyebrow="DOORLOPEND" title={id==='voorlichting'?'Voorlichten & instrueren':'Toezicht houden'} lead={s.lead} back={back}/><Fold title="Eisen" hint="Wat moet voldoende zijn?"><List items={s.requirements}/></Fold><Fold title="Aanpak" hint="Vragen en controle"><ul className="questions">{s.questions.map(([r,q,t])=><li key={q}><small>{r}</small><p>{q}</p><span>{t}</span></li>)}</ul></Fold><Fold title="Output" hint="Wat maakt dit aantoonbaar?"><List items={s.evidence}/></Fold><Fold title="Handhaving" hint={s.law}><Enforcement s={s}/></Fold><p className="panel-source"><Source page={s.page}>NLA · p. {s.pages}</Source></p></>}
function Inspection({back}) {return <><PanelHead eyebrow="BIJLAGE 7" title="De inspectiebeslisboom" lead="De inspecteur controleert vijf onderdelen. Elk tekort vraagt een onderbouwde koppeling aan de wet." back={back}/><ol className="inspection-route">{STEPS.map((s,i)=><li key={s.id}><b>{i+1}. {s.question}</b><div><span>Ja → {i===4?'aanpak voldoende geborgd? Dan zaak afhandelen.':'volgende controlevraag.'}</span><span>Nee → onderbouwen en handhaven: {s.law}.</span></div></li>)}</ol><p className="aside-note">De procesroute links vertaalt deze controle naar handelen door de werkgever. Inventariseren en beoordelen horen samen bij de eerste inspectievraag. Voorlichting en toezicht zijn doorlopend weergegeven.</p><p>Een negatief antwoord is geen automatische boete. De instructie onderscheidt een waarschuwing bij een toepasselijke, toereikende en positief getoetste arbocatalogus en anders een eis tot naleving. Het volledig ontbreken van een RI&E kent een afzonderlijke boeterapport-route.</p><Source page={23}>Open de oorspronkelijke beslisboom</Source></>}

const presets={basis:{label:'Onderbezetting',values:[9,3,3]},taken:{label:'Taken & bezetting aanpassen',values:[5,3,3]},steun:{label:'Autonomie & steun vergroten',values:[9,8,3]},herstel:{label:'Pauzes & bereikbaarheid regelen',values:[9,3,8]},samen:{label:'Maatregelen combineren',values:[5,8,8]}};
const level=n=>n<=3?'laag':n>=7?'hoog':'midden';

function Balance({demands,resources,recovery,angle,onPart}){
 const rad=angle*Math.PI/180, cx=250, cy=90, len=160;
 const left={x:cx-len*Math.cos(rad),y:cy-len*Math.sin(rad)},right={x:cx+len*Math.cos(rad),y:cy+len*Math.sin(rad)};
 const pan=(pos,value,side)=> <g className="scale-pan"><path d={`M${pos.x} ${pos.y} L${pos.x-57} ${pos.y+92} M${pos.x} ${pos.y} L${pos.x+57} ${pos.y+92}`} fill="none" stroke="var(--blue-slate)" strokeWidth="1.7"/><path d={`M${pos.x-66} ${pos.y+93} Q${pos.x} ${pos.y+137} ${pos.x+66} ${pos.y+93} Z`} fill={side==='left'?'var(--pearl-beige)':'var(--muted-teal)'} stroke="var(--blue-slate)" strokeWidth="1.5"/>{Array.from({length:Math.ceil(value/2)},(_,i)=><rect key={i} x={pos.x-31} y={pos.y+79-i*12} width="62" height="10" rx="2" fill={side==='left'?'var(--pearl-beige)':'var(--muted-teal)'} stroke="var(--blue-slate)" strokeWidth=".75"/>)}</g>;
 return <div className="balance-visual"><div className="balance-labels"><div><button className="concept-trigger" aria-haspopup="dialog" onClick={()=>onPart('eisen')}>Taakeisen <span aria-hidden="true">+</span></button></div><div><button className="concept-trigger" aria-haspopup="dialog" onClick={()=>onPart('bronnen')}>Hulpbronnen <span aria-hidden="true">+</span></button></div></div><svg className="balance-svg" viewBox="0 0 500 310" role="img" aria-label={`Weegschaal als lesmetafoor. Taakeisen ${modelNumber(demands)} van 10, hulpbronnen ${modelNumber(resources)} van 10, herstel ${modelNumber(recovery)} van 10. ${angle < -2.2?'De kant met taakeisen hangt lager.':angle>2.2?'De kant met hulpbronnen en herstel hangt lager.':'De schaal is ongeveer horizontaal.'}`}>
 <path d="M250 92 V280 M210 286 H290" stroke="var(--blue-slate)" strokeWidth="4" fill="none" strokeLinecap="round"/>
 <path d="M230 279 L250 260 L270 279" fill="var(--surface)" stroke="var(--blue-slate)" strokeWidth="1.5"/>
 <line x1={left.x} y1={left.y} x2={right.x} y2={right.y} stroke="var(--blue-slate)" strokeWidth="5" strokeLinecap="round"/>
 {pan(left,demands,'left')}{pan(right,(resources+recovery)/2,'right')}
 <circle cx="250" cy="90" r="7" fill="var(--surface)" stroke="var(--blue-slate)" strokeWidth="2"/>
 
 </svg></div>
}

function Model({back,onUbes,state,setState}) {
 const {values,preset}=state;
 const [concept,setConcept]=useState(null);
 const [weightsOpen,setWeightsOpen]=useState(false);
 const weightSection=useRef(null);
 const conceptDialog=useRef(null);
 useEffect(()=>{if(concept&&!conceptDialog.current.open)conceptDialog.current.showModal()},[concept]);
 function openConcept(key){setConcept(key==='uitputting'?'klachten':key)}
 const conceptInfo=concept?MODEL_CONCEPTS[concept]:null;
 const [d,r,h]=values;
 function choose(k){setState(freshModel([...presets[k].values],k));}
 function setAt(i,v){setState(prev=>({...prev,preset:'eigen',values:prev.values.map((n,j)=>j===i?Number(v):n)}));}
 function movePoint(demand,resource){setState(prev=>moveModel(prev,demand,resource));}
 function openWeights(){conceptDialog.current.close();setWeightsOpen(true);setTimeout(()=>{weightSection.current?.querySelector('button')?.focus();weightSection.current?.scrollIntoView({block:'nearest'});},0)}
 const difference=d-(r+h)/2, tilt=-difference*2.2;
 return <><PanelHead eyebrow="" title="JD-R" back={back}/>
 <label className="sr-only" htmlFor="scenario">Situatie</label><select id="scenario" value={preset} onChange={e=>choose(e.target.value)}>{Object.entries(presets).map(([k,v])=><option value={k} key={k}>{v.label}</option>)}{preset==='eigen'&&<option value="eigen">Eigen instellingen</option>}</select>
 <div className="model-workbench">
 <DemandResourcePlot demands={d} resources={r} recovery={h} onMove={movePoint}/>
 <div className="model-balance"><Balance demands={d} resources={r} recovery={h} angle={tilt} onPart={openConcept}/>
 <p className="sr-only" aria-live="polite">{difference>1?'Taakeisen wegen zwaarder':difference < -1?'Meer tegenwicht aanwezig':'Visueel in balans'}</p>
 <div className="recovery-control"><div className="recovery-label"><button className="concept-trigger" aria-haspopup="dialog" onClick={()=>openConcept('herstel')}>Herstel <span aria-hidden="true">+</span></button><output>{modelNumber(h)} / 10</output></div><label className="sr-only" htmlFor="slider-2">Herstel</label><input id="slider-2" type="range" min="0" max="10" step="0.1" value={h} onChange={e=>setAt(2,e.target.value)} aria-valuetext={`${modelNumber(h)} van 10, ${level(h)}`}/></div>
 </div></div>
 <div className="model-outcomes"><button className="concept-trigger" aria-haspopup="dialog" onClick={()=>openConcept('klachten')}>Klachten <span aria-hidden="true">+</span></button><button className="concept-trigger" aria-haspopup="dialog" onClick={()=>openConcept('bevlogenheid')}>Bevlogenheid <span aria-hidden="true">+</span></button></div>
 <ModelWeights state={state} setState={setState} open={weightsOpen} setOpen={setWeightsOpen} sectionRef={weightSection}/>
 <dialog className="concept-dialog" ref={conceptDialog} aria-labelledby="concept-title" aria-describedby="concept-definition" onClose={()=>setConcept(null)} onClick={e=>{if(e.target===conceptDialog.current)conceptDialog.current.close()}}>
 <div className="dialog-heading"><h2 id="concept-title">{conceptInfo?.title}</h2><button aria-label="Sluiten" onClick={()=>conceptDialog.current.close()}>×</button></div>
 <div className="dialog-content"><p id="concept-definition" className="concept-definition">{conceptInfo?.definition}</p>
 {concept==='bevlogenheid'?<EngagementConcepts/>:<Fold title="Voorbeelden"><ul className="concept-examples">{conceptInfo?.examples.map(([label,text])=><li key={label}><b>{label}</b><span>{text}</span></li>)}</ul></Fold>}
 {['eisen','bronnen'].includes(concept)&&<button className="plain-action concept-weigh" onClick={openWeights}>Persoonlijk wegen →</button>}
 {concept==='bevlogenheid'&&<button className="ubes-primary concept-ubes" onClick={e=>{conceptDialog.current.close();onUbes(e)}}>Vul de UBES-9 in →</button>}
 <Fold title="Bron & duiding"><p className="concept-note">{conceptInfo?.note}</p><div className="concept-source">{conceptInfo?.url?<a href={conceptInfo.url} target="_blank" rel="noopener">{conceptInfo.source} ↗</a>:<Source page={conceptInfo?.page}>{conceptInfo?.source}</Source>}<small>Toepassingen en voorbeelden zijn lesinhoud.</small></div></Fold></div>
 </dialog>
 </>;
}
function ModelBackground(){return <>
 <Fold title="JD-R · de relaties"><div className="source-relations"><span>Taakeisen</span><span aria-hidden="true">→</span><span>Uitputting</span><p>Hulpbronnen kunnen de gevolgen van taakeisen dempen.</p><span>Hulpbronnen</span><span aria-hidden="true">→</span><span>Bevlogenheid</span></div><p>Herstel is een aanvullende lens in deze oefening.</p></Fold>
  <Fold title="Maatregelen"><List items={[
 ['Taakeisen verlagen','Schrap of herverdeel taken, stel realistische prioriteiten, stem bezetting af en verminder verstoringen.'],['Hulpbronnen versterken','Vergroot passende beslisruimte, maak steun beschikbaar en zorg voor competentie en werkende middelen.'],['Herstel mogelijk maken','Organiseer uitvoerbare pauzes, passende roosters en afspraken over bereikbaarheid.']
 ]}/><p>Een maatregel kan meerdere onderdelen beïnvloeden. Onderzoek in het echte werk welk knelpunt je aanpakt en evalueer het effect.</p><Source page={7}>Maatregelen in de werkinstructie</Source></Fold> <Fold title="JD-R · aannames & bronnen"><p>Visuele metafoor, geen risicoscore. Een gelijke stand zegt niet of het werk gezond is.</p><p>JD-R beschrijft een belastingsproces en een motivatieproces. Hulpbronnen kunnen de invloed van taakeisen dempen. Herstel is hier toegevoegd als aanvullende onderzoekslens.</p><p>De grafiek gebruikt op verzoek de assen belasting en belastbaarheid. Omhoog verhoogt de taakeisen; naar rechts verhoogt de hulpbronnen. Belastbaarheid en hulpbronnen zijn inhoudelijk geen synoniemen: hulpbronnen kunnen ook in de werkorganisatie liggen, zoals autonomie, steun en goede middelen. De x-as is dus een didactische vertaling, geen meting van individuele draagkracht. De ring toont de gekozen herstelruimte; hij voorspelt geen hersteltijd of herstelpercentage. Herstel verandert het punt niet, maar werkt afzonderlijk door in de weegschaal.</p><p>De schaal 0–10, de indeling laag (0–3), midden (4–6), hoog (7–10), de kanteling en alle scenario-instellingen zijn ontwerpkeuzes voor deze oefening. De rechter schaal combineert hulpbronnen en herstelruimte als gemiddelde; het verschil met taakeisen bepaalt uitsluitend de getekende hoek. Dat is geen formule uit JD-R. Het zijn geen gevalideerde grenswaarden, effectgroottes of voorspellingen. De simulatie berekent geen stressscore. “Visueel in balans” is geen voldoende-oordeel; ook twee hoge waarden kunnen een belastende werksituatie voorstellen.</p><p>De UBES-9 meet bevlogenheid. Voor taakeisen, hulpbronnen, stress en herstel is aanvullend onderzoek nodig.</p><div className="link-column"><Source page={13}>NLA · JD-R en TNO, bijlage 1</Source><Source page={15}>NLA · rust en herstel, bijlage 2</Source><a href="https://pure.eur.nl/ws/files/183280320/Job_demands_resources_theory.pdf" target="_blank" rel="noopener">Bakker & Demerouti · JD-R Theory ↗</a><a href="naslag.html#model">TNO, UBES-9 en de modelcombinatie uit je scriptie ↗</a></div></Fold></>}
function Sources({back}) {return <><PanelHead eyebrow="VERANTWOORDING" title="Bronnen & verdieping" back={back}/><p>Centraal staat <i>Werkstress door werkdruk voorkomen en beperken</i> van de Nederlandse Arbeidsinspectie, gepubliceerd op 19 december 2024. De interne wijzigingsdatum is 22 januari 2024.</p><ul className="resource-list"><li><Source page={1}>De volledige werkinstructie</Source></li><li><Source page={23}>Bijlage 7 · beslisboom handhaving</Source></li><li><button className="text-link" onClick={()=>{location.hash='ubes'}}>Vul de officiële UBES-9 in →</button></li><li><a href="naslag.html#model">Modellen: JD-R, TNO, UBES-9 & scriptiesynthese ↗</a></li><li><a href="naslag.html#context">Hybride werk, technologie & herstel ↗</a></li><li><a href="naslag.html#casus">Oefen met de nachtdienstcasus ↗</a></li><li><a href="naslag.html#bronnen">Volledige naslag & bronverantwoording ↗</a></li></ul><p className="aside-note">De procesroute is een didactische vertaling. De bron beschrijft hoe inspecteurs beoordelen en handhaven. De verantwoordelijkheid voor beleid en uitvoering ligt bij de werkgever.</p><ModelBackground/><Fold title="Bronvragen & actualiteit"><p>P. 6 en p. 17 formuleren de responsgrens verschillend. De uitleg bij inventariseren houdt beide passages zichtbaar.</p><p>De actuele geconsolideerde wetstekst kon op 11 november 2026 niet volledig worden opgehaald. De rechtsgrondslagen en handhavingsroute zijn gecontroleerd aan de officiële NLA-werkinstructie van 2024; de app claimt geen volledige actualiteitscontrole van het huidige handhavingsbeleid.</p><p>De combinatie van modellen uit de aangeleverde conceptscriptie is een ontwerpsynthese, geen gevalideerd gecombineerd meetinstrument. Het volledige scriptiebestand staat niet online.</p></Fold></>}

function App(){
 const known=['ubes','wet','voorlichting','toezicht','inspectie','model','bronnen',...FLOW.map(x=>x.id)];
 const fromHash=()=>{const h=location.hash.slice(1);return known.includes(h)?h:'inventariseren'};
 const [selected,setSelected]=useState(fromHash),[mobile,setMobile]=useState(()=>matchMedia('(max-width: 960px)').matches),[showMobile,setShowMobile]=useState(()=>known.includes(location.hash.slice(1))),[example,setExample]=useState(null);
 const [ubesState,setUbesState]=useState(freshUbesState);
 const [modelState,setModelState]=useState(()=>freshModel());
 const [menuOpen,setMenuOpen]=useState(()=>!['model','ubes'].includes(location.hash.slice(1)));
 const dialog=useRef(null), lastTrigger=useRef(null), needFocus=useRef(false);
 useEffect(()=>{const q=matchMedia('(max-width: 960px)');const listen=()=>setMobile(q.matches);q.addEventListener('change',listen);return()=>q.removeEventListener('change',listen)},[]);
 useEffect(()=>{const listen=()=>{if(location.hash==='#content'||location.hash==='#process')return;setSelected(fromHash());setShowMobile(true)};addEventListener('hashchange',listen);return()=>removeEventListener('hashchange',listen)},[]);
 useEffect(()=>{document.title=(FLOW.find(x=>x.id===selected)?.title||({ubes:'UBES-9',wet:'Wettelijke eisen',model:'JD-R-simulatie',bronnen:'Bronnen',inspectie:'Inspectiebeslisboom',toezicht:'Toezicht',voorlichting:'Voorlichting'}[selected]))+' · Werkdruk in beeld';if(needFocus.current){document.querySelector('.panel-title')?.focus({preventScroll:!mobile});needFocus.current=false}},[selected,showMobile,mobile,menuOpen]);
 function select(id,e){if(['model','ubes'].includes(id))setMenuOpen(false);lastTrigger.current=e?.currentTarget||document.querySelector(`[data-step="${id}"]`);needFocus.current=true;setSelected(id);setShowMobile(true);history.pushState(null,'',`#${id}`);if(id===selected)setTimeout(()=>document.querySelector('.panel-title')?.focus({preventScroll:!mobile}),0)}
 function back(){setMenuOpen(true);setShowMobile(false);setTimeout(()=>{const btn=document.querySelector(`[data-step="${selected}"]`);btn?.focus();btn?.scrollIntoView({block:'center'})},0)}
 function openExample(s){setExample(s);dialog.current.showModal()}
 function panel(){const stage=FLOW.find(x=>x.id===selected);return <section key={selected} className="detail-panel" aria-label="Details geselecteerde stap">{stage?<StageDetail stage={stage} back={back} onModel={e=>select('model',e)} onExample={openExample}/>:selected==='wet'?<Law back={back}/>:selected==='ubes'?<UbesPanel back={back} state={ubesState} setState={setUbesState}/>:selected==='model'?<Model back={back} onUbes={e=>select('ubes',e)} state={modelState} setState={setModelState}/>:selected==='inspectie'?<Inspection back={back}/>:selected==='bronnen'?<Sources back={back}/>:<Continuous id={selected} back={back}/>}</section>}
 const inline=id=>mobile&&menuOpen&&showMobile&&selected===id?panel():null;
 const selectedMark=id=><span className="selection-mark" aria-hidden="true">{selected===id?'→':'+'}</span>;
 return <><a className="skip" href="#content">Naar de inhoud</a>
 <header className="site-header flex items-center justify-between"><a href="#inventariseren" onClick={e=>{e.preventDefault();setMenuOpen(true);select('inventariseren',e)}} className="brand">Werkdruk <b>in beeld</b></a><div className="header-tools flex items-center gap-6"><button className="menu-toggle" aria-controls="process" aria-expanded={menuOpen} onClick={()=>{setMenuOpen(v=>!v);setShowMobile(true)}}><span aria-hidden="true">☰</span> Menu</button><button data-step="model" onClick={e=>select('model',e)} aria-current={selected==='model'?'true':undefined}>JD-R-simulatie</button><button data-step="ubes" onClick={e=>select('ubes',e)} aria-current={selected==='ubes'?'true':undefined}>UBES-9</button><button data-step="bronnen" onClick={e=>select('bronnen',e)} aria-current={selected==='bronnen'?'true':undefined}>Bronnen</button></div></header>
 <main className={`page-shell ${menuOpen?'':'menu-collapsed'}`} id="content"><h1 className="sr-only">Wat moet ik doen om werkdruk te inventariseren en te beheersen?</h1>
 <div className={`workspace ${selected==='model'?'model-workspace':''}`}><section className="process-column" hidden={!menuOpen} id="process" aria-label="Procesoverzicht">
 <button className={`context-button ${selected==='wet'?'selected':''}`} data-step="wet" aria-current={selected==='wet'?'step':undefined} onClick={e=>select('wet',e)}><span className="context-symbol" aria-hidden="true">§</span><span>Welke wettelijke eisen gelden?</span>{selectedMark('wet')}</button>{inline('wet')}
 <div className="route-start"><span className="endpoint"/><span>Begin bij het werk en de signalen</span></div>
 <ol className="process-route">{FLOW.map((s,i)=><li key={s.id} className="process-item"><button className={`process-step ${selected===s.id?'selected':''}`} data-step={s.id} aria-current={selected===s.id?'step':undefined} onClick={e=>select(s.id,e)}><span className="step-no">0{i+1}</span><span className="step-label"><b>{s.title}</b><small>{s.short}</small></span>{selectedMark(s.id)}</button>{inline(s.id)}{i===1&&<div className="branch"><span className="branch-sign" aria-hidden="true">↳</span><p>Onvoldoende inzicht?<button onClick={e=>select('inventariseren',e)}>Onderzoek aanvullen ↶</button></p></div>}{i===2&&<div className="branch"><span className="branch-sign" aria-hidden="true">↳</span><p>Niet passend of niet uitgevoerd?<button onClick={e=>select('beheersen',e)}>Aanpak aanpassen ↶</button></p></div>}{i===3&&<div className="branch"><span className="branch-sign" aria-hidden="true">↳</span><p>Onvoldoende effect?<button onClick={e=>select('beoordelen',e)}>Oorzaak onderzoeken & bijstellen ↶</button></p></div>}</li>)}</ol>
 <div className="ongoing"><p className="eyebrow">IN DE HELE CYCLUS</p>{[['voorlichting','Voorlichten & instrueren'],['toezicht','Toezicht houden']].map(([id,label])=><React.Fragment key={id}><button className={`ongoing-button ${selected===id?'selected':''}`} data-step={id} aria-current={selected===id?'step':undefined} onClick={e=>select(id,e)}><span>{label}</span>{selectedMark(id)}</button>{inline(id)}</React.Fragment>)}</div>
 <div className="route-end"><span className="endpoint"/><span>Resultaat: onderbouwde en geborgde aanpak<br/><small>Blijf volgen en stel bij wanneer nodig.</small></span></div>
 <button className="inspect-link" data-step="inspectie" onClick={e=>select('inspectie',e)} aria-current={selected==='inspectie'?'step':undefined}>Hoe controleert de inspecteur dit? →</button>{inline('inspectie')}
 {mobile&&menuOpen&&showMobile&&['model','bronnen','ubes'].includes(selected)&&panel()}
 </section>{(!mobile||!menuOpen)&&<div className="detail-column">{panel()}</div>}</div>
 <footer className="page-footer"><span>Nederlandse Arbeidsinspectie · werkinstructie 2024</span><span>Onderwijsvertaling · HVK / MVK</span></footer></main>
 <dialog ref={dialog} onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}><div className="dialog-heading"><h2>Voorbeeld · {example?.title}</h2><button aria-label="Sluiten" onClick={()=>dialog.current.close()}>×</button></div><div className="dialog-content"><p className="eyebrow">FICTIEVE LESCASE</p><p>{example?.id==='beoordelen'?'De nachtdienst doet nauwelijks mee aan het MTO. Gesprekken wijzen op gemiste pauzes. Daarmee is er een aanwijzing voor onvoldoende herstel, maar omvang en oorzaak zijn nog niet voldoende vastgesteld. Onderzoek die groep gericht voordat je een volledig risicobeeld claimt.':example?.source.example}</p><a href="naslag.html#casus">Oefen met de volledige casus ↗</a></div></dialog>
 </>;
}

createRoot(document.getElementById('root')).render(<App/>);
