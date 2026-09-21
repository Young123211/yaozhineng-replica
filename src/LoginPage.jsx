import { useState } from 'react'

function LoginPage({ onLogin, onBack }) {
  const [isRegister, setIsRegister] =
    useState(false)

  const [username, setUsername] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [message, setMessage] =
    useState('')

  const [messageType, setMessageType] =
    useState('error')

  // 读取已经注册的账号
  const getUsers = () => {
    try {
      return JSON.parse(
        localStorage.getItem(
          'yaozhineng-users'
        )
      ) || []
    } catch {
      return []
    }
  }

  // 登录按钮是否可以点击
  const loginDisabled =
    username.trim() === '' ||
    password.trim() === ''

  // 注册按钮是否可以点击
  const registerDisabled =
    username.trim().length < 2 ||
    password.length < 4 ||
    confirmPassword.length < 4

  // 登录
  const handleLogin = () => {
    if (loginDisabled) return

    const users = getUsers()

    const user = users.find(
      (item) =>
        item.username ===
        username.trim()
    )

    if (!user) {
      setMessageType('error')
      setMessage(
        '该账号尚未注册，请先注册账号'
      )
      return
    }

    if (user.password !== password) {
      setMessageType('error')
      setMessage('用户名或密码错误')
      return
    }

    // 保存当前登录账号
    localStorage.setItem(
      'yaozhineng-current-user',
      user.username
    )

    setMessage('')

    onLogin()
  }

  // 注册
  const handleRegister = () => {
    if (registerDisabled) return

    if (
      password !== confirmPassword
    ) {
      setMessageType('error')
      setMessage(
        '两次输入的密码不一致'
      )
      return
    }

    const users = getUsers()

    const alreadyExists =
      users.some(
        (item) =>
          item.username ===
          username.trim()
      )

    if (alreadyExists) {
      setMessageType('error')
      setMessage(
        '该用户名已经注册，请直接登录'
      )
      return
    }

    const newUser = {
      username: username.trim(),
      password,
    }

    localStorage.setItem(
      'yaozhineng-users',
      JSON.stringify([
        ...users,
        newUser,
      ])
    )

    setMessageType('success')
    setMessage(
      '注册成功，请使用刚刚注册的账号登录'
    )

    // 注册成功后切回登录
    setIsRegister(false)

    // 保留用户名，密码重新输入
    setPassword('')
    setConfirmPassword('')
  }

  const switchToRegister = () => {
    setIsRegister(true)
    setMessage('')
    setPassword('')
    setConfirmPassword('')
  }

  const switchToLogin = () => {
    setIsRegister(false)
    setMessage('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="login-page">
      <section className="login-left">


        <button
          className="login-top-brand login-brand-home"
          onClick={onBack}
          type="button"
          aria-label="返回首页"
        >
          <div className="login-mini-logo">
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
        </button>

        <div className="login-card">

          <div className="login-main-logo">
            <img
              src={`${import.meta.env.BASE_URL}yaozhineng-logo.png`}
              alt="药智能"
            />
          </div>

          <h1>
            {isRegister
              ? '注册账号'
              : '成药性优化智能体'}
          </h1>

          <p className="login-en">
            {isRegister
              ? 'Create Your Account'
              : 'AI-Powered Molecular Druggability Optimization'}
          </p>


          <div className="login-form">

            <label>
              用户名
            </label>

            <input
              type="text"
              value={username}
              placeholder="请输入用户名（2-50字符）"

              onChange={(event) => {
                setUsername(
                  event.target.value
                )

                setMessage('')
              }}
            />


            <label>
              密码
            </label>

            <input
              type="password"
              value={password}
              placeholder="请输入密码（至少4位）"

              onChange={(event) => {
                setPassword(
                  event.target.value
                )

                setMessage('')
              }}
            />


            {isRegister && (
              <>
                <label>
                  确认密码
                </label>

                <input
                  type="password"
                  value={
                    confirmPassword
                  }
                  placeholder="请再次输入密码"

                  onChange={(
                    event
                  ) => {
                    setConfirmPassword(
                      event.target.value
                    )

                    setMessage('')
                  }}
                />
              </>
            )}


            {message && (
              <div
                className={`login-message ${messageType}`}
              >
                {message}
              </div>
            )}


            {!isRegister ? (

              <button
                className="login-submit-button"

                disabled={
                  loginDisabled
                }

                onClick={
                  handleLogin
                }
              >
                登 录
              </button>

            ) : (

              <button
                className="login-submit-button"

                disabled={
                  registerDisabled
                }

                onClick={
                  handleRegister
                }
              >
                注 册
              </button>

            )}

          </div>


          {!isRegister ? (

            <div className="register-line">
              还没有账号？

              <button
                className="register-switch"
                onClick={
                  switchToRegister
                }
              >
                立即注册
              </button>
            </div>

          ) : (

            <div className="register-line">
              已经有账号？

              <button
                className="register-switch"
                onClick={
                  switchToLogin
                }
              >
                返回登录
              </button>
            </div>

          )}

        </div>


        <div className="login-record">

          <a
            href="https://beian.miit.gov.cn/#/Integrated/index"
            target="_blank"
            rel="noopener noreferrer"
          >
            粤ICP备2026026873号-2
          </a>

        </div>

      </section>


      <section className="login-right">

        <div className="login-right-content">

          <h1>
            成药性优化智能体
          </h1>

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