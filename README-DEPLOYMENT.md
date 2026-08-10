# AltiChi Site Update — Deployment Guide

## What's in this zip

- `index.html`, `services.html`, `case-studies.html`, `about.html`, `contact.html` — the five real production pages
- `assets/styles.css`, `assets/main.js`, `assets/headshot.png` — shared across every page
- `partials/nav.html`, `partials/footer.html` — fetched and injected by `main.js` on every page load
- `legacy/index-v1.html` — your original single-page site, untouched, kept for reference
- `preview-*.html` — self-contained versions of each page for quick viewing only. **Do not deploy these** — they're for you to open and look at, not part of the site.

## Before you push: preview locally

Because `main.js` uses `fetch()` to load the nav and footer, opening `index.html` by double-clicking it won't work correctly (browsers block `fetch()` on local files as a security measure). To preview the real site locally before pushing:

- **Easiest**: install the "Live Server" extension in VS Code, right-click `index.html`, choose "Open with Live Server"
- **Alternative**: open a terminal in this folder and run `python -m http.server`, then visit `http://localhost:8000` in your browser

The `preview-*.html` files don't have this problem, since they're self-contained, open those directly anytime for a quick look.

## Deployment steps

### 1. Back up your current live state (one-time, do this first)

In your existing project folder (`C:\\Users\\brand\\Downloads\\altichi-site`):

```
git tag v1-single-page
git push origin v1-single-page
```

This creates a permanent, restorable snapshot of what's live right now. You can always get back to it with `git checkout v1-single-page`.

### 2. Create a branch for this update

```
git checkout -b multi-page-redesign
```

This keeps your changes off `main` until you've reviewed them live, since Netlify auto-deploys `main` straight to production.

### 3. Replace your files

Delete your old `index.html` from the working folder (it's preserved in `legacy/index-v1.html` in this zip and permanently in the `v1-single-page` git tag) and copy everything from this zip into your project folder, keeping the same folder structure (`assets/`, `partials/`, `legacy/`, plus the five `.html` files at the root).

### 4. Commit and push the branch

```
git add .
git commit -m "Multi-page consulting site redesign"
git push origin multi-page-redesign
```

### 5. Review the Netlify deploy preview

Netlify will automatically detect the new branch and build a deploy preview, a real, working URL you can click through on your phone or share with anyone, without touching your live site. Check your Netlify dashboard, or open a pull request on GitHub from `multi-page-redesign` into `main`, which will show the preview link directly on the PR.

### 6. Merge to go live

Once the preview looks right:

```
git checkout main
git merge multi-page-redesign
git push origin main
```

This triggers Netlify's production deploy. Your live site updates within a minute or two.

## If something goes wrong

Restore the previous live version instantly:

```
git checkout v1-single-page -- index.html
git commit -m "Revert to v1"
git push origin main
```
