# Learn to Animate

An interactive course in web motion with CSS and Motion for React.

The 19 lessons combine browser playgrounds with short coding exercises. The final project is Issue desk, an issue tracker with animated sorting, a details panel, and reduced-motion support. The project lesson includes a working React starter and a reference implementation.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS v4
- Motion (`motion/react`) for all component animation
- Canvas for particles, WAAPI for easing previews

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000 for the course.

## GitHub Pages

The GitHub Actions workflow builds the static export on pull requests and publishes it on pushes to `main` once GitHub Pages is configured. The export expects to be served at the root of `animate.cloudwaddie.com`.

1. In the repository’s **Settings → Pages**, select **GitHub Actions** as the source and save `animate.cloudwaddie.com` as the custom domain.
2. At the DNS provider, set a CNAME for `animate` pointing to `cloudwaddie.github.io`. For Cloudflare, set the record to **DNS only** so GitHub can verify the target and provision HTTPS.
3. Push to `main` or run the **GitHub Pages** workflow from `main` in the Actions tab. Enable **Enforce HTTPS** in Pages once the certificate is ready.

To check the exported site locally:

```sh
npm run build
python3 -m http.server 3000 --directory out
```

Inspired by the craft of [animations.dev](https://animations.dev), [whimsy.joshwcomeau.com](https://whimsy.joshwcomeau.com), and [emilkowal.ski](https://emilkowal.ski).
