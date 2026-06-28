import React, { useState, useEffect } from 'react';
import styles from './CE_CSS.module.css';

import Header from '../../Complementos/Colab/Header/C_Header';
import Footer from '../../Complementos/Colab/Footer/C_Footer';

const ColabEncaminhar = () => {
  const [formData, setFormData] = useState({
    protocolNumber: '',
    summary: '',
    sector: '',
    internalMessage: ''
  });

  const [errors, setErrors] = useState({
    protocolNumber: false,
    summary: false,
    sector: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    protocolNumber: false,
    summary: false
  });

  const sectors = [
    { id: 'denuncia',   label: 'Denúncia',    color: '#ff6b6b' },
    { id: 'reclamacao', label: 'Reclamação',  color: '#ffa500' },
    { id: 'solicitacao',label: 'Solicitação', color: '#4ecdc4' },
    { id: 'elogio',     label: 'Elogio',      color: '#51cf66' },
    { id: 'sugestoes',  label: 'Sugestões',   color: '#339af0' }
  ];

  // Validação em tempo real
  useEffect(() => {
    const isProtocolValid = formData.protocolNumber.trim().length > 0;
    const isSummaryValid  = formData.summary.trim().length > 0;
    const isSectorValid   = formData.sector !== '';

    setErrors({
      protocolNumber: touchedFields.protocolNumber && !isProtocolValid,
      summary:        touchedFields.summary && !isSummaryValid,
      sector:         !isSectorValid && (touchedFields.protocolNumber || touchedFields.summary)
    });
  }, [formData, touchedFields]);

  const isFormValid = () =>
    formData.protocolNumber.trim().length > 0 &&
    formData.summary.trim().length > 0 &&
    formData.sector !== '';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      'protocol-number':  'protocolNumber',
      'summary':          'summary',
      'internal-message': 'internalMessage'
    };
    const fieldName = fieldMap[id];
    if (fieldName) {
      setFormData(prev => ({ ...prev, [fieldName]: value }));
    }
  };

  const handleFieldBlur = (field) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleSectorSelect = (sectorId) => {
    setFormData(prev => ({ ...prev, sector: sectorId }));
    if (errors.sector) {
      setErrors(prev => ({ ...prev, sector: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouchedFields({ protocolNumber: true, summary: true });

    const isProtocolValid = formData.protocolNumber.trim().length > 0;
    const isSummaryValid  = formData.summary.trim().length > 0;
    const isSectorValid   = formData.sector !== '';

    if (!isProtocolValid || !isSummaryValid || !isSectorValid) {
      setErrors({
        protocolNumber: !isProtocolValid,
        summary:        !isSummaryValid,
        sector:         !isSectorValid
      });
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const sectorLabel = sectors.find(s => s.id === formData.sector)?.label || formData.sector;

      const encaminhamentoData = {
        protocol:            formData.protocolNumber,
        summary:             formData.summary,
        sector:              formData.sector,
        sectorLabel,
        internalMessage:     formData.internalMessage,
        encaminhadoPor:      'Colaborador',
        dataEncaminhamento:  new Date().toISOString(),
        status:              'encaminhado'
      };

      console.log('Dados do encaminhamento:', encaminhamentoData);

      setShowSuccess(true);
      setTimeout(() => {
        resetForm();
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Erro ao encaminhar manifestação:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ protocolNumber: '', summary: '', sector: '', internalMessage: '' });
    setTouchedFields({ protocolNumber: false, summary: false });
    setErrors({ protocolNumber: false, summary: false, sector: false });
  };

  const getSelectedSectorLabel = () =>
    sectors.find(s => s.id === formData.sector)?.label || '';

  return (

    <div className={styles.pageTheme}>
      <div className='body'>
      <Header />
      {/* Skip Link */}
      <a href="#main-content" className={styles.skipLink}>
        Pular para o conteúdo principal
      </a>

      <main className={styles.mainContentSection} id="main-content">
        <div className={`container ${styles.mainContainer}`}>

          <h1 className={styles.mainTitle}>
            Encaminhamento de Manifestações aos Setores Responsáveis
          </h1>
          <p className={styles.mainDescription}>
            Aqui você poderá direcionar as manifestações recebidas para os setores competentes
            da instituição. Selecione o setor mais adequado para tratar a demanda e acompanhe
            o status do processo.
          </p>
          <hr className={styles.divider} />

          <div className={styles.formWrapper}>
            <form
              className={styles.manifestationForm}
              id="manifestationForm"
              onSubmit={handleSubmit}
            >

              {/* Número do Protocolo */}
              <div className={styles.formGroup}>
                <label htmlFor="protocol-number" className={styles.formLabel}>
                  Número do protocolo
                </label>
                <input
                  type="text"
                  id="protocol-number"
                  className={`${styles.formInput} ${errors.protocolNumber ? styles.error : ''}`}
                  placeholder="Insira o número do protocolo"
                  required
                  value={formData.protocolNumber}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('protocolNumber')}
                  disabled={isSubmitting}
                />
                {errors.protocolNumber && (
                  <span className={styles.fieldError}>Protocolo é obrigatório</span>
                )}
              </div>

              {/* Resumo da Manifestação */}
              <div className={styles.formGroup}>
                <label htmlFor="summary" className={styles.formLabel}>
                  Resumo da manifestação
                </label>
                <input
                  type="text"
                  id="summary"
                  className={`${styles.formInput} ${errors.summary ? styles.error : ''}`}
                  placeholder="Insira aqui sobre o que se trata a manifestação"
                  required
                  value={formData.summary}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('summary')}
                  disabled={isSubmitting}
                />
                {errors.summary && (
                  <span className={styles.fieldError}>Resumo é obrigatório</span>
                )}
              </div>

              {/* Seleção de Setor */}
              <div className={`${styles.formGroup} ${styles.sectorSelection}`}>
                <p className={styles.formLabel}>Selecione o setor responsável:</p>
                <div className={styles.sectorButtons}>
                  {sectors.map(sector => (
                    <button
                      key={sector.id}
                      type="button"
                      className={`${styles.sectorBtn} ${formData.sector === sector.id ? styles.active : ''}`}
                      data-sector={sector.id}
                      onClick={() => handleSectorSelect(sector.id)}
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: formData.sector === sector.id ? sector.color : 'transparent',
                        borderColor: sector.color,
                        color: formData.sector === sector.id ? 'white' : sector.color
                      }}
                    >
                      {sector.label}
                    </button>
                  ))}
                </div>
                {errors.sector && (
                  <span className={styles.fieldError}>Selecione um setor responsável</span>
                )}
              </div>

              {/* Mensagem Interna */}
              <div className={styles.formGroup}>
                <label htmlFor="internal-message" className={styles.formLabel}>
                  Mensagem interna{' '}
                  <span className={styles.optionalText}>*opcional</span>
                </label>
                <input
                  type="text"
                  id="internal-message"
                  className={styles.formInput}
                  placeholder="Insira aqui sua observação caso necessário"
                  value={formData.internalMessage}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? 'Encaminhando...' : 'Encaminhar manifestação'}
              </button>

              {/* Feedback */}
              {showSuccess && (
                <div className={`${styles.message} ${styles.successMessage}`}>
                  Manifestação encaminhada com sucesso para o setor {getSelectedSectorLabel()}!
                </div>
              )}

              {showError && (
                <div className={`${styles.message} ${styles.errorMessage}`}>
                  Por favor, preencha todos os campos obrigatórios e selecione um setor.
                </div>
              )}

            </form>
          </div>
          
        </div>
      </main>
                <Footer />
</div>

    </div>
  );
};

export default ColabEncaminhar;
