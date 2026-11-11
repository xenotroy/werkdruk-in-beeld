import React, {useRef} from 'react';

const frame={left:54,right:350,top:58,bottom:292};
const clamp=n=>Math.max(0,Math.min(10,Math.round(n*10)/10));
export const modelNumber=n=>n.toLocaleString('nl-NL',{maximumFractionDigits:1});

// Een bedieningsvlak voor de onderwijsmetafoor, geen empirisch JD-R-rekenmodel.
export default function DemandResourcePlot({demands,resources,recovery,onMove}){
 const plot=useRef(null),point=useRef(null),dragging=useRef(null);
 const x=frame.left+resources/10*(frame.right-frame.left);
 const y=frame.bottom-demands/10*(frame.bottom-frame.top);
 function coordinates(e){
  const matrix=plot.current.getScreenCTM();
  if(!matrix)return null;
  const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(matrix.inverse());
  return {x:p.x,y:p.y};
 }
 function update(p){onMove(clamp((frame.bottom-p.y)/(frame.bottom-frame.top)*10),clamp((p.x-frame.left)/(frame.right-frame.left)*10))}
 function start(e){
  if(e.pointerType==='mouse'&&e.button!==0)return;
  const p=coordinates(e);
  if(!p||p.x<frame.left-20||p.x>frame.right+20||p.y<frame.top-20||p.y>frame.bottom+20)return;
  e.preventDefault();dragging.current=e.pointerId;
  plot.current.setPointerCapture(e.pointerId);point.current.focus({preventScroll:true});update(p);
 }
 function move(e){if(dragging.current!==e.pointerId)return;const p=coordinates(e);if(p)update(p)}
 function stop(e){if(dragging.current!==e.pointerId)return;dragging.current=null;if(plot.current.hasPointerCapture(e.pointerId))plot.current.releasePointerCapture(e.pointerId)}
 function key(e){
  const step=e.shiftKey ? 0.1 : 1;
  const changes={ArrowUp:[step,0],ArrowDown:[-step,0],ArrowRight:[0,step],ArrowLeft:[0,-step]};
  if(!changes[e.key])return;
  e.preventDefault();onMove(clamp(demands+changes[e.key][0]),clamp(resources+changes[e.key][1]));
 }
 return <div className="load-plot">
  <svg ref={plot} className="load-plot-svg" viewBox="0 0 390 360" role="group" aria-label="Grafiek: belasting en belastbaarheid" onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={()=>{dragging.current=null}}>
   <text x="54" y="19" className="plot-axis-title">Belasting</text>
   {[0,2.5,5,7.5,10].map(n=><g key={n} aria-hidden="true"><line x1={frame.left} x2={frame.right} y1={frame.bottom-n/10*(frame.bottom-frame.top)} y2={frame.bottom-n/10*(frame.bottom-frame.top)} className="plot-grid"/><line y1={frame.top} y2={frame.bottom} x1={frame.left+n/10*(frame.right-frame.left)} x2={frame.left+n/10*(frame.right-frame.left)} className="plot-grid"/></g>)}
   <path d={`M${frame.left} ${frame.top-5} V${frame.bottom} H${frame.right+5}`} className="plot-axis"/>
   {[0,5,10].map(n=><g key={n} aria-hidden="true"><text x="42" y={frame.bottom-n/10*(frame.bottom-frame.top)+4} textAnchor="end" className="plot-tick">{n}</text><text x={frame.left+n/10*(frame.right-frame.left)} y="311" textAnchor="middle" className="plot-tick">{n}</text></g>)}
   <path d={`M${frame.left} ${y} H${x} V${frame.bottom}`} className="plot-projection"/>
   <circle cx={frame.left} cy={y} r="3" fill="var(--blue-slate)"/><circle cx={x} cy={frame.bottom} r="3" fill="var(--blue-slate)"/>
   <g ref={point} tabIndex="0" role="button" className="plot-point" aria-roledescription="versleepbaar punt" aria-label={`Situatie: belasting ${modelNumber(demands)}, belastbaarheid ${modelNumber(resources)}, herstelruimte ${modelNumber(recovery)} op 10`} aria-describedby="plot-help" onKeyDown={key}>
    <circle cx={x} cy={y} r="24" fill="transparent"/>
    <circle cx={x} cy={y} r="21" fill="var(--surface)" className="plot-focus-ring"/>
    <circle cx={x} cy={y} r="15" fill="none" stroke="var(--line)" strokeWidth="5"/>
    <circle cx={x} cy={y} r="15" fill="none" stroke="var(--recovery-ink)" strokeWidth="5" pathLength="100" strokeDasharray={`${recovery*10} 100`} transform={`rotate(-90 ${x} ${y})`}/>
    <circle cx={x} cy={y} r="7" fill="var(--blue-slate)"/>
   </g>
   <text x="350" y="336" textAnchor="end" className="plot-axis-title">Belastbaarheid →</text>
  </svg>
  <p className="sr-only" id="plot-help">Sleep of tik · pijltjestoetsen voor kleine stappen.</p>
 </div>
}
