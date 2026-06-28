import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './E_CSS.module.css';

import Header from '../../../../Complementos/Aluno/Manifestacoes/Elogios/Header/E_Header';
import Footer from '../../../../Complementos/Aluno/Manifestacoes/Elogios/Footer/E_Footer';

export default function Elogios() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [files, setFiles]         = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [protocol, setProtocol]   = useState('');
  const [loading, setLoading]     = useState(false);

  // ── Arquivos ──────────────────────────────────────────────────
  function handleFileChange(e) {
    const novos = Array.from(e.target.files);
    setFiles(prev => [...prev, ...novos]);
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  // ── Submit ────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const proto = `ELG-${Date.now()}`;
      setProtocol(proto);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }

  function handleNovoElogio() {
    setSubmitted(false);
    setProtocol('');
    setFiles([]);
  }

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className={styles.body}>
      <Header />

      <section className={styles.elogioSection}>
        <div className={styles.container}>

          {/* ── CABEÇALHO ──────────────────────────────────────── */}
          <header className={styles.elogioHeader}>
            <h1>ELOGIO</h1>
            <h2>Dados da manifestação</h2>
            <p>Preencha os campos referentes ao seu elogio</p>
          </header>

          {!submitted ? (
            <form className={styles.elogioForm} onSubmit={handleSubmit}>

              {/* DADOS BÁSICOS */}
              <div className={styles.formGroup}>
                <label htmlFor="unidade">Selecione sua unidade:</label>
                <div className={styles.selectWrapper}>
                  <select id="unidade" defaultValue="">
                    <option value="" disabled>Ex: ITB Brasilio Flores de Azevedo</option>
                    <option value="ITB">ITB Brasilio Flores de Azevedo</option>
                  </select>
                  <div className={styles.selectArrow}>
                    <i className="fas fa-chevron-down" />
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome</label>
                  <input type="text" id="nome" placeholder="Digite aqui o seu nome" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" placeholder="Digite seu E-mail" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="telefone">Telefone</label>
                <input type="tel" id="telefone" placeholder="Digite o número do seu Telefone" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="quemElogiar">Quem você gostaria de elogiar?</label>
                <input type="text" id="quemElogiar" placeholder="Nome, cargo ou setor" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="motivo">Por que você gostaria de elogiar?</label>
                <textarea
                  id="motivo"
                  placeholder="Conte sobre o projeto com você e por que gostaria de obter esse reconhecimento."
                />
              </div>

              {/* DIVIDER */}
              <div className={styles.sectionDivider}>
                <div className={styles.dividerLine} />
                <div className={styles.dividerIcon}>
                  <i className="fas fa-ellipsis-h" />
                </div>
                <div className={styles.dividerLine} />
              </div>

              {/* DETALHES ADICIONAIS */}
              <p className={styles.detailsIntro}>
                Nos conte mais detalhes sobre o seu elogio. Valorizamos o reconhecimento do bom trabalho realizado.
              </p>

              <div className={styles.questionBox}>
                <label htmlFor="dataOcorrido">Data do ocorrido</label>
                <input type="date" id="dataOcorrido" />
              </div>

              <div className={styles.questionBox}>
                <label htmlFor="impacto">Qual foi o impacto positivo dessa ação?</label>
                <textarea
                  id="impacto"
                  placeholder="Descreva como essa ação impactou positivamente você ou outros"
                />
              </div>

              <div className={styles.questionBox}>
                <label>Você gostaria que esse reconhecimento fosse compartilhado publicamente?</label>
                <div className={styles.radioGroup}>
                  {['sim', 'nao'].map(v => (
                    <label key={v} className={styles.radioOption}>
                      <input type="radio" name="compartilhar" value={v} />
                      <span className={styles.radioCustom} />
                      <span>{v === 'sim' ? 'Sim' : 'Não'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* UPLOAD */}
              <div className={`${styles.questionBox} ${styles.fileUploadBox}`}>
                <label>Anexar arquivos (opcional)</label>
                <div
                  className={styles.uploadArea}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="fas fa-cloud-upload-alt" />
                  <p>Arraste e solte arquivos aqui ou clique para selecionar</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>

                <div className={styles.fileList}>
                  {files.map((f, i) => (
                    <div key={i} className={styles.fileItem}>
                      {f.name}
                      <span
                        className={styles.removeFile}
                        onClick={() => removeFile(i)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUBMIT */}
              <div className={styles.submitWrapper}>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? (
                    <div className={styles.btnLoader}>
                      <div className={styles.loaderDot} />
                      <div className={styles.loaderDot} />
                      <div className={styles.loaderDot} />
                    </div>
                  ) : (
                    <span>Enviar Elogio</span>
                  )}
                </button>
              </div>

            </form>

          ) : (
            /* ── TELA DE SUCESSO ──────────────────────────────── */
            <div className={styles.thankYouPage}>
              <div className={styles.thankYouIcon}>
                <i className="fas fa-check-circle" />
              </div>
              <h2>Obrigado pelo seu elogio!</h2>
              <p>
                Sua manifestação foi registrada com sucesso. Abaixo está o número
                do protocolo para acompanhamento:
              </p>
              <div className={styles.protocolNumber}>{protocol}</div>
              <p>Nossa equipe analisará sua manifestação e, se necessário, entrará em contato.</p>
              <button className={styles.backBtn} onClick={handleNovoElogio}>
                Fazer Novo Elogio
              </button>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}
