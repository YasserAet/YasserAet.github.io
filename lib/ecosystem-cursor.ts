/** Local target cursor for the reference's cursor-target technology rows. */
export function installEcosystemCursor(host:HTMLElement){
 const section=host.querySelector<HTMLElement>('#ecosystem');if(!section)return()=>{};
 const fine=window.matchMedia('(hover: hover) and (pointer: fine)');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const overlay=document.createElement('div');overlay.className='ecosystem-target';overlay.setAttribute('aria-hidden','true');
 const corners=document.createElement('div');corners.className='ecosystem-target-corners';
 for(let i=0;i<4;i++){const corner=document.createElement('span');corner.className='ecosystem-target-corner';corners.appendChild(corner)}
 const dot=document.createElement('span');dot.className='ecosystem-target-dot';overlay.appendChild(corners);overlay.appendChild(dot);document.body.appendChild(overlay);
 let frame=0,position:{x:number;y:number;target:HTMLElement|null}|null=null;
 function hide(){position=null;if(frame){cancelAnimationFrame(frame);frame=0}overlay.classList.remove('is-visible','is-locked');section?.removeAttribute('data-target-cursor')}
 function paint(){frame=0;if(!position||!fine.matches||reduced.matches){hide();return}const {x,y,target}=position;let left=x-12,top=y-12,width=24,height=24;
  if(target?.isConnected){const box=target.getBoundingClientRect();left=box.left-5;top=box.top-5;width=box.width+10;height=box.height+10}
  overlay.classList.toggle('is-locked',!!target);overlay.classList.add('is-visible');overlay.style.transform=`translate3d(${left}px,${top}px,0)`;overlay.style.width=width+'px';overlay.style.height=height+'px';section?.setAttribute('data-target-cursor','active');
 }
 function move(event:PointerEvent){if(event.pointerType==='touch'||!fine.matches||reduced.matches){hide();return}const target=event.target instanceof Element?event.target.closest<HTMLElement>('.ecosystem-link'):null;position={x:event.clientX,y:event.clientY,target};if(!frame)frame=requestAnimationFrame(paint)}
 function leave(event:PointerEvent){if(!section?.contains(event.relatedTarget as Node|null))hide()}
 section.addEventListener('pointermove',move);section.addEventListener('pointerleave',leave);section.addEventListener('click',hide);window.addEventListener('scroll',hide,{passive:true});window.addEventListener('resize',hide);window.addEventListener('blur',hide);fine.addEventListener('change',hide);reduced.addEventListener('change',hide);
 return()=>{hide();overlay.remove();section.removeEventListener('pointermove',move);section.removeEventListener('pointerleave',leave);section.removeEventListener('click',hide);window.removeEventListener('scroll',hide);window.removeEventListener('resize',hide);window.removeEventListener('blur',hide);fine.removeEventListener('change',hide);reduced.removeEventListener('change',hide)};
}
