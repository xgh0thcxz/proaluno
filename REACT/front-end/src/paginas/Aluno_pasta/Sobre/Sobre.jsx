import React from 'react';
import { Link } from 'react-router-dom';
import styles from './S_CSS.module.css';

import Header from '../../Complementos/Aluno/Header/Header';
import Footer from '../../Complementos/Aluno/Footer/Footer';

import Teste from '../Equipe/Equipe'

export default function Sobre() {
  return (
    <div className="body">
      <div className="page-wrapper">
        <Header />
        <main>

          {/* ── Hero ── */}
          <section className={styles.sectionHero}>
            <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  PROALUNO: Sua Voz é Essencial para uma Educação de Excelência
                </h1>
                <p className={styles.heroText}>
                  Nossa ouvidoria existe para garantir que estudantes, famílias, professores e
                  colaboradores possam compartilhar feedbacks, sugestões e preocupações de forma
                  aberta e transparente. Aqui, cada manifestação é valorizada e transformada em
                  ação, fortalecendo a qualidade do ensino e da gestão escolar na FIEB.
                </p>
              </div>
              <div className={styles.heroDecoration}>
                <div className={styles.heroDecorationInner} />
              </div>
            </div>
          </section>

          {/* ── About ── */}
          <section className={styles.sectionAbout}>
            <div className={styles.aboutCard}>
              <h2 className={styles.aboutTitle}>O QUE É O PROALUNO?</h2>
              <p className={styles.aboutText}>
                O Proaluno é um canal oficial de comunicação criado para promover diálogo,
                transparência e melhorias contínuas em nossa instituição. Funcionando como uma
                ponte entre a comunidade escolar e a gestão, ela recebe, analisa e encaminha
                demandas relacionadas a processos educacionais, infraestrutura, relações
                interpessoais e outros temas relevantes para o ecossistema FIEB.
              </p>
              <p className={styles.aboutText}>
                Mais do que um simples serviço de atendimento, a ouvidoria é um instrumento de
                cidadania ativa, onde todos têm o direito de ser ouvidos e de contribuir para o
                aprimoramento da nossa instituição.
              </p>
            </div>
          </section>

          {/* ── Audience ── */}
          <section className={styles.sectionAudience}>
            <div className={styles.audienceHeader}>
              <h2 className={styles.audienceTitle}>Quem pode utilizar a Ouvidoria?</h2>
              <p className={styles.audienceSubtitle}>
                Este canal é dedicado a todos que fazem parte da comunidade FIEB:
              </p>
            </div>
            <div className={styles.audienceGrid}>
              <div className={styles.audienceCard}>
                <h3>Alunos</h3>
                <p>Para relatar desafios acadêmicos, infraestrutura, convivência ou sugerir melhorias.</p>
              </div>
              <div className={styles.audienceCard}>
                <h3>Familiares e responsáveis</h3>
                <p>Para compartilhar preocupações sobre o desenvolvimento dos estudantes ou melhorias na escola.</p>
              </div>
              <div className={styles.audienceCard}>
                <h3>Professores e colaboradores</h3>
                <p>Para propor ideias ou reportar situações que impactem seu trabalho.</p>
              </div>
            </div>
            <p className={styles.audienceFooter}>Se sua demanda está relacionada à FIEB, este espaço é seu!</p>
          </section>

          {/* ── How It Works ── */}
          <section className={styles.sectionHowItWorks}>
            <div className={styles.howItWorksInner}>
              <h2 className={styles.howItWorksTitle}>COMO FUNCIONA?</h2>
              <div className={styles.howItWorksGrid}>
                <div className={styles.howItWorksCard}>
                  <h3>Envio da Manifestação</h3>
                  <p>
                    Você pode registrar sua solicitação através daqui no nosso site, e-mail
                    (proaluno@gmail.com) e presencialmente na nossa unidade. Todas as opções
                    garantem sigilo e rastreamento.
                  </p>
                  <div className={styles.stepNumber}>1</div>
                </div>
                <div className={styles.howItWorksCard}>
                  <h3>Análise Técnica</h3>
                  <p>
                    Nossa equipe categoriza sua demanda (denúncia, elogio, sugestão, reclamação
                    ou solicitação) e a encaminha ao setor responsável, com prazos definidos para
                    resposta.
                  </p>
                  <div className={styles.stepNumber}>2</div>
                </div>
                <div className={styles.howItWorksCard}>
                  <h3>Resposta e Acompanhamento</h3>
                  <p>
                    Você receberá um retorno em até 12 dias úteis, com informações sobre as ações
                    tomadas. Caso necessário, poderá reabrir o chamado para esclarecimentos
                    adicionais.
                  </p>
                  <div className={styles.stepNumber}>3</div>
                </div>
              </div>
            </div>
          </section>

          {/* <Teste /> */}

        </main>
        <Footer />
      </div>
    </div>
  );
}
