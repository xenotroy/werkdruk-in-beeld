import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreUbes,classifyUbes,ubesSuggestions,UBES_DIMENSIONS} from '../src/ubes-scoring.js';
test('official short-form item order maps to all three dimensions',()=>{
 const r=scoreUbes([1,2,3,4,5,6,0,1,2]);
 assert.equal(r.vitality.rawMean,8/3);
 assert.equal(r.dedication.rawMean,7/3);
 assert.equal(r.absorption.rawMean,3);
 assert.equal(r.total.rawMean,24/9);
});
test('no answer is silently converted to zero',()=>{
 for(const invalid of [[0,0],Array(9).fill(null),Array(9).fill('0'),[0,0,0,0,0,0,0,0,NaN],[0,0,0,0,0,0,0,0,6.1],[0,0,0,0,0,0,0,0,-1]])assert.throws(()=>scoreUbes(invalid));
 assert.equal(scoreUbes(Array(9).fill(0)).total.score,0);
 assert.equal(scoreUbes(Array(9).fill(6)).total.score,6);
});
test('rounded third fractions follow printed reference intervals',()=>{
 assert.equal(classifyUbes('dedication',4/3).label,'Zeer laag');
 assert.equal(classifyUbes('absorption',16/3).label,'Hoog');
 assert.equal(classifyUbes('total',42/9).label,'Hoog');
});
test('all attainable scores have a monotone classification',()=>{
 for(const [key,d] of Object.entries(UBES_DIMENSIONS)){
  let previous=-1;
  for(let sum=0;sum<=6*d.items.length;sum++){
   const current=classifyUbes(key,sum/d.items.length);assert.ok(current.rank>=previous);previous=current.rank;
   assert.ok(current.score>=0&&current.score<=6);
  }
 }
});
test('every printed boundary changes at the next hundredth',()=>{
 for(const [key,d] of Object.entries(UBES_DIMENSIONS))d.upper.forEach((cut,i)=>{
  assert.equal(classifyUbes(key,cut).rank,i);
  assert.equal(classifyUbes(key,cut+.01).rank,i+1);
 });
});
test('advice covers each dimension at low, average and high reference scores',()=>{
 for(const value of [0,4,6]){
  const advice=ubesSuggestions(scoreUbes(Array(9).fill(value)));
  assert.deepEqual(advice.map(x=>x.dimension),['vitality','dedication','absorption']);
  assert.ok(advice.every(x=>x.title&&x.text));
 }
});
