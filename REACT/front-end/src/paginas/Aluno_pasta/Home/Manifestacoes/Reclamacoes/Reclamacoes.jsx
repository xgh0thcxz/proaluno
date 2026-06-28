import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './R_CSS.module.css';

import Header from '../../../../Complementos/Aluno/Manifestacoes/Reclamacoes/Header/R_Header';
import Footer from '../../../../Complementos/Aluno/Manifestacoes/Reclamacoes/Footer/R_Footer';

export default function Reclamacoes() {
  const navigate    = useNavigate();
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
      const proto = `RCL-${Date.now()}`;
      setProtocol(proto);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }

  function handleNovaReclamacao() {
    setSubmitted(false);
    setProtocol('');
    setFiles([]);
  }

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className={styles.body}>
      <Header />

      <section className={styles.reclamacaoSection}>

        {!submitted ? (
          <>
            {/* CABEÇALHO + FORMULÁRIO */}
            <div className={styles.container}>
              <header className={styles.reclamacaoHeader}>
                <h1>RECLAMAÇÃO</h1>
                <h2>Dados da reclamação</h2>
                <p>Preencha os campos referentes à sua reclamação</p>
              </header>

              <form className={styles.complaintForm} onSubmit={handleSubmit}>

                {/* Unidade */}
                <div className={styles.formGroup}>
                  <label htmlFor="unidade">Selecione sua UNIDADE</label>
                  <div className={styles.selectWrapper}>
                    <select id="unidade" required defaultValue="">
                      <option value="" disabled>Ex: ITB Brasilio Flores de Azevedo</option>
                      <option value="unidade1">Unidade Centro</option>
                      <option value="unidade2">Unidade Zona Norte</option>
                      <option value="unidade3">Unidade Zona Sul</option>
                    </select>
                    <div className={styles.selectArrow}>
                      <i className="fas fa-chevron-down" />
                    </div>
                  </div>
                </div>

                {/* Nome + Email */}
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

                {/* Telefone */}
                <div className={styles.formGroup}>
                  <label htmlFor="telefone">Telefone Celular</label>
                  <input type="tel" id="telefone" placeholder="Digite o número do seu Telefone Celular" />
                </div>

                {/* Categoria */}
                <div className={styles.formGroup}>
                  <label htmlFor="categoria">Categoria da reclamação</label>
                  <div className={styles.selectWrapper}>
                    <select id="categoria" required defaultValue="">
                      <option value="" disabled>Selecione a categoria</option>
                      <option value="infraestrutura">Problemas com Infraestrutura</option>
                      <option value="pedagogico">Questões Pedagógicas</option>
                      <option value="funcionarios">Problemas com Funcionários</option>
                      <option value="seguranca">Questões de Segurança</option>
                      <option value="outros">Outros</option>
                    </select>
                    <div className={styles.selectArrow}>
                      <i className="fas fa-chevron-down" />
                    </div>
                  </div>
                </div>

                {/* Local */}
                <div className={styles.formGroup}>
                  <label htmlFor="local">Local</label>
                  <input type="text" id="local" placeholder="Onde aconteceu?" />
                </div>

                {/* Descrição */}
                <div className={styles.formGroup}>
                  <label htmlFor="descricao">Descrição</label>
                  <textarea
                    id="descricao"
                    placeholder="Descreva o fato, relate os detalhes sobre sua reclamação."
                    required
                  />
                </div>

              </form>
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
            <div className={styles.container}>
              <p className={styles.detailsIntro}>
                Nos conte mais a fundo o motivo da sua reclamação. Lembre-se que estamos
                aqui para te escutar e tomar as medidas cabíveis.
              </p>

              {/* Envolvidos */}
              <div className={styles.questionBox}>
                <label htmlFor="envolvidos">Quem são os envolvidos?</label>
                <input type="text" id="envolvidos" placeholder="Descreva os envolvidos" />
              </div>

              {/* Motivo */}
              <div className={styles.questionBox}>
                <label htmlFor="motivo">Por que você fez essa reclamação?</label>
                <textarea
                  id="motivo"
                  placeholder="Nos conte o contexto da reclamação para podermos ajudar melhor."
                />
              </div>

              {/* Radio */}
              <div className={styles.questionBox}>
                <label>Você acredita que assim terá um ambiente escolar mais confortável?</label>
                <div className={styles.radioGroup}>
                  {[
                    { value: 'sim',    label: 'Sim'    },
                    { value: 'nao',    label: 'Não'    },
                    { value: 'talvez', label: 'Talvez' },
                  ].map(({ value, label }) => (
                    <label key={value} className={styles.radioOption}>
                      <input type="radio" name="ambiente" value={value} />
                      <span className={styles.radioCustom} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Upload */}
              <div className={`${styles.questionBox} ${styles.fileUploadBox}`}>
                <label>Anexar arquivos (opcional)</label>
                <div
                  className={styles.uploadArea}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="fas fa-cloud-upload-alt" />
                  <p>Arraste e solte arquivos aqui ou clique para selecionar</p>
                  <p className={styles.smallText}>Formatos aceitos: JPG, PNG, PDF, DOC (máx. 10MB)</p>
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

              {/* Submit */}
              <div className={styles.submitWrapper}>
                <button
                  type="button"
                  className={styles.submitBtn}
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <div className={styles.btnLoader}>
                      <div className={styles.loaderDot} />
                      <div className={styles.loaderDot} />
                      <div className={styles.loaderDot} />
                    </div>
                  ) : (
                    <span>ENVIAR RECLAMAÇÃO</span>
                  )}
                </button>
              </div>
            </div>
          </>

        ) : (
          /* ── TELA DE SUCESSO ──────────────────────────────── */
          <div className={styles.container}>
            <div className={styles.thankYouPage}>
              <div className={styles.thankYouIcon}>
                <i className="fas fa-check-circle" />
              </div>
              <h2>Reclamação Registrada com Sucesso!</h2>
              <p>
                Sua reclamação foi enviada e será analisada pela nossa equipe.
                Abaixo está o número do protocolo para acompanhamento:
              </p>
              <div className={styles.protocolNumber}>{protocol}</div>
              <p>Anote o número de protocolo para acompanhar o andamento da sua reclamação.</p>
              <button className={styles.backBtn} onClick={handleNovaReclamacao}>
                Fazer Nova Reclamação
              </button>
            </div>
          </div>
        )}

      </section>

      <Footer />
    </div>
  );
}
