'use client';
import {useEffect,useRef,useState} from 'react';
import works from '@/lib/selected-work.json';
import skills from '@/lib/engineering-skills.json';
import technologies from '@/lib/technology-keywords.json';
import offerings from '@/lib/build-offerings.json';
import experience from '@/lib/experience-timeline.json';
import {galleries} from '@/lib/project-galleries';

type Props={lang:'en'|'fr';onLanguage:(lang:'en'|'fr')=>void;onProject:(id:string,trigger:HTMLElement)=>void};
const expertise=[
 {en:'AI engineering',fr:'Ingénierie IA',detail:'Computer vision, application integration and document intelligence.',detailFr:'Vision par ordinateur, intégration applicative et intelligence documentaire.'},
 {en:'Full-stack & backend',fr:'Full stack & backend',detail:'Web applications, Java and Python services, APIs and databases.',detailFr:'Applications web, services Java et Python, APIs et bases de données.'},
 {en:'DevOps & delivery',fr:'DevOps & déploiement',detail:'Reproducible environments, CI/CD, Linux and application delivery.',detailFr:'Environnements reproductibles, CI/CD, Linux et livraison applicative.'},
 {en:'3D & immersive applications',fr:'Applications 3D & immersives',detail:'Interactive real estate, digital twins, Unity and WebXR.',detailFr:'Immobilier interactif, jumeaux numériques, Unity et WebXR.'}
];
function Arrow(){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>}
function Plus(){return <svg className="mp-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>}
export default function MobilePortfolio({lang,onLanguage,onProject}:Props){
 const fr=lang==='fr';
 const [menuOpen,setMenuOpen]=useState(false);
 const header=useRef<HTMLElement>(null),toggle=useRef<HTMLButtonElement>(null);
 const text=(en:string,frText:string)=>fr?frText:en;
 const nav=[['m-work','Work','Projets'],['m-about','About','À propos'],['m-build','Expertise','Expertises'],['m-experience','Experience','Parcours'],['m-skills','Skills','Compétences'],['m-contact','Contact','Contact']];
 useEffect(()=>{
  function outside(e:PointerEvent){if(!header.current?.contains(e.target as Node))setMenuOpen(false)}
  function key(e:KeyboardEvent){if(e.key==='Escape'){setMenuOpen(false);toggle.current?.focus()}}
  if(!menuOpen)return;
  document.addEventListener('pointerdown',outside);document.addEventListener('keydown',key);
  return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',key)};
 },[menuOpen]);
 useEffect(()=>{
  const breakpoint=window.matchMedia('(min-width:1024px)');
  function resize(){if(breakpoint.matches)setMenuOpen(false)}
  // Existing external fragment links also reach the corresponding mobile content.
  function hash(){if(breakpoint.matches)return;const map:Record<string,string>={hero:'m-home',work:'m-work',who:'m-about',what:'m-build',ecosystem:'m-skills',experience:'m-experience','full-timeline':'m-experience',resume:'m-resume','contact-cta':'m-contact',archive:'m-archive'};const target=map[location.hash.slice(1)];if(target){const el=document.getElementById(target);if(el instanceof HTMLDetailsElement)el.open=true;el?.scrollIntoView({block:'start',behavior:'auto'})}}
  breakpoint.addEventListener('change',resize);window.addEventListener('hashchange',hash);hash();
  return()=>{breakpoint.removeEventListener('change',resize);window.removeEventListener('hashchange',hash)};
 },[]);
 function project(id:string,trigger:HTMLElement){setMenuOpen(false);onProject(id,trigger)}
 function workCard(work:typeof works[number]){return <article className="mp-project" key={work.id}>
  <button type="button" className="mp-project-open" onClick={e=>project(work.id,e.currentTarget)} aria-label={text('Read case study: ','Voir le projet : ')+work.title}>
   <span className="mp-project-heading"><span><span className="mp-kicker">{(fr?work.labelFr:work.label).replace(/^\d+ \/ /,'')}</span><span className="mp-project-title">{work.title}</span></span>{work.img?<img src={'/media/'+work.img} alt="" width="160" height="120" loading="lazy"/>:<span className="mp-project-arrow"><Arrow/></span>}</span>
   <span className="mp-project-description">{fr?work.descFr:work.desc}</span>
   <span className="mp-project-bottom"><span>{work.signal}</span><span>{text('Case study','Le projet')} <Arrow/></span></span>
  </button>
 </article>}
 function skillCard(skill:typeof skills[number]){return <details className="mp-skill" key={skill.title}>
  <summary><span><span className="mp-skill-title">{fr?skill.titleFr:skill.title}</span><span className="mp-skill-preview">{skill.tools.split(' / ').slice(0,3).join(' · ')}</span></span><Plus/></summary>
  <div className="mp-detail-body"><p>{fr?skill.descFr:skill.desc}</p><ul className="mp-chips">{skill.tools.split(' / ').map(tool=><li key={tool}>{tool}</li>)}</ul></div>
 </details>}
 return <div className="mobile-portfolio">
  <a className="mp-skip" href="#m-main">{text('Skip to content','Aller au contenu')}</a>
  <header className="mp-header" ref={header}>
   <div className="mp-header-inner"><a className="mp-brand" href="#m-home" onClick={()=>setMenuOpen(false)}>Yassir Aitali</a>
    <div className="mp-header-actions"><button className="mp-language" type="button" onClick={()=>onLanguage(fr?'en':'fr')} aria-label={fr?'Switch to English':'Passer en français'}>{fr?'EN':'FR'}</button>
     <button className="mp-menu-toggle" ref={toggle} type="button" aria-expanded={menuOpen} aria-controls="mp-navigation" aria-label={menuOpen?text('Close navigation','Fermer la navigation'):text('Open navigation','Ouvrir la navigation')} onClick={()=>setMenuOpen(open=>!open)}><span>{menuOpen?text('Close','Fermer'):'Menu'}</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{menuOpen?<path d="m6 6 12 12M6 18 18 6"/>:<path d="M4 8h16M4 16h16"/>}</svg></button>
    </div>
   </div>
   <nav id="mp-navigation" className="mp-menu" hidden={!menuOpen} aria-label={text('Mobile navigation','Navigation mobile')}>
    <div className="mp-menu-grid">{nav.map(([id,en,frText])=><a key={id} href={'#'+id} onClick={()=>setMenuOpen(false)}>{text(en,frText)}<Arrow/></a>)}</div>
    <a className="mp-menu-resume" href="/cv/Yassir-Aitali-Software-Engineer.pdf" download onClick={()=>setMenuOpen(false)}>{text('Download CV','Télécharger le CV')}<Arrow/></a>
   </nav>
  </header>
  <main id="m-main" className="mp-main">
   <section id="m-home" className="mp-hero mp-wrap" aria-labelledby="m-title">
    <p className="mp-kicker">{text('Marrakech, Morocco','Marrakech, Maroc')}</p>
    <h1 id="m-title">Yassir Aitali<span>{text('Software / AI Engineer','Ingénieur logiciel / IA')}</span></h1>
    <p className="mp-hero-description">{text('I build AI-powered applications, reliable backends and interactive digital experiences.','Je développe des applications intégrant l’IA, des backends fiables et des expériences numériques interactives.')}</p>
    <ul className="mp-domains" aria-label={text('Engineering focus','Domaines d’expertise')}><li>{text('AI engineering','Ingénierie IA')}</li><li>{text('Full stack','Full stack')}</li><li>DevOps</li></ul>
    <div className="mp-hero-actions"><a className="mp-button mp-button-primary" href="#m-work">{text('View work','Voir les projets')}<Arrow/></a><a className="mp-button mp-button-secondary" href="#m-contact">Contact<Arrow/></a></div>
    <div className="mp-hero-technologies"><ul className="mp-chips" aria-label={text('Core technologies','Technologies clés')}>{technologies.mobileHighlights.map(keyword=><li key={keyword}>{keyword}</li>)}</ul><a href="#m-skills">{text('View the full technology stack','Voir toutes les technologies')}<Arrow/></a></div>
    <div className="mp-hero-proof"><span>EMSI · 2026</span><span>Java · Python · TypeScript</span></div>
   </section>
   <section id="m-work" className="mp-section mp-wrap" aria-labelledby="m-work-title">
    <div className="mp-section-heading"><p className="mp-kicker">01 / {text('Selected work','Projets sélectionnés')}</p><h2 id="m-work-title">{text('Engineering, in practice.','L’ingénierie, en pratique.')}</h2><p>{text('AI, full-stack systems and application delivery.','IA, systèmes full stack et livraison applicative.')}</p></div>
    <div className="mp-project-list">{works.slice(0,4).map(workCard)}</div>
    <details className="mp-more-work"><summary>{text('View all 8 projects','Voir les 8 projets')}<Plus/></summary><div className="mp-project-list">{works.slice(4).map(workCard)}</div></details>
    <details id="m-archive" className="mp-archive"><summary>{text('Project archive & 3D work','Archives & projets 3D')}<Plus/></summary><div className="mp-archive-links">{galleries.filter(g=>!works.some(w=>w.id===g.id)).map(g=><button type="button" key={g.id} onClick={e=>project(g.id,e.currentTarget)}>{g.title}<Arrow/></button>)}<a href="https://github.com/YasserAet" target="_blank" rel="noopener noreferrer">{text('More source code on GitHub','Plus de code sur GitHub')}<Arrow/></a></div></details>
   </section>
   <section id="m-build" className="mp-section mp-wrap" aria-labelledby="m-build-title"><div className="mp-section-heading"><p className="mp-kicker">02 / {text('Expertise','Expertises')}</p><h2 id="m-build-title">{text('What I build.','Ce que je développe.')}</h2><p>{text('Explore the capabilities behind the projects.','Découvrez les compétences derrière les projets.')}</p></div>
    <div className="mp-accordion-list">{expertise.map((item,i)=><details className="mp-expertise" key={item.en}><summary><span className="mp-accordion-number">0{i+1}</span><span>{text(item.en,item.fr)}</span><Plus/></summary><div className="mp-detail-body"><p>{text(item.detail,item.detailFr)}</p><ul className="mp-offerings">{offerings[i].items.map(([en,frText])=><li key={en}>{text(en,frText)}</li>)}</ul></div></details>)}</div>
   </section>
   <section id="m-skills" className="mp-section mp-wrap" aria-labelledby="m-skills-title"><div className="mp-section-heading"><p className="mp-kicker">03 / {text('Technology','Technologies')}</p><h2 id="m-skills-title">{text('My engineering toolkit.','Mes outils d’ingénierie.')}</h2></div><div className="mp-accordion-list">{technologies.groups.map(group=><details className="mp-skill" key={group.id}><summary><span><span className="mp-skill-title">{fr?group.titleFr:group.title}</span><span className="mp-skill-preview">{group.keywords.slice(0,3).join(' · ')}</span></span><Plus/></summary><div className="mp-detail-body"><p>{fr?group.descriptionFr:group.description}</p><ul className="mp-chips">{group.keywords.map(keyword=><li key={keyword}>{keyword}</li>)}</ul></div></details>)}</div><details className="mp-more-skills"><summary>{text('Engineering skills & technical detail','Compétences & détails techniques')}<Plus/></summary><div className="mp-accordion-list">{skills.map(skillCard)}</div></details></section>
   <section id="m-experience" className="mp-section mp-wrap" aria-labelledby="m-experience-title"><div className="mp-section-heading"><p className="mp-kicker">04 / {text('Experience','Parcours')}</p><h2 id="m-experience-title">{text('Where I’ve contributed.','Mes expériences.')}</h2></div><ol className="mp-experience-list">{experience.map(item=><li key={item.company}><details className="mp-experience"><summary><span><span className="mp-kicker">{fr?item.dateFr:item.date}</span><span className="mp-company">{item.company}</span><span className="mp-role">{fr?item.roleFr:item.role}</span></span><Plus/></summary><div className="mp-detail-body"><p className="mp-location">{fr?item.locationFr:item.location}</p><p>{fr?item.contextFr:item.context}</p><ul className="mp-offerings">{item.contributions.map(([en,frText])=><li key={en}>{text(en,frText)}</li>)}</ul><button className="mp-text-button" type="button" onClick={e=>project(item.project,e.currentTarget)}>{text('Explore the related work','Voir le projet associé')}<Arrow/></button></div></details></li>)}</ol></section>
   <section id="m-about" className="mp-section mp-wrap" aria-labelledby="m-about-title"><div className="mp-section-heading"><p className="mp-kicker">05 / {text('About','À propos')}</p><h2 id="m-about-title">{text('Software, AI & real-time systems.','Logiciel, IA & systèmes temps réel.')}</h2></div><div className="mp-about-copy"><p>{text('I’m a software engineer based in Marrakech, with an engineering degree from EMSI and specialized VR training at IDC / UM6P.','Ingénieur logiciel basé à Marrakech, je suis diplômé de l’EMSI et formé au développement VR à l’IDC / UM6P.')}</p><p>{text('My work connects computer vision, APIs, databases and live interfaces. I care about clear architecture, usable products and reliable delivery.','Mon travail relie vision par ordinateur, APIs, bases de données et interfaces temps réel. Je privilégie une architecture claire, des produits utiles et une livraison fiable.')}</p></div>
    <div id="m-resume" className="mp-resume"><h3>{text('Education & CV','Formation & CV')}</h3><ul className="mp-education"><li><span>2026</span>{text('Engineering · MIAGE, EMSI','Ingénieur · MIAGE, EMSI')}</li><li><span>2023</span>{text('VR development · IDC / UM6P','Développement VR · IDC / UM6P')}</li><li><span>2022</span>{text('BTS · Multimedia & Web Design','BTS · Multimédia & Web Design')}</li></ul><a href="/cv/Yassir-Aitali-Software-Engineer.pdf" download>{text('Software engineering CV','CV ingénieur logiciel')}<Arrow/></a><a href="/cv/Yassir-Aitali-XR-Engineer.pdf" download>{text('Unity / XR CV','CV Unity / XR')}<Arrow/></a></div>
   </section>
   <section id="m-contact" className="mp-contact mp-wrap" aria-labelledby="m-contact-title"><p className="mp-kicker">06 / Contact</p><h2 id="m-contact-title">{text('Let’s build something useful.','Créons quelque chose d’utile.')}</h2><p>{text('Have a project or a role in mind? Let’s talk.','Un projet ou une opportunité ? Échangeons.')}</p><a className="mp-button mp-button-primary" href="mailto:yasseraitali@outlook.fr">{text('Email Yassir','Contacter Yassir')}<Arrow/></a><a className="mp-email" href="mailto:yasseraitali@outlook.fr">yasseraitali@outlook.fr</a><div className="mp-socials"><a href="https://github.com/YasserAet" target="_blank" rel="noopener noreferrer">GitHub<Arrow/></a><a href="https://www.linkedin.com/in/aitali-yassir/" target="_blank" rel="noopener noreferrer">LinkedIn<Arrow/></a></div></section>
  </main>
  <footer className="mp-footer mp-wrap"><p>© 2026 Yassir Aitali.<br/>Software / AI Engineer</p><a href="#m-home" aria-label={text('Back to top','Retour en haut')}>↑</a></footer>
 </div>
}
