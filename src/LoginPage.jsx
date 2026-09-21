function LoginPage({ onLogin, onBack }) {
  return (
    <div className="login-page">
      <section className="login-left">
        <button className="back-home-btn" onClick={onBack}>
          ← 返回首页
        </button>

        <div className="login-top-brand">
          <div className="login-mini-logo">AI</div>

          <div>
            <h3>成药性优化智能体</h3>
            <p>成药性分析与优化</p>
          </div>
        </div>

        <div className="login-card">
          <div className="login-main-logo">AI</div>

          <h1>成药性优化智能体</h1>

          <p className="login-en">
            AI-Powered Molecular Druggability Optimization
          </p>

          <div className="login-form">
            <label>用户名</label>

            <input
              type="text"
              placeholder="请输入用户名（2-50字符）"
            />

            <label>密码</label>

            <input
              type="password"
              placeholder="请输入密码（至少4位）"
            />

            <button onClick={onLogin}>
              登 录
            </button>
          </div>

          <div className="register-line">
            还没有账号？
            <span>立即注册</span>
          </div>
        </div>

        <div className="login-record">
          粤ICP备2026026873号-2
        </div>
      </section>

      <section className="login-right">
        <div className="login-right-content">
          <h1>成药性优化智能体</h1>

          <p>
            围绕先导化合物成药性分析、结构优化与靶点研究，
            提供一体化智能辅助。
          </p>
        </div>
      </section>
    </div>
  )
}

export default LoginPage