# Portfolio Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将当前简历页重设计为“未来感个人品牌 + 高级技术简历”的单页作品集。

**Architecture:** 保持 React + Vite 单页结构，不新增依赖。`src/App.jsx` 负责内容数据、模块顺序、语义结构和 GSAP 动画绑定；`src/styles.css` 负责新的浅色科技感视觉系统、响应式布局、模块样式和 reduced-motion 降级。

**Tech Stack:** React 19、Vite、GSAP、ScrollTrigger、CSS Grid/Flex、CSS custom properties。

---

## 文件结构

- Modify: `src/App.jsx`
  - 新增 `heroKeywords`、`heroMetrics`、`heroLines`、`contactLinks` 等轻量数据。
  - 将首屏改成无左右栏中心封面式 Hero。
  - 将 quick facts 改成 Proof Strip。
  - 将 workflow 视觉结构改成 AISDLC 流程叙事区。
  - 将 skills 和 timeline 合并成一个背景能力区。
  - 更新 GSAP 选择器和鼠标视差逻辑，移除候选人卡片 tilt。
- Modify: `src/styles.css`
  - 重建全局视觉变量、背景、模块间距和标题层级。
  - 重写 Hero、Proof Strip、AISDLC、Evidence、Cases、Skills + Timeline、Contact 的样式。
  - 增加响应式和 reduced-motion 降级。

不修改 `package.json` 和 `package-lock.json`。

## Task 1: 重组 App.jsx 数据和 Hero 结构

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: 替换 quickFacts 并新增 Hero 视觉数据**

在 `profile` 后，将现有 `quickFacts` 替换为以下内容，并新增 `heroKeywords`、`heroLines`、`contactLinks`：

```jsx
const heroMetrics = [
  ['6 年', '前端开发'],
  ['美团 / 小米', '工作经历'],
  ['AISDLC', '正在建设的方向'],
  ['50%', '订单详情页打开速度提升'],
];

const heroKeywords = ['AISDLC', 'Agent', 'MCP', 'Frontend', 'Review'];

const heroLines = [
  { className: 'hero-line hero-line-one' },
  { className: 'hero-line hero-line-two' },
  { className: 'hero-line hero-line-three' },
];

const contactLinks = [
  ['Email', profile.email, `mailto:${profile.email}`],
  ['Phone', profile.phone, `tel:${profile.phone}`],
  ['GitHub', 'github.com/Jinminrui', profile.github],
];
```

- [ ] **Step 2: 更新 Hero refs**

将 `candidatePanelRef` 替换为视觉层和事实刻度 refs：

```jsx
  const heroVisualRef = useRef(null);
  const heroMetricsRef = useRef(null);
```

函数开头应变为：

```jsx
function App() {
  const [activeStep, setActiveStep] = useState(workflowSteps[0]);
  const shellRef = useRef(null);
  const heroRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroVisualRef = useRef(null);
  const heroMetricsRef = useRef(null);
```

- [ ] **Step 3: 替换 Hero JSX**

将 `<section className="hero" ref={heroRef}>...</section>` 整段替换为：

```jsx
        <section className="hero" ref={heroRef}>
          <div className="hero-visual" ref={heroVisualRef} aria-hidden="true">
            <span className="hero-grid-layer" />
            <span className="hero-scan" />
            <span className="hero-orbit hero-orbit-one" />
            <span className="hero-orbit hero-orbit-two" />
            {heroLines.map((line) => (
              <span className={line.className} key={line.className} />
            ))}
            {heroKeywords.map((keyword, index) => (
              <span className={`hero-keyword hero-keyword-${index + 1}`} key={keyword}>
                {keyword}
              </span>
            ))}
          </div>

          <div className="hero-copy" ref={heroCopyRef}>
            <p className="eyebrow">Frontend Engineer · AISDLC</p>
            <h1>
              <span>{profile.name}</span>
              <span>{profile.englishName}</span>
            </h1>
            <p className="hero-role">{profile.role}</p>
            <p className="hero-lead">把 AI 接入需求理解、工程实现、代码审查和知识沉淀，让它真正参与研发流程。</p>
            <div className="hero-actions">
              <a href="#cases" className="button button-primary">
                查看项目
              </a>
              <a href="#contact" className="button button-secondary">
                联系我
              </a>
            </div>
          </div>

          <div className="proof-strip" ref={heroMetricsRef} aria-label="核心事实">
            {heroMetrics.map(([value, label]) => (
              <article key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </section>
```

- [ ] **Step 4: 删除旧 quick-facts section**

删除 Hero 后面的整段：

```jsx
        <section className="quick-facts animate-section" aria-label="快速信息">
          {quickFacts.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </section>
```

- [ ] **Step 5: 更新导航锚点**

将顶部导航替换为：

```jsx
        <nav aria-label="页面导航">
          <a href="#workflow">AISDLC</a>
          <a href="#evidence">能力证据</a>
          <a href="#cases">项目案例</a>
          <a href="#background">经历</a>
          <a href="#contact">联系</a>
        </nav>
```

- [ ] **Step 6: 运行构建确认 JSX 可编译**

Run:

```bash
npm run build
```

Expected:

```text
✓ built in
```

如果失败，修复 JSX 语法或未定义变量，直到构建通过。

## Task 2: 重组页面模块顺序和语义结构

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: 将 workflow section 改为 narrative 命名**

将 workflow section 起始标签替换为：

```jsx
        <section className="section workflow-section narrative-panel animate-section" id="workflow">
```

将 `workflow-layout` 内部替换为：

```jsx
          <div className="workflow-layout">
            <div className="workflow-rail" role="tablist" aria-label="AI 工作流步骤">
              {workflowSteps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  className={activeStep.id === step.id ? 'active' : ''}
                  onClick={() => setActiveStep(step)}
                  role="tab"
                  aria-selected={activeStep.id === step.id}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step.label}</strong>
                </button>
              ))}
            </div>
            <div className="workflow-detail">
              <p className="detail-label">当前阶段</p>
              <h3>{activeStep.title}</h3>
              <p>{activeStep.body}</p>
              <div>
                <span>典型产出</span>
                <strong>{activeStep.output}</strong>
              </div>
            </div>
          </div>
```

- [ ] **Step 2: 更新 evidence section class**

将 evidence section 起始标签替换为：

```jsx
        <section className="section evidence-section evidence-wall animate-section" id="evidence">
```

保持内部 `evidence-list` 数据渲染不变。

- [ ] **Step 3: 更新 cases section class**

将 cases section 起始标签替换为：

```jsx
        <section className="section cases-section case-showcase animate-section" id="cases">
```

保持 `cases.map` 数据渲染不变。

- [ ] **Step 4: 合并 skills 和 timeline**

删除独立的 `skills-section` 和 `timeline-section` 两段，替换为：

```jsx
        <section className="section background-section animate-section" id="background">
          <SectionTitle
            eyebrow="Background"
            title="技术栈和经历，支撑我把想法落到真实业务里"
            note="技能不是孤立标签，它们和业务交付、性能优化、AI 工程流程建设一起发挥作用。"
          />
          <div className="background-grid">
            <div className="skills-panel">
              <h3>Toolbox</h3>
              <div className="skill-tags">
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="timeline-panel">
              <h3>Experience</h3>
              <div className="timeline">
                {timeline.map(([time, title, body]) => (
                  <article key={time}>
                    <time>{time}</time>
                    <div>
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
```

- [ ] **Step 5: 替换 Contact section**

将 `contact-section` 整段替换为：

```jsx
        <section className="contact-section animate-section" id="contact">
          <div>
            <p className="eyebrow">Open to frontend opportunities</p>
            <h2>如果你在找一位能做复杂业务，也在认真建设 AI 参与研发流程的前端工程师，我们可以聊聊。</h2>
          </div>
          <div className="contact-links" aria-label="联系方式">
            {contactLinks.map(([label, value, href]) => (
              <a href={href} key={label} target={label === 'GitHub' ? '_blank' : undefined} rel={label === 'GitHub' ? 'noreferrer' : undefined}>
                <span>{label}</span>
                <strong>{value}</strong>
              </a>
            ))}
          </div>
        </section>
```

- [ ] **Step 6: 运行构建确认模块重排后仍可编译**

Run:

```bash
npm run build
```

Expected:

```text
✓ built in
```

## Task 3: 更新 GSAP 动画绑定

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: 替换第一个 useEffect 内的 DOM 引用**

将 effect 开头替换为：

```jsx
  useEffect(() => {
    const shell = shellRef.current;
    const hero = heroRef.current;
    const heroCopy = heroCopyRef.current;
    const heroVisual = heroVisualRef.current;
    const heroMetrics = heroMetricsRef.current;

    if (!shell || !hero || !heroCopy || !heroVisual || !heroMetrics) {
      return undefined;
    }
```

- [ ] **Step 2: 替换 intro 动画目标**

在 `gsap.context(() => {` 内，将旧 `heroItems/contactRows` 和 intro timeline 替换为：

```jsx
      const heroItems = heroCopy.querySelectorAll('.eyebrow, h1 span, .hero-role, .hero-lead, .hero-actions');
      const visualItems = heroVisual.querySelectorAll('.hero-line, .hero-keyword, .hero-orbit, .hero-scan');
      const metricItems = heroMetrics.querySelectorAll('article');

      gsap.set(heroItems, { autoAlpha: 0, y: isReducedMotion ? 0 : 28 });
      gsap.set(visualItems, { autoAlpha: 0, y: isReducedMotion ? 0 : 18 });
      gsap.set(metricItems, { autoAlpha: 0, y: isReducedMotion ? 0 : 18 });

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .to(visualItems, {
          autoAlpha: 1,
          y: 0,
          duration: isReducedMotion ? 0.01 : 0.72,
          stagger: isReducedMotion ? 0 : 0.05,
        })
        .to(
          heroItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: isReducedMotion ? 0.01 : 0.82,
            stagger: isReducedMotion ? 0 : 0.08,
          },
          isReducedMotion ? 0 : '-=0.42',
        )
        .to(
          metricItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: isReducedMotion ? 0.01 : 0.5,
            stagger: isReducedMotion ? 0 : 0.06,
          },
          isReducedMotion ? 0 : '-=0.24',
        );
```

- [ ] **Step 3: 替换滚动 reveal 选择器**

将 `sectionTargets` 查询替换为：

```jsx
        const sectionTargets = section.querySelectorAll(
          '.section-title, .workflow-rail button, .workflow-detail, .evidence-list article, .case-card, .skills-panel, .skill-tags span, .timeline article, .contact-section > *, .contact-links a',
        );
```

- [ ] **Step 4: 替换非 reduced-motion 连续动画**

将 `if (!isReducedMotion) { ... }` 内旧的 grid、glow、candidatePanel 动画替换为：

```jsx
      if (!isReducedMotion) {
        gsap.to(hero.querySelector('.hero-grid-layer'), {
          backgroundPosition: '96px 96px',
          duration: 22,
          repeat: -1,
          ease: 'none',
        });

        gsap.to(hero.querySelectorAll('.hero-keyword'), {
          yPercent: (index) => (index % 2 === 0 ? 12 : -10),
          xPercent: (index) => (index % 2 === 0 ? -8 : 7),
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.35,
        });

        gsap.to(hero.querySelectorAll('.hero-line'), {
          xPercent: (index) => (index === 1 ? -10 : 12),
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.6,
        });

        gsap.to(heroVisual, {
          y: 42,
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        });
      }
```

- [ ] **Step 5: 替换 pointer move 逻辑**

将 `handlePointerMove` 内部替换为：

```jsx
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(hero, {
        '--hero-pointer-x': `${50 + x * 18}%`,
        '--hero-pointer-y': `${50 + y * 16}%`,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      gsap.to(heroVisual.querySelectorAll('.hero-keyword, .hero-orbit'), {
        x: (index) => x * (index % 2 === 0 ? 18 : -14),
        y: (index) => y * (index % 2 === 0 ? 12 : -10),
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
```

- [ ] **Step 6: 替换 pointer leave 逻辑**

将 `handlePointerLeave` 内部替换为：

```jsx
      gsap.to(hero, {
        '--hero-pointer-x': '50%',
        '--hero-pointer-y': '50%',
        duration: 0.6,
        ease: 'power3.out',
      });

      gsap.to(heroVisual.querySelectorAll('.hero-keyword, .hero-orbit'), {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
```

- [ ] **Step 7: 更新 activeStep effect 选择器**

第二个 `useEffect` 中保留 `.workflow-detail > *` 动画即可，不需要修改。

- [ ] **Step 8: 运行构建确认动画代码无引用错误**

Run:

```bash
npm run build
```

Expected:

```text
✓ built in
```

## Task 4: 重建全局视觉系统和 Hero 样式

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: 更新色彩变量**

在 `:root` 中保留字体声明，将变量替换为：

```css
  --bg: #f7f9fc;
  --surface: #ffffff;
  --surface-soft: #edf5ff;
  --ink: #101725;
  --muted: #586677;
  --subtle: #8894a5;
  --line: #dbe5f0;
  --line-strong: #b9c8da;
  --accent: #2563eb;
  --accent-cyan: #0891b2;
  --accent-soft: #e8f1ff;
  --blue: #1d4ed8;
  --shadow: 0 24px 80px rgba(30, 49, 76, 0.09);
```

- [ ] **Step 2: 替换 body 背景**

将 `body` 背景替换为：

```css
body {
  min-width: 320px;
  margin: 0;
  background:
    radial-gradient(circle at 18% 12%, rgba(37, 99, 235, 0.11), transparent 28%),
    radial-gradient(circle at 82% 8%, rgba(8, 145, 178, 0.1), transparent 24%),
    linear-gradient(rgba(37, 99, 235, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.04) 1px, transparent 1px),
    var(--bg);
  background-size: auto, auto, 44px 44px, 44px 44px, auto;
}
```

- [ ] **Step 3: 替换 Hero 相关样式**

删除旧 `.hero` 到 `.contact-grid dd` 的 Hero/候选人卡片样式，替换为新的 Hero 样式：

```css
.hero {
  position: relative;
  isolation: isolate;
  display: grid;
  min-height: min(760px, calc(100vh - 126px));
  align-items: center;
  padding: clamp(72px, 10vw, 124px) 0 28px;
  overflow: hidden;
  --hero-pointer-x: 50%;
  --hero-pointer-y: 50%;
}

.hero-visual {
  position: absolute;
  inset: -90px -70px -40px;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.hero-grid-layer,
.hero-scan,
.hero-orbit,
.hero-line,
.hero-keyword {
  position: absolute;
  pointer-events: none;
}

.hero-grid-layer {
  inset: 0;
  opacity: 0.72;
  background:
    linear-gradient(rgba(37, 99, 235, 0.075) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.075) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at var(--hero-pointer-x) var(--hero-pointer-y), #000 0, rgba(0, 0, 0, 0.72) 38%, transparent 74%);
  -webkit-mask-image: radial-gradient(circle at var(--hero-pointer-x) var(--hero-pointer-y), #000 0, rgba(0, 0, 0, 0.72) 38%, transparent 74%);
}

.hero-scan {
  inset: 12% -20%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(8, 145, 178, 0.5), rgba(37, 99, 235, 0.3), transparent);
  transform: rotate(-9deg);
  box-shadow: 0 0 34px rgba(8, 145, 178, 0.28);
}

.hero-orbit {
  width: 34vw;
  max-width: 470px;
  aspect-ratio: 1;
  border: 1px solid rgba(37, 99, 235, 0.16);
  border-radius: 50%;
  filter: blur(0.2px);
}

.hero-orbit-one {
  top: 12%;
  left: 8%;
}

.hero-orbit-two {
  right: 4%;
  bottom: 12%;
  border-color: rgba(8, 145, 178, 0.16);
}

.hero-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.32), transparent);
  transform-origin: center;
}

.hero-line-one {
  top: 24%;
  left: 10%;
  width: 46%;
  transform: rotate(12deg);
}

.hero-line-two {
  right: 6%;
  bottom: 30%;
  width: 42%;
  transform: rotate(-18deg);
}

.hero-line-three {
  left: 24%;
  bottom: 16%;
  width: 38%;
  transform: rotate(3deg);
}

.hero-keyword {
  color: rgba(37, 99, 235, 0.32);
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(0.72rem, 1.2vw, 0.95rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-keyword-1 { top: 18%; left: 14%; }
.hero-keyword-2 { top: 20%; right: 16%; }
.hero-keyword-3 { right: 10%; bottom: 24%; }
.hero-keyword-4 { left: 12%; bottom: 28%; }
.hero-keyword-5 { top: 52%; right: 24%; }

.hero-copy {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  max-width: 920px;
  margin: 0 auto;
  text-align: center;
}

.hero h1 {
  display: grid;
  gap: 8px;
  margin: 18px 0 0;
  font-size: clamp(3.2rem, 9vw, 8.4rem);
  font-weight: 800;
  letter-spacing: -0.055em;
  line-height: 0.92;
  text-wrap: balance;
}

.hero h1 span:last-child {
  color: rgba(16, 23, 37, 0.4);
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(1rem, 2vw, 1.45rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-role {
  margin: 20px 0 0;
  color: var(--accent);
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  font-weight: 700;
}

.hero-lead {
  max-width: 760px;
  margin: 18px 0 0;
  color: var(--muted);
  font-size: clamp(1rem, 1.28vw, 1.16rem);
  line-height: 1.9;
  text-wrap: pretty;
}

.proof-strip {
  align-self: end;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  margin-top: clamp(56px, 8vw, 86px);
  border: 1px solid rgba(185, 200, 218, 0.74);
  border-radius: 8px;
  background: rgba(185, 200, 218, 0.56);
  overflow: hidden;
}

.proof-strip article {
  min-height: 92px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.68);
  backdrop-filter: blur(16px) saturate(140%);
}

.proof-strip strong {
  display: block;
  color: var(--ink);
  font-size: clamp(1.08rem, 1.7vw, 1.42rem);
  font-weight: 800;
  letter-spacing: -0.025em;
}

.proof-strip span {
  display: block;
  margin-top: 12px;
  color: var(--muted);
  font-size: 0.88rem;
}
```

- [ ] **Step 4: 运行构建确认 CSS 不影响编译**

Run:

```bash
npm run build
```

Expected:

```text
✓ built in
```

## Task 5: 重写内容模块样式

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: 更新通用卡片选择器**

将旧的通用卡片选择器替换为：

```css
.workflow-detail,
.evidence-list,
.case-card,
.skills-panel,
.timeline-panel,
.contact-section {
  border: 1px solid rgba(219, 229, 240, 0.92);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: var(--shadow);
}
```

- [ ] **Step 2: 将 workflow tabs 样式改名为 workflow rail**

将所有 `.workflow-tabs` 替换为 `.workflow-rail`，并增加流程线样式：

```css
.workflow-rail {
  position: relative;
  display: grid;
  gap: 10px;
}

.workflow-rail::before {
  content: '';
  position: absolute;
  top: 28px;
  bottom: 28px;
  left: 27px;
  width: 1px;
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.18), rgba(8, 145, 178, 0.28), rgba(37, 99, 235, 0.12));
}

.workflow-rail button {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  align-items: center;
  min-height: 64px;
  padding: 0 18px 0 0;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  text-align: left;
  font-size: 0.96rem;
  font-weight: 600;
  transition: color 160ms ease, border-color 160ms ease, background 160ms ease, transform 160ms ease;
}

.workflow-rail button:hover,
.workflow-rail button.active {
  color: var(--ink);
  border-color: rgba(37, 99, 235, 0.38);
  background: rgba(232, 241, 255, 0.92);
  transform: translateX(2px);
}

.workflow-rail span {
  position: relative;
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  margin-left: 10px;
  color: var(--accent);
  border: 1px solid rgba(37, 99, 235, 0.22);
  border-radius: 50%;
  background: #fff;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
}
```

- [ ] **Step 3: 更新 Evidence hover 质感**

追加以下样式：

```css
.evidence-list article {
  position: relative;
  transition: background 180ms ease, transform 180ms ease;
}

.evidence-list article::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 2px;
  opacity: 0;
  background: linear-gradient(180deg, var(--accent), var(--accent-cyan));
  transition: opacity 180ms ease;
}

.evidence-list article:hover {
  background: rgba(232, 241, 255, 0.48);
  transform: translateX(2px);
}

.evidence-list article:hover::before {
  opacity: 1;
}
```

- [ ] **Step 4: 更新 Skills + Timeline 合并区样式**

新增以下样式：

```css
.background-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.82fr) minmax(0, 1.18fr);
  gap: 16px;
}

.skills-panel,
.timeline-panel {
  padding: clamp(24px, 4vw, 34px);
}

.skills-panel h3,
.timeline-panel h3 {
  margin: 0 0 18px;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.timeline h4 {
  margin: 0;
  font-size: 1.08rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}
```

- [ ] **Step 5: 更新 Contact links 样式**

新增以下样式：

```css
.contact-links {
  display: grid;
  gap: 10px;
  min-width: min(360px, 100%);
}

.contact-links a {
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid rgba(185, 200, 218, 0.78);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
}

.contact-links a:hover {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.36);
  background: #fff;
}

.contact-links span {
  color: var(--subtle);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.contact-links strong {
  color: var(--ink);
  overflow-wrap: anywhere;
}
```

- [ ] **Step 6: 更新 will-change 选择器**

将旧 will-change 选择器替换为：

```css
.hero-copy > *,
.hero-visual > *,
.proof-strip article,
.workflow-detail,
.workflow-rail button,
.evidence-list article,
.case-card,
.skill-tags span,
.timeline article,
.contact-section > *,
.contact-links a {
  will-change: transform, opacity;
}
```

- [ ] **Step 7: 运行构建**

Run:

```bash
npm run build
```

Expected:

```text
✓ built in
```

## Task 6: 响应式和 reduced-motion 收口

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: 更新 980px media query**

在 `@media (max-width: 980px)` 中替换相关 grid 规则为：

```css
  .workflow-layout,
  .background-grid,
  .contact-section {
    grid-template-columns: 1fr;
  }

  .proof-strip,
  .case-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
```

- [ ] **Step 2: 更新 680px media query**

在 `@media (max-width: 680px)` 中替换 Hero 和 grid 规则为：

```css
  main {
    padding-top: 28px;
  }

  .hero {
    min-height: auto;
    padding: 64px 0 22px;
  }

  .hero-visual {
    inset: -34px -20px -10px;
  }

  .hero-orbit,
  .hero-line-three,
  .hero-keyword-2,
  .hero-keyword-5 {
    display: none;
  }

  .hero h1 {
    font-size: clamp(3rem, 17vw, 5rem);
  }

  .proof-strip,
  .case-columns {
    grid-template-columns: 1fr;
  }

  .proof-strip article {
    min-height: 78px;
  }

  .workflow-detail div {
    grid-template-columns: 1fr;
    gap: 6px;
  }
```

- [ ] **Step 3: 更新 reduced-motion 规则**

将 reduced-motion 中旧选择器替换为：

```css
  .hero-grid-layer,
  .hero-scan,
  .hero-orbit,
  .hero-line,
  .hero-keyword,
  .case-card {
    transform: none !important;
  }

  .hero-scan,
  .hero-orbit {
    display: none;
  }
```

- [ ] **Step 4: 构建验证**

Run:

```bash
npm run build
```

Expected:

```text
✓ built in
```

## Task 7: 浏览器视觉验证和最终修正

**Files:**
- Modify: `src/App.jsx`，仅当浏览器验证发现 DOM 或交互问题时修改。
- Modify: `src/styles.css`，仅当浏览器验证发现布局、视觉或响应式问题时修改。

- [ ] **Step 1: 启动开发服务器**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected:

```text
Local:   http://127.0.0.1:5173/
```

如果 5173 被占用，Vite 会给出另一个端口，使用输出中的实际 URL。

- [ ] **Step 2: 桌面端检查**

打开本地 URL，在 1440px 宽度检查：

- Hero 不是左右布局。
- Hero 不出现电话、邮箱。
- 姓名、英文名、身份、摘要和按钮清晰可读。
- Proof Strip 位于 Hero 底部或紧接 Hero。
- AISDLC 区看起来像流程叙事，不像普通 tab。
- Cases 区能清晰看到问题、贡献、结果、技术栈。
- Contact 区展示邮箱、电话、GitHub。

- [ ] **Step 3: 移动端检查**

在 390px 宽度检查：

- 页面没有横向滚动。
- Hero 标题不重叠。
- 两个按钮不溢出。
- Proof Strip 单列展示。
- workflow、case、background、contact 都可顺序阅读。

- [ ] **Step 4: reduced-motion 检查**

在浏览器启用 `prefers-reduced-motion: reduce` 后检查：

- 没有持续扫描光。
- 漂浮关键词不持续移动。
- 鼠标移动不会触发明显视差。
- 页面仍然完整可读。

- [ ] **Step 5: 最终构建**

Run:

```bash
npm run build
```

Expected:

```text
✓ built in
```

- [ ] **Step 6: 提交实现**

只在用户允许提交实现时运行：

```bash
git add src/App.jsx src/styles.css
git commit -m "feat: 重设计作品集整站视觉体验"
```
