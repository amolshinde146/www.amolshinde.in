# Amol Shinde — Portfolio Website

Personal portfolio for **Amol Shinde** — Senior Data & Analytics Professional.
Big Data Engineering · BI Analytics · Cybersecurity · Databricks · PySpark · Qlik Sense · SQL.

Static site: pure HTML + CSS + vanilla JS. **No frameworks, no build step, no dependencies.**

## 1. Project Overview

- Two pages: `index.html` (home) and `contact.html`
- Dark/light theme (system default, persisted in `localStorage`)
- Fully responsive, accessible (semantic HTML, skip link, focus states, reduced-motion support)
- SEO: meta tags, Open Graph, Twitter cards, JSON-LD (`Person`, `WebSite`, `ProfilePage`, `ContactPage`), `robots.txt`, `sitemap.xml`
- Self-hosted fonts (Plus Jakarta Sans, woff2) — no third-party requests

## 2. Technology Stack

| Layer     | Choice                                    |
|-----------|-------------------------------------------|
| Markup    | Semantic HTML5                            |
| Styling   | Single CSS file with custom properties    |
| Behaviour | ~5 KB vanilla JS (`assets/js/main.js`)    |
| Fonts     | Plus Jakarta Sans (self-hosted woff2)     |
| Hosting   | GitHub Pages or any static host (Hostinger) |

## 3. Local Development

No build required. Open `index.html` in a browser, or serve it:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## 4. Build Process

None — what's in the repo is what gets deployed.

## 5. GitHub Pages Deployment

```bash
git init
git add .
git commit -m "Redesign portfolio website"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO>.git
git push -u origin main
```

Then in GitHub:

> Repository → **Settings** → **Pages** → **Build and deployment** → **Source: Deploy from a branch** → Branch: `main` / root → Save

GitHub Pages serves the repo root; `CNAME` and `.nojekyll` are already included. No Actions workflow is needed since there is no build step. *(CONFIGURATION REQUIRED: your GitHub username/repository.)*

## 6. Custom Domain Configuration

`CNAME` already contains:

```text
www.amolshinde.in
```

In GitHub: **Settings → Pages → Custom domain** → enter `www.amolshinde.in` → enable **Enforce HTTPS** once the certificate is issued.

**DNS records to create at your domain provider** (not configured by this project — CONFIGURATION REQUIRED):

| Type  | Host | Value                              |
|-------|------|------------------------------------|
| CNAME | www  | `<YOUR-USERNAME>.github.io`        |
| A     | @    | 185.199.108.153                    |
| A     | @    | 185.199.109.153                    |
| A     | @    | 185.199.110.153                    |
| A     | @    | 185.199.111.153                    |

Wait for DNS propagation and the TLS certificate to provision before enabling Enforce HTTPS.

## 7. Hostinger Deployment

The same static files work unchanged:

1. Build output = the repository files themselves (there is no build).
2. Upload **all files** (index.html, contact.html, assets/, favicon.png, robots.txt, sitemap.xml, .nojekyll, CNAME) to `public_html/` via File Manager or FTP.
3. On Hostinger, remove the `CNAME` file (it is only meaningful for GitHub Pages).

## 8. Project Structure

```text
www.amolshinde.in/
├── index.html          # Home: hero, stats, about, expertise, impact, contact
├── contact.html        # Contact page with mailto form + WhatsApp
├── assets/
│   ├── css/style.css   # Design system (dark/light tokens, responsive)
│   ├── js/main.js      # Theme, mobile nav, scroll reveal, counters
│   ├── fonts/          # Plus Jakarta Sans woff2 (self-hosted)
│   ├── img/            # portrait.jpg, og-image.png
│   └── icons/favicon.svg
├── favicon.png
├── robots.txt
├── sitemap.xml
├── CNAME               # GitHub Pages custom domain (www.amolshinde.in)
├── .nojekyll           # Skip Jekyll processing on GitHub Pages
└── README.md
```

## 9. SEO Configuration

- Canonical domain: `https://www.amolshinde.in/` (update both HTML files if this changes)
- Open Graph image: `assets/img/og-image.png` (1200×630)
- Structured data validates at [Rich Results Test](https://search.google.com/test/rich-results)
- Submit `sitemap.xml` in [Google Search Console](https://search.google.com/search-console) after going live

## 10. Maintenance

- Replace `img/personal.jpg` with a professional headshot, then re-run the portrait crop (or overwrite `assets/img/portrait.jpg` directly with a ~640×640 JPEG)
- To change the accent colour, edit `--accent` in `assets/css/style.css` (tokens cascade everywhere)

## 11. Hosting on GitHub Pages (custom domain www.amolshinde.in)

The repo ships with `CNAME` and `.nojekyll` at the root — no build step needed.

1. **DNS at your registrar** (where `amolshinde.in` is managed):
   - CNAME record: `www` → `<your-username>.github.io`
   - A records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Optional IPv6 AAAA for `@`: `2606:50c0:8000::153` … `2606:50c0:8003::153`
2. **GitHub**: push this repo to a **public** repository, then Settings → Pages →
   Custom domain: `www.amolshinde.in` → Save. Apex ↔ www redirects are automatic
   once both DNS records exist.
3. **HTTPS**: after the DNS check passes (up to 24h), tick **Enforce HTTPS**.
4. **Recommended**: verify the domain under account Settings → Pages to prevent takeover.

## Content Integrity Note

All professional claims on the site come from the previous website's own content
(10+ years, certifications, 150+ security audits, 40TB+ data, 200+ BI reports, contact details).
No employers, dates, projects, credentials or links were invented. Sections lacking
source data use explicit `[CONTENT REQUIRED]` placeholders.
