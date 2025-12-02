# Deployment Checklist — Netlify

This project is configured to deploy on Netlify. Remove GreenGeeks-specific deployment configs and follow the steps below.

1) Netlify site
- Connect your GitHub repository to Netlify (Site settings → Build & deploy → Continuous Deployment → Link to Git provider).
- In Netlify build settings use:
  - Build command: pnpm run build:client
  - Publish directory: dist/spa
  - Base directory: (root of repo)
- Ensure Netlify detects packageManager = pnpm in package.json. If not, set it manually in the Netlify UI.

2) Environment variables
- Add any runtime environment variables in Netlify (Site settings → Build & deploy → Environment).
- Do NOT commit secrets to the repo. Use Netlify UI to add them.

3) Custom domain (dinksplumbing.us)
- In Netlify → Domain management → Add custom domain: dinksplumbing.us and also add www.dinksplumbing.us.
- Keep nameservers pointed to GreenGeeks (ns1.greengeeks.net / ns2.greengeeks.net) and edit DNS records in GreenGeeks DNS zone:
  - A record for @ → 75.2.60.5
  - A record for @ → 99.83.190.102
  - CNAME for www → dinks-plumbing.netlify.app
  - Remove any conflicting A/CNAME records for @ or www.
- After DNS changes, in Netlify mark preferred domain and allow Netlify to provision HTTPS.

4) Testing & troubleshooting
- Trigger a deploy in Netlify (Deploys → Trigger deploy) or push to main branch to auto-deploy.
- Check Netlify deploy logs for build errors.
- If DNS doesn’t resolve, verify records in GreenGeeks and wait for propagation (minutes–48h).

5) Cleanup
- The repository no longer needs the following files for Netlify deployment; they have been removed or archived:
  - .cpanel.yml
  - .github/workflows/deploy-to-greengeeks.yml
  - .github/workflows/build-and-commit-dist.yml
  - GREEN_GEEKS_DEPLOY.md

If you want, I can:
- Trigger a fresh Netlify deploy from the latest main branch.
- Verify DNS records and HTTPS once you update GreenGeeks DNS.
