import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HE.module.css';

import proaluno_logo from '../../../../imagens/logo_pa.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.siteHeader} id="site-header">
        <div className={styles.headerContainer}>

          {/* LOGO */}
          <div>
            <Link to="/home" className={styles.logoLink}>
              <img
                src={proaluno_logo}
                alt="Proaluno Logo"
                className={styles.logoImg}
              />
            </Link>
          </div>

          {/* NAVEGAÇÃO DESKTOP */}
          <nav className={styles.mainNav}>
            <ul className={styles.navList}>
              <li>
                <Link to="/home" className={styles.navLink}>INÍCIO</Link>
              </li>
              <li>
                <Link to="/sobre" className={styles.navLink}>SOBRE NÓS</Link>
              </li>
              <li>
                <Link to="/contato" className={styles.navLink}>CONTATO</Link>
              </li>
            </ul>
          </nav>

          {/* PERFIL DO USUÁRIO */}
          <div className={styles.headerActions}>
            <div className={styles.userProfile}>

              {/* Botão do menu do usuário */}
              <button
                className={styles.userToggle}
                aria-label="Menu do usuário"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className={styles.userAvatar}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className={styles.userGreeting}>Olá aluno!</span>
              </button>

              {/* Dropdown do usuário */}
              {userMenuOpen && (
                <div className={`${styles.userMenu} ${styles.userMenuActive}`}>
                  <ul>
                    <li>
                      <Link to="/aluno_perfil" onClick={() => setUserMenuOpen(false)}>
                        Minha Conta
                      </Link>
                    </li>
                    <li>
                      <Link to="/" onClick={() => setUserMenuOpen(false)}>
                        Sair
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

            </div>
          </div>

          {/* Botão hamburguer mobile */}
          <button
            className={`${styles.mobileMenuToggle} ${menuOpen ? styles.mobileMenuToggleActive : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>

        {/* Menu mobile */}
        <nav className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavActive : ''}`}>
          <ul>
            <li><Link to="/home" onClick={() => setMenuOpen(false)}>INÍCIO</Link></li>
            <li><Link to="/sobre" onClick={() => setMenuOpen(false)}>SOBRE NÓS</Link></li>
            <li><Link to="/contato" onClick={() => setMenuOpen(false)}>CONTATO</Link></li>
            <li><Link to="/aluno-perfil" onClick={() => setMenuOpen(false)}>MEU PERFIL</Link></li>
          </ul>
        </nav>

      </header>
    </>
  );
}
