import { motion } from 'framer-motion';

const profile = {
  name: '金敏睿',
  englishName: 'Minrui Jin',
  role: '高级前端开发工程师',
  summary:
    '具备 6 年 Web / Hybrid / 小程序前端经验，长期负责复杂业务系统、多端交付与性能优化，能够在业务快速迭代中兼顾体验、工程质量与交付效率，并将 AI 工具实际应用到需求拆解、方案评估、代码重构与问题排查流程中，持续提升研发效率。',
  location: '南京',
  phone: '173 1497 6003',
  email: '969172689@qq.com',
};

const metrics = [
  { label: '前端开发经验', value: '6 Years' },
  { label: '核心交付场景', value: 'Web / Hybrid / 小程序' },
  { label: '业务交付特点', value: '复杂业务 / 多端协同' },
  { label: 'AI 协作研发', value: '拆解 / 重构 / 排障' },
];

const capabilityGroups = [
  {
    title: '业务开发与多端交付',
    items: ['复杂后台业务', '商品与履约场景', '营销与消息触达', '微信小程序', 'Hybrid Webview'],
  },
  {
    title: '工程化与协作',
    items: ['React', 'Redux Toolkit', 'JavaScript', 'Git', '跨角色协作'],
  },
  {
    title: '性能优化与复杂交互',
    items: ['接口前置', '按需注入', '数据补偿', '复杂表单', '高复用组件封装'],
  },
  {
    title: 'AI 协作研发',
    items: ['Codex', 'Claude Code', '需求拆解', '方案评估', '重构提效', '排障辅助'],
  },
];

const highlights = [
  {
    year: '2023 - Now',
    title: '青云聚信',
    subtitle: '北京三快在线科技有限公司 / 前端开发工程师',
    impact:
      '围绕商家履约、商品管理、广告营销、消息触达等核心场景，持续负责 APP 与 PC 端关键模块建设，在复杂业务迭代中兼顾交付效率、体验一致性与可维护性，并将 AI 工具引入日常研发流程以辅助方案分析、重构与排障。',
    bullets: [
      '从 0 到 1 搭建青云 PC 商品管理能力，落地主档、门店商品、任务中心等核心模块，支撑业务系统化运营。',
      '基于 Redux Toolkit 组织页面状态与数据流，沉淀树形分类、多图上传、文件上传等高复用组件，降低后续同类需求开发成本。',
      '针对订单详情页实施接口前置、数据补偿与按需注入等优化方案，持续改善页面打开体验与数据加载效率。',
      '在需求理解、技术方案评估、代码重构与疑难问题排查中结合 Codex、Claude Code 等 AI 工具，缩短分析路径并提升复杂页面迭代效率。',
    ],
    stack: 'React / Redux Toolkit / 多端协同 / Responsive Design / AI 协作开发',
  },
  {
    year: '2025',
    title: '校园运力 SaaS 微信小程序',
    subtitle: '校园自配送场景 / 核心模块开发',
    impact:
      '面向校园配送站长与骑手，从 0 到 1 参与搭建校园运力管理工具，在明确交付节点下完成首版上线并支撑后续持续迭代。',
    bullets: [
      '独立完成短信模板、骑手审核、订单预警、订单查询等关键模块开发，覆盖站长与骑手高频操作场景。',
      '通过图片压缩与合理分包优化小程序包体，在接近微信体积限制前累计压缩 388K，为后续功能扩展预留空间。',
      '自主搭建调试开发面板，支持环境切换、设备信息查看与 Mock 接入，显著提升联调与问题排查效率。',
    ],
    stack: '微信小程序 / 包体优化 / Mock 调试 / 业务系统开发',
  },
  {
    year: '2020 - 2020',
    title: '思维笔记',
    subtitle: '小米科技有限责任公司 / MIUI 重点项目',
    impact:
      '主导思维笔记大纲视图开发与多端适配，将复杂树形笔记交互抽象为可编辑、可拖拽的前端能力，并支撑与原生客户端的完整联调。',
    bullets: [
      '基于 React-Dnd 自主实现可拖拽树形组件，完成节点移动、修改、删除与插入等核心交互与算法设计。',
      '负责数据加载、退出、保存、删除、分享等关键流程开发，并推进与安卓客户端的整体联调。',
      '项目作为 MIUI12.5 重点功能亮相发布会，成为个人复杂交互设计与落地能力的代表性项目。',
    ],
    stack: 'React / Redux / React-Dnd / Hybrid',
  },
];

const timeline = [
  {
    period: '2023.10 - 至今',
    title: '北京三快在线科技有限公司',
    description: '前端开发工程师，负责聚合配送相关业务系统与青云聚信多端项目建设。',
  },
  {
    period: '2020.07 - 2023.10',
    title: '小米科技有限责任公司',
    description: '前端开发工程师，负责 Hybrid 页面、官网及内部平台开发维护与重点项目交付。',
  },
  {
    period: '2016 - 2020',
    title: '南京信息工程大学（双一流）',
    description: '计算机科学与技术本科。',
  },
];

const sectionMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: 'easeOut' },
};

function SectionHeading({ index, title, kicker }) {
  return (
    <div className="section-heading">
      <span className="section-index">{index}</span>
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="page-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="hero">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="hero-kicker">Frontend Portfolio / Resume Site</p>
          <h1>
            {profile.name}
            <span>{profile.englishName}</span>
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-summary">{profile.summary}</p>

          <div className="hero-actions">
            <a href={`mailto:${profile.email}`} className="button button-primary">
              联系我
            </a>
            <a href="#work" className="button button-secondary">
              查看项目
            </a>
          </div>
        </motion.div>

        <motion.aside
          className="hero-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="hero-card-top">
            <span className="hero-card-label">Current Focus</span>
            <p>复杂业务交付 / 性能优化 / AI 协作研发</p>
          </div>

          <dl className="identity-grid">
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
              <dd>{profile.email}</dd>
            </div>
            <div>
              <dt>English</dt>
              <dd>CET-6</dd>
            </div>
          </dl>

          <p className="hero-card-note">
            当前任职于美团，持续探索 Codex、Claude Code 等 AI 工具在需求拆解、方案评估、重构提效与问题排查中的实际价值，并关注其在前端研发流程中的可复用实践。
          </p>
        </motion.aside>
      </header>

      <main>
        <motion.section className="metrics-grid" {...sectionMotion}>
          {metrics.map((item) => (
            <article key={item.label} className="metric-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </motion.section>

        <motion.section className="section" {...sectionMotion}>
          <SectionHeading index="01" kicker="Capability Snapshot" title="核心能力" />
          <div className="capability-grid">
            {capabilityGroups.map((group) => (
              <article key={group.title} className="capability-card">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" id="work" {...sectionMotion}>
          <SectionHeading index="02" kicker="Selected Work" title="项目与亮点经历" />
          <div className="highlight-list">
            {highlights.map((item) => (
              <article key={item.title} className="highlight-card">
                <div className="highlight-meta">
                  <span>{item.year}</span>
                  <p>{item.stack}</p>
                </div>
                <div className="highlight-body">
                  <h3>{item.title}</h3>
                  <p className="highlight-subtitle">{item.subtitle}</p>
                  <p className="highlight-impact">{item.impact}</p>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" {...sectionMotion}>
          <SectionHeading index="03" kicker="Timeline" title="工作与教育时间线" />
          <div className="timeline">
            {timeline.map((item) => (
              <article key={item.period + item.title} className="timeline-item">
                <span className="timeline-period">{item.period}</span>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="section contact-section" {...sectionMotion}>
          <SectionHeading index="04" kicker="Contact" title="保持联系" />
          <div className="contact-card">
            <div>
              <p className="contact-lead">
                如果你正在寻找一位能独立承担复杂业务、多端交付、性能优化，并能将 AI 工具真正用于研发提效的前端工程师，欢迎和我聊聊。
              </p>
              <p className="contact-meta">
                Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <p className="contact-meta">Phone: {profile.phone}</p>
            </div>
            <a href={`mailto:${profile.email}`} className="button button-primary">
              发起联系
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;
