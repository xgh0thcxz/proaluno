import React, { useState, useEffect, useRef } from 'react';
import styles from './CR_CSS.module.css';

import Header from '../../Complementos/Colab/Header/C_Header';
import Footer from '../../Complementos/Colab/Footer/C_Footer';

const Manifestacoes = () => {
  const [protocol, setProtocol] = useState('');
  const [searchError, setSearchError] = useState('');
  const [responseError, setResponseError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [manifestation, setManifestation] = useState(null);
  const [responseText, setResponseText] = useState('');

  const mockManifestations = {
    'MANIF2025-0585': {
      type: 'Reclamação',
      protocol: 'MANIF2025-0585',
      date: '05/08/2025',
      status: 'Pendente',
      student: 'João Silva',
      subject: 'Infraestrutura',
      message: 'A porta do banheiro feminino está quebrada e não fecha corretamente, e o bebedouro próximo à quadra está sempre sem água.',
      email: 'joao.silva@estudante.fieb.edu.br'
    },
    'MANIF2025-0123': {
      type: 'Sugestão',
      protocol: 'MANIF2025-0123',
      date: '10/08/2025',
      status: 'Pendente',
      student: 'Maria Oliveira',
      subject: 'Merenda Escolar',
      message: 'Sugiro que sejam incluídas opções vegetarianas no cardápio da merenda escolar.',
      email: 'maria.oliveira@estudante.fieb.edu.br'
    },
    'MANIF2025-0891': {
      type: 'Elogio',
      protocol: 'MANIF2025-0891',
      date: '15/08/2025',
      status: 'Respondido',
      student: 'Pedro Costa',
      subject: 'Atendimento',
      message: 'Gostaria de parabenizar a equipe da secretaria pelo excelente atendimento prestado.',
      email: 'pedro.costa@estudante.fieb.edu.br'
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!protocol.trim()) {
      setSearchError('Por favor, insira um número de protocolo.');
      return;
    }
    setIsLoading(true);
    setSearchError('');
    setShowSuccess(false);
    setResponseText('');
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const foundManifestation = mockManifestations[protocol.trim().toUpperCase()];
      if (foundManifestation) {
        setManifestation(foundManifestation);
        setSearchError('');
      } else {
        setManifestation(null);
        setSearchError('Protocolo não encontrado. Verifique o número digitado.');
      }
    } catch (error) {
      console.error('Erro ao buscar manifestação:', error);
      setSearchError('Erro ao buscar manifestação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    if (!responseText.trim()) {
      setResponseError('Por favor, preencha o campo de resposta.');
      return;
    }
    setIsLoading(true);
    setResponseError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const responseData = {
        protocol: manifestation.protocol,
        response: responseText,
        respondedAt: new Date().toISOString(),
        respondedBy: 'Colaborador'
      };
      console.log('Resposta enviada:', responseData);
      setShowSuccess(true);
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
      setResponseError('Erro ao enviar resposta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResponseText('');
    setResponseError('');
  };

  const resetPage = () => {
    setShowSuccess(false);
    setManifestation(null);
    setProtocol('');
    setResponseText('');
    setSearchError('');
    setResponseError('');
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pendente':     return styles.statusPending;
      case 'respondido':   return styles.statusResponded;
      case 'finalizado':   return styles.statusFinished;
      default:             return styles.statusPending;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Reclamação': return '⚠️';
      case 'Sugestão':   return '💡';
      case 'Elogio':     return '👍';
      default:           return '📝';
    }
  };

  return (
    <>
      <div className={styles.pageTheme}>
        <Header />

        <a href="#main-content" className={styles.skipLink}>
          Pular para o conteúdo principal
        </a>

        <main className={styles.mainContentSection} id="main-content">
          <div className={styles.mainContainer}>

            <h1 className={styles.mainTitle}>Responda as Manifestações dos Alunos</h1>
            <p className={styles.mainDescription}>
              Busque por um protocolo para visualizar a manifestação e enviar uma resposta.
            </p>

            {/* Formulário de Busca */}
            <div className={styles.searchWrapper}>
              <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="protocol-input" className={styles.formLabel}>
                    Número do Protocolo
                  </label>
                  <input
                    type="text"
                    id="protocol-input"
                    className={styles.formInput}
                    placeholder="Ex: MANIF2025-0585"
                    required
                    value={protocol}
                    onChange={(e) => setProtocol(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <button type="submit" className={styles.searchBtn} disabled={isLoading}>
                  {isLoading ? 'Buscando...' : 'Buscar Manifestação'}
                </button>
                {searchError && (
                  <div className={`${styles.message} ${styles.errorMessage}`}>
                    {searchError}
                  </div>
                )}
              </form>
            </div>

            <hr className={styles.divider} />

            {/* Card da Manifestação */}
            {manifestation && (
              <div className={styles.manifestationCard}>
                <div className={styles.manifestationHeader}>
                  <span className={styles.manifestationType}>
                    {getTypeIcon(manifestation.type)} {manifestation.type}
                  </span>
                  <span className={styles.protocolNumber}>
                    Protocolo: <span>{manifestation.protocol}</span>
                  </span>
                </div>

                <div className={styles.manifestationDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Data de Publicação</span>
                    <span className={styles.detailValue}>{manifestation.date}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Status</span>
                    <span className={`${styles.statusIndicator} ${getStatusClass(manifestation.status)}`}>
                      {manifestation.status}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Aluno</span>
                    <span className={styles.detailValue}>{manifestation.student}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Assunto</span>
                    <span className={styles.detailValue}>{manifestation.subject}</span>
                  </div>
                </div>

                <div className={styles.manifestationContent}>
                  <span className={styles.detailLabel}>Mensagem</span>
                  <p className={styles.detailValue}>{manifestation.message}</p>
                </div>
              </div>
            )}

            {/* Formulário de Resposta */}
            {manifestation && !showSuccess && (
              <form className={styles.responseForm} onSubmit={handleResponseSubmit}>
                <h2 className={styles.responseFormTitle}>Enviar Resposta</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="response-text" className={styles.responseFormLabel}>
                    Sua Resposta:
                  </label>
                  <textarea
                    id="response-text"
                    className={styles.formTextarea}
                    placeholder="Digite aqui sua resposta à manifestação..."
                    required
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    disabled={isLoading}
                    rows={6}
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className={`${styles.btn} ${styles.btnSubmit}`}
                    disabled={isLoading}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                    {isLoading ? 'Enviando...' : 'Enviar Resposta'}
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnDelete}`}
                    onClick={handleReset}
                    disabled={isLoading}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                    Limpar
                  </button>
                </div>
                {responseError && (
                  <div className={`${styles.message} ${styles.errorMessage}`}>
                    {responseError}
                  </div>
                )}
              </form>
            )}

            {/* Animação de Sucesso */}
            {showSuccess && (
              <div className={styles.successAnimation}>
                <span className={styles.successIcon}>🎉</span>
                <div className={styles.successMessage}>Resposta enviada com sucesso!</div>
                <p>A resposta foi registrada e o aluno será notificado.</p>
                <button
                  className={`${styles.btn} ${styles.btnSubmit}`}
                  onClick={resetPage}
                  style={{ marginTop: '2rem' }}
                >
                  Responder Outra Manifestação
                </button>
              </div>
            )}

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Manifestacoes;
