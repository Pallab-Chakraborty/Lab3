# ⚡ Interactive Playground

[![Deploy to GitHub Pages](https://github.com/Pallab-Chakraborty/InteractivePlayground/actions/workflows/deploy.yml/badge.svg)](https://github.com/Pallab-Chakraborty/InteractivePlayground/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Live site:** [pallab-chakraborty.github.io/InteractivePlayground](https://pallab-chakraborty.github.io/InteractivePlayground/)

A polished, arcade-themed interactive web playground featuring **3 fully functional tools** — all built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies, just clean code running entirely in the browser.

## 🛠️ Tools Inside

### 🖼️ 01 — Image Sizer
Upload any image and resize it instantly in the browser — no server needed.
- 📁 Drag & drop or click to upload (PNG, JPG, WEBP, GIF)
- 📐 Resize by custom width & height, with a lock/unlock aspect ratio toggle
- 🎨 Choose output format — PNG, JPEG, or WEBP — with a quality slider
- 📊 Shows original size, output size, dimensions & % saved
- ⬇️ One-click download of the resized image

### 🃏 02 — Play Cards (War)
A full browser-based card game of **War** against the CPU.
- 🃏 Full 52-card deck, shuffled and split evenly
- ⚔️ Draw one card per round — highest value wins, with animated card flips
- 🏆 Tracks score and cards remaining for both sides
- 📜 Live battle log, final winner declared after all 26 rounds
- 🔄 New Game button to restart anytime

### 🎲 03 — Roll Dice
Roll 1 to 6 dice with a satisfying 3D CSS animation.
- 🌀 Smooth 3D CSS roll animation on every throw (no canvas or WebGL)
- 📊 Shows individual results, total, highest, and average
- 📈 Roll history tracker (last 10 rolls) with a clear button

## ✨ Design & Tech

| Feature | Detail |
| ------- | ------ |
| Theme   | Retro arcade / dark neon |
| Font    | Press Start 2P + Outfit |
| Colors  | Cyan · Amber · Pink neon palette |
| Motion  | CSS-only 3D dice animation, card flip transitions |
| Layout  | Responsive — works on mobile & desktop |
| Tech    | Pure HTML5 · CSS3 · Vanilla JavaScript |
| Hosting | GitHub Pages (auto-deployed via GitHub Actions) |

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml   CI: auto-deploys to GitHub Pages on every push to main
├── index.html            Page structure and markup
├── css/
│   └── styles.css        All styling (header, hero, panels, all 3 tool sections)
├── js/
│   ├── reveal.js          Scroll-triggered section reveal animation
│   ├── imageSizer.js      Image Sizer tool logic
│   ├── playCards.js       Play Cards (War) game logic
│   └── rollDice.js        Roll Dice tool logic
├── package.json          Project metadata + local dev script (no build step)
├── LICENSE                MIT
└── README.md
```

## 🚀 Running locally

No build tools, npm, or dependencies needed — it runs entirely in the browser.

```bash
git clone https://github.com/Pallab-Chakraborty/InteractivePlayground.git
cd InteractivePlayground
npm start
# serves at http://localhost:8000
```

or, without npm:

```bash
python3 -m http.server 8000
```

## 🚢 Deploying to GitHub Pages

This repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that deploys automatically.

1. Push to `main`.
2. In the repo, go to **Settings → Pages** and set **Source** to **"GitHub Actions"** (one-time setup).
3. Every push to `main` re-deploys automatically — no manual branch/folder wrangling. The badge at the top of this README tracks deploy status.

(The old "deploy from a branch" method still works too, if you'd rather skip the Actions workflow — just delete the `.github` folder and point Pages at the `main` branch, root folder, in repo settings.)

## 🎯 Key Highlights

- ✅ **Zero dependencies** — no npm packages required to run, no frameworks, no libraries
- ✅ **Client-side only** — everything runs in the browser, no backend, no API keys
- ✅ **3 complete tools** across a modular, maintainable file structure
- ✅ **Arcade neon aesthetic** — custom CSS design system
- ✅ **3D CSS dice animation** — pure CSS, no canvas or WebGL
- ✅ **CI/CD** — auto-deploys to GitHub Pages on every push

## 👨‍💻 Developed By

**Pallab Chakraborty** — B.Tech CSE Student, Jawaharlal Nehru University, New Delhi

- 🐙 GitHub: [Pallab-Chakraborty](https://github.com/Pallab-Chakraborty)
- 💼 LinkedIn: [pallabchakrabortyjnu](https://www.linkedin.com/in/pallabchakrabortyjnu/)
- 🌐 Portfolio: [pallab-chakraborty.github.io/pallab](https://pallab-chakraborty.github.io/pallab/)

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

---

Built with ❤️ & ☕ by Pallab Chakraborty · JNU CSE
