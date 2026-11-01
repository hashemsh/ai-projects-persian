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

3. **UI/UX & Persian Standards**:
   - `<html lang="fa" dir="rtl">` with Google Fonts **Vazirmatn** (`'Vazirmatn', sans-serif`).
   - **Never apply `font-mono` to Persian text or numbers.**
   - Dark modern aesthetic (`#070913`, `#0c0f1d`), glassmorphism (`backdrop-filter: blur(16px)`), subtle neon accents, and responsive layout.
   - Interactive micro-interactions: smooth transitions, hover feedback, copy-to-clipboard toast notifications.

4. **Mandatory Signature**:
   - Include Hashem's signature in the footer of every app:
     ```text
     Designed & Developed by Hashem Sh | Powered by Antigravity & Gemini Pro
     ```
   - Profile links:
     - GitHub: `https://github.com/hashemsh`
     - LinkedIn: `https://www.linkedin.com/in/hashemsheikhypour`
     - Telegram (Direct Chat): `https://t.me/init10`

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
   - Add the new project section under `## 🌟 پروژه‌های فعال این ریپازیتوری` with live demo URL, feature bullets, and technologies.

---

## Step 4: Mark Complete in `ROADMAP.md`

1. Open [ROADMAP.md](../../../ROADMAP.md).
2. Locate the specific task line for this project.
3. Change `- [ ]` to `- [x]`.
4. Append a direct link to the newly created project folder:
   - Example: `- [x] **۱. تست و آنالیز جامع سایت...** ([مشاهده پروژه](./site-auditor/))`
5. Commit all changes to git and push to `origin main`.
