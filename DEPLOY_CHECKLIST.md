# Deployment Checklist — GreenGeeks cPanel (Static Export)

This repository now provides a fully static export suitable for shared cPanel hosting (GreenGeeks). Follow these steps to deploy the site by uploading the prebuilt static files to public_html.

1) Use the prebuilt public_html folder
- The repository contains a ready-to-upload `public_html/` directory with compiled HTML, CSS, JS, and assets.
- Upload the contents of `public_html/` directly into the site's `/public_html` root directory via cPanel File Manager or SFTP.

2) DNS / domain settings (GreenGeeks nameservers)
- Keep nameservers pointed at ns1.greengeeks.net / ns2.greengeeks.net and manage DNS in GreenGeeks.
- Ensure the domain's root (@) and www records do not conflict. If you want Netlify-style IPs, use A records; otherwise point www to the apex.

3) Remove server-side features
- All server and serverless code has been removed from the build. This export is purely static and requires no Node.js runtime.

4) Caching & headers
- Configure caching in cPanel or via .htaccess in /public_html:
  - Cache static assets (CSS/JS/images) for 30 days or more
  - Set HTML to a short cache or use etags
  - Example .htaccess snippet (place in public_html):

  <IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 1 hour"
    ExpiresByType text/css "access plus 30 days"
    ExpiresByType application/javascript "access plus 30 days"
    ExpiresByType image/* "access plus 30 days"
  </IfModule>

5) HTTPS
- Use GreenGeeks SSL (cPanel) to provision a certificate for your domain, or use Let's Encrypt via cPanel if available.

6) Testing
- After uploading, visit https://yourdomain to verify the site loads and that assets are served.
- Check robots/meta tags and sitemap (public_html/sitemap.xml) for correct URLs.

7) Troubleshooting
- If paths break, ensure files are uploaded preserving the directory structure and that the site is served from the domain root.
- If you prefer automatic deployments, use GreenGeeks Git Version Control to pull from this repository after pushing built files to `public_html` branch.


If you want, I can:
- Trigger a fresh build locally and update the `public_html/` folder with the latest compiled assets (requires a build run).
- Provide the exact .htaccess snippet customized for your caching/security preferences.
