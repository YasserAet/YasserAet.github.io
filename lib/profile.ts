import originalEn from './original-en.json';
import originalFr from './original-fr.json';
export type Lang = 'en' | 'fr';
export const originals = {en:originalEn,fr:originalFr};
export const cvSoftware='/cv/Yassir-Aitali-Software-Engineer.pdf';
export const cvXR='/cv/Yassir-Aitali-XR-Engineer.pdf';
export const email='yasseraitali@outlook.fr';
export const github='https://github.com/YasserAet';
export const linkedin='https://www.linkedin.com/in/aitali-yassir/';
export const projectInfo = [
 {index:0,id:'twin',kind:['systems','xr'],title:'Industrial digital twin',titleFr:'Jumeau numérique industriel',subtitle:'Where physical systems meet live software.',subtitleFr:'Le réel, synchronisé avec le logiciel.',stack:['Python','FastAPI','Kafka','MQTT','Unity'],status:'Private · 2026',statusFr:'Confidentiel · 2026'},
 {index:2,id:'property',kind:['systems','xr'],title:'KEY ONE / Al-Moftah',titleFr:'KEY ONE / Al-Moftah',subtitle:'A different perspective on real estate.',subtitleFr:'Une autre perspective sur l’immobilier.',stack:['React','TypeScript','Three.js','WebXR'],status:'3D & full stack',statusFr:'3D & full stack'},
 {index:3,id:'parking',kind:['ai','systems'],title:'OPTIPARK',titleFr:'OPTIPARK',subtitle:'Computer vision, connected to a live dashboard.',subtitleFr:'La vision par ordinateur, en temps réel.',stack:['Python','OpenCV','Node.js','Vue'],status:'Prototype',statusFr:'Prototype'},
 {index:4,id:'pose',kind:['ai','xr'],title:'Body tracking / WebGL',titleFr:'Suivi corporel / WebGL',subtitle:'Turning movement into an interaction.',subtitleFr:'Transformer le mouvement en interaction.',stack:['Unity','C#','MediaPipe','WebSocket'],status:'UM6P Vanguard · 2023',statusFr:'UM6P Vanguard · 2023'},
 {index:1,id:'rag',kind:['ai','systems'],title:'Document intelligence',titleFr:'Intelligence documentaire',subtitle:'Exploring answers grounded in documents.',subtitleFr:'Des réponses ancrées dans les documents.',stack:['Next.js','FastAPI','Embeddings','ChromaDB'],status:'In progress',statusFr:'En cours'},
 {index:-1,id:'traffic',kind:['ai','systems'],title:'NOTRAFIC',titleFr:'NOTRAFIC',subtitle:'Making traffic data easier to understand.',subtitleFr:'Mieux comprendre les données du trafic.',stack:['Data processing','AI / ML','Visualization'],status:'Academic · 2025',statusFr:'Académique · 2025'},
];
export function getProject(id:string,lang:Lang){
 const meta=projectInfo.find(p=>p.id===id)!;
 const p=meta.index>=0?originals[lang].projects.featured[meta.index]:null;
 if(id==='twin') return {...meta,...p, title:lang==='en'?meta.title:meta.titleFr, built:lang==='en'?'Designed a distributed digital-twin architecture connecting Python/FastAPI services, PostgreSQL, Redis, Kafka and MQTT to GraphQL/WebSocket APIs and Unity supervision interfaces. Physical zones and virtual objects stay connected through real-time state.':'Conception d’une architecture distribuée de jumeau numérique : services Python/FastAPI, PostgreSQL, Redis, Kafka et MQTT, APIs GraphQL/WebSocket et interfaces de supervision Unity. Synchronisation des zones physiques et des objets virtuels en temps réel.'};
 if(p)return {...meta,...p,title:lang==='en'?meta.title:meta.titleFr};
 return {...meta,title:lang==='en'?meta.title:meta.titleFr,context:lang==='en'?'Academic intelligent traffic-management project, 2025.':'Projet académique de gestion intelligente du trafic, 2025.',problem:lang==='en'?'Understanding traffic flows requires processing and communicating complex data.':'Comprendre les flux de trafic nécessite de traiter et de rendre lisibles des données complexes.',built:lang==='en'?'An intelligent traffic-management application combining data processing, AI/ML prediction and traffic-flow visualization.':'Application de gestion intelligente du trafic combinant traitement des données, prédiction IA/ML et visualisation des flux.',demonstrates:lang==='en'?'Applied AI and data visualization for mobility.':'IA appliquée et visualisation de données pour la mobilité.',github:'',confidential:false};
}
export const profileFacts = {
 identity:'Yassir Aitali is a software engineer based in Marrakech, Morocco. Email yasseraitali@outlook.fr. GitHub https://github.com/YasserAet. LinkedIn https://www.linkedin.com/in/aitali-yassir/.',
 education:'Engineering degree in Computer Science / MIAGE, EMSI Marrakech, October 2023–2026 (graduated). VR Developer Diploma, IDC & VR Innovation Academy, UM6P, May 2023. BTS Multimedia and Web Design, Mohammed VI, July 2022.',
 experience:'DICE / UM6P, 2026: software engineering, distributed digital twins, Python/FastAPI, PostgreSQL, Redis, Kafka, MQTT, GraphQL, WebSocket, Unity supervision. Al-Moftah Real Estate, Muscat Oman, January 2026: full-stack web application with Three.js, WebGL, WebXR, Blender/glTF and cloud deployment. Al-Moftah academic project also appears in CV under 2024. UM6P Vanguard Center, August 2023: Unity C# body tracking, Python MediaPipe and WebSocket pipeline. Original portfolio lists SEOCOM full-stack developer, August 2021, PHP/JS/MySQL, REST and Linux deployment.',
 skills:'Python, TypeScript, JavaScript, Java, C#, PHP, SQL. FastAPI, Node.js, REST, GraphQL, WebSocket. React, Tailwind CSS, HTML/CSS, UX/UI. PostgreSQL, Redis, MySQL, MongoDB, SQLite, InfluxDB. Kafka, MQTT, Node-RED. Git, Docker, Docker Compose, Postman. Unity, Blender, glTF, Three.js, WebGL, VR/AR, WebXR, MediaPipe.',
 languages:'Arabic: native. English: proficient. French: conversational.',
 projects:originalEn.projects.featured.map(p=>({title:p.title,built:p.built,status:p.status,github:p.github})),
 notrafic:'NOTRAFIC academic project, 2025: intelligent traffic management, data processing, AI/ML prediction, flow visualization.',
 availability:'Interested in software engineering, backend, full-stack, real-time/distributed systems, digital twin, Unity/XR, 3D web and applied-AI opportunities. Current availability, relocation, work authorization and salary must be confirmed directly. No current employer or salary is claimed.',
 confidential:'Industrial digital-twin work is private. Only high-level descriptions are public. Ask Yassir directly about shareable images, clips or a technical walkthrough; do not expose confidential materials.',
 interests:'Video games, music, football, hiking, sports and travel.',
 certificates:originalEn.certificates.items.map(c=>({title:c.title,issuer:c.issuer})),
};
