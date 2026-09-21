import { useEffect, useRef, useState } from 'react'

const quickTasks = [
  '请对这个分子结构进行成药性优化',
  '请改善这个分子的代谢稳定性并降低肝毒性',
  '请面向靶点PDB 8flm生成优质候选分子',
]

const featureCards = [
  {
    title: '上传分子结构图进行成药性优化',
    desc: '上传化合物结构图，一站式开展成药性多维度综合优化',
    tag: '@ADMET综合指标优化',
  },
  {
    title: '输入SMILES串进行单项成药性优化',
    desc: '输入SMILES串，精准开展指定成药性指标专项优化',
    tag: '@ADMET单项指标优化',
  },
  {
    title: '基于靶点结构进行亲和力和成药性多目标优化',
    desc: '围绕药物靶点，同步实现分子亲和力与成药性多目标优化',
    tag: '@靶点-配体亲和力与ADMET同步优化',
  },
]

function createConversationTitle(text = '') {
  const cleanText = text
    .trim()
    .replace(/\s+/g, ' ')

  if (!cleanText) {
    return '新对话'
  }

  // 提取第一句话
  const firstSentence =
    cleanText
      .split(/[。！？!?；;\n]/)[0]
      .trim()

  const title =
    firstSentence || cleanText

  // 最多显示前 12 个字符
  if (title.length > 12) {
    return title.slice(0, 12) + '…'
  }

  return title
}

function AgentPage({ onLogout }) {
  const currentUser =
    localStorage.getItem('yaozhineng-current-user') ||
    '未登录用户'

  const [conversations, setConversations] = useState([])
  
  const [activeConversationId, setActiveConversationId] = useState(null)

  const [input, setInput] = useState('')
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const [accountOpen, setAccountOpen] = useState(false)

  const [deleteId, setDeleteId] = useState(null)

  const fileInputRef = useRef(null)

  const accountWrapperRef =
    useRef(null)

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      accountOpen &&
      accountWrapperRef.current &&
      !accountWrapperRef.current.contains(
        event.target
      )
    ) {
      setAccountOpen(false)
    }
  }

  document.addEventListener(
    'mousedown',
    handleClickOutside
  )

  return () => {
    document.removeEventListener(
      'mousedown',
      handleClickOutside
    )
  }
}, [accountOpen])

  // 当前正在看的对话
  const activeConversation = conversations.find(
    (item) => item.id === activeConversationId
  )

  const messages = activeConversation?.messages || []

  // 新建对话
  const newConversation = () => {
    const id = Date.now()

    const newChat = {
  id,
  title: '新对话',
  messages: [],
  }

    setConversations((old) => [
      newChat,
      ...old,
    ])

    setActiveConversationId(id)

    setInput('')
    setPreview(null)
    setLoading(false)
  }

  // 上传图片
  const handleUpload = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    const url = URL.createObjectURL(file)

    setPreview(url)
  }

  // 删除待上传图片
  const removePreview = () => {
    setPreview(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // 给某个对话添加消息
  const addMessage = (
    conversationId,
    message
  ) => {
    setConversations((old) =>
      old.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,

              messages: [
                ...conversation.messages,
                message,
              ],
            }
          : conversation
      )
    )
  }

  // 发送消息
  const sendMessage = (customText) => {
    const text =
      typeof customText === 'string'
        ? customText
        : input

    if (!text.trim() && !preview) {
      return
    }

    const userMessage = {
      role: 'user',

      text:
        text ||
        '请对这个分子结构进行成药性优化',

      image: preview,
    }

    let conversationId =
      activeConversationId

    // 如果目前没有任何对话
    // 自动创建一个
    if (!conversationId) {
      conversationId = Date.now()

      const title =
        createConversationTitle(text)

      setConversations((old) => [
        {
          id: conversationId,
          title,
          messages: [userMessage],
        },
        ...old,
      ])

      setActiveConversationId(
        conversationId
      )
    } else {
      // 给当前对话增加用户消息
      setConversations((old) =>
        old.map((conversation) => {
          if (
            conversation.id !==
            conversationId
          ) {
            return conversation
          }

          // 第一条消息自动作为对话名称
          let newTitle =
            conversation.title

          if (conversation.messages.length === 0) {
            newTitle =
              createConversationTitle(text)
          }

          return {
            ...conversation,

            title: newTitle,

            messages: [
              ...conversation.messages,
              userMessage,
            ],
          }
        })
      )
    }

    setInput('')
    setPreview(null)
    setLoading(true)

    // 模拟 AI 思考
    setTimeout(() => {
      setLoading(false)

      addMessage(
        conversationId,
        {
          role: 'assistant',
          type: 'result',
        }
      )
    }, 1300)
  }

  // 三个快捷任务
  const runQuickTask = (index) => {
    if (index === 0) {
      sendMessage(
        '请对这个分子结构进行成药性优化'
      )
    }

    if (index === 1) {
      sendMessage(
        'SMILES: Cc1ccc(NC(=O)c2cn[nH]c2)cc1，请改善代谢稳定性并降低肝毒性风险。'
      )
    }

    if (index === 2) {
      sendMessage(
        '请基于PDB 8flm生成一些候选化合物'
      )
    }
  }

  // 点击某个历史对话
  const selectConversation = (id) => {
    setActiveConversationId(id)

    setInput('')
    setPreview(null)
    setLoading(false)
  }

  // 打开删除确认框
  const askDeleteConversation = (
    event,
    id
  ) => {
    event.stopPropagation()

    setDeleteId(id)
  }

  // 真正删除
  const confirmDeleteConversation = () => {
    const remaining =
      conversations.filter(
        (item) =>
          item.id !== deleteId
      )

    setConversations(remaining)

    // 删除的刚好是当前对话
    if (
      deleteId ===
      activeConversationId
    ) {
      setActiveConversationId(
        remaining[0]?.id || null
      )
    }

    setDeleteId(null)
  }

  return (
    <div className="agent-page">

      {/* =====================
          左侧栏
      ====================== */}

      <aside className="agent-sidebar">

        <div className="agent-brand">

          <div className="agent-small-logo">
            <img
              src={`${import.meta.env.BASE_URL}yaozhineng-logo.png`}
              alt="药智能"
            />
          </div>

          <div>
            <h3>
              成药性优化智能体
            </h3>

            <p>
              成药性分析与优化
            </p>
          </div>

        </div>

        <button
          className="new-chat"
          onClick={newConversation}
        >
          ＋ 新建对话
        </button>

        <div className="conversation-header">

          <span>
            对话列表
          </span>

          <b>
            {conversations.length}
          </b>

        </div>


        {/* 对话列表 */}

        <div className="conversation-area">

          {conversations.length === 0 ? (

            <div className="no-conversation">
              暂无对话记录
            </div>

          ) : (

            conversations.map(
              (conversation) => (

                <div
                  key={conversation.id}

                  className={`conversation-row ${
                    activeConversationId ===
                    conversation.id
                      ? 'conversation-active'
                      : ''
                  }`}

                  onClick={() =>
                    selectConversation(
                      conversation.id
                    )
                  }
                >

                  

                  <span className="conversation-name">
                    {conversation.title}
                  </span>

                  <button
                    className="conversation-delete"

                    onClick={(event) =>
                      askDeleteConversation(
                        event,
                        conversation.id
                      )
                    }
                  >
                    🗑
                  </button>

                </div>
              )
            )
          )}

        </div>


        {/* =====================
            左下角账户
        ====================== */}

        <div
          className="account-wrapper"
          ref={accountWrapperRef}
        >

          {accountOpen && (

            <div className="account-popup">

              <div className="account-popup-header">

                <div className="account-avatar big">
                  1
                </div>

                <div>

                  <b>
                    {currentUser}
                  </b>

                  <span>
                    账号中心
                  </span>

                </div>

              </div>

              <div className="account-popup-line"></div>

              <button
                className="logout-button"
                onClick={onLogout}
              >
                ↪　退出登录
              </button>

            </div>
          )}


          <div className="account-box">

            <div className="account-avatar">
              1
            </div>

            <div className="account-info">

              <b>
                {currentUser}
              </b>

              <span>
                账号中心
              </span>

            </div>

            <button
              className="account-more"
              onClick={() =>
                setAccountOpen(
                  !accountOpen
                )
              }
            >
              •••
            </button>

          </div>

        </div>

      </aside>


      {/* =====================
          右侧主区域
      ====================== */}

      <main className="agent-main">

        {messages.length === 0 &&
        !loading ? (

          <div className="agent-home">

            <h1>
              成药性优化智能体
            </h1>

            <p className="agent-subtitle">
              上传化合物结构图或输入SMILES，
              快速获得候选分子和成药性优化方案
            </p>


            {/* 快捷任务 */}

            <div className="quick-tasks">

              {quickTasks.map(
                (task, index) => (

                  <button
                    key={task}

                    onClick={() =>
                      runQuickTask(index)
                    }
                  >
                    {task}
                  </button>

                )
              )}

            </div>


            {/* 功能卡 */}

            <div className="agent-feature-grid">
              {featureCards.map((card, index) => (
               <button
                  className="agent-feature-card"
                  key={card.title}
                  onClick={() =>
                   runQuickTask(index)
                  }
                >
                  <div className="feature-card-book">
                    📘
                  </div>

                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <span>{card.tag}</span>

                  
                </button>
                 ))}
              </div>

          </div>

        ) : (

          <div className="chat-area">

            {messages.map(
              (message, index) => (

                <div
                  key={index}

                  className={`message ${
                    message.role
                  }`}
                >

                  {message.role ===
                  'user' ? (

                    <div className="user-message">

                      <div>

                        <b>
                          用户
                        </b>

                        {message.image && (

                          <img
                            src={
                              message.image
                            }
                            alt="uploaded"
                          />

                        )}

                        <p>
                          {message.text}
                        </p>

                      </div>

                      <span className="message-avatar">
                        U
                      </span>

                    </div>

                  ) : (

                    <AgentResult />

                  )}

                </div>

              )
            )}


            {loading && (

              <div className="thinking-box">

                <span className="loader"></span>

                <b>
                  深度思考与分析中...
                </b>

                <span>
                  展开
                </span>

              </div>

            )}

          </div>

        )}


        {/* =====================
            输入框
        ====================== */}


        
        <div className="composer-wrapper">

          {preview && (

            <div className="upload-preview">

              <img
                src={preview}
                alt="preview"
              />

              <button
                onClick={removePreview}
              >
                ×
              </button>

            </div>

          )}

          <div className="composer">

            <button
              className="upload-button"

              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              ⊞
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleUpload}
            />

            <input
              className="message-input"

              placeholder="上传分子图像或靶点 PDB，输入 SMILES / 靶点 ID，或直接描述需求"

              value={input}

              onChange={(event) =>
                setInput(
                  event.target.value
                )
              }

              onKeyDown={(event) => {

                if (
                  event.key ===
                  'Enter'
                ) {
                  sendMessage()
                }

              }}
            />

            <button
              className="send-button"

              onClick={() =>
                sendMessage()
              }
            >
              ➤
            </button>

          </div>

        </div>

      </main>


      {/* =====================
          删除确认弹窗
      ====================== */}

      {deleteId && (

        <div className="delete-modal-mask">

          <div className="delete-modal">

            <h2>
              删除当前对话?
            </h2>

            <p>
              删除后将无法恢复该会话的消息记录和分析结果。
              此操作只会影响当前选中的一条对话。
            </p>

            <div className="delete-modal-actions">

              <button
                className="cancel-delete"

                onClick={() =>
                  setDeleteId(null)
                }
              >
                取消
              </button>

              <button
                className="confirm-delete"

                onClick={
                  confirmDeleteConversation
                }
              >
                删除
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

function AgentResult() {
  return (
    <div className="assistant-result">
      <div className="assistant-title">
        <div className="result-logo">
          AI
        </div>

        <div>
          <b>智能体</b>

          <p>
            已完成初步成药性分析，
            并生成优化建议。
          </p>
        </div>
      </div>

      <section className="result-card">
        <h2>
          🧬 初始分子
          (Input Molecule)
        </h2>

        <div className="smiles-box">
          Cc1ccc(NC(=O)c2cn[nH]c2)cc1
        </div>
      </section>

      <section className="result-card">
        <h2>
          🔬 初始分子基础性质
        </h2>

        <div className="property-grid">
          <Property
            title="分子量"
            value="201.23"
          />

          <Property
            title="分子式"
            value="C11H11N3O"
          />

          <Property
            title="脂水分配系数 (LogP)"
            value="1.97"
          />

          <Property
            title="合成难度 (SA)"
            value="1.86"
          />

          <Property
            title="拓扑极性表面积 (TPSA)"
            value="57.78"
          />

          <Property
            title="氢键供体数量"
            value="2.00"
          />

          <Property
            title="氢键受体数量"
            value="2.00"
          />

          <Property
            title="可旋转键数量"
            value="2.00"
          />
        </div>
      </section>

      <section className="result-card">
        <h2>
          🧬 初始分子 ADMET 预测
        </h2>

        <div className="admet-section blue">
          <h3>
            ● 吸收 (Absorption)
          </h3>

          <div className="admet-grid">
            <Property
              title="人体肠道吸收率"
              value="1.000"
            />

            <Property
              title="Caco-2 通透性"
              value="-4.79"
            />

            <Property
              title="口服生物利用度"
              value="0.923"
            />

            <Property
              title="水溶性 (LogS)"
              value="-3.61"
            />
          </div>
        </div>

        <div className="admet-section purple">
          <h3>
            ● 分布 (Distribution)
          </h3>

          <div className="admet-grid">
            <Property
              title="P-糖蛋白底物"
              value="0.047"
            />

            <Property
              title="血脑屏障通透"
              value="0.696"
            />

            <Property
              title="血浆蛋白结合率"
              value="84.46"
            />
          </div>
        </div>

        <div className="admet-section red">
          <h3>
            ● 毒性 (Toxicity)
          </h3>

          <div className="admet-grid">
            <Property
              title="hERG 心脏毒性"
              value="0.175"
            />

            <Property
              title="AMES 致突变性"
              value="0.063"
            />

            <Property
              title="肝损伤风险"
              value="0.921"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function Property({
  title,
  value,
}) {
  return (
    <div className="property-card">
      <span>{title}</span>
      <b>{value}</b>
    </div>
  )
}

export default AgentPage