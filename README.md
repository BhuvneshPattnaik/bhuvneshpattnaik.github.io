# Bhuvnesh Pattnaik — Portfolio

Personal portfolio built with [Astro](https://astro.build). Modular, fast, zero-JS-framework overhead.

## 🗂 Project Structure

```
src/
├── layouts/
│   └── Layout.astro          # Base HTML shell, font imports, CSS imports
├── pages/
│   └── index.astro           # Main page — assembles all components
├── components/
│   ├── Loader.astro
│   ├── Header.astro
│   ├── SideNav.astro
│   ├── SectionCounter.astro
│   ├── TerminalModal.astro
│   └── sections/
│       ├── Hero.astro
│       ├── About.astro
│       ├── Skills.astro
│       ├── Experience.astro
│       ├── Projects.astro
│       └── Contact.astro
├── data/                     # All content lives here — edit to update portfolio
│   ├── experience.js
│   ├── projects.js
│   └── skills.js
├── scripts/                  # Pure JS modules — one concern each
│   ├── loader.js
│   ├── particles.js
│   ├── cursor.js
│   ├── typing.js
│   ├── navigation.js
│   ├── experience.js
│   ├── terminal.js
│   └── cards3d.js
└── styles/
    ├── global.css            # Reset, CSS vars, cursor, loader, header, sidenav
    ├── animations.css        # All @keyframes + transition classes
    └── sections.css          # Per-section styles + terminal modal
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deploying to GitHub Pages

### Option A — `<username>.github.io` (user/org site)

1. Create a repo named `<your-github-username>.github.io`
2. In `astro.config.mjs`, set:
   ```js
   site: 'https://<your-github-username>.github.io',
   base: '/',
   ```
3. Push to `main` — GitHub Actions will build and deploy automatically.

### Option B — Project repo (e.g. `portfolio`)

1. Create a repo with any name, e.g. `portfolio`
2. In `astro.config.mjs`, set:
   ```js
   site: 'https://<your-github-username>.github.io',
   base: '/portfolio/',
   ```
3. In GitHub repo → **Settings → Pages → Source**, select **GitHub Actions**.
4. Push to `main`.

### Enable Pages in GitHub

Go to your repo → **Settings** → **Pages** → under **Build and deployment**, choose **GitHub Actions**.

The workflow at `.github/workflows/deploy.yml` handles everything automatically on every push to `main`.

## ✏️ Updating Content

All personal content is in `src/data/` — no need to touch components:

| File | What to edit |
|------|-------------|
| `src/data/experience.js` | Job history, bullet points, tech stacks |
| `src/data/projects.js` | Project cards, links, tags |
| `src/data/skills.js` | Skill groups and proficiency bars |

To update name, location, email, or hero chips — edit `src/components/sections/Hero.astro` and `src/components/sections/Contact.astro`.

## 🛠 Tech

- [Astro](https://astro.build) — static site generator
- Vanilla JS (ES modules) — no framework overhead
- JetBrains Mono + Space Grotesk (Google Fonts)
- GitHub Actions — CI/CD to GitHub Pages
