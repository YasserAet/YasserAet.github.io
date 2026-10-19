# Yassir Aitali — Portfolio

This version adapts the actual HTML and CSS from the supplied Aaftab website snapshot. It retains the full-width hero, floating pill navigation, sticky expertise index, editorial rows, project hover marquees and large two-line footer. Identity, professional content and palette are adapted to Yassir.

## Run locally

Node.js 22.13+ and the package-manager version declared in package.json:

```sh
corepack enable
pnpm install
pnpm dev
```

Build the deployable static site:

```sh
pnpm build
```

The output is `out/`. The ZIP also includes the same ready-built files in `READY-TO-UPLOAD/`. Upload that folder's contents to static hosting. Use an HTTP server to view the build locally; opening index.html by double-click does not support ES modules reliably.

The included GitHub Actions workflow deploys `main` to GitHub Pages. Choose **Settings → Pages → Source → GitHub Actions** in the repository. Paths are configured for a root user site, such as `YasserAet.github.io`. No changes have been pushed to the user's existing GitHub repository.

## Edit the site

- `app/portfolio.tsx`: reference-page interactions, language switch, project dialogs and gallery presentation.
- `lib/reference-markup.json`: the adapted page markup used by the site.
- `app/reference-layout.css`: the original reference stylesheet, retained unchanged.
- `app/reference-fonts.css`: the supplied font declarations with local asset paths.
- `app/globals.css`: semantic palette, interaction restoration and gallery styling.
- `app/ecosystem-effects.css`: wrapping technology summaries, ecosystem row hover arrows and target-cursor styling.
- `lib/ecosystem-cursor.ts`: scoped target-cursor tracking, hover locking and cleanup.
- `lib/experience-timeline.json`: bilingual full professional history, detailed contributions, technologies and related case-study links.
- `lib/engineering-skills.json`: twelve bilingual skill categories, including a dedicated Java / OOP / Spring Cloud row and expanded Kubernetes / OpenShift, backend, architecture, database and quality tooling.
- `lib/build-offerings.json`: 36 bilingual, market-informed “What I build” offerings across AI (8), full-stack (11), DevOps (9), and XR (8).
- `lib/selected-work.json`: the eight main work entries, order and bilingual visible summaries.
- `lib/project-galleries.ts`: thirteen case studies, technical contributions, pipeline summaries, screenshots and preview clips.
- `public/media/`: 19 optimized images and two short video previews.
- `lib/media-provenance.json`: which supplied image/video produced each media asset.
- `public/cv/`: the latest two supplied CV PDFs, unchanged.
- `scripts/adapt-reference.py`: reproducible adaptation from `design-reference/`; regenerates the markup and reference CSS. Requires Python and lxml. Edit the generator when you want its changes to survive regeneration.

The supplied archive is a saved website snapshot, not the original editable React component repository. The page markup and stylesheet are reused directly. Menu, section tracking, capability index, hover interactions, project galleries and dialogs are implemented locally without running the reference's compiled application scripts. Internal links target working portfolio sections and galleries.

## Media

The main work section foregrounds backend, full-stack, DevOps and AI engineering: the digital-twin backend, SEOCOM delivery, OPTIPARK, computer-vision body tracking, document intelligence / RAG, KEY ONE, REST benchmarking and KEY TWO. Each row has a visible bilingual summary and opens a case study. DevOps contributions are attributed to the supplied experience descriptions rather than presented as an invented standalone project. The archive adds NOTRAFIC, blockchain verification, VR, IDC and 3D workflow and six more repository links. Engineering case studies show real technical contributions and system stages; project screenshots are only used where supplied. Images are actual frames from the supplied recordings or supplied development captures, resized and encoded as WebP. No generated project illustrations are used. Images can be opened at their exported resolution. KEY ONE and KEY TWO also include short, muted, user-controlled preview clips.

Palette: Navy `#2F4156`, Teal `#567C8D`, Sky Blue `#C8D9E6`, Beige `#F5EFEB`, White `#FFFFFF`. Navy is the primary surface; beige/white and sky provide readable text. Sky primary buttons use navy lettering.

## AI status

The current publication and static build do not include the keyword chatbot. A real AI provider and server-side credentials still need to be selected and connected. No API key is embedded in the site. Earlier server-related source files are not deployed by the current static hosting configuration. The current site makes no inference requests.

## Validation

TypeScript checks and the production static build passed. Markup checks cover identity replacement, unique section IDs, navigation destinations, downloadable files, eight header-navigation links, removal of the fixed section sidebar, four expertise sections (AI, full stack, DevOps, immersive) and eight project marquee rows with thirteen working case-study destinations. Media validation covers all nineteen images and both video previews. The reference stylesheet was checked byte-for-byte against the supplied archive. Browser visual QA was unavailable; visual equivalence has not been independently verified in a browser.

## Reference hover interactions

The fixed right-hand section sidebar has been removed. The header and mobile navigation remain. Hover behavior is restored from the supplied compiled reference: circular menu fills with rolling labels (300 ms entry / 200 ms exit), magnetic CTA buttons (60 px proximity, displacement divided by five), and project marquee panels entering and exiting through the nearest top or bottom edge (600 ms, 18-second continuous ticker). The footer name varies its font weight from 300 to 900 within a 220 px cursor radius. Existing underline and circular-arrow effects use the retained reference stylesheet. Keyboard focus receives the menu/project effects, and reduced-motion settings disable continuous movement and magnetic displacement.

## Full-stack and DevOps emphasis

Hero, introduction, expertise order, technology categories, experience descriptions and page metadata prioritize full-stack, backend and DevOps. Details are grounded in the supplied software CV and original portfolio: Docker / Docker Compose skills, SEOCOM Git / Linux / update automation, Al-Moftah cloud integration and GitHub CI/CD, API development, database work and REST benchmarking. Kubernetes and OpenShift appear in the skills and offerings; no new employment or production project is invented. The retained reference hover behavior applies to all eight featured rows. New work summaries and case-study technical sections stack on mobile.

## AI engineering positioning

The hero identifies Yassir as an AI & Software Engineer, with computer vision, full-stack and DevOps focus. AI engineering has a dedicated first expertise block; OPTIPARK, body tracking and document intelligence / RAG appear in the main work list. AI experience is grounded in the supplied computer-vision pipelines, application integration and academic AI work. RAG uses neutral exploration wording, and no new employment history, production LLM launch, model-training results or performance metrics are claimed. This content update does not implement or connect an AI API.

## Expanded build offerings

The expertise lists now contain 36 concrete deliverables instead of 12. They use two columns where space permits and one column on small screens, retaining the original bullet-rule treatment. The generator creates as many list items as the content requires; it no longer truncates each group to the three items in the supplied template. The repeated status labels have been removed; document intelligence is described as an exploration. Market evidence, scope limits and the mapping to the supplied experience are recorded in `docs/market-positioning-2026-10-19.md`.

## Java and broader software skills

Java is foregrounded in the hero, technology marquee, full-stack expertise, build offerings and a dedicated skills row. Spring Cloud and container training already appear in the supplied original portfolio. The skills map now includes twelve bilingual categories. The public page removes repeated English and French progress labels, using neutral project-focus descriptions without claiming a new completed RAG product. Source-history JSON files retain the original supplied content.

## Local clock

Both hero and footer clocks use `Africa/Casablanca` through Intl, refreshed every minute. The footer reads “HH:MM · Morocco time” (French: “HH:MM · Heure au Maroc”). The saved reference’s nested placeholder is replaced as a whole so the clock is initialized correctly. Static fallback text is descriptive, never `--:--`.

## Full timeline destination

“Read the full timeline” and “See where I’ve been” now target `#full-timeline`, a separate disclosure after the short experience snapshot. It opens four detailed professional entries with dates, locations, role context, four contributions each, technologies and related case studies. Direct fragment links and browser history reveal the details automatically. The header Experience link continues to target the concise snapshot.

## Ecosystem, navigation and palette refresh

The desktop and mobile navbar brands are bold text only. The oversized repeated ecosystem bands are replaced by three compact wrapping technology groups; the hero has a single wrapping technology list. Twelve ecosystem rows retain their content and link to the relevant expertise or resume. They include the supplied reference’s circular fill / rotating-arrow treatment, plus a locally reconstructed four-corner target cursor that rotates while free and locks onto hovered rows. The reference’s dynamic cursor module was not included in the saved HTML/CSS, so the new cursor recreates the behavior rather than claiming identical original runtime code. It is scoped to the ecosystem and disabled for touch and reduced motion; keyboard focus receives visible row and arrow states. Browser visual verification remains unavailable.

Computed palette contrast: sky / navy 7.22:1, beige / navy 9.16:1, white / navy 10.44:1. These verify the specified flat color pairs only, not every rendered state or full accessibility compliance.

## Navbar scroll background

The complete desktop navigation strip and mobile header gain a navy-tinted background, 24 px backdrop blur, subtle lower border and shadow after 16 px of scrolling. This covers both the name and menu. The existing scroll handler initializes the state on load and updates it on scroll / resize. Browsers without backdrop-filter support receive a solid navy fallback.
