---
name: new-project
description: >-
  Scaffold, build, and register a new practical web micro-app in the Persian AI projects monorepo.
  Automatically picks the next pending project from ROADMAP.md if no topic is specified, enforces
  Clean Modular Web and Style Guide standards, creates visual SVG assets, updates Hub index.html
  (cards and Marquee ticker), live search data, README.md, and marks the task complete in ROADMAP.md.
  Triggers on /new-project, "Ù…ÛŒÙ†ÛŒ Ù¾Ø±ÙˆÚ˜Ù‡ Ø¬Ø¯ÛŒØ¯", "Ù¾Ø±ÙˆÚ˜Ù‡ Ø¬Ø¯ÛŒØ¯ Ø±Ùˆ Ø§Ø³ØªØ§Ø±Øª Ø¨Ø²Ù†", or when building any new micro-app.
---

# New Micro-App Project Workflow & Roadmap Integration

Use this skill whenever creating, scaffolding, or implementing a new micro-app or web utility in this monorepo.
All implementations must strictly follow the official Style Guide ([styleguide/](../../../styleguide/)) and the release checklist ([docs/NEW_TOOL_CHECKLIST.md](../../../docs/NEW_TOOL_CHECKLIST.md)).

---

## Step 1: Project Topic Selection (Roadmap Auto-Pick)

1. **Check if a specific project was requested**:
   - If the user explicitly provided a project topic or name, proceed with that topic.
2. **Auto-Pick from `ROADMAP.md` (When no topic is specified)**:
   - If the user simply invokes `/new-project` or says "Ù…ÛŒÙ†ÛŒ Ù¾Ø±ÙˆÚ˜Ù‡ Ø¬Ø¯ÛŒØ¯ Ø±Ùˆ Ø§Ø³ØªØ§Ø±Øª Ø¨Ø²Ù†" without naming a project:
     1. Read [ROADMAP.md](../../../ROADMAP.md).
     2. Scan the upcoming project list under `## ðŸš€ Û². Ù„ÛŒØ³Øª Ù¾Ø±ÙˆÚ˜Ù‡â€ŒÙ‡Ø§ÛŒ Ø¨Ø±Ù†Ø§Ù…Ù‡â€ŒØ±ÛŒØ²ÛŒâ€ŒØ´Ø¯Ù‡ Ùˆ Ø¢ÛŒÙ†Ø¯Ù‡`.
     3. Identify the **first uncompleted item** marked with `- [ ]` that does not yet exist as a directory in the workspace root.
     4. Announce the chosen project to the user in Persian:
        > Â«Ù¾Ø±ÙˆÚ˜Ù‡ Ø¨Ø¹Ø¯ÛŒ Ø¨Ø± Ø§Ø³Ø§Ø³ Ù†Ù‚Ø´Ù‡ Ø±Ø§Ù‡ Ø§Ù†ØªØ®Ø§Ø¨ Ø´Ø¯: **[Ø¹Ù†ÙˆØ§Ù† Ù¾Ø±ÙˆÚ˜Ù‡]** â€” Ø¯Ø± Ø­Ø§Ù„ Ø³Ø§Ø®Øª Ùˆ Ø§Ø³ØªÙ‚Ø±Ø§Ø± Ø¨Ø± Ø§Ø³Ø§Ø³ Ø§Ø³ØªØ§Ù†Ø¯Ø§Ø±Ø¯Ù‡Ø§ÛŒ Ø±Ø§Ù‡Ù†Ù…Ø§ÛŒ Ø§Ø³ØªØ§ÛŒÙ„...Â»
     5. Immediately proceed with implementing it according to the protocol below.

---

## Step 2: Architecture & Style Guide Compliance

Every micro-app MUST follow these non-negotiable guidelines:

1. **Directory Structure**:
   - Create a dedicated kebab-case folder in repository root: `./<project-slug>/`
   - Setup standard modular layout:
     ```text
     ./<project-slug>/
     â”œâ”€â”€ index.html
     â”œâ”€â”€ README.md
     â””â”€â”€ assets/
         â”œâ”€â”€ css/
         â”‚   â””â”€â”€ style.css
         â”œâ”€â”€ js/
         â”‚   â””â”€â”€ app.js (or main.js, plus data/, state/ if needed)
         â””â”€â”€ images/
     ```

2. **Clean Modular Web Directives**:
   - **Zero inline styles or scripts**: All CSS in `assets/css/`, all JS in `assets/js/`.
   - **Strict relative paths**: All paths must start with `./assets/...` or `../assets/...` (NEVER leading `/assets/...`).
   - **Dual Compatibility**: Vanilla scripts must work smoothly both on web servers and via local `file:///` without CORS errors.
   - **No Line Cap**: Files can naturally be as long as needed (>200 lines is completely acceptable). Avoid artificial fragmentation.

3. **Unified Hero Showcase Header**:
   - Follow the exact golden template for tool hero:
     ```html
     <header class="tool-hero text-center max-w-4xl mx-auto my-8 md:my-10 py-2 relative">
       <span class="eb">Ø¯Ø³ØªÙ‡â€ŒØ¨Ù†Ø¯ÛŒ ØªØ®ØµØµÛŒ â€¢ ÙˆÛŒÚ˜Ú¯ÛŒ Ú©Ù„ÛŒØ¯ÛŒ</span>
       <h1 class="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-3 mx-auto text-center whitespace-nowrap tool-title" style="color:var(--ink);margin:10px auto 14px;text-align:center">
         Ø¹Ù†ÙˆØ§Ù† Ø§Ø¨Ø²Ø§Ø± <span class="mk">Ø¨Ø®Ø´ Ù‡Ø§ÛŒÙ„Ø§ÛŒØªâ€ŒØ´Ø¯Ù‡</span>
       </h1>
       <p class="max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed mb-6" style="color:var(--mut)">
         ØªÙˆØ¶ÛŒØ­Ø§Øª Ú©ÙˆØªØ§Ù‡ Ùˆ Ø®ÙˆØ§Ù†Ø§ÛŒ Ø¯ÙˆØ®Ø·ÛŒ Ø¯Ø±Ø¨Ø§Ø±Ù‡ Ø¹Ù…Ù„Ú©Ø±Ø¯ Ø§Ø¨Ø²Ø§Ø±.
       </p>
     </header>
     ```
   - **Mathematical Centering in RTL**: Apply `width: fit-content !important; margin: auto !important; text-align: center !important;` to `.tool-title` to eliminate any right-shift illusion.
   - **Vertical Breathing Room**: Maintain a 48px margin from the shared top nav (`#shared-header + *`).

4. **Typography & Form Standards**:
   - `<html lang="fa" dir="rtl">` with Google Fonts **Vazirmatn** (`'Vazirmatn', sans-serif`).
   - **Strict Rule:** NEVER apply `font-mono` to Persian text, numbers, or UI badges. Reserve `font-mono` strictly for English code snippets, raw identifiers, or regex tokens.
   - **Single-Line Titles:** Ensure all headings (H1, H2, H3) are single-line with `whitespace-nowrap`.
   - **Theme-Adaptive Custom Selects:** All dropdown menus `<select>` must use `.select-custom` with SVG arrow on the left side (in RTL) and use `var(--card)` and `var(--ink)` (NEVER hardcode `bg-slate-900` which breaks in light mode).
   - **Structured Bento Guide Section:** The bottom of each tool page must feature a rich `<article class="...-card ...-guide-card">` bento section enclosed in a dedicated card box (`background: var(--card); border: 1px solid var(--line); border-radius: 20px;`) with at least 56px separation from the section above (`margin-top: 56px`), generous internal padding (`padding: 32px 28px`), dual-column overview, workflow visual card, and 4 bento feature cards with `line-height: 2.15`.

5. **Full-Width Footer**:
   - Place `<footer id="shared-footer"></footer>` as a direct child of `<body>`, outside the constrained `max-w-7xl` container.
   - Ensure an 80px vertical separation from the content cards above it.
   - Include `<script src="../assets/js/components/shared-layout.js"></script>` before the micro-app scripts.

---

## Step 3: Visual Vector Asset Creation

Every micro-app requires a dedicated vector SVG banner matching the visual language of existing tools:
1. Create `assets/images/tools/<project-slug>.svg`.
2. Format: `viewBox="0 0 360 170"`, dark surface card, theme-aligned radial glow (`#06b6d4`, `#6366f1`, or `#10b981`), and high-contrast geometric vector art representing the tool's core functionality.

---

## Step 4: Hub Registration & Live Search Integration

1. **Insert Tool Card in Static Grid `.cg` in `index.html`**:
   - Add `<a class="cd" href="./<project-slug>/">...</a>` inside `<div class="cg">` with SVG thumbnail, title, description, category tag, and `<b>Ø±Ø§ÛŒÚ¯Ø§Ù†</b>`.
   - Update grid header count: `<a class="la" href="#tools">Ù‡Ù…Ù‡â€ŒÛŒ N Ø§Ø¨Ø²Ø§Ø± â†</a>`.
   - Add category filter chip `<span class="chip">...</span>` if introducing a new category.
2. **Register in `assets/js/data/projects-data.js`**:
   - Add new entry with next sequential ID, category, title, badge, emoji, Persian description, tech pills, url `./<project-slug>/`, and modern gradient accent.
3. **Register in `assets/js/search.js`**:
   - Add new entry in `toolsData` array with title, url, icon path (`assets/images/tools/<project-slug>.svg`), category tag, short description, and rich Persian/English search keywords.
4. **Add to Marquee Ticker in `index.html`**:
   - Add the `.mq-item` anchor inside `.mq-track` (in both loops):
     ```html
     <a class="mq-item" href="./<project-slug>/"><img src="assets/images/tools/<project-slug>.svg" alt="" width="32" height="32" loading="lazy"><span>Ø¹Ù†ÙˆØ§Ù† Ø§Ø¨Ø²Ø§Ø±</span></a>
     ```
5. **Update Hub Hero Stats**:
   - Increment the active tools count badge in root `index.html` (e.g. from Û±Û° to Û±Û±).

---

## Step 5: Documentation & Roadmap Sync

1. **Update `ROADMAP.md`**:
   - Locate the task line under `## ðŸš€ Û². Ù„ÛŒØ³Øª Ù¾Ø±ÙˆÚ˜Ù‡â€ŒÙ‡Ø§ÛŒ Ø¨Ø±Ù†Ø§Ù…Ù‡â€ŒØ±ÛŒØ²ÛŒâ€ŒØ´Ø¯Ù‡ Ùˆ Ø¢ÛŒÙ†Ø¯Ù‡`.
   - Change `- [ ]` to `- [x]`.
   - Append direct link: `([Ù…Ø´Ø§Ù‡Ø¯Ù‡ Ù¾Ø±ÙˆÚ˜Ù‡](./<project-slug>/))`.
2. **Update Root `README.md`**:
   - Add the tool to `## ðŸŒŸ ÙÙ‡Ø±Ø³Øª Ø§Ø¨Ø²Ø§Ø±Ù‡Ø§ÛŒ ÙØ¹Ø§Ù„ (Active Projects)`:
     ```markdown
     N. **[Title (Slug)](https://hashemsh.github.io/ai-projects-persian/<project-slug>/)** â€¢ [Ù…Ø³ØªÙ†Ø¯Ø§Øª Ú©Ø§Ù…Ù„](./<project-slug>/README.md)
        - Ø®Ù„Ø§ØµÙ‡ Ú©ÙˆØªØ§Ù‡ Ø§Ø² Ø¹Ù…Ù„Ú©Ø±Ø¯ Ùˆ Ø§Ø±Ø²Ø´ Ø§Ø¨Ø²Ø§Ø±
     ```
3. **Create `<project-slug>/README.md`**:
   - Include project title, key features, architecture overview, and usage instructions.

---

## Step 6: Automated Verification & Launch Gate

Before committing to `main`, run QA checks:
1. Verify dark and light theme toggle across the new page.
2. Verify zero console JavaScript errors and zero broken image/link 404s.
3. Verify title centering in RTL (`0.0px` offset).
4. Verify mobile responsiveness (< 768px, no horizontal scroll overflow).
5. Commit with standard message (e.g., `feat(<slug>): add <tool-name> with style guide compliance`) and push to `origin main`.
