
import { useRef, useState } from 'react'
import './App.css'
import LoginPage from './LoginPage'
import AgentPage from './AgentPage'
import DemoPage from './DemoPage'


const features = [
  {
    icon: '🧬',
    tab: '成药性分析与 ADMET 预测',
    title1: '成药性分析',
    title2: '与ADMET预测',
    description:
      '支持上传分子结构或输入 SMILES 串，一键完成多维度成药性评估，精准预测 ADMET 性质，为后续优化提供可靠依据。',
    tags: ['分子结构解析', '多维度成药性评估', 'ADMET 性质预测'],
    button: '开始生成',
  },
  {
    icon: '💊',
    tab: '成药性智能优化与路径推荐',
    title1: '成药性',
    title2: '智能优化与路径推荐',
    description:
      '针对现有分子，智能识别代谢稳定性、肝毒性等关键成药性缺陷，提出针对性的优化策略与改造路径，实现多指标协同优化。',
    tags: ['细粒度解析', '可解释优化策略', '多指标协同优化'],
    button: '开始优化',
  },
  {
    icon: '🔬',
    tab: '面向靶点 / 先导化合物的智能分子生成',
    title1: '面向靶点 / 先导化合物的',
    title2: '智能分子生成',
    description:
      '支持基于现有分子的衍生物生成，也可直接输入靶点 ID/PDB结构，输出兼具高亲和力与成药性的全新候选分子。',
    tags: ['先导物衍生生成', '靶点驱动设计', '成药性优先筛选'],
    button: '开始分析',
  },
]

function App() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [page, setPage] = useState('home')

  const [loggedIn, setLoggedIn] =
    useState(
      localStorage.getItem(
        'yaozhineng-login'
      ) === 'true'
    )
  const featureRef = useRef(null)

  const scrollToFeatures = () => {
    featureRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }
  const handleStart = () => {
  if (loggedIn) {
    setPage('agent')
  } else {
    setPage('login')
  }
}

const handleLogin = () => {
  localStorage.setItem(
    'yaozhineng-login',
    'true'
  )

  setLoggedIn(true)
  setPage('agent')
}

const handleLogout = () => {
  localStorage.removeItem(
    'yaozhineng-login'
  )

  setLoggedIn(false)
  setPage('home')
}
  const feature = features[activeFeature]
  if (page === 'login') {
  return (
    <LoginPage
      onLogin={handleLogin}
      onBack={() =>
        setPage('home')
      }
    />
  )
}

if (page === 'agent') {
  return (
    <AgentPage
      onLogout={handleLogout}
    />
  )
}
if (page === 'demo') {
  return (
    <DemoPage
      onClose={() => setPage('home')}
    />
  )
}

  return (
    <div className="app">
      {/* 顶部导航 */}
      <header className="navbar">
        <div className="brand">
          <div className="logo-box">AI</div>

          <div className="brand-name">
            药<span>智能</span>
          </div>
        </div>

        <div className="nav-right">
          <button className="nav-text" onClick={scrollToFeatures}>
            核心功能
          </button>

          <button className="nav-start" onClick={handleStart}>
            ▷&nbsp; 开始使用
          </button>
        </div>
      </header>

      {/* 首页首屏 */}
      <section className="hero">
        <div className="molecule molecule-left">
          <div className="ball large"></div>
          <div className="ball medium"></div>
          <div className="ball small"></div>
        </div>

        <div className="capsule-decoration">
          <span className="capsule-half"></span>
          <span className="capsule-half second"></span>
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>
          <span className="dot dot3"></span>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span>◈</span>
            AI驱动的成药性优化
          </div>

          <h1>
            成药性优化
            <span>智能体</span>
          </h1>

          <p>
            构建成药性优化知识库，以智能体一体化模式赋能先导化合物高效优化
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={handleStart}>
              立即开始
            </button>

            <button className="secondary-btn" onClick={scrollToFeatures}>
              探索功能
            </button>

            <button
              className="secondary-btn"
              onClick={() => setPage('demo')}
            >
              查看演示
            </button>
          </div>

          <button className="down-button" onClick={scrollToFeatures}>
            <span>向下探索</span>
            <b>⌄</b>
          </button>
        </div>

        <div className="molecule-bottom">
          <div className="atom a1"></div>
          <div className="atom a2"></div>
          <div className="atom a3"></div>
          <div className="atom a4"></div>
          <div className="atom center"></div>
          <span className="bond b1"></span>
          <span className="bond b2"></span>
          <span className="bond b3"></span>
          <span className="bond b4"></span>
        </div>
      </section>

      {/* 三大核心能力 */}
      <section className="features-section" ref={featureRef}>
        <div className="section-title">
          <h2>三大核心能力</h2>
          <p>覆盖从分子生成到成药性评估的全链路，让药物研发更快、更准、更智能</p>
        </div>

        <div className="feature-panel">
          <div className="tabs">
            {features.map((item, index) => (
              <button
                key={item.tab}
                className={`tab ${activeFeature === index ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <span className="tab-icon">{item.icon}</span>
                <span>{item.tab}</span>
              </button>
            ))}
          </div>

          <div className="feature-content">
            <div className="big-icon">{feature.icon}</div>

            <h3>
              {feature.title1}{' '}
              <span>{feature.title2}</span>
            </h3>

            <p>{feature.description}</p>

            <div className="tag-list">
              {feature.tags.map((tag, index) => (
                <div className="tag" key={tag}>
                  <span className={`tag-dot dot-color-${index}`}></span>
                  {tag}
                </div>
              ))}
            </div>

            <button className="feature-button" onClick={handleStart}>
              {feature.button}
              <span>→</span>
            </button>
          </div>
        </div>

        <footer>
          <span className="footer-logo">药智能</span>
          <span>
            © 2026 药智能 · 成药性优化智能体
          </span>
        </footer>
      </section>
    </div>
  )
}

export default App