# Portfolio — Saim Ishak

Personal portfolio for **Saim Ishak**, a full-stack developer who builds native desktop applications and web systems. Open to remote work and relocation.

**Live site:** https://vostro213.github.io/project-portfolio/

---

## Featured work

| Project | Stack | Scale |
| --- | --- | --- |
| **Solo Life** — offline-first habit tracker with an RPG progression engine | Tauri 2, React 19, TypeScript, Zustand, Tailwind v4 | 4,557 lines of TS/TSX · 76 test cases · 25 lines of Rust |
| **Retail POS System** — point-of-sale with credit ledgers and thermal invoices | Python 3.14, PySide6, Flet, SQLite, PyInstaller | 5,124 lines of Python · 38 DB functions · 5 tables |
| **University Course Platform** — course catalogue with authentication | PHP, MySQL, JavaScript | deployed through a CI pipeline |

## Tech stack of this site

| Layer | Technology |
| --- | --- |
| UI | React 19 (hooks, state, effects, `IntersectionObserver` reveals) |
| Build | Vite 8 |
| Styling | Hand-written CSS — design tokens, CSS Grid, custom properties |
| Icons | Font Awesome |
| Fonts | Zen Kaku Gothic New, Noto Sans JP, Inter, JetBrains Mono |
| Quality | ESLint 10 (`eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) |
| CI/CD | GitHub Actions → GitHub Pages |

No CSS framework and no UI library — the styling layer is written from scratch in
[`src/index.css`](./src/index.css) using custom properties as design tokens.

## Features

- Seven sections: Home, About, Journey, Skills, Approach, Work, Contact.
- Deep-linkable navigation — the active section is synced to `window.location.hash`.
- Animated typewriter hero with a live metrics strip.
- Scroll-triggered reveals via `IntersectionObserver`, disconnected on unmount.
- Online / offline status indicator.
- Rule-based FAQ chatbot covering the real projects.
- Contact form via Formspree.
- SEO: canonical URL, Open Graph and Twitter Card meta, JSON-LD `Person` schema.
- CV download at `public/Ishak-Cv-Professional.pdf`.

## Testing

Two suites run on every push.

**`npm run smoke`** renders all seven sections through `react-dom/server` and fails if any of them
throws. It exists because a production build and ESLint both pass while a section can still crash
the browser at runtime — a missing optional field in a content array is invisible to both, but takes
down the whole page. It also validates that each section actually produces markup rather than an
empty shell.

**`npm run test:chat`** covers the chatbot's question matcher with 27 assertions: 23 questions that
must route to the right topic, and 4 that must return no match at all so the assistant says it does
not know instead of guessing. Both suites run in `ci.yml` and again in `deploy.yml` before anything
is published.

## The chatbot

Not a language model — a deterministic matcher in `src/lib/chatEngine.js`. No API key, no network
call, no cost, and it cannot hallucinate because it only ever returns text written in the knowledge
base.

How a question is resolved:

1. Lowercase, strip punctuation and accents.
2. Drop stop words, so "what do you know about the projects" reduces to its content words.
3. Stem each token and map synonyms — `technologies` → `stack`, `hire` → `contact`, `shop` → `retail`.
4. Score every knowledge entry: exact match scores 1, a Levenshtein similarity of 0.72+ scores 0.75,
   prefix and substring matches score 0.7, and shared character bigrams score 0.6. Typo tolerance is
   why "sollolif" still reaches the Solo Life entry.
5. Weight the score by how much of the question was actually matched, so a long question that only
   hits one keyword out of ten does not win.
6. Below the confidence threshold, return no match and the assistant offers suggestions instead of
   inventing an answer.

Follow-up chips are rebuilt from each answer, so the next question is one tap away.

## Architecture

```text
App.jsx
├── Navbar          seven-section navigation state, synced to the URL hash
├── main-content
│   └── <Section>    one mounted at a time, keyed so state resets on switch
├── ChatBot         overlay
├── ScrollToTop     overlay
└── Footer
```

Navigation is state-driven: `App` holds the active `section`, derives the initial value from the
URL hash, and renders exactly one section component. Because the section is used as the `key` on
`main-content`, React remounts it on change, which resets each section's reveal state and keeps
scroll position predictable. Each section owns its reveal animation and tears down its observer.

Project content in `Projects.jsx` and skill lists in `Skills.jsx` are plain data arrays declared at
the top of each file, matching the pattern already used by `Timeline.jsx` and `ChatBot.jsx`.

## Project structure

```text
.
├── .github/workflows/
│   ├── ci.yml            lint + smoke test + build on push and pull request
│   └── deploy.yml        same checks, then publish to GitHub Pages on push to master
├── public/               static assets (CV, course-platform screenshots, favicon)
├── scripts/
│   ├── chat-engine.test.mjs   27 assertions for the chatbot question matcher
│   └── smoke.mjs              server-side render check for all seven sections
├── src/
│   ├── components/       one file per section, plus ChatBot / Footer / Navbar / ScrollToTop
│   ├── lib/
│   │   └── chatEngine.js tokeniser, stemmer, synonyms and scorer for the chatbot
│   ├── App.jsx           layout, section state and hash routing
│   ├── index.css         all styles
│   └── main.jsx          entry point
├── eslint.config.js
├── index.html
└── vite.config.js
```

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start dev server with HMR
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run lint       # run ESLint
npm run smoke      # render every section server-side to catch runtime errors
npm run test:chat  # 27 assertions for the chatbot's question matcher
```

Requires Node.js 20 or newer.

## Deployment

Pushing to `master` runs two workflows:

1. **`ci.yml`** — installs dependencies, runs `npm run lint`, runs `npm run smoke`, runs `npm run build`.
2. **`deploy.yml`** — repeats the same three checks, then publishes `dist/` to GitHub Pages.

Repository **Settings → Pages → Source** must be set to **GitHub Actions**. The site is served from
the `gh-pages` branch at `https://vostro213.github.io/project-portfolio/`.

`vite.config.js` sets `base: '/project-portfolio/'` to match the repository name. If the site is
ever moved to a user page at `vostro213.github.io`, that value must become `'/'`.

## Contact

- Email: ishaksaim0@gmail.com
- Phone: +213 5 54 67 53 88
- GitHub: https://github.com/Vostro213
- LinkedIn: https://www.linkedin.com/in/ishak-saim-245549369

## License

© Saim Ishak. All rights reserved.
