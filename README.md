# Alexander Hu — Composer Portfolio

React portfolio site for Alexander Hu, Music Composition student at Lawrence University (Class of 2027).

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

## Contact form (Cloudflare Pages Function)

The Contact section's form submits to `/api/contact`, a Cloudflare Pages Function at `functions/api/contact.js` that emails submissions via [Resend](https://resend.com).

To enable it after deploying to Cloudflare Pages:

1. Create a free Resend account.
2. (Recommended) Verify a sending domain in Resend, then update `FROM_ADDRESS` in `functions/api/contact.js` to use it, e.g. `Alexander Hu Website <contact@yourdomain.com>`. Until you do, it sends from Resend's shared `onboarding@resend.dev` address, which works but is less deliverable long-term.
3. In the Cloudflare Pages project: **Settings → Environment variables**, add a secret named `RESEND_API_KEY` with your Resend API key. Add it to both Production and Preview environments.
4. Redeploy (or trigger a new build) so the function picks up the variable.

Submissions get emailed to `alexhucomposer@gmail.com` with the visitor's message and their email set as the reply-to address.

Pages Functions only run once the site is deployed on Cloudflare Pages — `npm start` locally will show the form, but sending will fail until you're testing against a deployed (or `wrangler pages dev`) environment with the API key configured.

## Project Structure

```
alexander-hu-site/
├── functions/
│   └── api/
│       └── contact.js
├── public/
│   ├── index.html
│   └── images/
├── src/
│   ├── index.js
│   └── App.jsx
└── package.json
```
