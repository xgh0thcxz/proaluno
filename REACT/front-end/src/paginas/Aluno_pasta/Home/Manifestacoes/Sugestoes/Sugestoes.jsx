import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../../../Complementos/global.css';
import './SU_CSS.css';

import Header from '../../../../Complementos/Aluno/Manifestacoes/Sugestoes/Header/SU_Header';
import Footer from '../../../../Complementos/Aluno/Manifestacoes/Sugestoes/Footer/SU_Footer';

const AREAS = [
  { value: 'infraestrutura', label: 'Infraestrutura' },
  { value: 'ensino',         label: 'Ensino'         },
  { value: 'lazer',          label: 'Lazer'          },
  { value: 'aulas',          label: 'Aulas'          },
  { value: 'biblioteca',     label: 'Biblioteca'     },
  { value: 'laboratorios',   label: 'Laboratórios'   },
  { value: 'esportes',       label: 'Esportes'       },
  { value: 'eventos',        label: 'Eventos'        },
  { value: 'alimentacao',    label: 'Alimentação'    },
  { value: 'seguranca',      label: 'Segurança'      },
  { value: 'tecnologia',     label: 'Tecnologia'     },
  { value: 'outros',         label: 'Outros'         },
];

export default function Sugestoes() {
  const navigate     = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedAreas, setSelectedAreas] = useState([]);
  const [files, setFiles]                 = useState([]);
  const [submitted, setSubmitted]         = useState(false);
  const [protocol, setProtocol]           = useState('');
  const [loading, setLoading]             = useState(false);

  function toggleArea(area) {
    setSelectedAreas(prev =>
      prev.find(a => a.value === area.value)
        ? prev.filter(a => a.value !== area.value)
        : [...prev, area]
    );
  }

  function removeArea(value) {
    setSelectedAreas(prev => prev.filter(a => a.value !== value));
  }

  function handleFileChange(e) {
    setFiles(prev => [...prev, ...Array.from(e.target.files)]);
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    setLoading(true);
    setTimeout(() => {
      setProtocol(`SUG-${Date.now()}`);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }

  function handleNovaSugestao() {
    setSubmitted(false);
    setProtocol('');
    setFiles([]);
    setSelectedAreas([]);
  }

  return (
    <>
      <Header />
      <div className="body">

        <section id="sugestao" className="sugestao-section">

          {!submitted ? (
            <>
              {/* ── FORM PRINCIPAL ── */}
              <div className="container">
                <header className="sugestao-header">
                  <h1>SUGESTÃO</h1>
                  <h2>Dados da manifestação</h2>
                  <p>Preencha os campos referentes à sua sugestão</p>
                </header>

                <form className="suggestion-form">

                  {/* Unidade */}
                  <div className="form-group">
                    <label htmlFor="unidade">Selecione sua UNIDADE</label>
                    <div className="select-wrapper">
                      <select id="unidade" defaultValue="">
                        <option value="" disabled>Ex: ITB Brasilio Flores de Azevedo</option>
                        <option value="itb-brasilio">ITB Brasilio Flores de Azevedo</option>
                      </select>
                      <div className="select-arrow">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>

                  {/* Nome + Email */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nome">Nome</label>
                      <input type="text" id="nome" placeholder="Digite aqui o seu nome" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-mail</label>
                      <input type="email" id="email" placeholder="Digite seu E-mail" />
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone</label>
                    <input type="tel" id="telefone" placeholder="Digite o número do seu Telefone" />
                  </div>

                  {/* Área da sugestão */}
                  <div className="form-group">
                    <label>Área da sugestão</label>
                    <div className="category-options">
                      {AREAS.map(area => (
                        <div
                          key={area.value}
                          onClick={() => toggleArea(area)}
                          className={`category-option${
                            selectedAreas.find(a => a.value === area.value)
                              ? ' selected'
                              : ''
                          }`}
                        >
                          {area.label}
                        </div>
                      ))}
                    </div>

                    <div className="selected-categories">
                      <label>Categorias selecionadas:</label>
                      <div className="selected-tags">
                        {selectedAreas.map(area => (
                          <span key={area.value} className="selected-tag">
                            {area.label}
                            <span
                              className="remove-tag"
                              onClick={() => removeArea(area.value)}
                            >
                              &times;
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </form>
              </div>

              {/* ── DIVIDER ── */}
              <div className="section-divider">
                <div className="divider-line"></div>
                <div className="divider-icon">
                  <i className="fas fa-ellipsis-h"></i>
                </div>
                <div className="divider-line"></div>
              </div>

              {/* ── PERGUNTAS ── */}
              <div className="container">
                <p className="details-intro">
                  Compartilhe suas ideias para melhorar nossa escola.
                  Sua opinião é muito importante para nós!
                </p>

                <div className="question-box">
                  <label htmlFor="ideia-acolhedor">
                    Tem alguma ideia para tornar o ambiente escolar mais acolhedor?
                  </label>
                  <textarea id="ideia-acolhedor" placeholder="Algumas ideias"></textarea>
                </div>

                <div className="question-box">
                  <label htmlFor="mudancas">
                    Quais mudanças você gostaria de ver nas salas ou atividades oferecidas?
                  </label>
                  <textarea id="mudancas" placeholder="Nos diga o que pensa"></textarea>
                </div>

                <div className="question-box">
                  <label htmlFor="proposta-eventos">
                    Tem alguma proposta para eventos, projetos ou melhorias na estrutura da escola?
                  </label>
                  <textarea id="proposta-eventos" placeholder="O que você deseja a mais na sua escola?"></textarea>
                </div>

                <div className="question-box">
                  <label htmlFor="pratica-adotada">
                    Existe alguma prática que você acha que deveria ser adotada aqui?
                  </label>
                  <textarea id="pratica-adotada" placeholder="Alguma prática que passa tem sua escola?"></textarea>
                </div>

                <div className="question-box">
                  <label htmlFor="falta-instituicao">
                    O que você acredita que está faltando na instituição?
                  </label>
                  <textarea id="falta-instituicao" placeholder="Com base na sua experiência, nos diga o que falta na sua escola."></textarea>
                </div>

                {/* Upload */}
                <div className="question-box file-upload-box">
                  <label>Anexar arquivos (opcional)</label>
                  <div
                    className="upload-area"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Arraste e solte arquivos aqui ou clique para selecionar</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="file-list">
                    {files.map((f, i) => (
                      <div key={i} className="file-item">
                        {f.name}
                        <span
                          className="remove-file"
                          onClick={() => removeFile(i)}
                        >
                          &times;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="submit-wrapper">
                  <button
                    type="button"
                    className="submit-btn"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <div className="btn-loader">
                        <div className="loader-dot"></div>
                        <div className="loader-dot"></div>
                        <div className="loader-dot"></div>
                      </div>
                    ) : (
                      <span className="btn-text">Enviar Sugestão</span>
                    )}
                  </button>
                </div>
              </div>
            </>

          ) : (
            /* ── TELA DE SUCESSO ── */
            <div className="container">
              <div className="thank-you-page">
                <div className="thank-you-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h2>Obrigado pela sua sugestão!</h2>
                <p>
                  Sua manifestação foi registrada com sucesso. Abaixo está
                  o número do protocolo para acompanhamento:
                </p>
                <div className="protocol-number">{protocol}</div>
                <p>
                  Nossa equipe analisará sua manifestação e, se necessário,
                  entrará em contato.
                </p>
                <button className="back-btn" onClick={handleNovaSugestao}>
                  Fazer Nova Sugestão
                </button>
                <button className="home-btn" onClick={() => navigate('/home')}>
                  Voltar para Home
                </button>
              </div>
            </div>
          )}

        </section>

        <Footer />
      </div>
    </>
  );
}
