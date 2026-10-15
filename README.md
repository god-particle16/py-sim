# PhysLab - free interactive physics simulations

A static website (plain HTML, CSS and JavaScript, no build step) with 10 original simulations, a lesson for each one, and Google AdSense support.

## Run it on your computer
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## Before you publish: edit `js/config.js`
1. `siteUrl`, `contactEmail`, `ownerName`: your real details.
2. Also replace `https://your-domain.com` in `sitemap.xml` and `robots.txt`.
3. Optional: set `showAdPlaceholders: true` to see where ads will appear.

## Hosting (free options)
GitHub Pages, Netlify, Cloudflare Pages. Upload this whole folder. AdSense needs your own domain name (a `.com`/`.in` costs a few dollars per year); a `github.io` or `netlify.app` address is usually not accepted.

## Getting AdSense working
1. Publish the site on your own domain with the Privacy Policy, About, Contact and Terms pages (already included).
2. Apply at https://adsense.google.com and add your site. Approval can take days to weeks. Sites with original, useful content and a clear navigation are approved more often; add more simulations and lessons while you wait.
3. After approval, put your publisher id in `js/config.js` as `adsenseClient: "ca-pub-XXXXXXXXXXXXXXXX"`.
4. In AdSense create three display ad units and paste their slot ids into `adSlots` (`top`, `bottom`, `home`).
5. Edit `ads.txt`: replace `pub-0000000000000000` with your publisher id.
6. Until `adsenseClient` is filled in, no ad code runs at all.

The site shows a small cookie banner (personalised or non-personalised ads) once ads are enabled. If you expect many visitors from the EU, UK or Switzerland, use a certified consent management platform as Google requires.

Do not click your own ads, and do not ask others to. That gets AdSense accounts banned.

## Adding a new simulation
1. Copy any file in `sims/` (for example `pendulum.html`), rename it, and change `data-sim`, the title, the controls, the script and the lesson text.
2. Add one entry to the `sims` list in `js/config.js` (id, file, title, category, level, description, icon).
3. Add the new page to `sitemap.xml`.

The home page, filters, search, "More simulations" lists and breadcrumbs update automatically from the registry.

## Folder layout
```
index.html          home page with searchable library
about / contact / privacy / terms .html
css/style.css       all styling (light and dark mode)
js/config.js        site settings, AdSense ids, simulation registry
js/common.js        header, footer, ads, canvas helpers
sims/*.html         one page per simulation (simulation + lesson)
```

## Ideas for the next batches of simulations
Kinematics graphs, friction and forces, work and energy, simple machines, buoyancy, gas laws, heat transfer, standing waves, sound, lenses and mirrors, magnetic fields, electromagnetic induction, RC circuits, photoelectric effect, radioactive decay, Bohr atom.
