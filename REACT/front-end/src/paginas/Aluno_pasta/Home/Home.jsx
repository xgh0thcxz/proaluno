import styles from './H_CSS.module.css';

import Header from '../../Complementos/Aluno/Header/Header';
import Footer from '../../Complementos/Aluno/Footer/Footer';

//imagens
import estudantes_sorrindo from '../../../imagens/estudantes-sorrindo.jpg';
import denuncias     from '../../../imagens/m_denuncias.png';
import elogios       from '../../../imagens/m_elogios.png';
import reclamacoes   from '../../../imagens/m_reclamacoes.png';
import solicitacoes  from '../../../imagens/m_solicitacoes.png';
import sugestoes     from '../../../imagens/m_sugestoes.png';

  return (
    <div className={styles.body}>
      <Header />
      <main>

        {/* RESUMO / HERO */}
        <section id="about" className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Educação que ouve, educação que avança
              </h1>
              <p className={styles.heroDescription}>
                Na Ouvidoria Educacional, sua voz é o nosso compromisso. Estamos aqui para ouvir
                suas sugestões, dúvidas e reclamações, garantindo um canal transparente e eficaz
                para juntos construirmos uma educação de qualidade, inclusiva e que atenda às
                necessidades de toda a comunidade escolar.
              </p>
              <div className={styles.heroActions}>
                <a href="#manifestation-types" className={styles.btn}>
                  Fazer uma Manifestação
                </a>
                <a href="#how-to-register" className={`${styles.btn} ${styles.btnSecondary}`}>
                  Como Funciona
                </a>
              </div>
            </div>

            <div className={styles.heroImageContainer}>
              <div className={styles.heroImageWrapper}>
                <img
                  src={estudantes_sorrindo}
                  alt="Estudantes sorrindo"
                  className={styles.heroImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* REGISTRO */}
        <section
          id="how-to-register"
          className={styles.howToRegisterSection}
        >
          <div className={styles.howToRegisterContainer}>
            <h2 className={styles.howToRegisterTitle}>
              Como Registrar uma Manifestação?
            </h2>
            <div className={styles.howToRegisterContent}>
              <p>
                Para registrar uma manifestação na nossa Ouvidoria Educacional, basta acessar
                nosso canal oficial de atendimento, que pode ser feito por meio do site. É
                possível enviar reclamações, denúncias, sugestões, elogios ou solicitações
                relacionadas aos serviços educacionais.
              </p>
              <p>
                Ao registrar, é importante informar dados completos sobre a situação, incluindo
                local, data, nomes envolvidos e uma descrição clara do ocorrido. A ouvidoria
                garante o sigilo das informações e atua com imparcialidade para buscar soluções
                justas e eficientes. Sua participação contribui para a melhoria da educação!
              </p>
            </div>
          </div>
        </section>

        {/* MANIFESTAÇÕES */}
        <section
          id="manifestation-types"
          className={styles.manifestationTypesSection}
        >
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              Qual tipo de manifestação você quer fazer?
            </h2>
            <div className={styles.manifestationCards}>

              <Link to="/manifestacoes/denuncias" className={styles.manifestationCard}>
                <img src={denuncias} alt="Denúncias" className={styles.manifestationImage} />
                <div className={styles.manifestationTitle}>Denúncias</div>
              </Link>

              <Link to="/manifestacoes/reclamacoes" className={styles.manifestationCard}>
                <img src={reclamacoes} alt="Reclamações" className={styles.manifestationImage} />
                <div className={styles.manifestationTitle}>Reclamações</div>
              </Link>

              <Link to="/manifestacoes/solicitacoes" className={styles.manifestationCard}>
                <img src={solicitacoes} alt="Solicitações" className={styles.manifestationImage} />
                <div className={styles.manifestationTitle}>Solicitações</div>
              </Link>

              <Link to="/manifestacoes/elogios" className={styles.manifestationCard}>
                <img src={elogios} alt="Elogios" className={styles.manifestationImage} />
                <div className={styles.manifestationTitle}>Elogios</div>
              </Link>

              <Link to="/manifestacoes/sugestoes" className={styles.manifestationCard}>
                <img src={sugestoes} alt="Sugestões" className={styles.manifestationImage} />
                <div className={styles.manifestationTitle}>Sugestões</div>
              </Link>

            </div>
          </div>
        </section>

        {/* SATISFAÇÃO */}
        <section className={styles.satisfactionSurveySection}>
          <div className={styles.satisfactionContainer}>
            <h3 className={styles.satisfactionTitle}>
              Você está satisfeito(a) com o atendimento da Ouvidoria?
            </h3>
            <h4 className={styles.satisfactionSubtitle}>Sua opinião é importante!</h4>
            <p className={styles.satisfactionText}>
              Acesse o formulário de pesquisa de satisfação
            </p>
            <a href="#" className={styles.btn}>Participar da Pesquisa</a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
