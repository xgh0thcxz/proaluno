import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SO_CSS.module.css';

import Header from '../../../../Complementos/Aluno/Manifestacoes/Solicitacoes/Header/SO_Header';
import Footer from '../../../../Complementos/Aluno/Manifestacoes/Solicitacoes/Footer/SO_Footer';

// ── Dados estáticos ────────────────────────────────────────────
const CATEGORIES = [
  { value: 'documentos',     label: 'Documentos'     },
  { value: 'informacoes',    label: 'Informações'    },
  { value: 'servicos',       label: 'Serviços'       },
  { value: 'infraestrutura', label: 'Infraestrutura' },
  { value: 'academico',      label: 'Acadêmico'      },
  { value: 'financeiro',     label: 'Financeiro'     },
  { value: 'administrativo', label: 'Administrativo' },
  { value: 'tecnologia',     label: 'Tecnologia'     },
  { value: 'biblioteca',     label: 'Biblioteca'     },
  { value: 'outros',         label: 'Outros'         },
];

const URGENCIAS = [
  { value: 'baixa',   label: 'Baixa'   },
  { value: 'media',   label: 'Média'   },
  { value: 'alta',    label: 'Alta'    },
  { value: 'urgente', label: 'Urgente' },
];

export default function Solicitacoes() {
  const navigate     = useNavigate();
  const fileInputRef = useRef(null);

  // Estados
  const [selectedCats, setSelectedCats] = useState([]);   // categorias selecionadas
  const [files, setFiles]               = useState([]);
  const [submitted, setSubmitted]       = useState(false);
  const [protocol, setProtocol]         = useState('');
  const [loading, setLoading]           = useState(false);

  // ── Categorias ────────────────────────────────────────────────
  function toggleCategory(cat) {
    setSelectedCats(prev =>
      prev.find(c => c.value === cat.value)
        ? prev.filter(c => c.value !== cat.value)   // remove
        : [...prev, cat]                             // adiciona
    );
  }

  function removeCategory(value) {
    setSelectedCats(prev => prev.filter(c => c.value !== value));
  }

  // ── Arquivos ──────────────────────────────────────────────────
  function handleFileChange(e) {
    const novos = Array.from(e.target.files);
    setFiles(prev => [...prev, ...novos]);
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  // ── Submit ────────────────────────────────────────────────────
  function handleSubmit() {
    setLoading(true);
    setTimeout(() => {
      const proto = `SOL-${Date.now()}`;
      setProtocol(proto);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }

  function handleNovaSolicitacao() {
    setSubmitted(false);
    setProtocol('');
    setFiles([]);
    setSelectedCats([]);
  }

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className={styles.body}>
      <Header />

      <section className={styles.solicitacaoSection}>

        {!submitted ? (
          <>
            {/* ── CABEÇALHO + FORM PRINCIPAL ── */}
            <div className={styles.container}>
              <header className={styles.solicitacaoHeader}>
                <h1>SOLICITAÇÃO</h1>
                <h2>Dados da solicitação</h2>
                <p>Preencha os campos referentes à sua solicitação</p>
              </header>

              <form className={styles.solicitationForm}>

                {/* Unidade */}
                <div className={styles.formGroup}>
                  <label htmlFor="unidade">Selecione sua UNIDADE</label>
                  <div className={styles.selectWrapper}>
                    <select id="unidade" defaultValue="">
                      <option value="" disabled>Ex: ITB Brasilio Flores de Azevedo</option>
                      <option value="itb-brasilio">ITB Brasilio Flores de Azevedo</option>
                    </select>
                    <div className={styles.selectArrow}>
                      <i className="fas fa-chevron-down" />
                    </div>
                  </div>
                </div>

                {/* Nome + E-mail */}
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
                  <label htmlFor="telefone">Telefone</label>
                  <input type="tel" id="telefone" placeholder="Digite o número do seu Telefone" />
                </div>

                {/* Tipo de Solicitação — chips */}
                <div className={styles.formGroup}>
                  <label>Tipo de Solicitação</label>
                  <div className={styles.categoryOptions}>
                    {CATEGORIES.map(cat => (
                      <div
                        key={cat.value}
                        onClick={() => toggleCategory(cat)}
                        className={`${styles.categoryOption} ${
                          selectedCats.find(c => c.value === cat.value)
                            ? styles.categoryOptionSelected
                            : ''
                        }`}
                      >
                        {cat.label}
                      </div>
                    ))}
                  </div>

                  {/* Tags selecionadas */}
                  <div className={styles.selectedCategories}>
                    <label>Tipos selecionados:</label>
                    <div className={styles.selectedTags}>
                      {selectedCats.map(cat => (
                        <span key={cat.value} className={styles.selectedTag}>
                          {cat.label}
                          <span
                            className={styles.removeTag}
                            onClick={() => removeCategory(cat.value)}
                          >
                            &times;
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nível de Urgência */}
                <div className={styles.formGroup}>
                  <label>Nível de Urgência</label>
                  <div className={styles.radioGroup}>
                    {URGENCIAS.map(({ value, label }) => (
                      <label key={value} className={styles.radioOption}>
                        <input type="radio" name="urgencia" value={value} />
                        <span className={styles.radioCustom} />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </form>
            </div>

            {/* ── DIVIDER ── */}
            <div className={styles.sectionDivider}>
              <div className={styles.dividerLine} />
              <div className={styles.dividerIcon}>
                <i className="fas fa-ellipsis-h" />
              </div>
              <div className={styles.dividerLine} />
            </div>

            {/* ── DETALHES ADICIONAIS ── */}
            <div className={styles.container}>
              <p className={styles.detailsIntro}>
                Descreva detalhadamente sua solicitação. Quanto mais informações
                você fornecer, melhor poderemos atendê-lo.
              </p>

              {/* Descrição */}
              <div className={styles.questionBox}>
                <label htmlFor="descricao">Descreva sua solicitação</label>
                <textarea
                  id="descricao"
                  placeholder="Descreva detalhadamente o que você precisa"
                />
              </div>

              {/* Motivo */}
              <div className={styles.questionBox}>
                <label htmlFor="motivo">Qual o motivo desta solicitação?</label>
                <textarea
                  id="motivo"
                  placeholder="Explique por que esta solicitação é necessária"
                />
              </div>

              {/* Prazo */}
              <div className={styles.questionBox}>
                <label htmlFor="prazo">Prazo desejado para resolução</label>
                <input type="date" id="prazo" />
              </div>

              {/* Observações */}
              <div className={styles.questionBox}>
                <label htmlFor="observacoes">Observações adicionais</label>
                <textarea
                  id="observacoes"
                  placeholder="Alguma informação adicional que considere importante"
                />
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
                    <span>Enviar Solicitação</span>
                  )}
                </button>
              </div>
            </div>
          </>

        ) : (
          /* ── TELA DE SUCESSO ── */
          <div className={styles.container}>
            <div className={styles.thankYouPage}>
              <div className={styles.thankYouIcon}>
                <i className="fas fa-check-circle" />
              </div>
              <h2>Obrigado pela sua solicitação!</h2>
              <p>
                Sua solicitação foi registrada com sucesso. Abaixo está o número
                do protocolo para acompanhamento:
              </p>
              <div className={styles.protocolNumber}>{protocol}</div>
              <p>Nossa equipe analisará sua solicitação e, se necessário, entrará em contato.</p>
              <button className={styles.backBtn} onClick={handleNovaSolicitacao}>
                Fazer Nova Solicitação
              </button>
              <button className={styles.homeBtn} onClick={() => navigate('/home')}>
                Voltar para Home
              </button>
            </div>
          </div>
        )}

      </section>

      <Footer />
    </div>
  );
}
