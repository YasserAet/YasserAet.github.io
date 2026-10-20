from pathlib import Path
from lxml import html,etree
import copy,json,re
source=Path(__file__).resolve().parents[1]/'design-reference'
technologies=json.loads(Path('lib/technology-keywords.json').read_text())
r=html.parse(str(source/'index.html'));body=r.xpath('//body')[0]
for el in body.xpath('.//script|.//link|.//style'):
 if el.tag=='style':continue
 el.getparent().remove(el)
for el in body.xpath('.//comment()'):el.drop_tree()
def put(el,en,fr=None):
 for c in list(el):el.remove(c)
 el.text=en
 if fr is not None:el.set('data-en',en);el.set('data-fr',fr)
 return el
def one(path):return body.xpath(path)[0]
def byid(id):return one(f'.//*[@id="{id}"]')
def translate_leaf(el,en,fr):
 if el.text and el.text.strip()==en:el.text=el.text.replace(en,fr)
 for c in el:
  if c.tail and c.tail.strip()==en:c.tail=c.tail.replace(en,fr)
# Replace identity in every text node and attribute, preserving original layout classes.
replacements={'Aaftab Vijapura':'Yassir Aitali','AAFTAB VIJAPURA':'YASSIR AITALI','AAFTAB':'YASSIR','VIJAPURA':'AITALI','aaftabvijapura@gmail.com':'yasseraitali@outlook.fr','https://github.com/aaftab-vijapura':'https://github.com/YasserAet','https://www.linkedin.com/in/aaftab-vijapura/':'https://www.linkedin.com/in/aitali-yassir/','Ahmedabad, Gujarat, India':'Marrakech, Morocco','React Frontend Developer in Gujarat, India':'Software Engineer in Marrakech, Morocco','+91 8487975117':'+212 609 084 105','aaftab.is-a.dev':'YasserAet.github.io','rgba(255,91,46,0.13)':'rgba(200,217,230,0.13)','rgba(243,240,234,0.05)':'rgba(245,239,235,0.05)','#FF7B52':'#C8D9E6','#FFE0D5':'#F5EFEB','#FF5B2E':'#C8D9E6','#F3F0EA':'#F5EFEB','#0B0B0C':'#2F4156','#121214':'#2F4156','#ff0000':'#C8D9E6','#1a1a1d':'#2F4156','#26262a':'#567C8D','#e9e9ef':'#F5EFEB','#ffffffaa':'#C8D9E6'}
for el in body.iter():
 if not isinstance(el.tag,str):continue
 for attr in ['text','tail']:
  val=getattr(el,attr)
  if val:
   for a,b in replacements.items():val=val.replace(a,b)
   if val.strip()=='AV':val=val.replace('AV','YA')
   setattr(el,attr,val)
 for k,val in list(el.attrib.items()):
  for a,b in replacements.items():val=val.replace(a,b)
  el.set(k,val)
# Remove inert wrappers captured before the reference's animation initialized.
for el in body.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," invisible ")]'):
 if el.tag=='span' and el.text=='00':continue
 el.set('class',' '.join(x for x in el.get('class','').split() if x!='invisible'))
for el in body.xpath('.//*[@style]'):
 style=el.get('style','')
 if 'opacity:0' in style:style=re.sub(r'opacity:0(?:\.0)?(?=;|$)','opacity:1',style)
 if 'filter:blur' in style:style=re.sub(r'filter:blur\([^)]*\)','filter:blur(0px)',style)
 if 'translateY(50px)' in style:style=style.replace('translateY(50px)','translateY(0px)')
 el.set('style',style)
# Navigation keeps the original pill and staggered mobile-menu markup.
linkmap={'/':'#hero','/services':'#what','/skills':'#ecosystem','/works':'#work','/experience':'#experience','/about':'#who','/resume':'#resume','/contact':'#contact-cta','/projects':'#archive'}
for el in body.xpath('.//a[@href]'):
 href=el.get('href','')
 if href in linkmap:el.set('href',linkmap[href])
 if href.endswith('.pdf'):el.set('href','/cv/Yassir-Aitali-Software-Engineer.pdf');el.set('download','')
 if 'linkedin.com' in href:el.set('href','https://www.linkedin.com/in/aitali-yassir/')
 if 'github.com' in href:el.set('href','https://github.com/YasserAet')
 if href.startswith('tel:'):el.set('href','mailto:yasseraitali@outlook.fr');put(el,'Email Yassir','Contacter Yassir')
 for bad in ['Guizye','Astro','Gharda']:
  if bad in href:el.set('href','#work')
# The navbar brand is the name only, on desktop and mobile.
for brand in body.xpath('.//a[contains(@aria-label,"Yassir Aitali") and @href="#hero"]'):
 put(brand,'Yassir Aitali');brand.set('class','name-brand pointer-events-auto');brand.set('aria-label','Yassir Aitali — home')
for logo in body.xpath('.//*[@class and contains(concat(" ",normalize-space(@class)," ")," sm-logo ")]'):logo.set('aria-label','Yassir Aitali')
# Blur the complete navigation surface, including the name, after scrolling.
for brand in body.xpath('.//a[contains(@class,"name-brand")]'):
 parent=brand.getparent()
 if 'fixed' in parent.get('class',''):parent.set('class',parent.get('class','')+' portfolio-nav-shell')
for header in body.xpath('.//header[contains(@class,"staggered-menu-header")]'):header.set('class',header.get('class','')+' portfolio-mobile-shell')
# Hero: use the exact reference composition and scale.
hero=byid('hero')
put(hero.xpath('.//p')[0],'Open to AI engineering, full-stack & DevOps opportunities','À l’écoute d’opportunités IA, full stack et DevOps')
hero.xpath('.//p')[0].insert(0,html.fromstring('<span class="size-2 animate-pulse-dot rounded-full bg-brand-500" aria-hidden="true"></span>'))
loc=hero.xpath('.//p')[1];put(loc,'Marrakech, Morocco · ');time=etree.SubElement(loc,'span',{'data-local-time':'','class':'text-mist-2'});time.text='Local time'
put(hero.xpath('.//h1/span')[0],'Yassir Aitali | AI & Software Engineer, Full Stack & DevOps')
parts=hero.xpath('.//h1//span[contains(@class,"blur-text")]/span');put(parts[0],'Yassir\u00a0');put(parts[1],'Aitali')
put(hero.xpath('.//p')[2],'AI & Software Engineer','Ingénieur IA & logiciel')
hero.xpath('.//p')[2].set('class',hero.xpath('.//p')[2].get('class','')+' hero-role')
role=hero.xpath('.//p')[2];role_en=role.attrib.pop('data-en');role_fr=role.attrib.pop('data-fr');role.text=None
put(etree.SubElement(role,'span'),role_en,role_fr)
put(etree.SubElement(role,'span',{'class':'hero-domains'}),'AI engineering · Full-stack development · DevOps','Ingénierie IA · Développement full stack · DevOps')
put(hero.xpath('.//p')[3],'I build AI-powered applications, connected backends and interactive experiences — from computer vision and real-time dashboards to digital twins.','Je développe des applications intégrant l’IA, des backends connectés et des expériences interactives — de la vision par ordinateur aux dashboards temps réel et aux jumeaux numériques.')
# Replace technology badges and marquee text without changing their structure.
techmap={'React.js':'React','Redux Toolkit':'Java / Spring Cloud','ASP.NET':'Python','Express.js':'FastAPI','Stripe':'OpenCV / MediaPipe','Figma':'Docker / Kubernetes'}
for el in hero.iter():
 if not isinstance(el.tag,str):continue
 for attr in ['text','tail']:
  val=getattr(el,attr)
  if val:
   for a,b in techmap.items():val=val.replace(a,b)
   setattr(el,attr,val)
# Replace duplicated hero marquee text with one readable, wrapping technology list.
for band in hero.xpath('.//div[@aria-hidden="true"][.//div[contains(@class,"parallax")]]'):
 band.set('class','hero-tech-wrap');band.attrib.pop('aria-hidden',None)
 for child in list(band):band.remove(child)
 techlist=etree.SubElement(band,'ul',{'class':'hero-tech-list','aria-label':'Core technologies'})
 for name in technologies['hero']:put(etree.SubElement(techlist,'li'),name)
 see_all=etree.SubElement(band,'a',{'href':'#ecosystem','class':'hero-tech-more'});put(see_all,'Explore the full technology stack ↗','Voir toutes les technologies ↗')
for hidden_tech in hero.xpath('.//ul[contains(@class,"sr-only")]'):hidden_tech.drop_tree()
# Statement section and honest summary values.
who=byid('who');paragraph=who.xpath('.//div[contains(@class,"max-w-6xl")]/p')[0]
en='I’m Yassir, an AI and software engineer based in Marrakech. I connect computer vision and data processing to APIs, live interfaces and interactive systems. My work spans AI-powered applications, full-stack development, distributed backends and deployment — with hands-on projects in body tracking, smart parking and digital twins, and document-intelligence explorations.'
fr='Je suis Yassir, ingénieur IA et logiciel basé à Marrakech. Je relie vision par ordinateur et traitement de données aux APIs, interfaces temps réel et systèmes interactifs. Mon travail couvre les applications intégrant l’IA, le full stack, les backends distribués et le déploiement : suivi corporel, parking intelligent, jumeaux numériques et explorations d’intelligence documentaire.'
put(paragraph,'I’m Yassir, an AI and software engineer based in Marrakech. I connect computer vision, backend services and live interfaces to build useful applications.','Je suis Yassir, ingénieur IA et logiciel à Marrakech. Je relie vision par ordinateur, services backend et interfaces temps réel pour créer des applications utiles.');paragraph.set('class','profile-statement')
profile_detail=etree.SubElement(paragraph.getparent(),'p',{'class':'profile-detail'});put(profile_detail,'My work spans full-stack development, distributed systems and deployment, with hands-on projects in body tracking, smart parking, digital twins and document intelligence.','Mon travail couvre le développement full stack, les systèmes distribués et le déploiement, avec des projets de suivi corporel, de parking intelligent, de jumeaux numériques et d’intelligence documentaire.')
for el,(label,labelFr,value) in zip(who.xpath('.//dl/div'),[('Engineering degree','Diplôme d’ingénieur','2026'),('Professional experiences','Expériences professionnelles','4'),('Focus areas','Domaines d’expertise','4'),('VR developer diploma','Diplôme de développeur VR','2023')]):put(el.find('dt'),label,labelFr);put(el.find('dd'),value)
# Capabilities retain sticky index, long-form descriptions and native details.
capabilities=[
 {'name':'Full-stack & backend engineering','fr':'Ingénierie full stack & backend','desc':'Java and Python services, web interfaces and the architecture connecting them — APIs, databases and real-time data.','descFr':'Services Java et Python, interfaces web et architecture qui les relie — APIs, bases de données et données temps réel.','build':['Full-stack applications & dashboards','REST / GraphQL / WebSocket APIs','Distributed backend services'],'buildFr':['Applications full stack & dashboards','APIs REST / GraphQL / WebSocket','Services backend distribués'],'tools':['Java / OOP','Spring Cloud','Python / FastAPI','Node.js / Express','Django / Laravel','React / Next.js / Vue','SQL / PostgreSQL','Redis','REST / GraphQL','Kafka / MQTT'],'tasks':['Designing modular services and reliable asynchronous communication.','Connecting data pipelines, databases and interactive interfaces.','Packaging applications with Docker and maintainable project structure.'],'problem':'Disconnected services, inconsistent state and complex data flows that are hard to supervise.'},
 {'name':'Real-time 3D & immersive experiences','fr':'3D temps réel & expériences immersives','desc':'Digital spaces with a purpose — property exploration, digital twins, VR walkthroughs and movement-driven applications.','descFr':'Des espaces numériques utiles — exploration immobilière, jumeaux numériques, visites VR et applications pilotées par le mouvement.','build':['Interactive 3D web applications','Unity / WebXR experiences','Blender and glTF asset pipelines'],'buildFr':['Applications web 3D interactives','Expériences Unity / WebXR','Pipelines d’assets Blender et glTF'],'tools':['Unity','C#','Three.js','WebGL','WebXR','Blender'],'tasks':['Preparing and integrating 3D assets into web and Unity applications.','Building immersive interactions and intuitive spatial navigation.','Connecting live application data to virtual environments.'],'problem':'Static representations that make it difficult to understand space, state or an interactive experience.'},
 {'name':'DevOps & application delivery','fr':'DevOps & livraison applicative','desc':'The path from a working application to a usable deployment — version control, reproducible environments, integration and operational visibility.','descFr':'Du développement au déploiement utilisable — gestion de versions, environnements reproductibles, intégration et visibilité opérationnelle.','build':['Docker / Docker Compose environments','Git workflows & GitHub CI/CD','Linux & cloud application delivery'],'buildFr':['Environnements Docker / Docker Compose','Workflows Git & CI/CD GitHub','Livraison applicative Linux & Cloud'],'tools':['Git / GitHub','Docker','Docker Compose','Kubernetes','OpenShift','Linux','CI/CD','Postman'],'tasks':['Using Git branching and update automation in full-stack delivery at SEOCOM.','Contributing to cloud integration and deployment for Al-Moftah’s property platform.','Working with application logs, monitoring and build / asset delivery optimization.'],'problem':'Applications that are difficult to reproduce, release, update or diagnose after deployment.'}
]
ai_capability={'name':'AI engineering & computer vision','fr':'Ingénierie IA & vision par ordinateur','desc':'AI becomes useful when it connects to the application — from pose detection and parking occupancy to live interfaces and document intelligence.','descFr':'L’IA devient utile lorsqu’elle est intégrée à l’application — détection de pose, occupation de parking, interfaces temps réel et intelligence documentaire.','build':['Computer-vision application pipelines','AI-powered APIs & live dashboards','Document intelligence / RAG'],'buildFr':['Pipelines applicatifs de vision par ordinateur','APIs et dashboards intégrant l’IA','Intelligence documentaire / RAG'],'tools':['Python','MediaPipe','OpenCV','FastAPI','WebSocket','Embeddings / ChromaDB'],'tasks':['Processing and streaming pose data from Python / MediaPipe into an interactive Unity WebGL application.','Connecting parking-space detection to a Node.js API and a live Vue dashboard.','Exploring document intelligence with embeddings, retrieval and source-grounded answers.'],'problem':'AI outputs that remain isolated from the interface, backend and real-time application flow.'}
capabilities=[ai_capability,capabilities[0],capabilities[2],capabilities[1]]
# Market-informed offerings, grounded in the supplied skills and project history.
offerings=json.loads(Path('lib/build-offerings.json').read_text())
assert len(offerings)==len(capabilities)
for cap,group in zip(capabilities,offerings):
 cap['build']=[item[0] for item in group['items']];cap['buildFr']=[item[1] for item in group['items']]
what=byid('what');put(byid('what-title'),'From AI capability to working software.','Des capacités de l’IA aux applications concrètes.')
left=what.xpath('.//div[contains(@class,"sticky")]')[0];left.set('data-capability-index','')
# Extend the source's three-block layout to four, retaining its sticky index and mobile labels.
index_list=left.xpath('./ul')[0];index_list.append(copy.deepcopy(index_list[-1]))
number_group=left.xpath('./div[contains(@class,"relative")]')[0]
number=copy.deepcopy(number_group[-2]);put(number,'04');number_group.insert(len(number_group)-1,number)
articles=what.xpath('.//article');articles[-1].getparent().append(copy.deepcopy(articles[-1]))
for i,article in enumerate(what.xpath('.//article')):
 heading=article.xpath('.//h3')[0];heading.set('id','capability-'+str(i+1));article.set('aria-labelledby','capability-'+str(i+1))
 put(article.xpath('./p')[0],str(i+1).zfill(2))

for li,cap in zip(left.xpath('./ul/li'),capabilities):
 for c in list(li):c.tail=None
 li.text=None
 line=li[0] if len(li) else etree.SubElement(li,'span')
 line.tail=cap['name'];li.set('data-en-label',cap['name']);li.set('data-fr-label',cap['fr'])
for idx,(article,cap) in enumerate(zip(what.xpath('.//article'),capabilities)):
 article.set('data-capability',str(idx));put(article.xpath('.//h3')[0],cap['name'],cap['fr'])
 badges=article.xpath('./div/span');[b.getparent().remove(b) for b in badges]
 put(article.xpath('./p[contains(@class,"text-xl")]')[0],cap['desc'],cap['descFr'])
 build_list=article.xpath('./ul')[0];build_list.set('class','build-offerings '+build_list.get('class',''))
 template=copy.deepcopy(build_list[0])
 for child in list(build_list):build_list.remove(child)
 for enItem,frItem in zip(cap['build'],cap['buildFr']):
  li=copy.deepcopy(template);marker=copy.deepcopy(li[0]);put(li,enItem,frItem);li.insert(0,marker);build_list.append(li)
 detail=article.xpath('.//details/div')[0];blocks=detail.xpath('./div')
 tools=blocks[0].find('ul');template=copy.deepcopy(tools[0]);tools.clear();tools.set('class','flex flex-wrap gap-2')
 for val in cap['tools']:item=copy.deepcopy(template);put(item,val);tools.append(item)
 tasks=blocks[1].xpath('.//li')
 for el,txt in zip(tasks,cap['tasks']):put(el,txt)
 if len(blocks)>2:put(blocks[2].xpath('.//p')[0],cap['problem'])
# Philosophy: keep the reference's numbered editorial rows, adapt claims to this profile.
put(byid('philosophy-title'),'How I think about building useful systems.','Ma façon de concevoir des systèmes utiles.')
principles=[('Think in systems','Penser en systèmes','Understand the full path: the physical source, the data exchange, the backend service and the interface that makes the result useful.'),('Make the complex readable','Rendre le complexe lisible','Turn technical complexity into interfaces that are clear to navigate, whether the screen is a dashboard, a 3D scene or a VR environment.'),('Build for real-time behavior','Concevoir pour le temps réel','Pay attention to state, asynchronous communication and the performance of each part of the application.'),('Keep the next developer in mind','Penser au prochain développeur','Favor modular architecture, explicit API contracts and technical documentation that makes the project easier to maintain.')]
for li,(title,titleFr,desc) in zip(byid('philosophy').xpath('.//ol/li'),principles):put(li.xpath('.//h3')[0],title,titleFr);put(li.xpath('.//p')[0],desc)
# Technology ecosystem: retain the original ten-row map and marquee bands.
eco=byid('ecosystem')
for el in eco.iter():
 if not isinstance(el.tag,str):continue
 for attr in ['text','tail']:
  val=getattr(el,attr)
  if val:
   for a,b in techmap.items():val=val.replace(a,b)
   setattr(el,attr,val)
# Replace oversized repeated parallax bands with a grouped, wrapping overview.
for band in eco.xpath('./div[@aria-hidden="true"]'):
 band.set('class','container-x tech-overview');band.attrib.pop('aria-hidden',None)
 for child in list(band):band.remove(child)
 for category in technologies['groups']:
  title,titleFr,names=category['title'],category['titleFr'],category['keywords']
  group=etree.SubElement(band,'div',{'class':'tech-overview-group'});put(etree.SubElement(group,'p'),title,titleFr)
  techlist=etree.SubElement(group,'ul')
  for name in names:put(etree.SubElement(techlist,'li'),name)
categories=json.loads(Path('lib/engineering-skills.json').read_text())
ecosystem_list=eco.xpath('.//ul[@role="list"]')[0]
while len(ecosystem_list)<len(categories):ecosystem_list.append(copy.deepcopy(ecosystem_list[-1]))
for idx,(li,category) in enumerate(zip(ecosystem_list,categories)):
 title,tools,desc=category['title'],category['tools'],category['desc']
 heading=li.xpath('.//span[contains(@class,"text-xl")]');description=li.xpath('.//span[contains(@class,"mt-2")]');tech=li.xpath('.//span[contains(@class,"mt-3")]')
 if heading:put(heading[0],title,category['titleFr'])
 if description:put(description[0],desc,category['descFr'])
 if tech:put(tech[0],tools)
 for a in li.xpath('.//a'):
  a.set('class',a.get('class','')+' ecosystem-link')
  destination='#capability-1' if idx==0 else '#capability-3' if title=='DevOps, containers & delivery' else '#capability-4' if title=='Real-time 3D & asset pipelines' else '#resume' if title=='Education & technical training' else '#capability-2'
  a.set('href',destination)
  if len(a):put(a[0],str(idx+1).zfill(2))
 for badge in li.xpath('.//span[contains(@class,"rounded-full")]'):badge.getparent().remove(badge)
 if heading:
  header=heading[0].getparent()
  header.append(html.fromstring('<span class="uv-arrow ecosystem-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></span>'))

# Work: expand the original marquee rows with full-stack and delivery evidence first.
work=byid('work');put(byid('work-title'),'AI. Full stack. Systems in motion.','IA. Full stack. Systèmes temps réel.')
projects=json.loads(Path('lib/selected-work.json').read_text())
nav=work.xpath('.//nav')[0];template=copy.deepcopy(nav[0]);nav.clear();nav.set('class','selected-work-list')
frame=nav.getparent().getparent();frame.set('class','selected-work-frame border-y border-white/10')
for project in projects:
 row=copy.deepcopy(template);row.set('class',row.get('class','')+' work-row');row.set('style','')
 a=row.find('a');put(a,project['title']);a.set('href','#project-'+project['id']);a.set('data-project',project['id']);a.set('aria-label',project['title']+' — '+project['label'].split(' / ',1)[1])
 overlay=row.xpath('./div')[0];overlay.set('class',overlay.get('class','')+' work-marquee')
 for span in overlay.xpath('.//span'):put(span,project['title'])
 for image in overlay.xpath('.//div[contains(@class,"bg-cover")]'):
  if project['img']:
   image.set('style','background-image:url(/media/'+project['img']+')');image.set('role','img');image.set('aria-label',project['title']+' project screenshot')
  else:
   image.set('class','work-tech-pill');image.attrib.pop('style',None);put(image,project['signal'])
 if project['img']:row.set('data-preview','/media/'+project['img'])
 nav.append(row)
 detail=etree.SubElement(nav,'div',{'class':'work-row-detail container-x'})
 put(etree.SubElement(detail,'p',{'class':'eyebrow'}),project['label'],project['labelFr'])
 put(etree.SubElement(detail,'p',{'class':'work-row-description'}),project['desc'],project['descFr'])
 link=etree.SubElement(detail,'a',{'href':'#project-'+project['id'],'data-project':project['id'],'class':'work-case-link'});put(link,'Read case study ↗','Voir le projet ↗')
# Each row has its own persistent summary, including on touch screens.
for el in work.xpath('./div[contains(@class,"mt-14") and contains(@class,"grid")]'):el.drop_tree()
for link in work.xpath('.//a[@href="#work"]'):
 link.set('href','https://github.com/YasserAet');link.set('target','_blank');link.set('rel','noopener noreferrer')
 label=link.xpath('.//span[contains(@class,"uv-link")]')
 if label:put(label[0],'Explore the source on GitHub','Explorer le code sur GitHub')
# Experience: original horizontal timeline rows; add the fourth supplied experience.
exp=byid('experience');put(byid('exp-title'),'From web interfaces to connected worlds.','Des interfaces web aux mondes connectés.')
items=exp.xpath('.//ol/li');template=copy.deepcopy(items[-1]);exp.xpath('.//ol')[0].append(template);items=exp.xpath('.//ol/li')
positions=[('2026','DICE / UM6P','Software Engineer · Digital Twin & Real-Time Systems','Designed a distributed digital-twin architecture with Python/FastAPI, PostgreSQL, Redis, Kafka, MQTT and WebSocket/GraphQL APIs, alongside Unity supervision interfaces.'),('January 2026','Al-Moftah Real Estate','Full-Stack · 3D & VR Developer','Built an interactive full-stack property platform with web interfaces, business data and backend services. Integrated 3D / WebXR and contributed to cloud deployment, with GitHub CI/CD and asset delivery workflows.'),('August 2023','UM6P Vanguard Center','XR / AI Developer','Built a real-time body-tracking pipeline with Python and MediaPipe, transmitting motion data over WebSocket to Unity.'),('August 2021','SEOCOM','Full-Stack Developer','Built PHP / JavaScript / MySQL applications and MVC / REST APIs. Used Git branching, Linux server deployment and basic update automation, with monitoring, logging and query / load optimization.')]
for item,(date,company,role,desc) in zip(items,positions):
 grid=item.xpath('.//div[contains(@class,"grid")]')[0];put(grid.find('p'),date);put(grid.xpath('.//h3')[0],company);put(grid.xpath('./div/p')[0],role);put(grid.xpath('./p')[-1],desc)
# The snapshot's full-timeline link opens additional, detailed professional history.
for link in body.xpath('.//a[@href="#experience"]'):
 if any(label in link.text_content() for label in ['Read the full timeline','See where I’ve been']):link.set('href','#full-timeline')
timeline=etree.SubElement(exp.xpath('./div')[0],'details',{'id':'full-timeline','class':'full-timeline'})
summary=etree.SubElement(timeline,'summary');put(etree.SubElement(summary,'span'),'Full professional timeline','Parcours professionnel complet');etree.SubElement(summary,'span',{'aria-hidden':'true'}).text='+'
content=etree.SubElement(timeline,'div',{'class':'timeline-content'})
put(etree.SubElement(content,'p',{'class':'timeline-intro'}),'The responsibilities, technical choices and delivery work behind each experience.','Les responsabilités, choix techniques et travaux de livraison derrière chaque expérience.')
entries=etree.SubElement(content,'ol',{'class':'timeline-entries'})
for item in json.loads(Path('lib/experience-timeline.json').read_text()):
 entry=etree.SubElement(entries,'li',{'class':'timeline-entry'})
 meta=etree.SubElement(entry,'div',{'class':'timeline-meta'});put(etree.SubElement(meta,'p'),item['date'],item['dateFr']);put(etree.SubElement(meta,'p'),item['location'],item['locationFr'])
 main=etree.SubElement(entry,'div');put(etree.SubElement(main,'h3'),item['company']);put(etree.SubElement(main,'p',{'class':'timeline-role'}),item['role'],item['roleFr']);put(etree.SubElement(main,'p',{'class':'timeline-context'}),item['context'],item['contextFr'])
 contributions=etree.SubElement(main,'ul',{'class':'timeline-contributions'})
 for en,fr in item['contributions']:put(etree.SubElement(contributions,'li'),en,fr)
 tags=etree.SubElement(main,'div',{'class':'timeline-stack'})
 for tech in item['stack']:put(etree.SubElement(tags,'span'),tech)
 link=etree.SubElement(main,'a',{'href':'#project-'+item['project'],'data-project':item['project'],'class':'timeline-project'});put(link,'Explore the related work ↗','Explorer le projet associé ↗')
put(etree.SubElement(content,'a',{'href':'/cv/Yassir-Aitali-Software-Engineer.pdf','download':'','class':'timeline-project'}),'Download the software engineering CV ↗','Télécharger le CV ingénieur logiciel ↗')
# Process: same five-stage progress track, tailored to engineering and immersive delivery.
for li,(title,desc) in zip(byid('process').xpath('.//ol/li'),[('Understand','Start with the user, the system constraints and the data the application needs.'),('Structure','Define the architecture, interfaces, assets and communication between components.'),('Build','Develop the backend, frontend or immersive interaction in focused, modular pieces.'),('Connect','Integrate APIs, data streams and 3D assets into one coherent experience.'),('Verify & refine','Review behavior, performance and clarity, then improve the details that matter.')]):put(li.find('h3'),title);put(li.findall('p')[-1],desc)
# Current focus and resume downloads; no fabricated current employer.
now=byid('now');put(byid('now-title'),'AI engineering, full-stack systems and DevOps.','Ingénierie IA, systèmes full stack et DevOps.')
put(now.xpath('.//p[contains(@class,"mt-8")]')[0],'I’m an EMSI engineering graduate with specialized VR training at UM6P. I’m interested in AI engineering, full-stack, backend and DevOps opportunities. I bring practical computer-vision integration, real-time pipelines and distributed-system experience, alongside document-intelligence / RAG exploration.','Ingénieur diplômé de l’EMSI et formé au développement VR à l’UM6P, je recherche des opportunités en ingénierie IA, full stack, backend et DevOps. J’apporte une expérience pratique en vision par ordinateur, pipelines temps réel et systèmes distribués, ainsi que des explorations d’intelligence documentaire / RAG.')
blocks=now.xpath('.//div[contains(@class,"sm:grid-cols-3")]/div')
for el,label,value in zip(blocks,['Profile','Engineering degree','Based in'],['AI & Software Engineer','EMSI · 2026','Marrakech, Morocco']):put(el.findall('p')[0],label);put(el.findall('p')[1],value)
# Why me retains four open editorial blocks, with evidence-based copy.
whys=[('Systems perspective','From data pipelines and APIs to the screen or 3D environment, I understand how the parts connect.'),('Delivery matters','I connect development with Git workflows, Linux deployment, cloud integration and reproducible Docker environments.'),('Hands-on across the stack','Java / OOP, Spring Cloud, Python / FastAPI, React / TypeScript and real-time application integration.'),('AI connected to software','Body tracking and smart parking connect computer vision to live applications; document intelligence / RAG is my current AI exploration.')]
for el,(title,desc) in zip(byid('why').xpath('.//dl/div'),whys):
 dt=el.find('dt');num=copy.deepcopy(dt[0]);num.tail=None;put(dt,title);dt.insert(0,num);put(el.find('dd'),desc)
# Footer and original navigation text.
footer=one('.//footer');footer.set('id','footer');footer.set('data-section','Footer')
for btn in footer.xpath('.//button'):btn.set('data-back-top','')
for el in body.iter():
 if not isinstance(el.tag,str):continue
 if el.text:
  el.text=el.text.replace('Open to conversations about React and full stack work.','Open to AI engineering, full-stack and DevOps opportunities.').replace('Designed and built by me.','Software / AI Engineer').replace('Built with Next.js, Tailwind CSS, React Bits & Untitled UI.','')
  if 'Ahmedabad' in el.text:el.text=el.text.replace('Ahmedabad','Marrakech').replace('Gujarat','Morocco')
  if el.text.strip()=='IST':el.text='MA'
# Rewrite any split remaining city nodes in footer.
for el in body.xpath('.//*[not(*)]'):
 if el.text and el.text.strip()=='Gujarat':el.text='Morocco'
 if el.text and el.text.strip()=='--:--':el.set('data-local-time','');el.text='Local time'
# The footer placeholder has a nested country span; bind the whole clock, not only leaves.
for el in footer.xpath('.//span'):
 if el.text and '--:--' in el.text:
  put(el,'Morocco local time');el.set('data-local-time','');el.set('data-clock-label','')
# Add resume and archive inside existing sections; no unrelated redesign.
resume=html.fromstring('''<div id="resume" class="reference-resume"><div><p class="eyebrow mb-3">CV / Education</p><h3 class="display-h3">Two perspectives. One profile.</h3><p class="text-secondary mt-4">Software engineering · EMSI, 2026<br>VR development · IDC / UM6P, 2023<br>BTS Multimedia &amp; Web Design, 2022</p></div><div class="resume-links"><a href="/cv/Yassir-Aitali-Software-Engineer.pdf" download><span>Software Engineer<small>Backend, distributed systems &amp; real-time · PDF / FR</small></span><span aria-hidden="true">↗</span></a><a href="/cv/Yassir-Aitali-XR-Engineer.pdf" download><span>Unity / XR Developer<small>3D, VR &amp; immersive applications · PDF / FR</small></span><span aria-hidden="true">↗</span></a></div></div>''')
now.xpath('./div/div')[1].append(resume)
archive=html.fromstring('<details id="archive" class="container-x reference-archive"><summary>More projects &amp; behind the scenes <span aria-hidden="true">+</span></summary><div class="archive-links"></div></details>')
archive_links=archive.xpath('./div')[0]
for id,title in [('notrafic','NOTRAFIC / applied AI & intelligent traffic management'),('blockchain','Blockchain certificate verification / prototype'),('vr','VR walkthrough / interaction'),('idc','IDC / immersive environment'),('workflow','3D modeling, texturing & Unity workflow')]:
 a=etree.SubElement(archive_links,'a',{'href':'#project-'+id,'data-project':id});a.text=title;etree.SubElement(a,'span').text='↗'
for item in json.loads(Path('lib/original-en.json').read_text())['projects']['alsoBuilt']:
 a=etree.SubElement(archive_links,'a',{'href':item['github'],'target':'_blank','rel':'noopener noreferrer'});a.text=item['title'];etree.SubElement(a,'span').text='↗'

work.append(archive)
# Keep the header and mobile navigation; remove the fixed section sidebar.
for sidebar in body.xpath('.//aside[@aria-label="Page section navigation"]'):sidebar.drop_tree()
# Give the original marquee its own counter-moving layer, separate from its ticker.
for row in body.xpath('.//div[contains(concat(" ",@class," ")," work-row ")]'):
 overlay=row.xpath('./div')[0];track=overlay[0];overlay.remove(track)
 offset=etree.SubElement(overlay,'div',{'class':'work-marquee-offset'})
 track.set('class',track.get('class','')+' work-marquee-track');offset.append(track)
# Mark the existing reference CTA wrappers; movement is restored by the local hover module.
for link in body.xpath('.//a[@data-rac]'):
 inner=link.getparent();outer=inner.getparent()
 if outer is not None and 'position:relative' in outer.get('style',''):
  outer.set('data-reference-magnet','');inner.set('data-magnet-inner','')
# Fix navigation in the original footer and root skip link.
for a in body.xpath('.//a[@href="#main"]'):a.set('href','#hero')
# Add translations to standard labels without touching numbers or icon structure.
labels={'Read the full timeline':'Lire le parcours complet','See where I’ve been':'Voir mon parcours','Home':'Accueil','Services':'Expertises','Skills':'Compétences','Works':'Projets','Experience':'Parcours','About':'À propos','Resume':'CV','Contact':'Contact','Menu':'Menu','Close':'Fermer','View my work':'Voir mes projets','Contact me':'Me contacter','Who I am':'Qui je suis','What I do':'Mes expertises','Development philosophy':'Approche de développement','Technology ecosystem':'Écosystème technique','Selected work':'Projets sélectionnés','Experience snapshot':'Parcours professionnel','How I build products':'Comment je développe','Current focus':'Objectif actuel','Why work with me':'Pourquoi travailler avec moi','What you can count on.':'Ce que je peux apporter.','Let’s talk':'Échangeons','Start a conversation':'Démarrer la conversation','Download resume':'Télécharger mon CV','Back to top':'Retour en haut','What I build':'Ce que je développe','The technical detail':'Détails techniques','Technologies':'Technologies','Responsibilities':'Contributions','Problem it solves':'Le problème traité'}
for el in body.xpath('.//*[not(*)]'):
 if el.text and el.text.strip() in labels:
  en=el.text.strip();put(el,en,labels[en])
# Preserve the reference's leading dot/rule when translating a label.
for el in body.xpath('.//*[@data-en][*]'):
 en,fr=el.get('data-en'),el.get('data-fr')
 el.text=None
 for child in el:child.tail=None
 el.attrib.pop('data-en',None);el.attrib.pop('data-fr',None)
 label=etree.SubElement(el,'span');put(label,en,fr)
# Keep the introduction focused; remove the availability announcement everywhere.
for announcement in body.xpath('.//p[contains(string(.),"Open to AI engineering") or contains(string(.),"Open to conversations about React")]'):
 announcement.drop_tree()
hero_content=hero.xpath('./div[contains(@class,"container-x")]')[0]
hero_content.set('class',hero_content.get('class','')+' hero-content')
hero_content[0].set('class',hero_content[0].get('class','')+' hero-meta')
intro=hero_content[1].xpath('./div')[0];intro.set('class',intro.get('class','')+' hero-intro-grid')
intro[0].set('class',intro[0].get('class','')+' hero-summary')
intro[1].set('class',intro[1].get('class','')+' hero-actions')
# Mobile is rendered with a dedicated React layout; remove the captured menu entirely.
for old_mobile in body.xpath('.//div[contains(concat(" ",@class," ")," sm-scope ")]'):old_mobile.drop_tree()
for shell in body.xpath('.//*[contains(concat(" ",@class," ")," portfolio-nav-shell ")]'):
 shell.tag='header';shell.set('class','portfolio-nav-shell')
for band in hero.xpath('.//div[contains(@class,"hero-tech-wrap")]'):band.set('class','hero-tech-wrap container-x')
# Remove dangling Next metadata placeholders; all original inline styles remain available.
markup=''.join(etree.tostring(c,encoding='unicode',method='html') for c in body)
assert '<script' not in markup
for bad in ['Aaftab','Aerosol','Emaad','Xipra','aaftabvijapura','Guizye','Astro-IQ','Gharda-New']:
 assert bad not in markup,bad
Path('lib/reference-markup.json').write_text(json.dumps(markup,ensure_ascii=False))
css=(source/'css/080a39btalnb7.css').read_text()
Path('app/reference-layout.css').write_text(css)
fonts=(source/'css/41bqhp116w25g.css').read_text().replace('../fonts/Geist_Variable-s.p.2-i4fw5gbtlb7.woff2','/fonts/geist.woff2').replace('../fonts/GeistMono_Variable.p.0b02cdm7g7y6h.woff2','/fonts/geist-mono.woff2')
Path('app/reference-fonts.css').write_text(fonts)
print('Adapted original markup:',len(markup),'characters. Preserved reference styles:',len(css),'characters.')
