/** Hover behavior recovered from the supplied Aaftab build, implemented without its app runtime. */
export function installReferenceHover(host:HTMLElement){
 const fine=window.matchMedia('(hover: hover) and (pointer: fine)');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const disposers:Array<()=>void>=[];
 const running=new Map<HTMLElement,Animation>();
 const expo='cubic-bezier(.16,1,.3,1)',power3='cubic-bezier(.215,.61,.355,1)';
 let disposed=false;
 function listen(element:EventTarget,type:string,handler:EventListener){element.addEventListener(type,handler);disposers.push(()=>element.removeEventListener(type,handler));}
 function motion(element:HTMLElement,transform:string,duration:number,opacity?:number,easing=expo){
  const previous=running.get(element),current=getComputedStyle(element);
  const from:Keyframe={transform:current.transform};
  if(opacity!==undefined)from.opacity=current.opacity;
  previous?.cancel();
  element.style.transform=transform;if(opacity!==undefined)element.style.opacity=String(opacity);
  if(reduced.matches||!duration)return;
  const to:Keyframe={transform};if(opacity!==undefined)to.opacity=opacity;
  const animation=element.animate([from,to],{duration,easing});running.set(element,animation);
  animation.onfinish=()=>{if(running.get(element)===animation)running.delete(element)};
 }
 // The original navigation uses an expanding circle and two vertically rolling labels.
 const pills=Array.from(host.querySelectorAll<HTMLAnchorElement>('nav[aria-label="Primary"] a'));
 const pillSizes=new Map<HTMLAnchorElement,{circle:HTMLElement;label:HTMLElement;hover:HTMLElement;height:number}>();
 function measurePills(){
  pills.forEach(link=>{
   const circle=link.firstElementChild as HTMLElement|null,label=link.querySelector<HTMLElement>('.pill-label'),hover=link.querySelector<HTMLElement>('.pill-label-hover');
   if(!circle||!label||!hover)return;
   const {width,height}=link.getBoundingClientRect();if(!width||!height)return;
   const radius=(width*width/4+height*height)/(2*height),size=Math.ceil(2*radius)+2;
   const below=Math.ceil(radius-Math.sqrt(Math.max(0,radius*radius-width*width/4)))+1;
   circle.classList.add('reference-pill-circle');
   Object.assign(circle.style,{width:size+'px',height:size+'px',bottom:-below+'px',transformOrigin:`50% ${size-below}px`});
   pillSizes.set(link,{circle,label,hover,height});
   if(link.dataset.pillActive!=='true'){circle.style.transform='translateX(-50%) scale(0)';label.style.transform='translateY(0)';hover.style.transform=`translateY(${height+100}px)`;hover.style.opacity='0';}
  });
 }
 function pill(link:HTMLAnchorElement,open:boolean){const p=pillSizes.get(link);if(!p)return;link.dataset.pillActive=String(open);const duration=open?300:200;motion(p.circle,`translateX(-50%) scale(${open?1.2:0})`,duration,undefined,power3);motion(p.label,`translateY(${open?-(p.height+8):0}px)`,duration,undefined,power3);motion(p.hover,`translateY(${open?0:p.height+100}px)`,duration,open?1:0,power3);}
 pills.forEach(link=>{
  listen(link,'pointerenter',()=>{if(fine.matches)pill(link,true)});
  listen(link,'pointerleave',()=>{if(document.activeElement!==link)pill(link,false)});
  listen(link,'focus',()=>pill(link,true));
  listen(link,'blur',()=>{if(!link.matches(':hover'))pill(link,false)});
 });
 // Project marquees use the nearest entry/exit edge, 600ms expo easing and a counter-moving inner layer.
 const marquees=Array.from(host.querySelectorAll<HTMLElement>('.work-row')).map(row=>({row,link:row.querySelector<HTMLAnchorElement>('a')!,overlay:row.querySelector<HTMLElement>('.work-marquee')!,offset:row.querySelector<HTMLElement>('.work-marquee-offset')!,track:row.querySelector<HTMLElement>('.work-marquee-track')!}));
 function measureMarquees(){marquees.forEach(({track})=>{
  const first=track?.querySelector<HTMLElement>('.marquee-part');if(!first)return;
  const width=first.getBoundingClientRect().width;if(!width)return;
  const wanted=Math.max(4,Math.ceil(innerWidth/width)+2);
  while(track.children.length<wanted)track.appendChild(first.cloneNode(true));
  while(track.children.length>wanted)track.lastElementChild?.remove();
  track.style.setProperty('--ticker-width',width+'px');
 });}
 marquees.forEach(({row,overlay,offset})=>{
  if(!overlay||!offset)return;
  function reveal(open:boolean,event?:PointerEvent){
   const box=row.getBoundingClientRect();const direction=event&&event.clientY-box.top<box.height/2?-1:1;
   if(open){running.get(overlay)?.cancel();running.get(offset)?.cancel();overlay.style.transform=`translateY(${direction*101}%)`;offset.style.transform=`translateY(${-direction*101}%)`;}
   motion(overlay,`translateY(${open?0:direction*101}%)`,600);
   motion(offset,`translateY(${open?0:-direction*101}%)`,600);
  }
  listen(row,'pointerenter',((event:PointerEvent)=>{if(fine.matches)reveal(true,event)}) as EventListener);
  listen(row,'pointerleave',((event:PointerEvent)=>{if(fine.matches)reveal(false,event)}) as EventListener);
  listen(row,'focusin',()=>reveal(true));
  listen(row,'focusout',((event:FocusEvent)=>{if(!row.contains(event.relatedTarget as Node))reveal(false)}) as EventListener);
 });
 // Original magnetic CTA settings: 60px proximity, displacement / 5, .3s active and .5s return.
 const magnets=Array.from(host.querySelectorAll<HTMLElement>('[data-reference-magnet]')).map(outer=>({outer,inner:outer.querySelector<HTMLElement>('[data-magnet-inner]')!})).filter(x=>x.inner);
 // Original footer proximity: font weight 300 → 900 over a 220px linear radius.
 const footer=host.querySelector<HTMLElement>('footer [aria-hidden="true"].overflow-hidden');
 const footerRows=footer?Array.from(footer.children).filter((e):e is HTMLElement=>e instanceof HTMLElement):[];
 const originalFooter=footerRows.map(row=>row.innerHTML);
 const letters:HTMLElement[]=[];
 footerRows.forEach(row=>{const text=row.textContent??'';row.textContent='';row.classList.add('reference-variable-name');for(const char of text){const span=document.createElement('span');span.textContent=char;span.className='reference-variable-letter';row.appendChild(span);letters.push(span)}});
 let pointer:{x:number;y:number}|null=null,pointerFrame=0;
 function resetPointer(){pointer=null;magnets.forEach(({inner})=>{inner.style.transition='transform 0.5s ease-in-out';inner.style.transform='translate3d(0px,0px,0)'});letters.forEach(letter=>letter.style.fontVariationSettings="'wght' 300");}
 function pointerEffects(){pointerFrame=0;if(!pointer||!fine.matches||reduced.matches){resetPointer();return;}
  const {x,y}=pointer;
  magnets.forEach(({outer,inner})=>{const box=outer.getBoundingClientRect(),dx=x-box.left-box.width/2,dy=y-box.top-box.height/2;const near=Math.abs(dx)<box.width/2+60&&Math.abs(dy)<box.height/2+60;inner.style.transition=near?'transform 0.3s ease-out':'transform 0.5s ease-in-out';inner.style.transform=`translate3d(${near?dx/5:0}px,${near?dy/5:0}px,0)`});
  if(footer){const box=footer.getBoundingClientRect();if(box.top<innerHeight+220&&box.bottom>-220)letters.forEach(letter=>{const r=letter.getBoundingClientRect(),distance=Math.hypot(x-r.left-r.width/2,y-r.top-r.height/2);const weight=300+600*Math.max(0,Math.min(1,1-distance/220));letter.style.fontVariationSettings=`'wght' ${weight.toFixed(1)}`;});}
 }
 listen(window,'pointermove',((event:PointerEvent)=>{if(event.pointerType==='touch')return;pointer={x:event.clientX,y:event.clientY};if(!pointerFrame)pointerFrame=requestAnimationFrame(pointerEffects)}) as EventListener);
 listen(document,'pointerout',((event:PointerEvent)=>{if(!event.relatedTarget)resetPointer()}) as EventListener);
 listen(window,'blur',resetPointer);
 function resize(){measurePills();measureMarquees();}
 listen(window,'resize',resize);listen(reduced,'change',resetPointer);listen(fine,'change',resetPointer);
 const observer=new ResizeObserver(resize);pills.forEach(link=>observer.observe(link));
 resize();document.fonts?.ready.then(()=>{if(!disposed)resize()}).catch(()=>{});
 return()=>{disposed=true;disposers.forEach(fn=>fn());observer.disconnect();running.forEach(animation=>animation.cancel());if(pointerFrame)cancelAnimationFrame(pointerFrame);resetPointer();footerRows.forEach((row,i)=>{row.innerHTML=originalFooter[i]});};
}
