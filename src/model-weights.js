// Onderwijsrekenregel: subjectieve relatieve gewichten, geen JD-R-meetschaal.
export const FACTORS = {
 eisen: ['Hoeveelheid & tempo', 'Emotionele belasting', 'Concentratie & verstoringen', 'Tegenstrijdige verwachtingen'],
 bronnen: ['Autonomie', 'Sociale steun', 'Competentie & middelen', 'Duidelijkheid & feedback']
};
const clamp = n => Math.min(10, Math.max(0, n));
export function weightedMean(rows) {
 if (!rows.length || rows.some(r => !Number.isFinite(r.level) || r.level < 0 || r.level > 10 || ![1,2,3].includes(r.weight))) throw new RangeError('Ongeldige factorweging.');
 return rows.reduce((sum,r) => sum + r.level*r.weight,0) / rows.reduce((sum,r) => sum+r.weight,0);
}
// Verplaats de globale situatie met behoud van onderlinge verschillen waar
// de grenzen dit toelaten. Gewichten blijven staan, ook bij 0 en 10.
export function moveFactors(rows, target) {
 if (!Number.isFinite(target) || target<0 || target>10) throw new RangeError('Ongeldige modelwaarde.');
 weightedMean(rows);
 let low=-10, high=10;
 for(let i=0;i<48;i++) {
  const shift=(low+high)/2;
  const moved=rows.map(r=>({...r,level:clamp(r.level+shift)}));
  if(weightedMean(moved)<target) low=shift; else high=shift;
 }
 return rows.map(r=>({...r,level:clamp(r.level+(low+high)/2)}));
}
export function freshModel(values=[9,3,3],preset='basis') {
 return {preset,values, factors:{
  eisen:moveFactors([10,9,9,8].map(level=>({level,weight:1})),values[0]),
  bronnen:moveFactors([2,3,3,4].map(level=>({level,weight:1})),values[1])
 }};
}
export function changeFactor(state,group,index,field,value) {
 if(!FACTORS[group] || !['level','weight'].includes(field) || !Number.isInteger(index) || index<0 || index>=FACTORS[group].length) throw new RangeError('Onbekende factor.');
 const rows=state.factors[group].map((r,i)=>i===index?{...r,[field]:Number(value)}:r);
 const mean=weightedMean(rows),axis=group==='eisen'?0:1;
 return {...state,preset:'eigen',factors:{...state.factors,[group]:rows},values:state.values.map((v,i)=>i===axis?mean:v)};
}
export function moveModel(state,demand,resource) {
 return {...state,preset:'eigen',values:[demand,resource,state.values[2]],factors:{
  eisen:moveFactors(state.factors.eisen,demand),bronnen:moveFactors(state.factors.bronnen,resource)
 }};
}
