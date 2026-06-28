import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './D_CSS.module.css';

import Header from '../../../../Complementos/Aluno/Manifestacoes/Denuncias/Header/D_Header';
import Footer from '../../../../Complementos/Aluno/Manifestacoes/Denuncias/Footer/D_Footer';

const ENVOLVIDOS_COL1 = [
  'Diretores', 'Pais ou responsáveis', 'Desconhecido',
  'Funções administrativas', 'Estagiários', 'Visitantes',
  'Receios não identificados', 'Protestantes',
];

const ENVOLVIDOS_COL2 = [
  'Monitoras', 'Vigilantes de serviço', 'Anônimo',
  'Coordenadores pedagógicos', 'Outros', 'Voluntários',
  'Comunidade do entorno',
];

export default function Denuncias() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedEnvolvidos, setSelectedEnvolvidos] = useState([]);
  const [files, setFiles]                           = useState([]);
  const [submitted, setSubmitted]                   = useState(false);
  const [protocol, setProtocol]                     = useState('');
  const [loading, setLoading]                       = useState(false);

  // ── Envolvidos ──────────────────────────────────────────────────────────────
  function toggleEnvolvido(nome) {
    setSelectedEnvolvidos(prev =>
      prev.includes(nome) ? prev.filter(e => e !== nome) : [...prev, nome]
    );
  }

  function removeEnvolvido(nome) {
    setSelectedEnvolvidos(prev => prev.filter(e => e !== nome));
  }

  // ── Arquivos ─────────────────────────────────────────────────────────────────
  function handleFileChange(e) {
    const novos = Array.from(e.target.files);
    setFiles(prev => [...prev, ...novos]);
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  // ── Submit ────────────────────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const proto = `PROT-${Date.now()}`;
      setProtocol(proto);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }

  function handleNovaDenuncia() {
    setSubmitted(false);
    setProtocol('');
    setSelectedEnvolvidos([]);
    setFiles([]);
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className={styles.body}>
      <main>
        <Header />

        <section className={styles.denunciaSection}>
          <div className={styles.container}>

            {/* ── CABEÇALHO ─────────────────────────────────────────────────── */}
            <header className={styles.denunciaHeader}>
              <h1>DENÚNCIA</h1>
              <h2>Dados de manifestação</h2>
              <p>Preencha os campos referentes à sua manifestação.</p>
            </header>

            {/* ════════════════════════════════════════════════════════════════
                FORMULÁRIO
            ════════════════════════════════════════════════════════════════ */}
            {!submitted ? (
              <form className={styles.complaintForm} onSubmit={handleSubmit}>

                {/* SEÇÃO 1 — DADOS BÁSICOS */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Dados Básicos</h3>

                  <div className={styles.formGroup}>
                    <label htmlFor="unidade">Selecione sua UNIDADE</label>
                    <div className={styles.selectWrapper}>
                      <select id="unidade" required defaultValue="">
                        <option value="" disabled>Ex: ITB Brasílio Flores de Azevedo</option>
                        <option value="unidade1">ITB Brasílio Flores de Azevedo</option>
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
                    <label htmlFor="telefone">Telefone Celular</label>
                    <input type="tel" id="telefone" placeholder="Digite o número do seu Telefone Celular" />
                  </div>
                </div>

                {/* SEÇÃO 2 — DETALHES DA DENÚNCIA */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Detalhes da Denúncia</h3>

                  <div className={styles.formGroup}>
                    <label htmlFor="assunto">Assunto</label>
                    <div className={styles.selectWrapper}>
                      <select id="assunto" required defaultValue="">
                        <option value="" disabled>Nos diga sobre o que a denúncia é</option>
                        <option value="assunto1">Problemas com Infraestrutura</option>
                        <option value="assunto2">Questões Pedagógicas</option>
                        <option value="assunto3">Problemas com Funcionários</option>
                        <option value="assunto4">Questões de Segurança</option>
                        <option value="assunto5">Outros</option>
                      </select>
                      <div className={styles.selectArrow}>
                        <i className="fas fa-chevron-down" />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="local">Local</label>
                    <input type="text" id="local" placeholder="Onde aconteceu?" />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                      id="descricao"
                      placeholder="Descreva o fato, relate os detalhes sobre sua manifestação."
                      required
                    />
                  </div>
                </div>

                {/* SEÇÃO 3 — DETALHES ADICIONAIS */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Detalhes Adicionais</h3>
                  <p className={styles.sectionDescription}>
                    Nos conte mais a fundo o motivo da sua denúncia. Lembre-se que estamos
                    aqui para te escutar e fazer as medidas cabíveis.
                  </p>

                  {/* Envolvidos */}
                  <div className={styles.questionBox}>
                    <label>Quem são os envolvidos?</label>
                    <div className={styles.involvedOptions}>
                      {[ENVOLVIDOS_COL1, ENVOLVIDOS_COL2].map((col, ci) => (
                        <div key={ci} className={styles.optionCategory}>
                          <div className={styles.optionButtons}>
                            {col.map(nome => (
                              <button
                                key={nome}
                                type="button"
                                onClick={() => toggleEnvolvido(nome)}
                                className={`${styles.involvedOption} ${
                                  selectedEnvolvidos.includes(nome) ? styles.selected : ''
                                }`}
                              >
                                {nome}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.selectedOptions}>
                      <label>Envolvidos selecionados:</label>
                      <div className={styles.selectedTags}>
                        {selectedEnvolvidos.map(nome => (
                          <span key={nome} className={styles.selectedTag}>
                            {nome}
                            <span
                              className={styles.removeTag}
                              onClick={() => removeEnvolvido(nome)}
                            >
                              &times;
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="data">Quando aconteceu?</label>
                    <input type="date" id="data" />
                  </div>
                </div>

                {/* SEÇÃO 4 — AÇÕES TOMADAS */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Ações Tomadas</h3>

                  <div className={styles.questionBox}>
                    <label>Você entrou em contato com algum auxiliar da sua unidade escolar?</label>
                    <div className={styles.radioGroup}>
                      {['sim', 'nao'].map(v => (
                        <label key={v} className={styles.radioOption}>
                          <input type="radio" name="contato-auxiliar" value={v} />
                          <span className={styles.radioCustom} />
                          {v === 'sim' ? 'Sim' : 'Não'}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={styles.questionBox}>
                    <label>Deseja relatar o caso às autoridades?</label>
                    <div className={styles.radioGroup}>
                      {['sim', 'nao'].map(v => (
                        <label key={v} className={styles.radioOption}>
                          <input type="radio" name="autoridades" value={v} />
                          <span className={styles.radioCustom} />
                          {v === 'sim' ? 'Sim' : 'Não'}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SEÇÃO 5 — ANEXOS */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>Anexos</h3>

                  <div className={`${styles.questionBox} ${styles.fileUploadBox}`}>
                    <label>
                      Nos ajuda anexando vídeos, áudios, qualquer arquivo que possa ajudar
                      no caso. (Se tiver)
                    </label>
                    <div
                      className={styles.uploadArea}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <i className="fas fa-cloud-upload-alt" />
                      <p>Clique para enviar arquivos</p>
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
                </div>

                {/* SUBMIT */}
                <div className={styles.submitWrapper}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className={styles.btnLoader}>
                        <div className={styles.loaderDot} />
                        <div className={styles.loaderDot} />
                        <div className={styles.loaderDot} />
                      </div>
                    ) : (
                      <span className={styles.btnText}>ENVIAR DENÚNCIA</span>
                    )}
                  </button>
                </div>
              </form>

            ) : (
              /* ════════════════════════════════════════════════════════════════
                  TELA DE SUCESSO
              ════════════════════════════════════════════════════════════════ */
              <div className={styles.thankYouPage}>
                <div className={styles.thankYouIcon}>
                  <i className="fas fa-check-circle" />
                </div>
                <h2>Denúncia Registrada com Sucesso!</h2>
                <p>
                  Sua denúncia foi enviada e será analisada pela nossa equipe.
                  Obrigado por contribuir para um ambiente melhor.
                </p>
                <div className={styles.protocolNumber}>{protocol}</div>
                <p>Anote o número de protocolo para acompanhar o andamento da sua denúncia.</p>

                <div className={styles.thankYouActions}>
                  <button className={styles.backBtn} onClick={handleNovaDenuncia}>
                    Fazer Nova Denúncia
                  </button>
                  <button className={styles.homeBtn} onClick={() => navigate('/home')}>
                    Voltar para Home
                  </button>
                </div>
              </div>
            )}

          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
