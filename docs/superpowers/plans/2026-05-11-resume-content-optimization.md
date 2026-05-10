# Resume Content Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refocus the portfolio resume copy toward big-company frontend roles with stronger emphasis on business complexity, performance wins, engineering rigor, and AI-assisted delivery.

**Architecture:** Keep the current single-page React structure intact and update only the content constants inside `src/App.jsx`. Preserve all existing component boundaries and rendering logic so the change remains low-risk and fully reversible.

**Tech Stack:** React, Vite, Framer Motion

---

### Task 1: Rewrite Resume Copy Data

**Files:**
- Modify: `C:\Users\Jmr03\Desktop\fe-projects\minrui-frontend-portfolio\src\App.jsx`

- [ ] **Step 1: Update the profile summary to sharpen positioning**

Replace the summary string so it emphasizes complex business delivery, performance optimization, engineering execution, and AI-assisted efficiency.

- [ ] **Step 2: Update the metrics labels and values**

Replace the current generic metric labels with hiring-friendly labels such as complex business experience, performance optimization, cross-platform delivery, and engineering efficiency.

- [ ] **Step 3: Rewrite capability groups**

Change capability groups to focus on business frontend delivery, engineering and collaboration, performance optimization, and AI-assisted workflow.

- [ ] **Step 4: Rewrite highlight project copy**

Update each `impact`, `bullets`, and `stack` field to follow a stronger scene-action-result style while preserving the original factual meaning.

- [ ] **Step 5: Tighten timeline and contact language**

Adjust timeline descriptions and final contact copy so the overall tone stays consistent with the new positioning.

- [ ] **Step 6: Run a production build**

Run: `npm run build`

Expected: Vite build completes successfully with no errors.
