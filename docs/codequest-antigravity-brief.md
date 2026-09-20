# CodeQuest Lab – Antigravity Audit & Project Brief

## 1. Project Overview and Personal Goals

CodeQuest Lab is a personal, professional-quality learning web application designed to help me deeply learn **Python** and **C++** through a gamified environment with levels, practical exercises, theory, and interview-style challenges. It is meant primarily for my own use and possibly for friends in the future, not as a commercial product.

### Learning Goals

- Build a **deep understanding** of Python and C++, including:
  - Syntax, commands, and language features.
  - When and why each construct is used.
  - The underlying theory and math behind functions and algorithms.
- Avoid purely relying on AI to generate code (“vibe coding”):
  - I want to know that functions, data structures, and algorithms exist, what they do, and how to implement them.
  - I want to be able to perform well on **technical interviews**, where practical coding exercises are required.
- Practice **best practices** in software engineering:
  - Clean architecture (layers, domain models, separation of concerns).
  - Use of classes, modules, components, and clear abstractions.
  - Basic cybersecurity and safety when running user code.

This project is therefore both a **learning environment** and a **serious technical project** where I practice modern development workflows.

---

## 2. Tooling Stack and Roles

CodeQuest Lab is built using three Google tools working together: **Google Stitch**, **Google AI Studio**, and **Google Antigravity 2.0**.

### 2.1 Google Stitch – UI Design and Frontend Code

Role:
- Stitch is used to design and generate the **full multi-screen UI** for CodeQuest Lab using an AI-native canvas.
- It creates high-fidelity web layouts for:
  - Welcome/Onboarding.
  - Language selection (Python / C++).
  - Home Dashboard.
  - Level Map.
  - Exercise Lab (problem, theory, code editor, output/tests/feedback).
  - Interview Exercises.
  - Code History & Analytics.
  - Profile & Settings.
- Stitch exports **frontend code** (HTML/CSS/JS or React/Tailwind) and a **DESIGN.md** file describing the design system.

Files already produced with Stitch:
- `DESIGN.md` – design system and UI specification for CodeQuest Lab.  
- `code.html` – current implementation of the Exercise Lab and related UI.
- Screenshot (`screen.jpg`) – visual reference of the Exercise Lab screen.  

Stitch is **not** responsible for the full application logic or learning content; it focuses on UI structure and visual consistency.

### 2.2 Google AI Studio – Gemini Mentor and Prototyping

Role:
- AI Studio hosts Gemini and is used as a **pedagogical and architectural assistant**, not as the primary programmer.
- Responsibilities:
  - Help design the curriculum: list of levels for Python and C++ and their learning objectives.
  - Generate exercise statements, hints, and explanations.
  - Suggest test cases and analyze my solutions.
  - Help define and refine the technical architecture (frontend, backend, evaluation layer).
- AI Studio can also create **prototype apps**, which can be exported into Antigravity as starting points.

Usage constraints:
- Gemini **should not** auto-generate all application code or all exercise solutions.
- Gemini can generate skeletons, examples, and refactorings; I will implement core logic and complete solutions myself.

### 2.3 Google Antigravity 2.0 – Implementation, Agents, and Auditing

Role:
- Antigravity is the **central development environment** where:
  - Projects from AI Studio and code exported from Stitch are imported.
  - AI agents (Gemini-based) work alongside me in a local codebase.
- Responsibilities:
  - Run automated checks and tests on the UI and logic.
  - Help refactor and organize the code into components and layers.
  - Integrate design assets from Stitch via MCP.
  - Assist in implementing backend, evaluation logic, and progress tracking.

Usage constraints:
- Agents may create and edit files, but I must **review every change** and understand what it does.
- Code generation should focus on repetitive or boilerplate tasks; conceptual logic and core algorithms should be written or at least co-written by me.

---

## 3. Design System Summary (from DESIGN.md)

The DESIGN.md file defines the product and design system for CodeQuest Lab.

### 3.1 Product

- Name: **CodeQuest Lab**.
- Type: Personal learning web app with gamified programming exercises.
- Goal: Help a single user deeply learn Python and C++ with structured levels, theory, practice, and interview-style challenges.

### 3.2 Visual Style

- Dark mode by default with high contrast and readability.
- Professional but friendly tone, like a personal learning lab.
- Clean, modern dashboard aesthetic with subtle gamification (XP, streak, badges).
- Fully responsive for desktop, tablet, and mobile.

### 3.3 Layout and Navigation

Global layout:
- **Header:** title, language switch (Python/C++), quick actions, user avatar.
- **Sidebar:** Dashboard, Languages, Level Map, Interview Exercises, Code History & Analytics, Settings.
- **Main Content:** screen-specific panels, cards, tables.

Navigation principles:
- Clear titles or breadcrumbs on each screen.
- Consistent back navigation.
- Easy switching between Python and C++ learning paths.

### 3.4 Key Screens

- **Welcome / Onboarding:** Hero message, Start/Continue buttons, guided tour.
- **Language Selection:** Python and C++ cards with descriptions and progress bars.
- **Home Dashboard:** Progress summary (levels, XP, streak), recent activity, suggested next steps.
- **Level Map:** Gamified path with levels for each language (Variables, Loops, Functions, OOP, Pointers, STL, etc.) and status (locked/in-progress/completed).
- **Exercise Lab:**
  - Problem & theory panel.
  - Code editor (Python or C++).
  - Output & feedback panel (console, errors, hints).
  - Tabs for test cases and personal notes.
- **Interview Exercises:** Filterable list of technical problems by topic, difficulty, and language, opened in Exercise Lab.
- **Code History & Analytics:** List of past solutions, charts (exercises/week, average time), insights about frequent mistakes.
- **Profile & Settings:** Goals, UI language, theme, hint level, data export/reset.

### 3.5 Components and Design Tokens

- Cards, tables, badges, progress bars, embedded editor and console.
- Example color system: primary blue, secondary purple, dark backgrounds, white and gray text, success/warning/error/info colors.
- Typography: modern sans-serif (Inter/Roboto), sizes for titles and body text.
- Spacing scale (4–32px) and border radii (cards 8px, pill badges).

DESIGN.md is the authoritative source for visual and UX decisions.

---

## 4. Current UI Implementation (code.html and Screenshot)

The `code.html` file and the attached screenshot represent a working version of the **Exercise Lab** screen for a Python level.

### 4.1 Visible Features in the Screenshot

- Top bar indicating:
  - Current language (Python).
  - Level path (Level 3: Loops → Exercise #14: Prime Number Sieve).
  - Difficulty, XP rewards, streak and XP counters.
- Left pane:
  - Problem specification: Sieve of Eratosthenes & prime counting.
  - Algorithmic complexity targets (time and space).
  - Core objectives and input/output constraints.
- Center pane:
  - Python 3.12 code editor with example implementation of the sieve and injected bug for the user to fix.
- Right pane:
  - Test cases list with expected vs returned output and time per test.
  - Diagnostic insight section highlighting issues (e.g., redundant markings, edge cases).

### 4.2 Alignment to DESIGN.md

- The Exercise Lab layout matches the design: three main areas (problem/theory, code editor, output/tests/feedback).
- Dark theme, clean typography, status badges, and progress indicators are consistent with the design system.
- This screen serves as a concrete example for Antigravity agents to audit structural and implementation quality.

---

## 5. Gemini Collaboration Prompt (AI Studio)

The following prompt is used in Google AI Studio to guide Gemini’s role in this project.

> You are Gemini inside Google AI Studio, helping me turn my existing CodeQuest Lab UI and design system into a fully working personal learning app for Python and C++.
>
> ### Context
>
> - I have already designed the UI and design system for **CodeQuest Lab**, a personal gamified programming lab to deeply learn Python and C++ (levels, exercises, interview-style challenges).  
> - I have three main assets attached in this project:
>   - `DESIGN.md`: contains the full product description, visual style, navigation, screens, components, colors, typography, spacing, and interaction rules for CodeQuest Lab.
>   - `code.html`: contains the current HTML/CSS/JS implementation of the UI. It includes the Exercise Lab layout (problem/theory panel, code editor, tests & feedback), navigation, and dark theme.
>   - A screenshot of the Exercise Lab view showing an algorithmic challenge (Sieve of Eratosthenes), problem spec, code editor, and test cases.
>
> ### My goals
>
> 1. **Understand and preserve the existing design**  
>    - Read and internalize `DESIGN.md`.  
>    - Inspect `code.html` and the screenshot to understand how the design has been implemented.  
>    - Do not radically change the visual identity or UX patterns unless I explicitly ask for changes.
>
> 2. **Help me evolve this into a real, personal learning app**  
>    - I want this app primarily for myself (and maybe friends), not for commercial use, but I want to follow professional best practices: clean architecture, layers, domain models, basic security, and maintainable code.  
>    - The app should support:
>      - Python and C++ learning paths.
>      - Level map (curriculum).
>      - Exercise Lab with problem, theory, code editor, tests, and feedback.
>      - Interview-style problem set.
>      - History and analytics views.
>      - Profile and settings.
>
> 3. **Support deep learning, not just “vibe coding”**  
>    - I want to truly learn Python and C++, not rely on AI to write everything.  
>    - Your help should focus on:
>      - Designing architecture and data models.
>      - Suggesting exercises, test cases, hints, and explanations.
>      - Reviewing and refactoring code I write.
>    - You should **not** auto-complete the entire app or all exercise solutions for me without my active participation.
>
> ### Tasks for this session
>
> 1. **Analyze my assets**  
>    - Summarize in your own words:
>      - The structure and key ideas from `DESIGN.md`.
>      - How `code.html` implements the design so far (main components, layout, any patterns you notice).
>      - What the screenshot reveals about the current Exercise Lab UX.
>
> 2. **Propose a technical architecture**  
>    - Recommend a realistic stack for this project (frontend, backend, storage) that fits a solo learner:
>      - Frontend options aligned with the existing `code.html`.
>      - Backend options (for future use) to store exercises, progress, and history.
>      - How to integrate a code runner for Python and C++ while keeping security in mind.
>    - Describe the key modules/layers:
>      - UI layer (components and screens).
>      - Domain layer (exercise, level, curriculum models).
>      - Evaluation layer (tests, feedback).
>      - Data layer (user progress, history).
>
> 3. **Define a development roadmap**  
>    - Suggest a phased roadmap for upgrading this into a functioning app:
>      - Phase 1: clean up and componentize the current UI (`code.html`) into a maintainable structure.
>      - Phase 2: implement local logic for levels, exercises, and tests for Python.
>      - Phase 3: extend to C++ support.
>      - Phase 4: history, analytics, and profile/settings.
>    - For each phase:
>      - List concrete tasks I should do myself (manual coding).
>      - List tasks where you can assist (e.g., propose data models, suggest tests, refactor code).
>
> 4. **Set collaboration rules between you and me**  
>    - Propose explicit rules to avoid pure “vibe coding”, for example:
>      - You may generate example snippets and skeletons, but I will implement the core logic and fill in missing parts.
>      - When I paste my code, you focus on review, explanation, and improvement, not replacing everything.
>      - For exercises, you generate problem statements, hints, and test cases; I write the solution code first.
>
> ### Output format
>
> Respond in **structured Markdown** with these sections:
>
> 1. **Design & Implementation Summary** – your understanding of DESIGN.md, code.html, and the screenshot.  
> 2. **Suggested Architecture** – stack, layers, and key modules for CodeQuest Lab.  
> 3. **Phased Development Roadmap** – phases with tasks for me vs tasks where you help.  
> 4. **Collaboration Rules** – clear guidelines to keep our work focused on my learning instead of full AI auto-coding.

---

## 6. Guidelines for Antigravity Agents Auditing Stitch Screens and Code

When Antigravity agents audit the screens and code generated via Stitch (and any subsequent changes), they should follow these guidelines:

1. **Respect the Design System**  
   - Use `DESIGN.md` as the primary reference for layout, navigation, components, colors, typography, spacing, and interaction patterns.  
   - Avoid arbitrary visual changes that break consistency unless explicitly requested.

2. **Check Structural Quality**  
   - Ensure that the UI code exported from Stitch (`code.html` and related files) is organized into clear components (if converted to React or similar).  
   - Verify that navigation flows match the screens defined in DESIGN.md.

3. **Support Learning Goals**  
   - Confirm that the Exercise Lab structure supports deep learning: problem & theory, code editor, tests, and feedback must be readable and accessible.  
   - Avoid adding features that encourage pure auto-completion of solutions without user engagement.

4. **Promote Clean Architecture**  
   - Suggest separation into layers: UI, domain (exercises, levels, curriculum), evaluation (tests, feedback), data (progress and history).  
   - Recommend patterns (modules, classes, components) but leave core logic implementation to me.

5. **Security and Safety**  
   - If/when a code runner for Python/C++ is integrated, recommend safe execution patterns (sandboxing, resource limits, no arbitrary file/network access).  
   - Flag any potential unsafe patterns in user code execution.

6. **Avoid Full Auto-Coding**  
   - Do not fully rebuild the app or all solutions by themselves; changes should be incremental, with explanations and diffs that I can read and understand.  
   - Focus on refactoring, test generation, bug detection, and documentation rather than replacing my code wholesale.

This file should be uploaded to Antigravity along with `DESIGN.md`, `code.html`, and the screenshot, so agents have full context about the project goals, design system, and collaboration rules.

---

## 7. Sources and References

### Educational Games and Gamification in Programming
- "The effectiveness of gamification in programming education" – meta-analysis on gamification impact on motivation and achievement.
- "Gamified E-learning in Programming Education" – review of gamified coding platforms and engagement.
- "Level up your coding: a systematic review of personalized, cognitive and gamification-based programming education".
- Empirical studies on gamified programming courses and platforms such as UDPiler.

### Coding Games and Platforms (Python, C, C++)
- CodinGame – multi-language coding game platform with real-time simulations and AI challenges: https://www.codingame.com/
- CodeCombat – RPG-style game for learning programming: https://codecombat.com/
- CheckiO – coding games and challenges for Python and TypeScript: https://checkio.org/
- FreeCodeCamp and other lists of coding games for beginners (e.g., "12 Free Coding Games to Learn Programming").
- Codédex – gamified learning platform for Python, C++, and web technologies: https://www.codedex.io/

### GitHub Repositories for Learning C++ with Games
- codecombat/codecombat – open-source game engine for learning to code: https://github.com/codecombat/codecombat
- pardcode/cpp-3d-game-tutorial-series – DirectX-based C++ 3D game tutorial series.
- juansensio/cpp_games – collection of C++ games aligned with learning progression.
- tinawebdev/cpp-games – simple C++ console games for beginners.
- Topics such as `c-games-for-beginners` and `cpp-game` aggregating learning projects.

### Online Judges and Safe Code Execution
- Judge0 – open-source online code execution and sandboxing engine: https://github.com/judge0/judge0
- Articles on designing online judges, Docker + gVisor sandboxes, secure compute environments, and SDKs for Judge0.

### WebAssembly and Pyodide
- Pyodide – Python distribution for WebAssembly enabling in-browser execution.
- Articles and documentation describing Pyodide integration for interactive coding environments.

### Vibe Coding and AI-assisted Development
- "A Survey of Vibe Coding with Large Language Models" – arXiv survey defining vibe coding and its models.
- Wikipedia and Cloudflare articles explaining vibe coding, benefits, and downsides.

### Google AI Studio
- Official Gemini API and AI Studio docs and quickstart guides: https://ai.google.dev/
- Google AI Studio overview and cheat sheets covering features, pricing, Chat/Build modes, and integrations.
- Tutorials on using AI Studio for chat, build, stream modes, and app prototyping.
- Google I/O 2026 post: "Bring any idea to life: Google AI Studio" with export to Antigravity.

### Google Antigravity 2.0
- Official Antigravity site and documentation: https://antigravity.google/
- Codelabs on building and shipping AI apps with Antigravity.
- Tech news coverage of Antigravity 2.0 launch and AI plans.
- Guides explaining how to download the desktop client, CLI, IDE extensions, and SDKs.
- Blog posts on connecting AI Studio projects to Antigravity and limitations of one-click export.

### Google Stitch and DESIGN.md
- Google blog: "Introducing vibe design with Stitch" and subsequent updates.
- Guides and reviews on Stitch as an AI-native UI design tool.
- Tutorials on using Stitch to generate multi-screen prototypes and exportable HTML/CSS or React code.
- Articles on using Stitch together with Antigravity for design-to-code workflows and full-stack apps.
- Documentation and blog posts on the open-source DESIGN.md format and how AI tools consume it.

These sources were consulted across earlier research, the original programming-games report, and the analysis of Google AI tools. They provide theoretical grounding, examples of gamified learning platforms, open-source implementations, and documentation for AI Studio, Antigravity, Stitch, Judge0, and Pyodide.
