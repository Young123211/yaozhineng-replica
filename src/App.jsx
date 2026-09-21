import {
  useEffect,
  useRef,
  useState,
} from 'react'

import './App.css'

import LoginPage from './LoginPage'
import AgentPage from './AgentPage'
import DemoPage from './DemoPage'


const FEATURE_DURATION = 8000


const features = [
  {
    icon: '🧬',

    tab:
      '成药性分析与 ADMET 预测',

    title1:
      '成药性分析',

    title2:
      '与ADMET预测',

    description:
      '支持上传分子结构或输入 SMILES 串，一键完成多维度成药性评估，精准预测 ADMET 性质，为后续优化提供可靠依据。',

    tags: [
      '分子结构解析',
      '多维度成药性评估',
      'ADMET 性质预测',
    ],

    button:
      '开始生成',
  },

  {
    icon: '💊',

    tab:
      '成药性智能优化与路径推荐',

    title1:
      '成药性',

    title2:
      '智能优化与路径推荐',

    description:
      '针对现有分子，智能识别代谢稳定性、肝毒性等关键成药性缺陷，提出针对性的优化策略与改造路径，实现多指标协同优化。',

    tags: [
      '细粒度解析',
      '可解释优化策略',
      '多指标协同优化',
    ],

    button:
      '开始优化',
  },

  {
    icon: '🔬',

    tab:
      '面向靶点 / 先导化合物的智能分子生成',

    title1:
      '面向靶点 / 先导化合物的',

    title2:
      '智能分子生成',

    description:
      '支持基于现有分子的衍生物生成，也可直接输入靶点 ID/PDB结构，输出兼具高亲和力与成药性的全新候选分子。',

    tags: [
      '先导物衍生生成',
      '靶点驱动设计',
      '成药性优先筛选',
    ],

    button:
      '开始分析',
  },
]


function App() {

  /* =========================
     三大核心能力
     ========================= */

  const [
    activeFeature,
    setActiveFeature,
  ] = useState(0)


  /*
    用来强制重新播放蓝色进度条动画

    每次：
    1. 自动切换
    2. 用户手动点击

    都让它 +1
  */

  const [
    featureCycle,
    setFeatureCycle,
  ] = useState(0)


  /* =========================
     当前页面
     ========================= */

  const [
    page,
    setPage,
  ] = useState('home')


  /* =========================
     登录状态
     ========================= */

  const [
    loggedIn,
    setLoggedIn,
  ] = useState(
    localStorage.getItem(
      'yaozhineng-login'
    ) === 'true'
  )


  /* =========================
     核心功能区域
     ========================= */

  const featureRef =
    useRef(null)


  /* =========================
     自动切换

     固定顺序：

     0 ADMET
     ↓
     1 路径推荐
     ↓
     2 分子生成
     ↓
     0 ADMET
     ========================= */

  useEffect(() => {

    if (page !== 'home') {
      return
    }

    const timer = setTimeout(() => {

      setActiveFeature(
        (currentFeature) =>
          (
            currentFeature + 1
          ) %
          features.length
      )

      setFeatureCycle(
        (current) =>
          current + 1
      )

    }, FEATURE_DURATION)


    return () => {
      clearTimeout(timer)
    }

  }, [
    page,
    activeFeature,
    featureCycle,
  ])


  /* =========================
     滚动到三大核心能力
     ========================= */

  const scrollToFeatures =
    () => {

      featureRef.current
        ?.scrollIntoView({
          behavior: 'smooth',
        })
    }


  /* =========================
     用户手动点击某个 Tab
     ========================= */

  const handleFeatureClick =
    (index) => {

      /*
        切到用户点击的功能
      */

      setActiveFeature(index)


      /*
        即使用户点击当前正在显示的 Tab，
        也重新播放蓝条
      */

      setFeatureCycle(
        (current) =>
          current + 1
      )
    }


  /* =========================
     开始使用
     ========================= */

  const handleStart =
    () => {

      if (loggedIn) {

        setPage('agent')

      } else {

        setPage('login')

      }
    }


  /* =========================
     登录
     ========================= */

  const handleLogin =
    () => {

      localStorage.setItem(
        'yaozhineng-login',
        'true'
      )

      setLoggedIn(true)

      setPage('agent')
    }


  /* =========================
     退出登录
     ========================= */

  const handleLogout =
    () => {

      localStorage.removeItem(
        'yaozhineng-login'
      )

      localStorage.removeItem(
        'yaozhineng-current-user'
      )

      setLoggedIn(false)

      setPage('login')
    }


  /* =========================
     当前展示内容
     ========================= */

  const feature =
    features[activeFeature]


  /* =========================
     登录页
     ========================= */

  if (page === 'login') {

    return (

      <LoginPage

        onLogin={
          handleLogin
        }

        onBack={() =>
          setPage('home')
        }

      />

    )
  }


  /* =========================
     Agent
     ========================= */

  if (page === 'agent') {

    return (

      <AgentPage

        onLogout={
          handleLogout
        }

      />

    )
  }


  /* =========================
     演示页面
     ========================= */

  if (page === 'demo') {

    return (

      <DemoPage

        onClose={() =>
          setPage('home')
        }

      />

    )
  }


  /* =========================
     首页
     ========================= */

  return (

    <div className="app">


      {/* =====================
          顶部导航
      ====================== */}

      <header className="navbar">

        <div className="brand">

          <div className="logo-box">
            <img
              src={`${import.meta.env.BASE_URL}yaozhineng-logo.png`}
              alt="药智能"
            />
          </div>

          <div className="brand-name">

            药

            <span>
              智能
            </span>

          </div>

        </div>


        <div className="nav-right">

          <button
            className="nav-text"

            onClick={
              scrollToFeatures
            }
          >
            核心功能
          </button>


          <button
            className="nav-start"

            onClick={
              handleStart
            }
          >
            ▷&nbsp; 开始使用
          </button>

        </div>

      </header>



      {/* =====================
          首页首屏
      ====================== */}

      <section className="hero">


        {/* 左侧装饰 */}

        <div className="molecule molecule-left">

          <div className="ball large"></div>

          <div className="ball medium"></div>

          <div className="ball small"></div>

        </div>



        {/* 右上胶囊 */}

        <div className="capsule-decoration">

          <span className="capsule-half"></span>

          <span className="capsule-half second"></span>

          <span className="dot dot1"></span>

          <span className="dot dot2"></span>

          <span className="dot dot3"></span>

        </div>



        {/* 首页中间 */}

        <div className="hero-content">

          <div className="hero-badge">

            <span>
              ◈
            </span>

            AI驱动的成药性优化

          </div>


          <h1>

            成药性优化

            <span>
              智能体
            </span>

          </h1>


          <p>
            构建成药性优化知识库，以智能体一体化模式赋能先导化合物高效优化
          </p>



          {/* 三个按钮 */}

          <div className="hero-buttons">

            <button
              className="primary-btn"

              onClick={
                handleStart
              }
            >
              立即开始
            </button>


            <button
              className="secondary-btn"

              onClick={
                scrollToFeatures
              }
            >
              探索功能
            </button>


            <button
              className="secondary-btn"

              onClick={() =>
                setPage('demo')
              }
            >
              查看演示
            </button>

          </div>



          {/* 向下探索 */}

          <button
            className="down-button"

            onClick={
              scrollToFeatures
            }
          >

            <span>
              向下探索
            </span>

            <b>
              ⌄
            </b>

          </button>

        </div>



        {/* 左下分子 */}

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



      {/* =====================
          三大核心能力
      ====================== */}

      <section
        className="features-section"

        ref={
          featureRef
        }
      >


        <div className="section-title">

          <h2>
            三大核心能力
          </h2>

          <p>
            覆盖从分子生成到成药性评估的全链路，让药物研发更快、更准、更智能
          </p>

        </div>



        <div className="feature-panel">


          {/* =================
              三个 Tab
          ================== */}

          <div className="tabs">

            {features.map(
              (
                item,
                index
              ) => (

                <button
                  key={
                    item.tab
                  }

                  className={`tab ${
                    activeFeature ===
                    index
                      ? 'active'
                      : ''
                  }`}

                  onClick={() =>
                    handleFeatureClick(
                      index
                    )
                  }
                >


                  <span className="tab-icon">

                    {
                      item.icon
                    }

                  </span>


                  <span>

                    {
                      item.tab
                    }

                  </span>



                  {/* 蓝色进度条 */}

                  {activeFeature ===
                    index && (

                    <span
                      className="tab-progress-track"
                    >

                      <span
                        key={`${activeFeature}-${featureCycle}`}

                        className="tab-progress-fill"

                        style={{
                          animationDuration:
                            `${FEATURE_DURATION}ms`,
                        }}
                      />

                    </span>

                  )}

                </button>

              )
            )}

          </div>



          {/* =================
              当前功能内容
          ================== */}

          <div className="feature-content">


            <div className="big-icon">

              {
                feature.icon
              }

            </div>


            <h3>

              {
                feature.title1
              }

              {' '}

              <span>

                {
                  feature.title2
                }

              </span>

            </h3>


            <p>

              {
                feature.description
              }

            </p>



            {/* 标签 */}

            <div className="tag-list">

              {feature.tags.map(
                (
                  tag,
                  index
                ) => (

                  <div
                    className="tag"

                    key={
                      tag
                    }
                  >

                    <span
                      className={`tag-dot dot-color-${index}`}
                    >
                    </span>

                    {
                      tag
                    }

                  </div>

                )
              )}

            </div>



            {/* 功能按钮 */}

            <button
              className="feature-button"

              onClick={
                handleStart
              }
            >

              {
                feature.button
              }

              <span>
                →
              </span>

            </button>

          </div>

        </div>



        {/* =====================
            Footer
        ====================== */}

        <footer>

          <span className="footer-logo">
            药智能
          </span>

          <span>
            © 2026 药智能 · 成药性优化智能体 · 暨南大学生物活性分子与成药性优化全国重点实验室 All rights reserved.
          </span>

          <a
            href="https://beian.miit.gov.cn/#/Integrated/index"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-record"
          >
            粤ICP备2026026873号-2
          </a>

        </footer>

      </section>

    </div>
  )
}


export default App