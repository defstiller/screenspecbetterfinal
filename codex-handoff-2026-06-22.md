# Codex Handoff

Date: 2026-06-22
Workspace: `C:\Users\defst\Desktop\screenspecbetterfinal`

## Project summary

Static marketing site for a North Florida screen enclosure contractor. Main goals have been:

- improve wording so pages sound like a contractor website, not a blog
- tighten SEO structure without creating spammy location-page bloat
- improve homepage clarity and conversions
- improve estimator flow and tracking
- raise readability, especially for older users on desktop and mobile

## Important user preferences

These matter a lot. New chats should keep them in mind.

- User strongly prefers plain contractor language over broad/explanatory/blog-style copy.
- Avoid obvious or self-evident wording like "wall count changes price because more walls need screen."
- Avoid weird meta copy like "this page exists to..."
- Homepage and key pages should read direct, practical, and local.
- Readability matters. User specifically wants larger, easier-to-read text for a 40+ audience.
- "Estimate" language should be framed as:
  - online self-estimate tool for rough pricing first
  - on-site quote when ready for a real quote
- User does not want index/main page sending people to other local pages unnecessarily.
- Main service-area phrasing should be broad and clean, such as serving Duval, St. Johns, Nassau, and Clay counties.
- "Elite room" means composite roof enclosure.

## Existing reference files

Read these first in a new chat before re-auditing from scratch:

- `codex-enclosure-notes.txt`
- `codex-seo-improvement-notes.txt`

What they contain:

- `codex-enclosure-notes.txt`: enclosure basics, project types, mesh types, estimate-sheet terminology
- `codex-seo-improvement-notes.txt`: page-by-page SEO notes, highest-impact fixes, weak legacy pages

## Main pages and code areas

- Homepage: `index.html`
- Services hub: `services.html`
- Contact page: `contact.html`
- Estimator: `estimate.html`
- Shared home CSS/JS:
  - `assets/css/home-refresh.css`
  - `assets/js/home-refresh.js`
- Contact CSS/JS:
  - `assets/css/contact-refresh.css`
  - `assets/js/contact-refresh.js`
- Estimator CSS/JS:
  - `assets/css/estimate-refresh.css`
  - `assets/js/estimate-refresh.js`
- Shared tracking:
  - `assets/js/site-tracking.js`
- Shared readability layer currently present:
  - `assets/css/legacy-readability.css`

## Work already done / current state

### Copy and positioning

- A large wording pass has already happened across homepage, hubs, service pages, and estimator copy.
- User pushed repeatedly toward cleaner, more contractor-like language.
- Homepage hero currently uses the service-stack headline approach and should stay direct.
- Glass enclosures were added as a service on the homepage and in estimator flow, but not intended to become the dominant service.
- Glass enclosures should not be added to the big hero headline and should not be added to the contact selection if that comes up again.

### Estimator logic

- User wanted more realistic time-left values in the estimator, not overly short timers.
- User also wanted project-type wording cleaned up.
- At one point user requested:
  - combine repair/rescreen wording into `Enclosure rescreening`
  - remove `existing roof screen in`
  - remove `composite roof`
- Before changing those again, verify current live estimator state in `estimate.html` and `assets/js/estimate-refresh.js`.
- Mobile estimator scrolling issue was addressed so users do not stay scrolled below the shortened next step after pressing continue.

### Tracking

Tracking code exists in:

- `assets/js/site-tracking.js`

Current IDs in that file:

- Google Ads ID: `AW-804324130`
- Ads lead conversion: `AW-804324130/j4mWCLHr94gcEKKGxP8C`
- Ads phone conversion: `AW-804324130/a7YfCLnl6IgcEKKGxP8C`
- GA4 measurement ID: `G-NHEJ41TJXF`

Current tracking helpers:

- `window.trackLeadConversion(...)`
- `window.trackPhoneClick(...)`
- `window.trackEstimateStart(...)`

Pages currently including `site-tracking.js`:

- `index.html`
- `contact.html`
- `estimate.html`
- `services.html`

Tracking hooks already found:

- homepage estimate starts and form submits
- contact estimate CTA and form submits
- estimator lead submits

Phone-click tracking exists in the shared tracking file, but if tracking looks incomplete in production, verify the actual clickable phone links are calling `trackPhoneClick(...)`.

### Fonts / visual consistency

- There was an issue with `zuume-bold.ttf` failing to decode in the browser.
- Console error seen earlier: failed to decode downloaded font / OTS parsing error.
- User uploaded replacement font files.
- Current tracked font file change:
  - `assets/fonts/brand/zuume-bold.ttf`
- New font directory also exists:
  - `assets/fonts/zuume/`
- Local vs production inconsistencies may have been related to font loading, fallback font differences, or stale caching.

## SEO snapshot

Short version:

- Core refreshed pages are mostly in decent structural shape.
- Biggest SEO weakness is the legacy blog/article group plus weak utility/support pages.

Highest priority SEO pages to revisit:

- `blog.html`
- `choosing-screen-type.html`
- `blog-screen-enclosure-cables.html`
- `blog-screen-enclosure-for-pets.html`
- `lanai-construction.html`
- `estimate.html`
- `privacy.html`

Main SEO guidance already documented in detail in `codex-seo-improvement-notes.txt`.

Important SEO note from user intent:

- Do not generate large amounts of thin location pages just to chase rankings.
- Keep pages useful and distinct.

## Accessibility / ADA snapshot

Current practical conclusion:

- Do not say the site is fully ADA compliant.
- Safer phrasing is: not fully WCAG 2.1/2.2 AA compliant yet.

Main accessibility gaps already identified:

1. No real skip link on core pages.
2. Home lightbox/modal is not fully accessible.
   - no focus trap
   - no clear focus return handling
   - only basic open/close behavior
3. Estimator is highly dynamic and likely under-announced for assistive tech.
4. Focus outlines are manually suppressed in parts of estimator CSS and depend on custom focus styling.
5. Mobile nav button updates `aria-expanded` but keeps a static `aria-label` of "Open navigation".
6. Contrast/zoom/reflow still need real manual testing.

Files previously called out during the accessibility pass:

- `index.html`
- `contact.html`
- `estimate.html`
- `services.html`
- `assets/js/home-refresh.js`
- `assets/js/estimate-refresh.js`
- `assets/css/estimate-refresh.css`

Important tone point:

- We should not give legal assurances about ADA exposure.
- Practical answer used so far: there is still accessibility risk and the site should not be described as fully compliant.

## Search-result naming / branding note

User does not want a full business rename based on a competitor with a similar name.

Intent:

- search-result display name should be `Screen Enclosure Specialists`
- not a complete business rebrand everywhere

If the next chat works on search-result presentation, likely places to check:

- `<title>` tags
- organization schema / WebSite schema
- Google Business Profile naming consistency
- visible brand wording vs schema name

## Current working-tree state

This repo is dirty. Do not blindly revert anything.

Modified files currently include:

- `assets/css/contact-refresh.css`
- `assets/css/estimate-refresh.css`
- `assets/css/home-refresh.css`
- `assets/css/project-pages.css`
- `assets/css/service-pages.css`
- `assets/fonts/brand/zuume-bold.ttf`
- `assets/js/contact-refresh.js`
- `assets/js/estimate-refresh.js`
- `assets/js/home-refresh.js`
- `blog-screen-enclosure-cables.html`
- `blog-screen-enclosure-for-pets.html`
- `blog.html`
- `choosing-screen-type.html`
- `composite-roof-enclosures.html`
- `composite-roof-riser-wall-project.html`
- `contact.html`
- `estimate.html`
- `index.html`
- `jacksonville-pool-enclosure-rescreening.html`
- `jacksonville-screen-enclosures.html`
- `lanai-construction.html`
- `large-panoramic-pool-enclosure-project.html`
- `maestroshield-rolldown-project.html`
- `maestroshield-rolldown-screens.html`
- `new-screen-enclosures.html`
- `old index/index.html`
- `ponte-vedra-screen-enclosures.html`
- `pool-enclosure-rescreening.html`
- `portfolio.html`
- `privacy.html`
- `screen-enclosure-rebuilds.html`
- `screen-enclosure-repair.html`
- `services.html`
- `st-augustine-pool-enclosure-rescreening.html`
- `st-augustine-screen-enclosures.html`
- `st-johns-county-screen-enclosures.html`

Untracked items currently include:

- `.chrome-check/`
- `.chrome-home-audit-desktop/`
- `.chrome-home-audit-mobile/`
- `assets/css/legacy-readability.css`
- `assets/fonts/zuume/`
- `assets/js/site-tracking.js`
- `codex-seo-improvement-notes.txt`

## Suggested next priorities for a new chat

Recommended order:

1. Confirm current live state of homepage typography and font loading.
   - Make sure the Zuume font is loading consistently.
   - Compare local vs production if visual mismatches still exist.

2. Clean up accessibility basics on core pages.
   - add skip link
   - fix modal/lightbox accessibility
   - tighten estimator live announcements and error semantics
   - review focus states

3. Resolve weak legacy SEO pages.
   - rebuild or noindex old article set
   - remove weak pages from sitemap if they stay low quality

4. Verify conversion tracking end to end.
   - confirm phone clicks are firing
   - confirm GA4 receives events beyond `page_view`
   - confirm Google Ads conversions are attached to the right user actions

5. Do a final consistency pass on service/location pages.
   - text size
   - button size
   - contractor tone
   - internal links

## Quick orientation for the next Codex chat

If starting fresh, do this first:

1. Read `codex-enclosure-notes.txt`
2. Read `codex-seo-improvement-notes.txt`
3. Check `git status --short`
4. Open `index.html`, `estimate.html`, `contact.html`, `services.html`
5. Review `assets/js/site-tracking.js`
6. Ask the user which of these they want next:
   - accessibility remediation
   - SEO cleanup
   - tracking verification
   - typography / visual polish
