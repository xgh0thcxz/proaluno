import React, { useState } from 'react';
import styles from './CSM_CSS.module.css';

import Header from '../../Complementos/Colab/Header/C_Header';
import Footer from '../../Complementos/Colab/Footer/C_Footer';

const ColabStatusManifestacao = () => {
  const [protocol, setProtocol] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [manifestationData, setManifestationData] = useState(null);

  const mockManifestations = {
    'MANIF2025-0585': {
      protocol: 'MANIF2025-0585',
      status: 'RESOLVIDO',
      type: 'Reclamação',
      subject: 'Falta de professores',
      receivedDate: '02/08/2025',
      deadline: '09/08/2025',
      responseDate: '03/08/2025',
      student: 'Anônimo',
      response: 'Agradecemos por registrar sua manifestação sobre a falta de professores. Informamos que estamos cientes da situação e que já foram iniciados os trâmites para a contratação/substituição dos profissionais ausentes.'
    },
    'MANIF2025-0123': {
      protocol: 'MANIF2025-0123',
      status: 'EM ANÁLISE',
      type: 'Sugestão',
      subject: 'Melhoria na biblioteca',
      receivedDate: '05/08/2025',
      deadline: '12/08/2025',
      responseDate: '-',
      student: 'Maria Oliveira',
      response: 'Sua sugestão está sendo analisada pela equipe pedagógica. Em breve retornaremos com um posicionamento.'
    },
    'MANIF2025-0891': {
      protocol: 'MANIF2025-0891',
      status: 'ENCAMINHADO',
      type: 'Solicitação',
      subject: 'Manutenção do ar condicionado',
      receivedDate: '01/08/2025',
      deadline: '08/08/2025',
      responseDate: '03/08/2025',
      student: 'Pedro Costa',
      response: 'Sua solicitação foi encaminhada para o setor de manutenção. O prazo para resolução é de até 5 dias úteis.'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!protocol.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsLoading(true);
    setShowError(false);
    setShowStatus(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const foundManifestation = mockManifestations[protocol];

      if (foundManifestation) {
        setManifestationData(foundManifestation);
        setShowStatus(true);
      } else {
        setShowError(true);
        setShowStatus(false);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      console.error('Erro ao buscar manifestação:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowStatus(false);
    setProtocol('');
    setManifestationData(null);
  };

  const getTypeClass = (type) => {
    switch (type?.toLowerCase()) {
      case 'reclamação': return styles.reclamacao;
      case 'sugestão':   return styles.sugestao;
      case 'solicitação': return styles.solicitacao;
      case 'elogio':     return styles.elogio;
      case 'denúncia':   return styles.denuncia;
      default:           return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolvido':   return styles.statusResolvido;
      case 'em análise':  return styles.statusAnalise;
      case 'encaminhado': return styles.statusEncaminhado;
      default:            return '';
    }
  };

  return (
    <>
      <div className={styles.body}>
        <Header />
        <a href="#main-content" className={styles.skipLink}>
          Pular para o conteúdo principal
        </a>

        <main className={styles.mainContent} id="main-content">

          {/* Status Checker Section */}
          <section id="status-checker" className={styles.statusCheckerSection}>
            <div className={styles.container}>
              <h1 className={styles.checkerTitle}>
                Verifique o status da sua manifestação
              </h1>
              <hr className={styles.dividerLine} />
              <p className={styles.checkerDescription}>
                Para saber como está o andamento da sua manifestação, informe o número do protocolo
                recebido no momento do envio. Assim, você poderá acompanhar o prazo e a resposta
                diretamente por aqui.
              </p>

              <form className={styles.protocolForm} id="protocolForm" onSubmit={handleSubmit}>
                <label htmlFor="protocol-number">Número do protocolo</label>
                <input
                  type="text"
                  id="protocol-number"
                  name="protocol-number"
                  placeholder="Ex: MANIF2025-0585"
                  required
                  value={protocol}
                  onChange={(e) => setProtocol(e.target.value)}
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Consultando...' : 'Consultar Manifestação'}
                </button>

                {showError && (
                  <div className={styles.errorMessage} id="errorMessage">
                    Protocolo não encontrado. Por favor, verifique o número digitado.
                  </div>
                )}
              </form>
            </div>
          </section>

          {/* Status Display Section */}
          {showStatus && manifestationData && (
            <section id="status-display" className={styles.statusDisplaySection}>
              <div className={styles.container}>
                <hr className={styles.dividerLine2} />
                <div className={styles.statusCard}>
                  <div className={styles.statusCardInner}>
                    <h2 className={`${styles.statusTitle} ${getStatusClass(manifestationData.status)}`}>
                      STATUS: {manifestationData.status}
                    </h2>

                    <p className={styles.statusDetail}>
                      <strong>Tipo da Manifestação:</strong>{' '}
                      <span className={getTypeClass(manifestationData.type)}>
                        {manifestationData.type}
                      </span>
                    </p>

                    <div className={styles.detailsGrid}>
                      <p className={styles.statusDetail}>
                        <strong>Assunto:</strong> {manifestationData.subject}
                      </p>
                      <p className={styles.statusDetail}>
                        <strong>Data de recebimento:</strong> {manifestationData.receivedDate}
                      </p>
                      <p className={styles.statusDetail}>
                        <strong>Prazo para resposta:</strong> Até {manifestationData.deadline}
                      </p>
                      <p className={styles.statusDetail}>
                        <strong>Dia que a resposta foi enviada:</strong> {manifestationData.responseDate}
                      </p>
                      <p className={styles.statusDetail}>
                        <strong>Nome do aluno:</strong> {manifestationData.student}
                      </p>
                    </div>

                    <div className={styles.responseBox}>
                      <h3>Resposta da Unidade escolar:</h3>
                      <p>{manifestationData.response}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}



        </main>

        <Footer />
      </div>
    </>
  );
};

export default ColabStatusManifestacao;
