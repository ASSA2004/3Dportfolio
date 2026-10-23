# sadiq3DPortfolio

A fresh standalone portfolio using your exported `preview.glb` (copied as `public/models/studio.glb`). Original Blender files are unchanged.

## Open locally

Open a terminal in this folder and run `python server.py`, then visit **http://localhost:4173**. Do not open index.html by double-clicking: model loading requires HTTP. Python 3 is required for this preview helper. No npm installation, CDN, build, or API key is needed. All runtime files are local. `npm start` is an optional equivalent if npm is installed.

## Controls

### Two experiences

The page starts in **Portfolio view**, with the original room overview and readable navigation. Click **Enter room** for an immersive full-window room. Inside this view, **Orbit** is active by default and **Walk** is selectable using the toolbar; **Portfolio view** returns to the normal page.

**Walk:** fixed 1.62 m eye height, WASD or arrows for forward/back/strafe relative to your viewing direction. Click **Click to look around** to capture the mouse, then move the mouse to look. Aim at an object and click or press **E** to open it. Escape releases the mouse so you can use the toolbar. Opening details also releases the mouse; close the panel and click the look button to resume. If mouse capture is unavailable, drag to look and click objects normally. Walking includes room bounds and simple padded bounding-box obstacles for the desk, chair, backpack, plant, and solar display. This is lightweight navigation, not a full physics simulation. Touch users can drag to look; keyboard walking requires a keyboard, and Orbit is available for touch exploration.

**Orbit:** drag to rotate, scroll/pinch to zoom, right-drag/two-finger drag to pan, click objects to open details. Switching modes resets to the corresponding starting viewpoint.

### Original portfolio view

- WASD or arrow keys: move the camera and its orbit target together across the floor plane. Movement is bounded; this is a studio exploration camera, not first-person physics or collision navigation.
- Drag: orbit. Scroll or pinch: zoom. Right-drag/two-finger drag: pan.
- Click/tap objects: open their portfolio section. Dragging does not trigger clicks.
- Click the lamp: change the scene mood.
- R or Reset view: return to overview.
- Escape: close an open panel. Keyboard movement pauses while a panel is open.
- Mobile: touch orbit, pinch zoom, and large section buttons.
- Portfolio index: all content is accessible without interacting with 3D, including if WebGL/model loading fails.

## Edit content

The normal page navigation is **Selected Work, Journey, Certification, External Work, Say Hello, Writes**. Object names are shown only by the room interactions, not in this navigation. Writes is an article list: select a title to read the full article, and use **All Writes** to return. Add future articles to `posts.js` with a unique id, title, author, excerpt, `publishedAt` date (`YYYY-MM-DD`), and an array of plain-text paragraphs. Articles display newest first. Optional `headingsBefore` maps paragraph indexes to section headings; `emphasis` accepts a phrase or array of phrases to render in bold.

The owner-selected retrospective dates are 17 April 2026 (last-minute brain article), 23 July 2026 (hidden cost article), and 21 October 2026 (better decisions article). These are display dates, not an automated publishing schedule.

External Work includes Zainova (`zainovatech.com`) and Zian Architects (`zianarchitects.com`). Kaasukanukku appears under External Work, Selected Work, and Mobile Development as a personal/business expense tracker for founders built with React Native and SQLite, with live links for its APK file and PWA.

The studio fills the browser page without requesting operating-system fullscreen. The small control guide sits at the top-left under the toolbar.

### Resume

The **file stack** opens the supplied 2026 resume. The backpack still opens Journey. The original PDF is stored unchanged at `public/resume/Sadiq_Ali_Resume_2026.pdf`. The default page preview is rendered from that PDF for browsers that cannot embed documents. **PDF viewer** switches to the browser's selectable PDF view; **Page preview** switches back. **Download PDF** and **Open separately** always link to the original file.

Some embedded browsers leave native PDF viewers blank. Use the default page preview there, or open the PDF separately. If replacing the resume, regenerate `public/resume/page-1.webp` from the replacement PDF as well.

Edit the `content` object in `app.js`. Contact details and project links come from the portfolio reviewed in this conversation. This is a static portfolio: edits are reflected when the page reloads; there is no CMS or live external data feed. Add screenshots/verified case-study results as they become available. No invented awards, project metrics, or certificate verification links are included.

Replace `public/models/studio.glb` to update the room. Preserve parent node names or update the `names` mapping in app.js. Your export retained named parents but omitted custom section properties, so interaction uses those parent names. No extra model decoder is needed.

## Performance

- Direct Three.js r165: no React runtime or animation framework.
- One 2.3 MB GLB, local vendored modules, no external fonts or requests.
- Rendering is on demand: updates occur during orbit, camera transitions, keyboard movement, resize, or scene changes. No idle animation loop.
- Eco mode caps resolution (1× on mobile; up to 1.4× desktop). High mode caps at 1.8×.
- No realtime shadow maps, postprocessing, physics, or environment-map download.
- Lighting is recreated in the browser; Blender preview area lights were excluded from export.
- The editable GLB contains many separate mesh parts. Draw calls are not geometry-batched yet; measure on your target phones before adding effects.

Measured source asset: 2.29 MB, 44,100 triangles, 129 mesh primitives. Entire project is approximately 3.2 MB before HTTP compression. Browser frame rate has not been measured in this environment.

Run `python check_project.py` for asset, DOM-reference, and model structure checks. With Node installed, `node --check app.js` checks JavaScript syntax.

Run `node test-controls.mjs` for application-logic tests covering WASD/arrows, direction relative to mouse look, fixed eye height, modal movement pause, resume view switching, Walk/Orbit switching, file stack mapping, Writes, and collision boundaries. These tests use the real Three.js math with a small DOM/render adapter; they are not a GPU performance benchmark.

Latest browser QA verified all six navigation destinations, full-page studio dimensions, top-left guide, no horizontal overflow at the tested narrow width, Walk/Orbit switches, laptop keyboard interaction, file-stack click opening the resume, and resume page preview. The downloaded PDF's SHA-256 matches the original. Native PDF rendering and pointer lock are limited in the in-app browser; page preview and drag-to-look remain available.

For development diagnostics in the browser console: `portfolioDiagnostics()` returns draw calls, rendered triangles, camera coordinates, pixel ratio, and active section after model load.

## Deploy

This entire folder is a static site. On Vercel choose **Other**, leave the build command empty, and use `.` as the output directory. Set this folder as the project root if deploying from the containing repository. Preserve vendor/ and public/ directory paths. Any static host with JavaScript MIME support works. This task has not published or connected a hosting account.

## Files

- index.html: page and accessible navigation
- style.css: responsive visual design
- app.js: portfolio content, scene, controls, interactions
- public/models/studio.glb: your room export
- vendor/: Three.js and its required helpers, MIT license included
- server.py: localhost-only preview helper

Three.js is vendored from the existing workspace installation (r165). It is not represented as the latest release. Update all vendor modules together when upgrading.
