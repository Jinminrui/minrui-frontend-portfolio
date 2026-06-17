import { useState } from 'react';
import { motion } from 'framer-motion';

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

const quickFacts = [
  ['6 年', '前端开发'],
  ['React / 小程序 / Hybrid', '主要技术场景'],
  ['美团 / 小米', '工作经历'],
  ['AISDLC', '正在建设的方向'],
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

const sectionMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

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

  return (
    <div className="site-shell">
      <header className="topbar">
        <a href="#top" className="brand">
          <strong>金敏睿</strong>
          <span>AI Frontend</span>
        </a>
        <nav aria-label="页面导航">
          <a href="#workflow">AISDLC</a>
          <a href="#evidence">我的经验</a>
          <a href="#cases">项目案例</a>
          <a href={`mailto:${profile.email}`}>联系</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <p className="eyebrow">Frontend Engineer · AISDLC</p>
            <h1>{profile.role}</h1>
            <p className="hero-lead">{profile.summary}</p>
            <div className="hero-actions">
              <a href={`mailto:${profile.email}`} className="button button-primary">
                联系我
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="button button-secondary">
                查看 GitHub
              </a>
            </div>
          </motion.div>

          <motion.aside
            className="candidate-panel"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
          >
            <div className="candidate-head">
              <div className="monogram">J</div>
              <div>
                <h2>{profile.name}</h2>
                <p>{profile.englishName}</p>
              </div>
            </div>
            <dl className="contact-grid">
              <div>
                <dt>Base</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{profile.phone}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </dd>
              </div>
              <div>
                <dt>Target</dt>
                <dd>{profile.role}</dd>
              </div>
            </dl>
          </motion.aside>
        </section>

        <motion.section className="quick-facts" {...sectionMotion} aria-label="快速信息">
          {quickFacts.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </motion.section>

        <motion.section className="section workflow-section" id="workflow" {...sectionMotion}>
          <SectionTitle
            eyebrow="AI workflow"
            title="我关注的是前端 AISDLC，不只是 AI 写代码"
            note="重点是把 AI 放进需求、知识库、Review 和排障流程里，让它能持续理解项目上下文。"
          />
          <div className="workflow-layout">
            <div className="workflow-tabs" role="tablist" aria-label="AI 工作流步骤">
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
                  {step.label}
                </button>
              ))}
            </div>
            <div className="workflow-detail">
              <p className="detail-label">当前步骤</p>
              <h3>{activeStep.title}</h3>
              <p>{activeStep.body}</p>
              <div>
                <span>典型产出</span>
                <strong>{activeStep.output}</strong>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="section evidence-section" id="evidence" {...sectionMotion}>
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
        </motion.section>

        <motion.section className="section cases-section" id="cases" {...sectionMotion}>
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
        </motion.section>

        <motion.section className="section skills-section" {...sectionMotion}>
          <SectionTitle eyebrow="Toolbox" title="这些是我平时真正会用到的东西" />
          <div className="skill-tags">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </motion.section>

        <motion.section className="section timeline-section" {...sectionMotion}>
          <SectionTitle eyebrow="Experience" title="我在哪里做过这些事" />
          <div className="timeline">
            {timeline.map(([time, title, body]) => (
              <article key={time}>
                <time>{time}</time>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="contact-section" {...sectionMotion}>
          <div>
            <p className="eyebrow">Open to frontend opportunities</p>
            <h2>如果你在找一位能做复杂业务，也在认真建设 AI 参与研发流程的前端工程师，我们可以聊聊。</h2>
          </div>
          <a href={`mailto:${profile.email}`} className="button button-primary">
            {profile.email}
          </a>
        </motion.section>
      </main>
    </div>
  );
}

export default App;
