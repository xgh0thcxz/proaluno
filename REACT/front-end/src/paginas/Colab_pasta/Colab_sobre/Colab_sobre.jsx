import React, { useEffect } from 'react';
import styles from './CS_CSS.module.css';

import Header from '../../Complementos/Colab/Header/C_Header';
import Footer from '../../Complementos/Colab/Footer/C_Footer';

// import Teste from '../Colab_equipe/Colab_equipe';

const ColabSobre = () => {
  const audienceItems = [
    {
      title: 'Alunos',
      description: 'Para relatar desafios acadêmicos, infraestrutura, convivência ou sugerir melhorias.'
    },
    {
      title: 'Familiares e responsáveis',
      description: 'Para compartilhar preocupações sobre o desenvolvimento dos estudantes ou melhorias na escola.'
    },
    {
      title: 'Professores e colaboradores',
      description: 'Para propor ideias ou reportar situações que impactem seu trabalho.'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Envio da Manifestação',
      description: 'Você pode registrar sua solicitação através daqui no nosso site, e-mail (proaluno@gmail.com) e presencialmente na nossa unidade. Todas as opções garantem sigilo e rastreamento.'
    },
    {
      step: 2,
      title: 'Análise Técnica',
      description: 'Nossa equipe categoriza sua demanda (denúncia, elogio, sugestão, reclamação ou solicitação) e a encaminha ao setor responsável, com prazos definidos para resposta.'
    },
    {
      step: 3,
      title: 'Resposta e Acompanhamento',
      description: 'Você receberá um retorno em até 12 dias úteis, com informações sobre as ações tomadas. Caso necessário, poderá reabrir o chamado para esclarecimentos adicionais.'
    }
  ];

  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <div className={styles.body}>
        <Header />

        {/* Hero Section */}
        <section id="section-hero" className={styles.sectionHero}>
          <div className={`${styles.heroContainer} ${styles.container}`}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                PROALUNO: Sua Voz é Essencial para uma Educação de Excelência
              </h1>
              <p className={styles.heroText}>
                Nossa ouvidoria existe para garantir que estudantes, famílias, professores e
                colaboradores possam compartilhar feedbacks, sugestões e preocupações de forma
                aberta e transparente. Aqui, cada manifestação é valorizada e transformada em ação,
                fortalecendo a qualidade do ensino e da gestão escolar na FIEB.
              </p>
            </div>
            <div className={styles.heroDecoration}>
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  background: 'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
                  borderRadius: '20px',
                  opacity: 0.7
                }}
              />
            </div>
          </div>
        </section>

        {/* Sobre Section */}
        <section id="section-about" className={`${styles.sectionAbout} ${styles.container}`}>
          <div className={styles.aboutCard}>
            <h2 className={styles.aboutTitle}>O QUE É O PROALUNO?</h2>
            <p className={styles.aboutText}>
              O Proaluno é um canal oficial de comunicação criado para promover diálogo,
              transparência e melhorias contínuas em nossa instituição. Funcionando como uma ponte
              entre a comunidade escolar e a gestão, ela recebe, analisa e encaminha demandas
              relacionadas a processos educacionais, infraestrutura, relações interpessoais e outros
              temas relevantes para o ecossistema FIEB.
            </p>
            <p className={styles.aboutText}>
              Mais do que um simples serviço de atendimento, a ouvidoria é um instrumento de
              cidadania ativa, onde todos têm o direito de ser ouvidos e de contribuir para o
              aprimoramento da nossa instituição.
            </p>
          </div>
        </section>

        {/* Público Alvo Section */}
        <section id="section-audience" className={`${styles.sectionAudience} ${styles.container}`}>
          <div className={styles.audienceHeader}>
            <h2 className={styles.audienceTitle}>Quem pode utilizar a Ouvidoria?</h2>
            <p className={styles.audienceSubtitle}>
              Este canal é dedicado a todos que fazem parte da comunidade FIEB:
            </p>
          </div>
          <div className={styles.audienceGrid}>
            {audienceItems.map((item, index) => (
              <div key={index} className={styles.audienceCard}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <p className={styles.audienceFooter}>Se sua demanda está relacionada à FIEB, este espaço é seu!</p>
        </section>

        {/* Como Funciona Section */}
        <section id="section-how-it-works" className={styles.sectionHowItWorks}>
          <div className={styles.container}>
            <h2 className={styles.howItWorksTitle}>COMO FUNCIONA?</h2>
            <div className={styles.howItWorksGrid}>
              {howItWorks.map((item) => (
                <div key={item.step} className={styles.howItWorksCard}>
                  <div className={styles.stepNumber}>{item.step}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <Teste /> */}

        <Footer />
      </div>
    </>
  );
};

export default ColabSobre;
