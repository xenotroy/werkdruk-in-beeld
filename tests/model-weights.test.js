import test from 'node:test';
import assert from 'node:assert/strict';
import {weightedMean,freshModel,changeFactor,moveModel} from '../src/model-weights.js';
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`);
test('relatieve gewichten beïnvloeden verschillende hoeveelheden, niet gelijke hoeveelheden',()=>{
 close(weightedMean([{level:2,weight:1},{level:8,weight:3}]),6.5);
 close(weightedMean([{level:5,weight:1},{level:5,weight:3}]),5);
 assert.throws(()=>weightedMean([{level:4,weight:0}]),RangeError);
});
test('factorbewerking verandert alleen de juiste as; herstel blijft apart',()=>{
 const initial=freshModel();const s=changeFactor(initial,'eisen',0,'weight',3);
 close(s.values[0],56/6);close(s.values[1],3);assert.equal(s.values[2],3);
 assert.equal(initial.factors.eisen[0].weight,1);
 const next=changeFactor(s,'bronnen',0,'level',8);
 close(next.values[0],s.values[0]);close(next.values[1],4.5);
});
test('grafiek en factoren blijven gekoppeld met behoud van gewichten, ook bij grenzen',()=>{
 const s=changeFactor(freshModel(),'eisen',0,'weight',3);
 for(const d of [0,0.1,3.7,9.9,10])for(const r of [0,0.1,5,9.9,10]){
  const m=moveModel(s,d,r);
  close(weightedMean(m.factors.eisen),d);close(weightedMean(m.factors.bronnen),r);
  assert.equal(m.factors.eisen[0].weight,3);assert.equal(m.values[2],3);
  for(const rows of Object.values(m.factors))for(const row of rows)assert.ok(row.level>=0&&row.level<=10);
 }
});
