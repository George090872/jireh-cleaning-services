# Jireh Cleaning

Customer website for Jireh Cleaning in Ottawa. React, TypeScript, Vite and Tailwind CSS; estimate requests use the embedded Tally form https://tally.so/r/xXjrkv.

## Development

Use Node.js 22.12 or newer. Run `npm ci`, then `npm run dev`. Run `npm run build` to type-check and produce `dist/`.

## Deploy to Vercel

Import this repository in the owner’s Vercel account. Framework: Vite. Build command: `npm run build`. Output: `dist`. No environment variables are required. `vercel.json` supports direct visits and refreshes on service and estimate URLs.

After deployment, test the homepage, service dropdown, mobile reviews, service-page refresh, and Tally form. Submit one clearly labelled test estimate and confirm receipt with the owner. Tally form content and notification recipients are managed in the owner’s Tally account, not this repository.

## Ownership and files

Intended GitHub owner: George090872. Contact: contactjirehcleaning@gmail.com.

`src/components` contains the site sections; `src/data/services.ts` contains service descriptions and image paths; `public` contains images. This release excludes unused template routes, dashboards, Supabase, Resend, Geoapify, Lovable tagging, environment files, and ChatGPT hosting metadata. Original development folders remain separate backups.

Never commit `.env` files, credentials, `node_modules`, `dist`, or `.vercel`. Only npm’s lockfile is used.

## Verification

Production build and TypeScript check passed. Runtime dependency audit reports zero known vulnerabilities at preparation time. Eight development-only dependency advisories remain in the Tailwind 3 tooling tree; review before future toolchain upgrades. Browser and email end-to-end checks remain required on the Vercel deployment.
