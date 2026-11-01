---
name: new-project
description: >-
  Scaffold, build, and register a new practical web micro-app in the Persian AI projects monorepo.
  Automatically picks the next pending project from ROADMAP.md if no topic is specified, enforces
  Clean Modular Web standards, updates Hub index.html and README.md, and marks the task complete in ROADMAP.md.
  Triggers on /new-project, "مینی پروژه جدید", "پروژه جدید رو استارت بزن", or when building any new micro-app.
---

# New Micro-App Project Workflow & Roadmap Integration

Use this skill whenever creating, scaffolding, or implementing a new micro-app or web utility in this repository.

---

## Step 1: Project Topic Selection (Roadmap Auto-Pick)

1. **Check if a specific project was requested**:
   - If the user explicitly provided a project topic or name, proceed with that topic.
2. **Auto-Pick from `ROADMAP.md` (When no topic is specified)**:
   - If the user simply invokes `/new-project` or says "مینی پروژه جدید رو استارت بزن" without naming a project:
     1. Read [ROADMAP.md](../../../ROADMAP.md) (or root `ROADMAP.md`).
     2. Scan the upcoming project list under `## ۲. لیست پروژه‌های کاربردی آینده`.
     3. Identify the **first uncompleted item** marked with `- [ ]` that does not yet exist as a directory in the workspace root.
     4. Announce the chosen project to the user in Persian:
        > «پروژه بعدی بر اساس نقشه راه انتخاب شد: **[عنوان پروژه]** — در حال ساخت و استقرار...»
     5. Immediately proceed with implementing it.

---

## Step 2: Architecture & Implementation Standards

1. **Directory Structure**:
   - Create a dedicated kebab-case folder in the repository root: `./<project-slug>/`
   - Setup standard assets:
     ```text
     ./<project-slug>/
     ├── index.html
     ├── README.md
     └── assets/
         ├── css/
         │   └── style.css (and components/ if needed)
         ├── js/
         │   ├── app.js (or main.js)
         │   ├── data.js
         │   └── ...
         └── images/
     ```

2. **Coding Directives**:
   - **Zero inline styles or scripts**: All CSS in `assets/css/`, all JS in `assets/js/`.
   - **Strict relative paths**: All links must use `./assets/...` (NEVER leading `/assets/...`).
   - **Dual Compatibility**: In vanilla web apps, ensure scripts run smoothly on both `file:///` and HTTP/HTTPS.
   - **Hard 200-line cap**: Every source file (HTML, CSS, JS) must strictly stay under 200 lines. Decompose proactively.

3. **Shared Header & Footer Layout Integration**:
   - Every micro-app MUST integrate the central shared header and footer instead of duplicating code or creating custom back buttons:
     - Set `<body data-root="sub" ...>` with container `<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col min-h-screen">`.
     - Link shared nav styles in `<head>`: `<link rel="stylesheet" href="../assets/css/components/shared-nav.css">`.
     - Place `<header id="shared-header"></header>` right at the top of the container.
     - Place `<footer id="shared-footer"></footer>` at the bottom before closing the container.
     - Include `<script src="../assets/js/components/shared-layout.js"></script>` before the micro-app scripts.

4. **UI/UX & Persian Standards**:
   - `<html lang="fa" dir="rtl">` with Google Fonts **Vazirmatn** (`'Vazirmatn', sans-serif`).
   - **Never apply `font-mono` to Persian text or numbers.**
   - Dark modern aesthetic (`#070913`, `#0c0f1d`), glassmorphism (`backdrop-filter: blur(16px)`), subtle neon accents, and responsive layout (`max-w-7xl`).
   - Interactive micro-interactions: smooth transitions, hover feedback, copy-to-clipboard toast notifications.

5. **Mandatory Signature & Branding**:
   - Handled automatically by `shared-layout.js` (Hashem Sh branding, GitHub, LinkedIn, Telegram, Antigravity & Gemini Pro).

---

## Step 3: Registration in Hub & Documentation

1. **Register in Hub (`index.html`)**:
   - Add the project definition to [projects-data.js](../../../assets/js/data/projects-data.js):
     - `id`: Next sequential integer
     - `title`: Persian title with English abbreviation
     - `badge`: Sequential badge (e.g., `پروژه شماره ۴ • کاربردی و فعال`)
     - `emoji`: Distinctive relevant emoji
     - `description`: 2-3 sentence Persian summary of capabilities and real-world value
     - `techs`: 4 key tech pills
     - `url`: Relative directory path (e.g., `./<project-slug>/`)
     - `accentGrad` and `buttonGrad`: Modern gradient palette
   - Update project count badge in root [index.html](../../../index.html) (e.g. `۴ ابزار آنلاین • توسعه مستمر`).

2. **Update Root `README.md`**:
   - Add the new project to the list under `## 🌟 فهرست ابزارهای فعال (Active Projects)` in clean 2-line format (title on top, description underneath):
     - Format:
       ```markdown
       N. **[Title (Slug)](https://hashemsh.github.io/ai-projects-persian/<slug>/)** • [مستندات کامل](./<slug>/README.md)
          - خلاصه نصف خط از عملکرد و ارزش ابزار
       ```
     - Do not add verbose feature bullet points to root README.md, as each micro-app maintains its own dedicated detailed `README.md`.

---

## Step 4: Mark Complete in `ROADMAP.md`

1. Open [ROADMAP.md](../../../ROADMAP.md).
2. Locate the specific task line for this project.
3. Change `- [ ]` to `- [x]`.
4. Append a direct link to the newly created project folder:
   - Example: `- [x] **۱. تست و آنالیز جامع سایت...** ([مشاهده پروژه](./site-auditor/))`
5. Commit all changes to git and push to `origin main`.
