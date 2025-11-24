Manual steps to add built static site for GreenGeeks (cPanel)

This repo contains a GitHub Action that will build the client (vite) and commit the built static files from `dist/spa` into `public_html/` on the `main` branch automatically when you push to `main`.

If you prefer to build locally and push the built files yourself, follow these steps:

1. Install dependencies (recommended with npm):

   npm ci

2. Build the client (Vite):

   npm run build:client

   This will generate the static files in `dist/spa/`.

3. Copy the built files into the `public_html/` folder (this repo will include `public_html/` after the GH Action runs, but to do it locally run):

   rm -rf public_html || true
   mkdir -p public_html
   cp -R dist/spa/. public_html/

4. Commit and push the built files:

   git add public_html
   git commit -m "chore: add built static site for GreenGeeks"
   git push origin main

5. On GreenGeeks cPanel (Git Version Control or FTP), connect the repository and set the deployment branch to `main`. The `.cpanel.yml` at the repo root will run the build and copy `dist/spa` to `public_html` if you choose to have the server build instead.

Notes:
- The GitHub Action above will automate building and committing the `public_html` folder for you when you push to `main`.
- If your repository uses pnpm or yarn, adjust the install steps accordingly.
- If you want to exclude large generated assets from git, consider using a separate branch for built artifacts.
