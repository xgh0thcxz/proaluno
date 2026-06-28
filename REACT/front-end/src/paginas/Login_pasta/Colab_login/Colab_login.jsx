import { Link } from 'react-router-dom';
import { useColabLogin } from './CL_JS';
import s from './CL_CSS.module.css';

export default function Colab_login() {
  const {
    email, password, emailMsg, passwordMsg,
    isModalOpen, setIsModalOpen,
    recoveryEmail, recoveryMsg, showSuccess, setShowSuccess,
    particles,
    handleEmailChange, handlePasswordChange, handleRecoveryEmailChange,
    handleLoginSubmit, handleRecoverySubmit,
  } = useColabLogin();

  function closeModal() {
    setIsModalOpen(false);
    setShowSuccess(false);
  }

  return (
    <>
      {/* ── Partículas ── */}
      <div className={s.particles}>
        {particles.map((p) => (
          <div
            key={p.id}
            className={s.particle}
            style={{
              width:             p.width,
              height:            p.height,
              left:              p.left,
              animationDelay:    p.animationDelay,
              animationDuration: p.animationDuration,
            }}
          />
        ))}
      </div>

      <main className={`${s.root} ${s.loginPage}`}>

        {/* Elementos flutuantes */}
        <div className={s.floatingElements}>
          <div className={s.floatingElement} style={{ width: '80px',  height: '80px',  top: '10%',    left: '10%'  }} />
          <div className={s.floatingElement} style={{ width: '120px', height: '120px', top: '60%',    right: '10%' }} />
          <div className={s.floatingElement} style={{ width: '60px',  height: '60px',  bottom: '20%', left: '20%'  }} />
        </div>

        {/* ── Brand Panel ── */}
        <section className={s.brandPanel}>
          <div className={s.brandContent}>
            <div className={s.logoContainer}>
              <img
                src="https://i.postimg.cc/8PZ4hyLY/image.png"
                alt="Proaluno Logo"
                className={s.logo}
              />
            </div>
            <p className={s.tagline}>Educação que ouve, educação que avança</p>
          </div>
        </section>

        {/* ── Form Panel ── */}
        <section className={s.formPanel}>
          <div className={s.loginFormContainer}>
            <form className={s.loginForm} onSubmit={handleLoginSubmit} noValidate>

              <div className={s.formHeader}>
                <h1 className={s.formTitle}>Bem-vindo de volta</h1>
                <p className={s.formSubtitle}>COLABORADOR</p>
              </div>

              <p className={s.signupPrompt}>
                Novo por aqui? <Link to="/cadastro">Crie sua conta</Link>
              </p>

              {/* E-mail */}
              <div className={s.formGroup}>
                <label htmlFor="email">
                  <i className="fas fa-envelope"></i> E-mail
                </label>
                <div className={s.inputWrapper}>
                  <i className={`fas fa-envelope ${s.inputIcon}`}></i>
                  <input
                    type="email"
                    id="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className={`${s.validationMessage} ${emailMsg.type ? s[emailMsg.type] : ''}`}>
                  {emailMsg.text}
                </div>
              </div>

              {/* Senha */}
              <div className={s.formGroup}>
                <label htmlFor="password">
                  <i className="fas fa-lock"></i> Senha
                </label>
                <div className={s.inputWrapper}>
                  <i className={`fas fa-lock ${s.inputIcon}`}></i>
                  <input
                    type="password"
                    id="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className={`${s.validationMessage} ${passwordMsg.type ? s[passwordMsg.type] : ''}`}>
                  {passwordMsg.text}
                </div>
              </div>

              {/* Esqueceu a senha */}
              <div className={s.forgotPassword}>
                <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
                  <i className="fas fa-key"></i> Esqueceu sua senha?
                </a>
              </div>

              <button type="submit" className={s.submitBtn}>
                Entrar <i className="fas fa-arrow-right"></i>
              </button>

            </form>
          </div>
        </section>

      </main>

      {/* ── Modal ── */}
      {isModalOpen && (
        <div
          className={`${s.modal} ${s.modalActive}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className={s.modalContent}>

            <button className={s.modalClose} onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>

            {!showSuccess ? (
              <>
                <div className={s.modalHeader}>
                  <h2 className={s.modalTitle}>Recuperar Senha</h2>
                  <p className={s.modalSubtitle}>
                    Digite seu e-mail para receber o link de recuperação
                  </p>
                </div>

                <form onSubmit={handleRecoverySubmit} noValidate>
                  <div className={s.formGroup}>
                    <label htmlFor="recoveryEmail">
                      <i className="fas fa-envelope"></i> E-mail
                    </label>
                    <div className={s.inputWrapper}>
                      <i className={`fas fa-envelope ${s.inputIcon}`}></i>
                      <input
                        type="email"
                        id="recoveryEmail"
                        placeholder="seu@email.com"
                        value={recoveryEmail}
                        onChange={handleRecoveryEmailChange}
                        required
                      />
                    </div>
                    <div className={`${s.validationMessage} ${recoveryMsg.type ? s[recoveryMsg.type] : ''}`}>
                      {recoveryMsg.text}
                    </div>
                  </div>

                  <button type="submit" className={s.submitBtn}>
                    <i className="fas fa-paper-plane"></i> Enviar Link
                  </button>
                </form>
              </>
            ) : (
              <div className={s.modalSuccess}>
                <i className="fas fa-check-circle"></i>
                <h3 className={s.modalTitle}>E-mail enviado!</h3>
                <p className={s.modalSubtitle}>
                  Verifique sua caixa de entrada para redefinir sua senha
                </p>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
