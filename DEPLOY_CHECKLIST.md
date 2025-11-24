# Deployment Checklist for GreenGeeks

Your code is ready to deploy to GreenGeeks. Follow these steps:

## Pre-Deployment Checklist

✅ .cpanel.yml exists and is configured (uses pnpm install + pnpm run build:client)
✅ package.json has build:client script (pnpm run build:client)
✅ All code changes committed and pushed to GitHub
✅ .github/workflows/build-and-commit-dist.yml configured (auto-builds on GitHub)

## Step 1: Push to GitHub (if not already done)
```bash
git push origin main
```

## Step 2: In GreenGeeks cPanel

1. Go to **Git Version Control**
2. Click **Clone a Repository**
3. Paste your GitHub repo URL: `https://github.com/nvolpe2007-cell/dink-s-20plumbing.git`
4. Set **Clone into**: `/home/dinksplu/repositories/dink-s-20plumbing` (or your repo path)
5. Click **Clone**
6. After cloning, cPanel will detect `.cpanel.yml` and run the deployment hooks automatically

## What .cpanel.yml Does

- **pre_deploy**: Installs pnpm and dependencies with `pnpm install --frozen-lockfile`
- **post_deploy**: 
  - Builds the client with `pnpm run build:client`
  - Copies built files from `dist/spa/` to `public_html/`
  - Your site is now live at `dinksplumbing.us`

## Troubleshooting

- If deployment fails, check `/home/dinksplu/repositories/dink-s-20plumbing/` for error logs
- Ensure `public_html` exists and is writable
- Verify GitHub repo is accessible from GreenGeeks

## After Deployment

- Visit **dinksplumbing.us** to verify the site is live
- All future pushes to GitHub's `main` branch will trigger the GitHub Action (builds + commits public_html)
- GreenGeeks Git Version Control can pull updates automatically or manually via the cPanel UI
