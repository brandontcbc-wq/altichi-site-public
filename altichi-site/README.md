# AltiChi — Brandon T. Chihota

Personal portfolio site for Brandon T. Chihota — Technology, AI & Cloud Solutions Consultant.

**Live site:** [altichi.com](https://altichi.com)

---

## Project Structure

```
altichi-site/
├── index.html          # Main portfolio (single-file site)
├── assets/
│   └── headshot.png    # Profile photo (400×400, optimised)
├── sitemap.xml         # Google sitemap
├── robots.txt          # Search engine crawler instructions
├── netlify.toml        # Build config, headers, redirects
├── .gitignore
└── README.md
```

---

## Local Development

No build step required. Open index.html in a browser, or run a local server:

```bash
python3 -m http.server 3000
# or
npx serve .
```

---

## Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/altichi-site.git
git branch -M main
git push -u origin main
```

---

## Step 2 — Deploy on Netlify

1. Go to app.netlify.com
2. Add new site → Import an existing project → GitHub → select altichi-site
3. Build command: (leave blank) | Publish directory: .
4. Click Deploy site

---

## Step 3 — Connect Custom Domain

### In Netlify:
Site settings → Domain management → Add custom domain → altichi.com

### In Cloudflare DNS (proxy ON for both):

| Type  | Name | Value                 |
|-------|------|-----------------------|
| A     | @    | 75.2.60.5             |
| CNAME | www  | altichi.netlify.app   |

---

## Step 4 — Enable HTTPS

Netlify → Domain management → HTTPS → Verify DNS → Provision certificate
(Free Let's Encrypt cert, auto-renews)

---

## Step 5 — Continuous Deployment

Every push to main auto-deploys in ~30 seconds:

```bash
git add .
git commit -m "your change"
git push
```

---

## Step 6 — Get Found on Google

### 6a. Google Search Console
1. Go to search.google.com/search-console
2. Add property → https://altichi.com
3. Verify via HTML tag method — paste the meta tag into index.html <head>
4. Commit and push → then click Verify

### 6b. Submit Sitemap
Search Console → Sitemaps → enter sitemap.xml → Submit
Google indexes within 1–7 days.

### 6c. Request Indexing
Search Console → paste https://altichi.com in URL bar → Request indexing

### 6d. LinkedIn Signal
- Add altichi.com to your LinkedIn Website field
- LinkedIn backlink = strong Google trust signal
- Your name will rank faster

### 6e. Google Business Profile (Optional)
1. business.google.com → Create profile
2. Category: IT Consultant / Management Consultant
3. Add altichi.com
4. Creates a Google Knowledge Panel for your name

### 6f. SEO Already Built In

| Signal | Status |
|--------|--------|
| Page title with name + role | Done |
| Meta description | Done |
| Open Graph (LinkedIn/Slack previews) | Done |
| Twitter/X card | Done |
| Schema.org Person structured data | Done |
| sitemap.xml | Done |
| robots.txt | Done |
| Canonical URL | Done |
| www to apex redirect (301) | Done |
| HTTPS | Done via Netlify |

---

## Themes

Update the body class in index.html to switch themes:
- theme-light  (default)
- theme-dark   (deep navy)
- theme-slate  (cool blue-grey)
