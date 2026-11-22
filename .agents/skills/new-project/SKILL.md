---
name: new-project
description: >-
  Scaffold, build, and register a new practical web micro-app in the Persian AI projects monorepo.
  Automatically picks the next pending project from ROADMAP.md if no topic is specified, enforces
  Clean Modular Web and Style Guide standards, creates visual SVG assets, updates Hub index.html
  (cards and Marquee ticker), live search data, README.md, and marks the task complete in ROADMAP.md.
  Triggers on /new-project, "مینی پروژه جدید", "پروژه جدید رو استارت بزن", or when building any new micro-app.
---

# New Micro-App Project Workflow & Roadmap Integration

Use this skill whenever creating, scaffolding, or implementing a new micro-app or web utility in this monorepo.
All implementations must strictly follow the official Style Guide ([styleguide/](../../../styleguide/)) and the release checklist ([docs/NEW_TOOL_CHECKLIST.md](../../../docs/NEW_TOOL_CHECKLIST.md)).

---

## Step 1: Project Topic Selection (Roadmap Auto-Pick)

1. **Check if a specific project was requested**:
   - If the user explicitly provided a project topic or name, proceed with that topic.
2. **Auto-Pick from `ROADMAP.md` (When no topic is specified)**:
   - If the user simply invokes `/new-project` or says "مینی پروژه جدید رو استارت بزن" without naming a project:
     1. Read [ROADMAP.md](../../../ROADMAP.md).
     2. Scan the upcoming project list under `## 🚀 ۲. لیست پروژه‌های برنامه‌ریزی‌شده و آینده`.
     3. Identify the **first uncompleted item** marked with `- [ ]` that does not yet exist as a directory in the workspace root.
     4. Announce the chosen project to the user in Persian:
        > «پروژه بعدی بر اساس نقشه راه انتخاب شد: **[عنوان پروژه]** — در حال ساخت و استقرار بر اساس استانداردهای راهنمای استایل...»
     5. Immediately proceed with implementing it according to the protocol below.

---

## Step 2: Architecture & Style Guide Compliance

Every micro-app MUST follow these non-negotiable guidelines:

1. **Directory Structure**:
   - Create a dedicated kebab-case folder in repository root: `./<project-slug>/`
   - Setup standard modular layout:
     ```text
     ./<project-slug>/
     ├── index.html
     ├── README.md
     └── assets/
         ├── css/
         │   └── style.css
         ├── js/
         │   └── app.js (or main.js, plus data/, state/ if needed)
         └── images/
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
       <span class="eb">دسته‌بندی تخصصی • ویژگی کلیدی</span>
       <h1 class="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-3 mx-auto text-center whitespace-nowrap tool-title" style="color:var(--ink);margin:10px auto 14px;text-align:center">
         عنوان ابزار <span class="mk">بخش هایلایت‌شده</span>
       </h1>
       <p class="max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed mb-6" style="color:var(--mut)">
         توضیحات کوتاه و خوانای دوخطی درباره عملکرد ابزار.
       </p>
     </header>
     ```
   - **Mathematical Centering in RTL**: Apply `width: fit-content !important; margin: auto !important; text-align: center !important;` to `.tool-title` to eliminate any right-shift illusion.
   - **Vertical Breathing Room**: Maintain a 48px margin from the shared top nav (`#shared-header + *`).

4. **Typography & Persian Rules**:
   - `<html lang="fa" dir="rtl">` with Google Fonts **Vazirmatn** (`'Vazirmatn', sans-serif`).
   - **Strict Rule:** NEVER apply `font-mono` to Persian text, numbers, or UI badges. Reserve `font-mono` strictly for English code snippets, raw identifiers, or regex tokens.
   - **Single-Line Titles:** Ensure all headings (H1, H2, H3) are single-line with `whitespace-nowrap`.
   - **Bottom Guides Line Height:** Set `line-height: 2.15` on all educational text blocks for effortless readability.

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

1. **Register in `assets/js/data/projects-data.js`**:
   - Add new entry with next sequential ID, category, title, badge, emoji, Persian description, tech pills, url `./<project-slug>/`, and modern gradient accent.
2. **Register in `assets/js/search.js`**:
   - Add new entry in `toolsData` array with title, url, icon path (`assets/images/tools/<project-slug>.svg`), category tag, short description, and rich Persian/English search keywords.
3. **Add to Marquee Ticker in `index.html`**:
   - Add the `.mq-item` anchor inside `.mq-track` (in both loops):
     ```html
     <a class="mq-item" href="./<project-slug>/"><img src="assets/images/tools/<project-slug>.svg" alt="" width="32" height="32" loading="lazy"><span>عنوان ابزار</span></a>
     ```
4. **Update Hub Hero Stats**:
   - Increment the active tools count badge in root `index.html` (e.g. from ۱۰ to ۱۱).

---

## Step 5: Documentation & Roadmap Sync

1. **Update `ROADMAP.md`**:
   - Locate the task line under `## 🚀 ۲. لیست پروژه‌های برنامه‌ریزی‌شده و آینده`.
   - Change `- [ ]` to `- [x]`.
   - Append direct link: `([مشاهده پروژه](./<project-slug>/))`.
2. **Update Root `README.md`**:
   - Add the tool to `## 🌟 فهرست ابزارهای فعال (Active Projects)`:
     ```markdown
     N. **[Title (Slug)](https://hashemsh.github.io/ai-projects-persian/<project-slug>/)** • [مستندات کامل](./<project-slug>/README.md)
        - خلاصه کوتاه از عملکرد و ارزش ابزار
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
