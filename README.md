# Alexander Hu — Composer Portfolio

React portfolio site for Alexander Hu, Music Composition student at Lawrence University (Class of 2026).

## Getting Started

```bash
npm install
npm start
```

## Deploying to Cloudflare Pages

This repo is meant to be connected directly to a Cloudflare Pages project:

1. In the Cloudflare dashboard, create a Pages project and connect this GitHub repo.
2. Set the build command to `npm run build` and the output directory to `build`.
3. Every push to `main` will trigger Cloudflare to install dependencies and rebuild automatically — no manual build or upload needed.

To build locally for testing:

```bash
npm run build
```

## Project Structure

```
alexander-hu-site/
├── public/
│   ├── index.html
│   └── images/
│       └── kalhh-violin-1252019_1280.jpg
├── src/
│   ├── index.js
│   └── App.jsx
└── package.json
```
