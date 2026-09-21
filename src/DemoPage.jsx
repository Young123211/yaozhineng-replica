import { useState } from 'react'

const steps = [
  {
    label: 'STEP 01',
    title: '用户输入 · 任务初始化',
    desc: '用户提交分子结构图和具体优化需求。系统调用 DECIMER 和 RDKit 工具将分子图像识别转换为 SMILES 字符串，随后启动完整优化流程。',
  },
  {
    label: 'STEP 02',
    title: 'ADMET 性质预测',
    desc: '全面预测成药性，涵盖吸收(A)、分布(D)、代谢(M)、排泄(E)、毒性(T)，建立优化基准。',
  },
  {
    label: 'STEP 03',
    title: '相似分子检索与 RAG 生成',
    desc: '通过三层检索漏斗定位结构最相近的候选分子，并结合文献知识库与大模型生成优化路线。',
  },
  {
    label: 'STEP 04',
    title: 'AI 智能优化路线与合成验证',
    desc: 'AI 生成多条优化路线，每条包含结构修改策略、优化后分子与合成可行性评估。',
  },
  {
    label: 'STEP 05',
    title: '综合 ADMET 评分',
    desc: '根据吸收、分布、代谢、排泄和毒性进行多维加权评分，并对高风险候选分子进行筛除。',
  },
  {
    label: 'OUTPUT',
    title: '最终候选分子',
    desc: '输出经过层层筛选的优化策略和候选分子方案，为后续药物化学研究提供参考。',
  },
]

function DemoPage({ onClose }) {
  const [step, setStep] = useState(0)

  const next = () => {
    setStep((old) =>
      Math.min(old + 1, steps.length - 1)
    )
  }

  const prev = () => {
    setStep((old) =>
      Math.max(old - 1, 0)
    )
  }

  return (
    <div className="demo-page">
      <aside className="demo-sidebar">
        <div className="demo-step-label">
          {steps[step].label}
        </div>

        <h1>{steps[step].title}</h1>

        <p>{steps[step].desc}</p>

        <div className="demo-tags">
          {step === 0 && (
            <>
              <span>INPUT</span>
              <span>DECIMER</span>
              <span>RDKit</span>
              <span>Image→SMILES</span>
            </>
          )}

          {step === 1 && (
            <>
              <span>Absorption</span>
              <span>Distribution</span>
              <span>Metabolism</span>
              <span>Excretion</span>
              <span>Toxicity</span>
            </>
          )}

          {step === 2 && (
            <>
              <span>Murcko</span>
              <span>MCS</span>
              <span>Tanimoto</span>
              <span>RAG</span>
              <span>LLM</span>
            </>
          )}

          {step === 3 && (
            <>
              <span>策略对齐</span>
              <span>合成难度</span>
              <span>结构优化</span>
            </>
          )}

          {step === 4 && (
            <>
              <span>Geometric Mean</span>
              <span>Weighted</span>
              <span>Veto hERG/AMES</span>
            </>
          )}

          {step === 5 && (
            <>
              <span>Top Ranking</span>
              <span>Synthesis Path</span>
              <span>ADMET Δ</span>
            </>
          )}
        </div>
      </aside>

      <main className="demo-main">
        <button
          className="demo-close"
          onClick={onClose}
        >
          ×
        </button>

        {step === 0 && <StepOne />}
        {step === 1 && <StepTwo />}
        {step === 2 && <StepThree />}
        {step === 3 && <StepFour />}
        {step === 4 && <StepFive />}
        {step === 5 && <StepOutput />}

        <div className="demo-navigation">
          <button
            onClick={prev}
            disabled={step === 0}
          >
            ←
          </button>

          <div className="demo-dots">
            {steps.map((item, index) => (
              <button
                key={item.label}
                className={
                  index <= step
                    ? 'demo-dot active'
                    : 'demo-dot'
                }
                onClick={() =>
                  setStep(index)
                }
              >
                {index === step && (
                  <span>
                    {String(
                      index + 1
                    ).padStart(2, '0')}
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={next}
            disabled={
              step ===
              steps.length - 1
            }
          >
            →
          </button>
        </div>
      </main>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 className="demo-section-title">
      {children}
    </h2>
  )
}

function DataCard({ value, label }) {
  return (
    <div className="demo-data-card">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  )
}

function StepOne() {
  return (
    <div className="demo-content">
      <SectionTitle>
        🟢 用户输入
      </SectionTitle>

      <div className="two-column">
        <div className="demo-white-card">
          <span>用户上传分子图像</span>

          <div className="fake-molecule">
            ⌬—NH—⌬
          </div>
        </div>

        <div className="demo-white-card">
          <span>用户优化需求</span>

          <div className="request-box">
            “请改善代谢稳定性并降低肝毒性风险”
          </div>
        </div>
      </div>

      <SectionTitle>
        🔵 分子图像识别
      </SectionTitle>

      <div className="recognition-row">
        <div className="demo-white-card">
          <div className="fake-molecule large">
            ⌬—NH—⌬
          </div>
        </div>

        <div className="arrow">
          →
        </div>

        <div className="demo-white-card green-border">
          <span>SMILES 字符串</span>

          <code>
            CS(=O)(=O)C1=CC=C(C=C1)C2=C(C3=CC=CC=C3)C(=O)OC2
          </code>
        </div>
      </div>

      <SectionTitle>
        🟣 计算基础性质
      </SectionTitle>

      <div className="demo-grid four">
        <DataCard
          value="314.36"
          label="分子量 (MW)"
        />

        <DataCard
          value="C17H14O4S"
          label="分子式"
        />

        <DataCard
          value="2.56"
          label="LogP"
        />

        <DataCard
          value="2.12"
          label="合成难度 (SA)"
        />

        <DataCard
          value="60.44"
          label="TPSA"
        />

        <DataCard
          value="0 / 4"
          label="HBD / HBA"
        />

        <DataCard
          value="3"
          label="可旋转键"
        />

        <DataCard
          value="22"
          label="重原子数"
        />
      </div>
    </div>
  )
}

function StepTwo() {
  const groups = [
    {
      name: '吸收 Absorption',
      values: [
        ['0.996', '人体肠道吸收率'],
        ['-4.41', 'Caco-2通透性'],
        ['0.841', '口服生物利用度'],
        ['-4.43', '水溶性 LogS'],
      ],
    },
    {
      name: '分布 Distribution',
      values: [
        ['0.301', 'P-糖蛋白底物'],
        ['0.761', '血脑屏障通透'],
        ['91.19', '血浆蛋白结合率'],
        ['0.776', '稳态分布容积'],
      ],
    },
    {
      name: '代谢 Metabolism',
      values: [
        ['0.016', 'CYP2D6 抑制'],
        ['0.251', 'CYP3A4 抑制'],
        ['0.268', 'CYP2C9 抑制'],
      ],
    },
    {
      name: '排泄 Excretion',
      values: [
        ['21.54', '半衰期 (h)'],
        ['21.05', '微粒体清除率'],
        ['45.44', '肝细胞清除率'],
      ],
    },
    {
      name: '毒性 Toxicity',
      values: [
        ['0.137', 'hERG 心脏毒性'],
        ['0.039', 'AMES 致突变性'],
        ['0.969', '肝损伤风险'],
        ['2.12', '急性毒性 LD50'],
      ],
    },
  ]

  return (
    <div className="demo-content">
      {groups.map((group) => (
        <div
          className="admet-demo-group"
          key={group.name}
        >
          <SectionTitle>
            {group.name}
          </SectionTitle>

          <div className="demo-grid four">
            {group.values.map(
              ([value, label]) => (
                <DataCard
                  key={label}
                  value={value}
                  label={label}
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function StepThree() {
  return (
    <div className="demo-content">
      <SectionTitle>
        🟢 三层检索漏斗 · 定位相似分子
      </SectionTitle>

      <div className="funnel">
        <div>Layer 1 · Murcko 骨架精确匹配</div>
        <span>↓</span>
        <div>Layer 2 · MCS 最大公共子结构 &gt; 60%</div>
        <span>↓</span>
        <div>Layer 3 · Morgan FP Tanimoto 兜底</div>
      </div>

      <div className="demo-white-card">
        ✓ Murcko 匹配：12 hits → MCS 补充：+8 →
        Tanimoto 兜底：+5
        <br />
        ✓ 筛选 Top 5 相似分子，作为 RAG 检索锚点
      </div>

      <SectionTitle>
        🟣 RAG 检索增强 · 文献知识库
      </SectionTitle>

      <div className="code-box">
        RAG.retrieve("摘要知识库") → 23 hits
        <br />
        RAG.retrieve("多步反应链路知识库") → 14 hits
        <br />
        semantic_rank(user_goal) → top 5 strategies
      </div>

      <SectionTitle>
        🟢 LLM 融合生成 · 优化路线
      </SectionTitle>

      <div className="code-box">
        ✓ 路线 1：苯磺酰基苯环对位引入 F
        <br />
        ✓ 路线 2：末端苯环对位引入 F
        <br />
        ✓ 路线 3：苯磺酰基间位引入 F
      </div>
    </div>
  )
}

function StepFour() {
  return (
    <div className="demo-content">
      {[1, 2, 3].map((route) => (
        <div
          className="route-card"
          key={route}
        >
          <div className="route-title">
            路线 {route} · 结构优化
          </div>

          <p>
            基于文献知识和成药性预测结果，对目标分子进行结构修饰，
            改善代谢稳定性并降低潜在毒性风险。
          </p>

          <div className="route-molecules">
            <div>
              <span>优化前</span>
              <div className="fake-molecule">
                ⌬—SO₂—⌬
              </div>
            </div>

            <b>→</b>

            <div className="green-border">
              <span>优化后</span>
              <div className="fake-molecule">
                F—⌬—SO₂—⌬
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function StepFive() {
  return (
    <div className="demo-content">
      <SectionTitle>
        🔵 维度权重分配
      </SectionTitle>

      <div className="weight-bar">
        <span>吸收 0.20</span>
        <span>分布 0.10</span>
        <span>代谢 0.20</span>
        <span>排泄 0.05</span>
        <span>毒性 0.45</span>
      </div>

      <SectionTitle>
        🔴 一票否决机制
      </SectionTitle>

      <div className="veto-grid">
        <div>
          <b>hERG</b>
          <span>
            心脏毒性超过阈值 → 直接剔除
          </span>
        </div>

        <div>
          <b>AMES</b>
          <span>
            致突变性超过阈值 → 直接剔除
          </span>
        </div>
      </div>

      <SectionTitle>
        🟢 加权几何平均公式
      </SectionTitle>

      <div className="code-box">
        // Weighted Geometric Mean
        <br />
        Score =
        A^0.20 × D^0.10 × M^0.20 × E^0.05 × T^0.45
        <br />
        <br />
        // hERG &gt; threshold || AMES &gt; threshold → VETO
      </div>
    </div>
  )
}

function StepOutput() {
  const routes = [
    ['Route 2', '0.683'],
    ['Route 1', '0.650'],
    ['Route 3', '0.643'],
  ]

  return (
    <div className="demo-content">
      <SectionTitle>
        🏆 最终候选分子评分 (Top Ranking)
      </SectionTitle>

      {routes.map(
        ([route, score], index) => (
          <div
            className={`ranking-card ${
              index === 0
                ? 'winner'
                : ''
            }`}
            key={route}
          >
            <span>{route}</span>

            <div>
              <code>
                CS(=O)(=O)C1=CC=C(C=C1)C2=C(...)
              </code>

              <p>
                MW 332.35 · LogP 2.70 · SA 2.20
              </p>
            </div>

            <strong>{score}</strong>
          </div>
        )
      )}

      <div className="finished-box">
        ✓ 优化完成 — merged to main
        <br />
        共生成 3 条可参考优化路线，供药物化学家决策参考
      </div>
    </div>
  )
}

export default DemoPage