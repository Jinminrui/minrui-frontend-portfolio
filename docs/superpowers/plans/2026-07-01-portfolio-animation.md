# Portfolio Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将简历网站动画体系从 framer-motion 迁移到 GSAP，并让首屏 Hero 成为强交互主舞台。

**Architecture:** 保持现有单页 React 结构和内容数据不变，只替换动画实现。`src/App.jsx` 负责 DOM 标记、GSAP timeline、ScrollTrigger 和鼠标交互清理；`src/styles.css` 负责动画需要的视觉层、3D 透视、hover 高光和 reduced-motion 降级。

**Tech Stack:** React 19、Vite、GSAP、ScrollTrigger、CSS 3D transform、CSS media query。

---

## 文件结构

- Modify: `package.json`
  - 移除 `framer-motion`。
  - 新增 `gsap`。
- Modify: `package-lock.json`
  - 通过 npm 安装命令同步锁文件。
- Modify: `src/App.jsx`
  - 移除 `motion` import 和 `motion.*` 元素。
  - 新增 `useEffect`、`useRef`。
  - 注册 GSAP/ScrollTrigger。
  - 添加 Hero 入场、鼠标 tilt、滚动视差、模块 stagger 入场和 workflow 切换动画。
  - 清理事件监听和 GSAP context。
- Modify: `src/styles.css`
  - 增加 Hero 背景层、card 3D 环境、按钮高光、hover 分层、动画初始状态。
  - 强化 `prefers-reduced-motion: reduce`。

项目规则：不要执行 `git add`、`git commit`、创建分支、切换分支或 push，除非用户另行明确允许。

## Task 1: 更新动画依赖

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: 确认当前依赖状态**

Run:

```bash
npm ls framer-motion gsap
```

Expected:

```text
minrui-frontend-portfolio@1.0.0
└── framer-motion@...
```

`gsap` 可以显示为空或 missing；这一步只用于确认迁移前状态。

- [ ] **Step 2: 移除 framer-motion**

Run:

```bash
npm uninstall framer-motion
```

Expected:

```text
removed ... package
```

如果因为网络或 sandbox 失败，按工具提示请求授权后重试同一命令。

- [ ] **Step 3: 安装 GSAP**

Run:

```bash
npm install gsap
```

Expected:

```text
added ... package
```

- [ ] **Step 4: 验证依赖切换**

Run:

```bash
npm ls framer-motion gsap
```

Expected:

```text
minrui-frontend-portfolio@1.0.0
└── gsap@...
```

`framer-motion` 不应再出现在依赖树里。

- [ ] **Step 5: 跳过 git 操作**

不要提交依赖变更。保持工作区改动供用户检查。

## Task 2: 将 App.jsx 从 framer-motion 结构迁移到普通 React 元素

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: 修改 import**

将文件顶部：

```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
```

改为：

```jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
```

- [ ] **Step 2: 删除 framer-motion 配置对象**

删除整个 `sectionMotion` 常量：

```jsx
const sectionMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: 'easeOut' },
};
```

- [ ] **Step 3: 添加主容器和 Hero refs**

在 `function App()` 内、`useState` 后添加：

```jsx
  const shellRef = useRef(null);
  const heroRef = useRef(null);
  const heroCopyRef = useRef(null);
  const candidatePanelRef = useRef(null);
```

此时函数开头应为：

```jsx
function App() {
  const [activeStep, setActiveStep] = useState(workflowSteps[0]);
  const shellRef = useRef(null);
  const heroRef = useRef(null);
  const heroCopyRef = useRef(null);
  const candidatePanelRef = useRef(null);
```

- [ ] **Step 4: 给根节点和 Hero 节点加 ref**

将：

```jsx
<div className="site-shell">
```

改为：

```jsx
<div className="site-shell" ref={shellRef}>
```

将：

```jsx
<section className="hero">
```

改为：

```jsx
<section className="hero" ref={heroRef}>
  <div className="hero-background" aria-hidden="true">
    <span className="hero-grid-layer" />
    <span className="hero-glow hero-glow-one" />
    <span className="hero-glow hero-glow-two" />
  </div>
```

- [ ] **Step 5: 将 Hero 的 motion 元素改回普通元素**

将 Hero copy：

```jsx
<motion.div
  className="hero-copy"
  initial={{ opacity: 0, y: 22 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.65, ease: 'easeOut' }}
>
```

改为：

```jsx
<div className="hero-copy" ref={heroCopyRef}>
```

并将对应的 `</motion.div>` 改为：

```jsx
</div>
```

将候选人卡片：

```jsx
<motion.aside
  className="candidate-panel"
  initial={{ opacity: 0, y: 22 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
>
```

改为：

```jsx
<aside className="candidate-panel" ref={candidatePanelRef}>
```

并将对应的 `</motion.aside>` 改为：

```jsx
</aside>
```

- [ ] **Step 6: 将所有 section motion 元素改回普通 section**

逐个替换：

```jsx
<motion.section className="quick-facts" {...sectionMotion} aria-label="快速信息">
```

为：

```jsx
<section className="quick-facts animate-section" aria-label="快速信息">
```

替换：

```jsx
<motion.section className="section workflow-section" id="workflow" {...sectionMotion}>
```

为：

```jsx
<section className="section workflow-section animate-section" id="workflow">
```

替换其他 `motion.section`：

```jsx
<section className="section evidence-section animate-section" id="evidence">
<section className="section cases-section animate-section" id="cases">
<section className="section skills-section animate-section">
<section className="section timeline-section animate-section">
<section className="contact-section animate-section">
```

并把每个对应闭合标签从 `</motion.section>` 改为 `</section>`。

- [ ] **Step 7: 验证没有 framer-motion 残留**

Run:

```bash
rg -n "framer-motion|motion\\.|sectionMotion" src/App.jsx package.json
```

Expected: 无输出，命令退出码为 1。

- [ ] **Step 8: 跳过 git 操作**

不要提交本任务改动。

## Task 3: 添加 GSAP 入场、滚动和鼠标交互

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: 注册 GSAP 插件**

在 imports 后、数据常量前添加：

```jsx
gsap.registerPlugin(ScrollTrigger);
```

- [ ] **Step 2: 添加 reduced-motion 判断和 GSAP context**

在 `App` 函数内 refs 后添加：

```jsx
  useEffect(() => {
    const shell = shellRef.current;
    const hero = heroRef.current;
    const heroCopy = heroCopyRef.current;
    const candidatePanel = candidatePanelRef.current;

    if (!shell || !hero || !heroCopy || !candidatePanel) {
      return undefined;
    }

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReducedMotion = reduceMotionQuery.matches;

    const ctx = gsap.context(() => {
      const heroItems = heroCopy.querySelectorAll('.eyebrow, h1, .hero-lead, .hero-actions');
      const contactRows = candidatePanel.querySelectorAll('.candidate-head, .contact-grid div');

      gsap.set([heroItems, candidatePanel], { autoAlpha: 0, y: isReducedMotion ? 0 : 24 });
      gsap.set(contactRows, { autoAlpha: 0, y: isReducedMotion ? 0 : 14 });

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .to(heroItems, {
          autoAlpha: 1,
          y: 0,
          duration: isReducedMotion ? 0.01 : 0.72,
          stagger: isReducedMotion ? 0 : 0.1,
        })
        .to(
          candidatePanel,
          {
            autoAlpha: 1,
            y: 0,
            duration: isReducedMotion ? 0.01 : 0.72,
          },
          isReducedMotion ? 0 : '-=0.42',
        )
        .to(
          contactRows,
          {
            autoAlpha: 1,
            y: 0,
            duration: isReducedMotion ? 0.01 : 0.48,
            stagger: isReducedMotion ? 0 : 0.06,
          },
          isReducedMotion ? 0 : '-=0.36',
        );

      if (!isReducedMotion) {
        gsap.to(hero.querySelector('.hero-grid-layer'), {
          backgroundPosition: '80px 80px',
          duration: 18,
          repeat: -1,
          ease: 'none',
        });

        gsap.to(hero.querySelectorAll('.hero-glow'), {
          yPercent: (index) => (index === 0 ? 10 : -12),
          xPercent: (index) => (index === 0 ? -8 : 6),
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.8,
        });

        gsap.to(candidatePanel, {
          y: -34,
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        });

        gsap.to(hero.querySelector('.hero-background'), {
          y: 46,
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        });
      }
    }, shell);

    return () => {
      ctx.revert();
    };
  }, []);
```

- [ ] **Step 3: 添加鼠标 tilt effect**

在上一步 `useEffect` 的 `const ctx = ...` 后、`return () =>` 前插入：

```jsx
    const canUsePointerMotion = !isReducedMotion && window.matchMedia('(pointer: fine)').matches;

    const handlePointerMove = (event) => {
      if (!canUsePointerMotion) {
        return;
      }

      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(candidatePanel, {
        rotateY: x * 9,
        rotateX: y * -7,
        x: x * 10,
        y: y * 8,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      gsap.to(hero, {
        '--hero-pointer-x': `${50 + x * 22}%`,
        '--hero-pointer-y': `${48 + y * 18}%`,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const handlePointerLeave = () => {
      if (!canUsePointerMotion) {
        return;
      }

      gsap.to(candidatePanel, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.55)',
      });

      gsap.to(hero, {
        '--hero-pointer-x': '50%',
        '--hero-pointer-y': '48%',
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    hero.addEventListener('pointermove', handlePointerMove);
    hero.addEventListener('pointerleave', handlePointerLeave);
```

并将 cleanup 改为：

```jsx
    return () => {
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
      ctx.revert();
    };
```

- [ ] **Step 4: 添加普通模块滚动入场**

在 GSAP context 内、Hero 相关 timeline 后添加：

```jsx
      const animatedSections = gsap.utils.toArray('.animate-section');

      animatedSections.forEach((section) => {
        const sectionTargets = section.matches('.quick-facts')
          ? section.querySelectorAll('article')
          : section.querySelectorAll('.section-title, article, .workflow-tabs button, .workflow-detail, .skill-tags span, .timeline article, .contact-section > *');

        gsap.set(sectionTargets, { autoAlpha: 0, y: isReducedMotion ? 0 : 24 });

        gsap.to(sectionTargets, {
          autoAlpha: 1,
          y: 0,
          duration: isReducedMotion ? 0.01 : 0.62,
          stagger: isReducedMotion ? 0 : 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        });
      });
```

- [ ] **Step 5: 添加 activeStep 切换动效**

新增第二个 effect，放在第一个 effect 后：

```jsx
  useEffect(() => {
    const shell = shellRef.current;

    if (!shell) {
      return undefined;
    }

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reduceMotionQuery.matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.workflow-detail > *',
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.36,
          stagger: 0.04,
          ease: 'power2.out',
        },
      );
    }, shell);

    return () => {
      ctx.revert();
    };
  }, [activeStep]);
```

- [ ] **Step 6: 验证 JS 语法**

Run:

```bash
npm run build
```

Expected:

```text
✓ built in ...
```

如果 build 报 ESLint 之外的语法错误，回到 `src/App.jsx` 修复括号、import 或 JSX 标签。

- [ ] **Step 7: 跳过 git 操作**

不要提交本任务改动。

## Task 4: 添加 Hero 视觉层和交互样式

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: 扩展 Hero 容器样式**

将 `.hero` 样式块改为：

```css
.hero {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(340px, 0.88fr);
  gap: 22px;
  align-items: stretch;
  perspective: 1200px;
  --hero-pointer-x: 50%;
  --hero-pointer-y: 48%;
}
```

- [ ] **Step 2: 添加 Hero 背景层样式**

在 `.hero` 样式块后添加：

```css
.hero-background {
  position: absolute;
  inset: -80px -48px -40px;
  z-index: -1;
  overflow: hidden;
  border-radius: 14px;
  pointer-events: none;
}

.hero-grid-layer,
.hero-glow {
  position: absolute;
  inset: 0;
}

.hero-grid-layer {
  opacity: 0.72;
  background:
    linear-gradient(rgba(37, 99, 235, 0.075) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.075) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at var(--hero-pointer-x) var(--hero-pointer-y), #000 0, rgba(0, 0, 0, 0.76) 36%, transparent 72%);
}

.hero-glow {
  opacity: 0.72;
  filter: blur(26px);
}

.hero-glow-one {
  background: radial-gradient(circle at var(--hero-pointer-x) var(--hero-pointer-y), rgba(37, 99, 235, 0.2), transparent 42%);
}

.hero-glow-two {
  background: radial-gradient(circle at 82% 18%, rgba(14, 165, 233, 0.16), transparent 34%);
}
```

- [ ] **Step 3: 添加 Hero 卡片 3D 和高光样式**

在 `.candidate-panel` 样式块后添加：

```css
.candidate-panel {
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
}

.candidate-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  background: radial-gradient(circle at var(--hero-pointer-x) var(--hero-pointer-y), rgba(37, 99, 235, 0.18), transparent 38%);
  transition: opacity 180ms ease;
  pointer-events: none;
}

.hero:hover .candidate-panel::before {
  opacity: 1;
}

.candidate-head,
.contact-grid {
  position: relative;
  z-index: 1;
}
```

注意：如果文件中已经有 `.candidate-panel { padding: 26px; }`，不要新建冲突块覆盖 padding。把新增属性合并进现有块，或者保留两个块但确保不会覆盖已有属性。

- [ ] **Step 4: 增强按钮 hover 高光**

在 `.button` 样式块中添加：

```css
  position: relative;
  overflow: hidden;
```

在 `.button` 样式块后添加：

```css
.button::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.42) 48%, transparent 62%);
  transform: translateX(-130%);
  transition: transform 420ms ease;
  pointer-events: none;
}

.button:hover::after {
  transform: translateX(130%);
}

.button-secondary::after {
  background: linear-gradient(120deg, transparent 0%, rgba(37, 99, 235, 0.18) 48%, transparent 62%);
}
```

- [ ] **Step 5: 增强案例卡片 hover**

在 `.case-card` 样式块中添加：

```css
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;
```

在 `.case-card` 样式块后添加：

```css
.case-card:hover {
  transform: translateY(-4px);
  border-color: rgba(37, 99, 235, 0.34);
  box-shadow: 0 28px 80px rgba(30, 49, 76, 0.12);
}
```

- [ ] **Step 6: 添加动画性能提示**

在合适位置添加：

```css
.hero-copy,
.candidate-panel,
.quick-facts article,
.workflow-detail,
.workflow-tabs button,
.evidence-list article,
.case-card,
.skill-tags span,
.timeline article,
.contact-section > * {
  will-change: transform, opacity;
}
```

- [ ] **Step 7: 验证 CSS 没有明显拼写错误**

Run:

```bash
npm run build
```

Expected:

```text
✓ built in ...
```

- [ ] **Step 8: 跳过 git 操作**

不要提交本任务改动。

## Task 5: 移动端和 reduced-motion 降级

**Files:**
- Modify: `src/styles.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: 限制移动端 Hero 背景范围**

在 `@media (max-width: 680px)` 内添加：

```css
  .hero-background {
    inset: -34px -18px -20px;
  }

  .hero-grid-layer {
    opacity: 0.48;
  }
```

- [ ] **Step 2: 强化 reduced-motion CSS**

将现有 `@media (prefers-reduced-motion: reduce)` 块保留，并在其中追加：

```css
  .hero-grid-layer,
  .hero-glow,
  .candidate-panel,
  .case-card {
    transform: none !important;
  }

  .hero-glow {
    display: none;
  }

  .button::after {
    display: none;
  }
```

- [ ] **Step 3: 检查 JS 已跳过强动画**

确认 `src/App.jsx` 中存在以下逻辑：

```jsx
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReducedMotion = reduceMotionQuery.matches;
```

确认所有无限循环、ScrollTrigger 视差、pointer tilt 均被 `if (!isReducedMotion)` 或 `canUsePointerMotion` 包裹。

- [ ] **Step 4: 构建验证**

Run:

```bash
npm run build
```

Expected:

```text
✓ built in ...
```

- [ ] **Step 5: 跳过 git 操作**

不要提交本任务改动。

## Task 6: 本地运行和人工视觉验收

**Files:**
- Read: `src/App.jsx`
- Read: `src/styles.css`

- [ ] **Step 1: 启动本地开发服务器**

Run:

```bash
npm run dev
```

Expected:

```text
Local:   http://localhost:5173/
```

如果 5173 被占用，Vite 会给出另一个本地地址，使用实际输出地址。

- [ ] **Step 2: 桌面端检查**

在浏览器打开本地地址，使用约 1440px 宽视口检查：

```text
首屏：
- Hero 内容按层级进入。
- 候选人卡片有鼠标 tilt，幅度不夸张。
- 背景网格和光效轻微响应鼠标。
- 按钮 hover 有高光扫过。

滚动：
- Hero 离开时有轻微视差。
- quick-facts、AISDLC、evidence、cases、skills、timeline、contact 依次入场。
- 内容没有遮挡、跳动或文字重叠。
```

- [ ] **Step 3: 移动端检查**

使用浏览器响应式模式切到 390px 宽，检查：

```text
- 页面没有横向滚动条。
- Hero 背景不遮挡文字。
- 不依赖鼠标 tilt。
- 按钮、导航、workflow tab 可点击。
- 标题和正文没有溢出容器。
```

- [ ] **Step 4: reduced-motion 检查**

在浏览器 DevTools 中模拟 `prefers-reduced-motion: reduce`，刷新页面后检查：

```text
- 无连续背景流动。
- 无候选人卡片 tilt。
- 无强视差。
- 内容仍可见，页面可正常阅读。
```

- [ ] **Step 5: 停止开发服务器**

在运行 `npm run dev` 的终端按：

```text
Ctrl+C
```

- [ ] **Step 6: 最终构建**

Run:

```bash
npm run build
```

Expected:

```text
✓ built in ...
```

- [ ] **Step 7: 跳过 git 操作**

不要提交本任务改动。

## 自检结果

- Spec 覆盖：计划覆盖了 GSAP 依赖迁移、移除 framer-motion、Hero 主舞台、其他区域轻增强、移动端降级、reduced-motion 和 build 验证。
- 范围控制：不改文案、不改页面信息架构、不新增路由或下载简历能力。
- 项目约束：计划明确跳过 git 操作，符合仓库规则“没有允许不要进行 git 修改操作”。
