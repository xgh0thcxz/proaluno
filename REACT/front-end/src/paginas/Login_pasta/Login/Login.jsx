import { Link } from 'react-router-dom';
import './L_CSS.css';

import logo from '../../../imagens/logo_pa_branca2.png'
import aluno from '../../../imagens/aluno.png'
import colab from '../../../imagens/colab.png'


export default function Login() {
  return (
    <>
      <main className="login-section">
        <div className="main-container">
          <section className="info-panel" aria-labelledby="brand-heading">
            <h1 id="brand-heading" className="sr-only">
              Proaluno - Educação que ouve, educação que avança
            </h1>
            <div className="logo-container">
              <img 
                src= {logo}
                alt="Logo Proaluno" 
                className="logo-img-main" 
                // CORRIGIDO: No React, atributos de auto-fechamento terminam com />
              />
            </div>
            <div className="slogan-container">
              <div className="slogan-text">
                <div className="slogan-main">Educação que ouve, educação que avança</div>
              </div>
            </div>
          </section>
          
          <section className="login-panel" aria-labelledby="login-heading">
            <div className="login-content">
              <h2 id="login-heading" className="login-title">Faça seu login aqui</h2>
              <p className="login-subtitle">Deseja entrar como:</p>
              <div className="login-options">
                
                {/* INTERLIGADO: Mudado de <a> para <Link> apontando para /produto */}
                <Link to="/aluno_login" className="option-card" aria-label="Entrar como Aluno">
                  <img 
                    src= {aluno}
                    alt="Ícone de aluno" 
                    className="option-icon student-icon" 
                  />
                  <span className="option-label">Aluno</span>
                  <span className="option-description">Acesse a página inicial do aluno</span>
                </Link>

                {/* INTERLIGADO: Mudado de <a> para <Link> apontando para /produto */}
                <Link to="/colab_login" className="option-card" aria-label="Entrar como Colaborador">
                  <img 
                    src= {colab}
                    alt="Ícone de colaborador" 
                    className="option-icon" 
                  />
                  <span className="option-label">Colaborador</span>
                  <span className="option-description">Acesse a página do colaborador</span>
                </Link>
                
              </div>
            </div>
          </section>
        </div>
        
        {/* Elementos decorativos flutuantes */}
        <div className="floating-elements" aria-hidden="true">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
        
        {/* Sistema de partículas */}
        <div id="particles-js" aria-hidden="true"></div>
        
      </main>   
    </>
  );
}