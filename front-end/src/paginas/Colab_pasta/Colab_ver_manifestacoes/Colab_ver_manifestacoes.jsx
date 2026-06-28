import React, { useState } from 'react';
import styles from './CVM_CSS.module.css';

import Header from '../../Complementos/Colab/Header/C_Header';
import Footer from '../../Complementos/Colab/Footer/C_Footer';

const ColabVerManifestacoes = () => {
  const [selectedUnit, setSelectedUnit] = useState('ITB Brasilio Flores de Azevedo');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [filteredManifestations, setFilteredManifestations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const units = [
    'ITB Brasilio Flores de Azevedo',
    'Escola Estadual João Paulo I',
    'Instituto Federal de São Paulo',
    'Colégio Miguel de Cervantes',
    'Escola Técnica Estadual Getúlio Vargas'
  ];

  const allManifestations = [
    {
      id: 1,
      type: 'Reclamação',
      typeClass: 'Reclamacao',
      date: '05/08/2025',
      status: 'Pendente',
      protocol: 'MANIF2025-0585',
      student: 'Anônimo',
      subject: 'Infraestrutura',
      summary: 'A porta do banheiro feminino está quebrada e não fecha corretamente. O bebedouro próximo à quadra está sempre sem água...',
      actions: ['resolver', 'responder']
    },
    {
      id: 2,
      type: 'Elogio',
      typeClass: 'Elogio',
      date: '03/08/2025',
      status: 'Visto',
      protocol: 'MANIF2025-0385',
      student: 'Ana Clara da Silva Machado',
      subject: 'Professores e equipe',
      summary: 'A equipe da secretária é muito atenciosa, prestativa e resolveu meu problema rápido. Me trataram muito bem, Muito obrigada!',
      actions: ['resolvido', 'respondido']
    },
    {
      id: 3,
      type: 'Sugestões',
      typeClass: 'Sugestoes',
      date: '30/07/2025',
      status: 'Visto',
      protocol: 'MANIF2025-0375',
      student: 'Gabriel Oliveira de Souza',
      subject: 'Eventos',
      summary: 'Seria legal ter mais eventos na escola, talvez algumas competições como olimpiadas, show de talentos, algumas feiras...',
      actions: ['resolvido', 'respondido']
    },
    {
      id: 4,
      type: 'Denúncia',
      typeClass: 'Denuncia',
      date: '15/07/2025',
      status: 'Visto',
      protocol: 'MANIF2025-0575',
      student: 'Mariana Barbosa do Nascimento',
      subject: 'Alunos',
      summary: 'Presenciei um caso de bullying no corredor durante o intervalo. Um aluno do 1º ano A estava xingando outro aluno.',
      actions: ['resolvido', 'respondido']
    },
    {
      id: 5,
      type: 'Solicitação',
      typeClass: 'Solicitacao',
      date: '10/07/2025',
      status: 'Pendente',
      protocol: 'MANIF2025-0455',
      student: 'Carlos Eduardo Santos',
      subject: 'Material didático',
      summary: 'Solicito a reposição do material didático para a disciplina de matemática, pois o meu foi extraviado durante a mudança de sala.',
      actions: ['resolver', 'responder']
    },
    {
      id: 6,
      type: 'Reclamação',
      typeClass: 'Reclamacao',
      date: '05/07/2025',
      status: 'Finalizado',
      protocol: 'MANIF2025-0355',
      student: 'Juliana Pereira Lima',
      subject: 'Merenda escolar',
      summary: 'A qualidade da merenda escolar está abaixo do esperado. Os alunos têm reclamado da pouca variedade e da falta de opções saudáveis.',
      actions: ['resolver', 'responder']
    }
  ];

  const handleConsult = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setFilteredManifestations(allManifestations);
      setVisibleCount(4);
    } catch (error) {
      console.error('Erro ao buscar manifestações:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeeMore = () => {
    setVisibleCount(prev =>
      Math.min(prev + 2, filteredManifestations?.length || allManifestations.length)
    );
  };

  // Retorna a classe do módulo para o card (borda lateral)
  const getCardClass = (typeClass) => styles[`type${typeClass}`] || '';

  // Retorna a classe do módulo para o texto do tipo
  const getTypeTextClass = (typeClass) => styles[`typeText${typeClass}`] || '';

  // Retorna a classe do módulo para o status
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pendente':   return styles.statusPendente;
      case 'visto':      return styles.statusVisto;
      case 'finalizado': return styles.statusFinalizado;
      default:           return '';
    }
  };

  // Retorna a classe do módulo para botões resolvido/respondido por tipo
  const getResolvedClass = (action, typeClass) =>
    styles[`btn${action.charAt(0).toUpperCase() + action.slice(1)}${typeClass}`] || '';

  const displayedManifestations = (filteredManifestations || allManifestations).slice(0, visibleCount);
  const hasMore = visibleCount < (filteredManifestations || allManifestations).length;

  return (
    <>
      <div className={styles.body}>
        <Header />
        <a href="#main-content" className={styles.skipLink}>
          Pular para o conteúdo principal
        </a>

        <main id="main-content" className={styles.mainContent}>
          <div className={styles.container}>

            {/* Intro Section */}
            <section className={styles.introSection}>
              <h1 className={styles.introTitle}>
                Ouça e veja as manifestações da sua unidade escolar
              </h1>
              <p className={styles.introDescription}>
                Este é o momento de ouvir atentamente o que o manifestante tem a dizer, buscando
                compreender o contexto e a necessidade apresentada. A escuta ativa é essencial para
                que a ouvidoria atue de forma justa e eficaz.
              </p>
              <hr className={styles.divider} />
            </section>

            {/* Filters Section */}
            <section id="filters" className={styles.filtersSection}>
              <div className={styles.filterBox}>
                <label htmlFor="unit-select">Selecione a sua unidade</label>
                <div className={styles.customSelect}>
                  <span
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                  >
                    {selectedUnit}
                    <div style={{
                      width: '16px', height: '16px',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '2px',
                      transform: 'rotate(90deg)'
                    }} />
                  </span>

                  {isSelectOpen && (
                    <div className={styles.selectOptions}>
                      {units.map((unit, index) => (
                        <div
                          key={index}
                          className={styles.selectOption}
                          onClick={() => {
                            setSelectedUnit(unit);
                            setIsSelectOpen(false);
                          }}
                        >
                          {unit}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  className={`${styles.btn} ${styles.btnConsult}`}
                  onClick={handleConsult}
                  disabled={isLoading}
                >
                  {isLoading ? 'Carregando...' : 'Consultar Manifestações'}
                </button>
              </div>
            </section>

            <hr className={styles.divider} />

            {/* Manifestations List */}
            <section id="manifestations" className={styles.manifestationsListSection}>
              <div className={styles.manifestationsList}>
                {displayedManifestations.map(manifestation => (
                  <article
                    key={manifestation.id}
                    className={`${styles.manifestationCard} ${getCardClass(manifestation.typeClass)}`}
                  >
                    {/* Detalhes */}
                    <div className={styles.cardDetails}>
                      <p>
                        <strong>Tipo de Manifestação:</strong>
                        <span className={`${styles.typeText} ${getTypeTextClass(manifestation.typeClass)}`}>
                          {' '}{manifestation.type}
                        </span>
                      </p>
                      <p><strong>Data de Publicação:</strong> {manifestation.date}</p>
                      <p>
                        <strong>Status:</strong>{' '}
                        <span className={getStatusClass(manifestation.status)}>
                          {manifestation.status}
                        </span>
                      </p>
                      <p><strong>Nº de Protocolo:</strong> {manifestation.protocol}</p>
                    </div>

                    {/* Resumo */}
                    <div className={styles.cardSummary}>
                      <p><strong>Aluno:</strong> {manifestation.student}</p>
                      <p><strong>Assunto:</strong> {manifestation.subject}</p>
                      <p><strong>Resumo:</strong> {manifestation.summary}</p>
                    </div>

                    {/* Ações */}
                    <div className={styles.cardActions}>
                      {manifestation.actions.includes('resolver') && (
                        <a href="encaminhar.html">
                          <button className={`${styles.btn} ${styles.btnResolver}`}>
                            Resolver
                          </button>
                        </a>
                      )}
                      {manifestation.actions.includes('responder') && (
                        <a href="responder.html">
                          <button className={`${styles.btn} ${styles.btnResponder}`}>
                            Responder
                          </button>
                        </a>
                      )}
                      {manifestation.actions.includes('resolvido') && (
                        <button className={`${styles.btn} ${getResolvedClass('resolvido', manifestation.typeClass)}`}>
                          Resolvido
                        </button>
                      )}
                      {manifestation.actions.includes('respondido') && (
                        <button className={`${styles.btn} ${getResolvedClass('respondido', manifestation.typeClass)}`}>
                          Respondido
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {hasMore && (
                <div className={styles.seeMoreContainer}>
                  <button
                    className={`${styles.btn} ${styles.btnSeeMore}`}
                    onClick={handleSeeMore}
                  >
                    Ver mais
                  </button>
                </div>
              )}
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ColabVerManifestacoes;
