import React, { useState, useEffect, useRef } from 'react';
import s from './CA_CSS.module.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    school: 'ITB Brasilio Flores de Azevedo',
    phone: '',
    terms: false,
  });

  const [errors, setErrors] = useState({
    username: false,
    fullname: false,
    email: false,
    password: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting]         = useState(false);
  const [isSelectOpen, setIsSelectOpen]         = useState(false);

  const selectRef = useRef(null);

  const schools = [
    'ITB Brasilio Flores de Azevedo',
    'Escola Estadual João Paulo I',
    'Instituto Federal de São Paulo',
    'Colégio Miguel de Cervantes',
    'Escola Técnica Estadual Getúlio Vargas',
  ];

  /* ── Fechar select ao clicar fora ── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target))
        setIsSelectOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ── Força da senha ── */
  useEffect(() => {
    const pwd = formData.password;
    let strength = 0;
    if (pwd.length >= 5) strength += 25;
    if (pwd.length >= 8) strength += 25;
    if (/[A-Z]/.test(pwd))  strength += 25;
    if (/[0-9]/.test(pwd))  strength += 25;
    setPasswordStrength(strength);
    setErrors(prev => ({ ...prev, password: pwd.length > 0 && pwd.length < 5 }));
  }, [formData.password]);

  const validateField = (name, value) => {
    switch (name) {
      case 'username': return value.trim().length < 3;
      case 'fullname': return value.trim().length < 3;
      case 'email':
        return value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'password': return value.length > 0 && value.length < 5;
      default: return false;
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [id]: fieldValue }));

    if (!['school', 'phone', 'terms'].includes(id)) {
      setErrors(prev => ({ ...prev, [id]: validateField(id, fieldValue) }));
    }
  };

  const handleSchoolSelect = (school) => {
    setFormData(prev => ({ ...prev, school }));
    setIsSelectOpen(false);
  };

  /* ── Cor da barra de força ── */
  const strengthColor =
    passwordStrength <= 25 ? '#ff4444' :
    passwordStrength <= 50 ? '#ffaa44' :
    passwordStrength <= 75 ? '#44aaff' : '#44cc44';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: !formData.username || formData.username.trim().length < 3,
      fullname: !formData.fullname || formData.fullname.trim().length < 3,
      email:    !formData.email    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      password: !formData.password || formData.password.length < 5,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(Boolean);

    if (!hasErrors && formData.terms) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Dados do cadastro:', formData);
        alert('Cadastro realizado com sucesso!');
      } catch (err) {
        console.error('Erro ao cadastrar:', err);
        alert('Erro ao realizar cadastro. Tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
    } else if (!formData.terms) {
      alert('Você precisa aceitar os Termos de Uso e Política de Privacidade');
    }
  };

  return (
    <section className={`${s.root} ${s.registrationSection}`}>

      {/* ── Background Decor ── */}
      <div className={s.backgroundDecor}>
        <img src="/assets/277_29.svg" alt="" className={`${s.shape} ${s.shape1}`} />
        <img src="/assets/277_30.svg" alt="" className={`${s.shape} ${s.shape2}`} />
        <img src="/assets/277_31.svg" alt="" className={`${s.shape} ${s.shape3}`} />
        <img src="/assets/277_49.svg" alt="" className={`${s.shape} ${s.shape4}`} />
      </div>

      {/* ── Back Button ── */}
      <a href="/" className={s.backButton}>
        Voltar
      </a>

      {/* ── Form Container ── */}
      <div className={s.formContainer}>
        <div className={s.formHeader}>
          <div className={s.welcomeIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h1 className={s.formTitle}>Olá!</h1>
          <p className={s.formSubtitle}>Faça o cadastro aqui</p>
        </div>

        <form className={s.registrationForm} onSubmit={handleSubmit} noValidate>

          {/* ── Username ── */}
          <div className={s.formGroup}>
            <label htmlFor="username">
              Nome de usuário <span className={s.required}>*</span>
            </label>
            <div className={`${s.inputWrapper} ${errors.username ? s.inputWrapperError : ''}`}>
              <input
                type="text"
                id="username"
                placeholder="Insira aqui seu Nome de Usuário"
                required
                value={formData.username}
                onChange={handleInputChange}
              />
              <div className={s.inputIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
            {errors.username && <div className={s.errorMessage}>Por favor, insira um nome de usuário válido</div>}
          </div>

          {/* ── Fullname ── */}
          <div className={s.formGroup}>
            <label htmlFor="fullname">
              Nome Completo <span className={s.required}>*</span>
            </label>
            <div className={`${s.inputWrapper} ${errors.fullname ? s.inputWrapperError : ''}`}>
              <input
                type="text"
                id="fullname"
                placeholder="Insira aqui seu Nome Completo"
                required
                value={formData.fullname}
                onChange={handleInputChange}
              />
              <div className={s.inputIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
                </svg>
              </div>
            </div>
            {errors.fullname && <div className={s.errorMessage}>Por favor, insira seu nome completo</div>}
          </div>

          {/* ── Email ── */}
          <div className={s.formGroup}>
            <label htmlFor="email">
              E-mail <span className={s.required}>*</span>
            </label>
            <div className={`${s.inputWrapper} ${errors.email ? s.inputWrapperError : ''}`}>
              <input
                type="email"
                id="email"
                placeholder="Insira aqui seu E-mail"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <div className={s.inputIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
            </div>
            {errors.email && <div className={s.errorMessage}>Por favor, insira um e-mail válido</div>}
          </div>

          {/* ── Senha ── */}
          <div className={s.formGroup}>
            <label htmlFor="password">
              Senha <span className={s.required}>*</span>
            </label>
            <div className={`${s.inputWrapper} ${errors.password ? s.inputWrapperError : ''}`}>
              <input
                type="password"
                id="password"
                placeholder="Insira aqui sua Senha (mínimo de 5 caracteres)"
                required
                minLength="5"
                value={formData.password}
                onChange={handleInputChange}
              />
              <div className={s.inputIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
            </div>
            <div className={s.passwordStrength}>
              <div className={s.strengthBar}>
                <div
                  className={s.strengthFill}
                  style={{ width: `${passwordStrength}%`, backgroundColor: strengthColor }}
                />
              </div>
            </div>
            {errors.password && <div className={s.errorMessage}>A senha deve ter pelo menos 5 caracteres</div>}
          </div>

          {/* ── Escola ── */}
          <div className={s.formGroup}>
            <label>Unidade Escolar</label>
            <div
              className={s.customSelect}
              tabIndex="0"
              role="combobox"
              ref={selectRef}
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span>{formData.school}</span>
              {isSelectOpen && (
                <div className={s.selectOptions}>
                  {schools.map((school, i) => (
                    <div
                      key={i}
                      className={s.selectOption}
                      onClick={(e) => { e.stopPropagation(); handleSchoolSelect(school); }}
                    >
                      {school}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Telefone ── */}
          <div className={s.formGroup}>
            <label htmlFor="phone">Número de Telefone</label>
            <div className={s.inputWrapper}>
              <input
                type="tel"
                id="phone"
                placeholder="Insira aqui seu Número de Telefone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <div className={s.inputIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ── Termos ── */}
          <div className={s.termsGroup}>
            <input
              type="checkbox"
              id="terms"
              required
              checked={formData.terms}
              onChange={handleInputChange}
            />
            <label htmlFor="terms">
              Concordo com os{' '}
              <a href="#" target="_blank" rel="noreferrer">Termos de Uso</a>
              {' '}e{' '}
              <a href="#" target="_blank" rel="noreferrer">Política de Privacidade</a>
              <span className={s.required}>*</span>
            </label>
          </div>

          {/* ── Submit ── */}
          <button type="submit" className={s.submitButton} disabled={isSubmitting}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            {isSubmitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </button>

          <div className={s.loginLink}>
            Já tem uma conta? <a href="login.html">Faça login aqui</a>
          </div>

        </form>
      </div>
    </section>
  );
};

export default Cadastro;
