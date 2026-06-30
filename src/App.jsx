import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const profile = {
  name: '金敏睿',
  englishName: 'Minrui Jin',
  role: 'AI 前端开发工程师',
  location: '南京',
  phone: '17314976003',
  email: '969172689@qq.com',
  github: 'https://github.com/Jinminrui',
  summary:
    '我做了 6 年前端，主要在 Web、Hybrid、小程序和复杂后台系统里解决业务问题。最近重点在做 AISDLC 相关建设：把 AI 接入需求理解、知识沉淀、代码审查和问题恢复，让它不只是写代码，而是真的参与研发流程。',
};

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

const workflowSteps = [
  {
    id: 'clarify',
    label: '需求澄清',
    title: '让 AI 先理解需求，而不是直接写代码',
    body: '在 AISDLC 里，我希望 Agent 先能读懂业务目标、角色、边界和验收口径。只有上下文清楚了，后面的方案和实现才不容易跑偏。',
    output: '需求摘要 / 业务词表 / 验收口径',
  },
  {
    id: 'plan',
    label: '方案评估',
    title: '把方案判断变成可讨论的过程',
    body: '遇到复杂页面时，我会让 AI 帮忙梳理状态管理、组件边界和接口依赖，再结合业务约束判断取舍。重点不是让它拍板，而是让方案比较更充分。',
    output: '方案对比 / 影响范围 / 开发拆分',
  },
  {
    id: 'refactor',
    label: '代码重构',
    title: '把代码经验沉淀成可复用上下文',
    body: 'AISDLC 不能只靠一次对话。我的关注点是把代码结构、业务规则和历史改动沉淀下来，让 Agent 下一次还能接着理解。',
    output: '知识库文档 / 迁移步骤 / 代码索引',
  },
  {
    id: 'review',
    label: 'Review / 排障',
    title: '让 Review 和排障可以恢复、可以追踪',
    body: '我参与设计 Code Review MCP Daemon，把 diff、文件、规则和结构化评论组织起来，让审查会话不再是一次性的 CLI 输出。',
    output: 'Review 会话 / 修复建议 / 复盘记录',
  },
];

const evidence = [
  {
    title: '能接住复杂业务',
    body: '做过履约、商品、广告、营销、账号、订单这些业务模块。很多需求不只是还原页面，更重要的是先弄懂业务链路。',
    proof: '参与日均 500 万单配送业务',
  },
  {
    title: '会盯关键链路体验',
    body: '订单详情页这类页面，用户打开慢就会直接影响操作。我做过接口前置、数据补偿和组件按需注入来优化体验。',
    proof: '整体打开速度提升 50%',
  },
  {
    title: '能从 0 到 1 推功能落地',
    body: '校园运力 SaaS 小程序从初版搭建到后续迭代，我参与了核心模块开发，也补了调试面板、Mock 和分包能力。',
    proof: '包体累计优化 388K',
  },
  {
    title: '在建设前端 AISDLC',
    body: '参与前端知识库生产、增量保鲜机制、Code Review MCP Daemon 和会话隔离设计，让 AI 能持续理解真实代码库。',
    proof: '让 Agent 能读懂更多工程上下文',
  },
];

const cases = [
  {
    name: '青云聚信',
    meta: '美团 · 同城配送管理平台',
    problem: '青云聚信要把商家的多渠道订单下发到配送承运商，并持续管理配送过程。业务范围广，APP 和 PC 两端都要跟着迭代。',
    contribution:
      '我参与商品、订单、广告、营销等模块开发，也从 0 到 1 建设 PC 商品管理能力，沉淀了分类、上传、表格和动态表单组件。',
    result: '这些能力支撑后续业务持续迭代；在订单详情页优化中，整体打开速度提升 50%。',
    stack: 'React / Redux Toolkit / 小程序动态化容器',
  },
  {
    name: '校园运力 SaaS 小程序',
    meta: '美团 · 校园自配送场景',
    problem: '校园配送场景有很明确的上线时间点，站长和骑手也需要更顺手的工具来处理审核、预警、查询和履约。',
    contribution:
      '我负责短信通知模板、骑手审核、订单预警、订单查询等模块，也搭了调试面板帮助联调和问题排查。',
    result: '项目在 2025 年 3 月开学前完成初版交付；后续继续优化体验，并累计压缩包体 388K。',
    stack: '微信小程序 / Mock 调试 / 包体优化',
  },
  {
    name: '前端 AISDLC 建设',
    meta: '2026.03 至今 · AI 参与研发流程',
    problem: '真实业务代码和文档变化很快。AI 如果只能看到零散片段，很难持续理解项目，也很难在需求、Review 和排障里稳定发挥作用。',
    contribution:
      '我参与前端知识库生产流程、增量保鲜机制、Code Review MCP Daemon 和会话隔离设计，让业务上下文能被更稳定地沉淀下来。',
    result: '这让需求理解、代码审查、知识沉淀和问题恢复不再完全依赖临时上下文，而是逐步进入可复用的研发流程。',
    stack: 'Codex / Claude Code / MCP / Knowledge Base',
  },
];

const skills = [
  'JavaScript',
  'React',
  'Redux Toolkit',
  'Vue',
  '微信小程序',
  'Hybrid',
  'Node.js',
  'Webpack',
  '性能优化',
  '复杂表单',
  'Codex',
  'Claude Code',
  'AISDLC',
  'Vibe Coding',
  'Spec Coding',
  'MCP',
];

const timeline = [
  ['2023.10 - 至今', '美团 · 前端开发工程师', '在聚合配送业务组做青云聚信多端项目、校园配送小程序，也参与前端 AISDLC 相关建设。'],
  ['2020.07 - 2023.10', '小米科技 · 前端开发工程师', '做过 MIUI 系统应用 Hybrid 页面、官网和内部平台，主导过思维笔记、桌面小部件等项目。'],
  ['2016 - 2020', '南京信息工程大学 · 计算机科学与技术', '本科，CET-6，具备良好的英文技术资料阅读能力。'],
];

function SectionTitle({ eyebrow, title, note }) {
  return (
    <div className="section-title">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {note ? <span>{note}</span> : null}
    </div>
  );
}

function App() {
  const [activeStep, setActiveStep] = useState(workflowSteps[0]);
  const shellRef = useRef(null);
  const heroRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroVisualRef = useRef(null);
  const heroMetricsRef = useRef(null);

  useEffect(() => {
    const shell = shellRef.current;
    const hero = heroRef.current;
    const heroCopy = heroCopyRef.current;
    const heroVisual = heroVisualRef.current;
    const heroMetrics = heroMetricsRef.current;

    if (!shell || !hero || !heroCopy || !heroVisual || !heroMetrics) {
      return undefined;
    }

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReducedMotion = reduceMotionQuery.matches;

    const ctx = gsap.context(() => {
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

      const animatedSections = gsap.utils.toArray('.animate-section');

      animatedSections.forEach((section) => {
        if (section === hero) {
          return;
        }

        const sectionTargets = section.querySelectorAll(
          '.section-title, .workflow-rail button, .workflow-detail, .evidence-list article, .case-card, .skills-panel, .skill-tags span, .timeline article, .contact-section > *, .contact-links a',
        );

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
    }, shell);

    const canUsePointerMotion = !isReducedMotion && window.matchMedia('(pointer: fine)').matches;

    const handlePointerMove = (event) => {
      if (!canUsePointerMotion) {
        return;
      }

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
    };

    const handlePointerLeave = () => {
      if (!canUsePointerMotion) {
        return;
      }

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
    };

    hero.addEventListener('pointermove', handlePointerMove);
    hero.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
      ctx.revert();
    };
  }, []);

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

  return (
    <div className="site-shell" ref={shellRef}>
      <header className="topbar">
        <a href="#top" className="brand">
          <strong>金敏睿</strong>
          <span>AI Frontend</span>
        </a>
        <nav aria-label="页面导航">
          <a href="#workflow">AISDLC</a>
          <a href="#evidence">能力证据</a>
          <a href="#cases">项目案例</a>
          <a href="#background">经历</a>
          <a href="#contact">联系</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero animate-section" ref={heroRef}>
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

        <section className="section workflow-section narrative-panel animate-section" id="workflow">
          <SectionTitle
            eyebrow="AI workflow"
            title="我关注的是前端 AISDLC，不只是 AI 写代码"
            note="重点是把 AI 放进需求、知识库、Review 和排障流程里，让它能持续理解项目上下文。"
          />
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
        </section>

        <section className="section evidence-section evidence-wall animate-section" id="evidence">
          <SectionTitle
            eyebrow="Evidence"
            title="我能帮团队解决哪些前端问题"
            note="这些不是标签，而是我在业务交付和 AISDLC 建设里反复处理过的事情。"
          />
          <div className="evidence-list">
            {evidence.map((item) => (
              <article key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <strong>{item.proof}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section cases-section case-showcase animate-section" id="cases">
          <SectionTitle
            eyebrow="Selected cases"
            title="几个能代表我工作方式的项目"
            note="我尽量不写成流水账，而是把背景、我负责的部分和结果讲清楚。"
          />
          <div className="case-list">
            {cases.map((item) => (
              <article className="case-card" key={item.name}>
                <div className="case-meta">
                  <span>{item.meta}</span>
                  <h3>{item.name}</h3>
                </div>
                <div className="case-columns">
                  <div>
                    <span>业务问题</span>
                    <p>{item.problem}</p>
                  </div>
                  <div>
                    <span>我的贡献</span>
                    <p>{item.contribution}</p>
                  </div>
                  <div>
                    <span>结果</span>
                    <p>{item.result}</p>
                  </div>
                </div>
                <p className="stack">{item.stack}</p>
              </article>
            ))}
          </div>
        </section>

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

        <section className="contact-section animate-section" id="contact">
          <div>
            <p className="eyebrow">Open to frontend opportunities</p>
            <h2>如果你在找一位能做复杂业务，也在认真建设 AI 参与研发流程的前端工程师，我们可以聊聊。</h2>
          </div>
          <div className="contact-links" aria-label="联系方式">
            {contactLinks.map(([label, value, href]) => (
              <a
                href={href}
                key={label}
                target={label === 'GitHub' ? '_blank' : undefined}
                rel={label === 'GitHub' ? 'noreferrer' : undefined}
              >
                <span>{label}</span>
                <strong>{value}</strong>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
