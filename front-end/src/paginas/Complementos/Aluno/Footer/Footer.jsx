import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FO.module.css';

import proaluno_logo_branca from '../../../../imagens/logo_pa_branca.png';

export default function Footer() {
  return (
    <footer className={styles.siteFooter} id="footer">
      <div className={styles.container}>
        <div className={styles.footerContainer}>

          {/* LOGO */}
          <div className={styles.footerLogo}>
            <img src={proaluno_logo_branca} alt="Proaluno Logo" />
          </div>

          {/* LINKS */}
          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4>Institucional</h4>
              <ul>
                <li><a href="sobre">Sobre Nós</a></li>
                <li><a href="equipe">Nossa Equipe</a></li>
                {/* <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Termos de Uso</a></li> */}
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Manifestações</h4>
              <ul>
                <li><a href="manifestacoes/denuncias">Denúncias</a></li>
                <li><a href="manifestacoes/reclamacoes">Reclamações</a></li>
                <li><a href="manifestacoes/solicitacoes">Solicitações</a></li>
                <li><a href="manifestacoes/elogios">Elogios</a></li>
                <li><a href="manifestacoes/sugestoes">Sugestões</a></li>
              </ul>
            </div>

            {/* CONTATO */}
            <div className={styles.footerColumn}>
              <h4>Contato</h4>
              <ul>
                <li>
                  <i className={`fas fa-phone ${styles.contactIcon}`}></i>
                   (11) 9999-9999
                </li>
                <li>
                  <i className={`fas fa-envelope ${styles.contactIcon}`}></i>
                  contato@proaluno.com.br
                </li>
              </ul>

              <div className={styles.footerColumn}>
              <h4>Redes Sociais:</h4>
              </div>

              <div className={styles.socialIcons}>
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-x-twitter"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-whatsapp"></i></a>
              </div>
              {/* <br />
              <Link to="/contato" className={styles.footerContactButton}>
                Entre em Contato
              </Link> */}
            </div>

          </div>
        </div>

        {/* COPYRIGHT */}
        <div className={styles.footerBottom}>
          <p>&copy; 2026 PROALUNO - Todos os direitos reservados</p>
        </div>

      </div>
    </footer>
  );
}
