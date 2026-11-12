import React from 'react';
import {FACTORS,changeFactor,weightedMean} from './model-weights.js';
import {modelNumber} from './demand-resource-plot.jsx';
export default function ModelWeights({state,setState,open,setOpen,sectionRef}) {
 return <section className="weight-section" ref={sectionRef}>
  <button className="weight-toggle" aria-expanded={open} aria-controls="weight-controls" onClick={()=>setOpen(!open)}>Persoonlijke weging <span aria-hidden="true">{open?'−':'+'}</span></button>
  {open&&<div id="weight-controls">
   <p className="weight-intro">Dezelfde werksituatie kan voor ieder anders wegen.</p>
   <div className="weight-columns">{Object.entries(FACTORS).map(([group,labels])=><fieldset key={group}>
    <legend>{group==='eisen'?'Taakeisen':'Hulpbronnen'} <output>{modelNumber(weightedMean(state.factors[group]))} / 10</output></legend>
    <div className="weight-column-labels" aria-hidden="true"><span>{group==='eisen'?'Hoeveel vraagt het?':'Hoeveel is beschikbaar?'}</span><span>Telt voor mij</span></div>
    {labels.map((label,i)=>{const row=state.factors[group][i],id=`factor-${group}-${i}`;return <div className="factor-row" key={label}>
     <div className="factor-level"><label htmlFor={id}>{label} <output>{modelNumber(row.level)}</output></label><input id={id} type="range" min="0" max="10" step="0.1" value={row.level} aria-valuetext={`${modelNumber(row.level)} van 10`} onChange={e=>setState(s=>changeFactor(s,group,i,'level',e.target.value))}/></div>
     <select aria-label={`Weging ${label}`} value={row.weight} onChange={e=>setState(s=>changeFactor(s,group,i,'weight',e.target.value))}><option value="1">1 ×</option><option value="2">2 ×</option><option value="3">3 ×</option></select>
    </div>})}
   </fieldset>)}</div>
   <details className="fold weight-method"><summary><span>Hoe werkt deze weging?</span><span className="disclosure" aria-hidden="true"/></summary><div className="fold-body"><p>1 × telt gewoon mee; 2 × dubbel; 3 × driemaal. De modelstand is het gewogen gemiddelde: som van hoeveelheid × gewicht, gedeeld door de som van de gewichten.</p><p>De gewichten zijn relatief. Een groter gewicht trekt de stand naar die factor; als alle hoeveelheden gelijk zijn verandert de stand niet. Deze lesoefening is geen gevalideerde meting of risicobeoordeling.</p><p>Slepen in de grafiek verschuift de hoeveelheden samen; gewichten blijven behouden. Een scenario begint opnieuw met gelijke gewichten. Herstel blijft apart.</p></div></details>
  </div>}
 </section>
}
