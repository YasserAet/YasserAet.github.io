# Yassir Aitali — Portfolio

**Software Engineer — AI · Full-Stack · Real-Time 3D & Digital Twins**

A bilingual (EN/FR), dark-themed portfolio positioning Yassir Aitali as a software engineer working across AI-enabled applications, full-stack web platforms, and real-time 3D / digital-twin interfaces. Built as a single-page React app and deployed to GitHub Pages.

---

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** + **GSAP** (ScrollTrigger) for animation
- **i18next** / **react-i18next** for full English / French support
- **lucide-react** icons
- **react-intersection-observer** for scroll-triggered reveals
- Deployed via **GitHub Pages**

## Site sections

`Hero → About → Experience → Education → Certificates → What I Build → Selected Work (case studies + "Also built" strip) → Skills → Contact → Footer`

- **Hero** — headline, capability badges, CTAs, discreet availability line.
- **About** — engineer bio + a "Snapshot" card (role, PFE, location, languages).
- **Experience** — timeline, led by the PFE at UM6P DICE.
- **What I Build** — four capability cards (AI, Full-Stack, Real-Time 3D, Computer Vision).
- **Selected Work** — featured projects as structured case studies (Context · Problem · What I built · Stack · What it demonstrates · Status · Links + tag chips), plus a compact "Also built" strip.
- **Skills** — grouped by capability.
- **Contact** — Email / LinkedIn / GitHub / Download CV buttons, plus an optional Formspree-backed form.

## Run locally

```bash
npm install
npm run dev      # starts Vite dev server on http://localhost:3000
```

Other scripts:

```bash
npm run build    # type-checks (tsc) then builds to dist/
npm run preview  # preview the production build locally
npm run lint     # eslint
```

## Contact form (optional)

The contact form posts to [Formspree](https://formspree.io). Configure it via an env var:

1. Copy `.env.example` to `.env`.
2. Set `VITE_FORMSPREE_ENDPOINT` to your Formspree endpoint (e.g. `https://formspree.io/f/xxxxxxxx`).

If the variable is **not** set, the form is hidden and the page shows the direct
Email / LinkedIn / GitHub buttons only — the form never shows a fake "message sent".

> `.env` is git-ignored; never commit your real endpoint.

## Internationalization

All copy lives in:

- `src/i18n/locales/en.json`
- `src/i18n/locales/fr.json`

Both files share identical keys. Components read text via `t('key')` /
`t('key', { returnObjects: true })` — there are no hardcoded section strings.
**Any text change must be made in both files.**

## Build & deploy (GitHub Pages)

`vite.config.ts` uses `base: '/'` for a user/organization site
(`https://<user>.github.io/`). If you deploy as a **project** site
(`https://<user>.github.io/<repo>/`), change `base` to `'/<repo>/'`.

Build and publish the `dist/` folder:

```bash
npm run build
```

Then either:

- Push `dist/` to the `gh-pages` branch (e.g. with the `gh-pages` package), **or**
- Use a GitHub Actions workflow that builds and deploys `dist/` to Pages.

`public/.nojekyll` is included so GitHub Pages serves Vite's `_`-prefixed assets.

## Project structure

```
.
├── index.html              # SEO meta, Open Graph & Twitter Card tags
├── public/                 # static assets served at site root
│   ├── CV_Yassir_Aitali_EN.pdf
│   ├── CV_Yassir_Aitali_FR.pdf
│   └── ...certificate images, .nojekyll
├── src/
│   ├── App.tsx             # section composition
│   ├── main.tsx            # entry + i18n init
│   ├── i18n/
│   │   ├── config.ts
│   │   └── locales/{en,fr}.json
│   └── components/
│       ├── Navigation.tsx  Hero.tsx  About.tsx  WhatIBuild.tsx
│       ├── Experience.tsx  Education.tsx  Certificates.tsx
│       ├── Projects.tsx    Skills.tsx  Contact.tsx  Footer.tsx
│       └── ScrollProgress.tsx
├── vite.config.ts
└── tailwind.config.js
```

## Screenshots

> Add real screenshots to `public/` and reference them here and in the project
> case studies (`projects.featured[].image` in the locale files).

| Hero | Selected Work |
| --- | --- |
| _add screenshot_ | _add screenshot_ |

## Contact

- **Email:** yasseraitali@outlook.fr
- **LinkedIn:** https://www.linkedin.com/in/aitali-yassir/
- **GitHub:** https://github.com/YasserAet
