import React, { useState } from 'react';
import styles from './CH_CSS.module.css';

import Header from '../../Complementos/Colab/Header/C_Header';
import Footer from '../../Complementos/Colab/Footer/C_Footer';

import c1 from '../../../imagens/colab_1.png';
import c2 from '../../../imagens/colab_2.png';
import c3 from '../../../imagens/colab_3.png';
import c4 from '../../../imagens/colab_4.png';
import c5 from '../../../imagens/colab_5.png';


const ColabHome = () => {
  const [testimonial, setTestimonial] = useState('');
  const [testimonialsList, setTestimonialsList] = useState([
    {
      id: 1,
      text: "Com a ouvidoria, o diálogo entre funcionários, alunos e direção ficou mais direto e transparente. Somos mais ouvidos também.",
      author: "Fernanda Azevedo, assistente administrativa"
    },
    {
      id: 2,
      text: "A cada manifestação, vejo o quanto é importante termos um canal onde todos possam se expressar com segurança.",
      author: "Luciana Prado, coordenadora pedagógica"
    }
  ]);

  const features = [
    { id: 1, icon: c1, title: "Receber e ouvir manifestações com atenção",       link: "colab_ver_manifestacoes",  hasButton: true  },
    { id: 2, icon: c2, title: "Registrar ou verificar registros no sistema",      link: "colab_status_manifestacoes", hasButton: true  },
    { id: 3, icon: c3, title: "Encaminhar para os setores responsáveis",          link: "colab_encaminhar",         hasButton: true  },
    { id: 4, icon: c4, title: "Acompanhar prazos e respostas",                    link: "colab_responder",         hasButton: true  },
    { id: 5, icon: c5, title: "Garantir sigilo e ética no processo",              link: "#",                            hasButton: false },
  ];

  const guidelines = [
    { id: 1, title: "Como manter a confidencialidade?",             text: "Nunca compartilhe manifestações com pessoas não autorizadas. O sigilo é essencial para proteger quem se manifesta e preservar a integridade do processo." },
    { id: 2, title: "Trate todos com igualdade",                    text: "Independente de quem esteja se manifestando e qual seja o seu tipo de manifestação, o atendimento deve ser sempre respeitoso, sem privilégios ou preconceitos." },
    { id: 3, title: "Respeite os Prazos",                           text: "Encaminhe e acompanhe as manifestações dentro dos prazos estabelecidos. A agilidade no retorno mostra respeito com quem procurou ajuda." },
    { id: 4, title: "Oriente, mas não prometa o que não pode cumprir", text: "Informe sobre os próximos passos, prazos e limites da ouvidoria. Seja claro ao dizer que o caso será avaliado, mas evite prometer soluções imediatas." },
    { id: 5, title: "Busque ajuda quando necessário",               text: "Se tiver dúvidas sobre como lidar com uma manifestação ou se sentir inseguro diante de um relato delicado, fale com a coordenação da ouvidoria.", fullWidth: true },
  ];

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    if (testimonial.trim()) {
      setTestimonialsList(prev => [
        ...prev,
        { id: Date.now(), text: testimonial, author: "Colaborador(a)" }
      ]);
      setTestimonial('');
      alert('Depoimento adicionado com sucesso!');
    }
  };

  return (
    // pageTheme aplica as variáveis CSS locais do componente
    <div className={styles.pageTheme}>
      <div className='body'>
      <Header />
      {/* Skip Link */}
      <a href="#main-content" className={styles.skipLink}>
        Pular para o conteúdo principal
      </a>

      <main id="main-content">

        {/* ── Hero ── */}
        <section className={styles.heroSection} role="region" aria-labelledby="hero-title">
          <div className={`container ${styles.heroContent}`}>
            <h1 id="hero-title" className={styles.heroTitle}>
              Bem-vindo à área do colaborador da Ouvidoria Educacional
            </h1>
            <p className={styles.heroSubtitle}>
              Aqui você, profissional da educação, servidor ou colaborador da nossa instituição,
              encontra um canal dedicado à escuta, diálogo e construção conjunta de soluções.
              A Ouvidoria é um espaço legítimo de acolhimento de manifestações como sugestões,
              elogios, solicitações, reclamações ou denúncias que envolvam o ambiente educacional.
            </p>
            <a href="colab_ver_manifestacoes" className={styles.heroCta}>
              Ver manifestações da sua unidade
            </a>
          </div>
        </section>

        {/* ── Features ── */}
        <section className={styles.featuresSection} role="region" aria-labelledby="features-title">
          <div className="container">
            <h2 id="features-title" className={styles.sectionTitle}>
              Funções do Colaborador
            </h2>
            <div className={styles.featuresGrid}>
              {features.map(feature => (
                <article key={feature.id} className={styles.featureCard}>
                  <img
                    src={feature.icon}
                    alt={`Ícone para ${feature.title.toLowerCase()}`}
                    className={styles.featureIcon}
                  />
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  {feature.hasButton && (
                    <a href={feature.link} className={styles.featureButton}>Acessar</a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Guidelines ── */}
        <section className={styles.guidelinesSection} role="region" aria-labelledby="guidelines-title">
          <div className="container">
            <hr className={styles.dividerLine} />
            <h2 id="guidelines-title" className={styles.srOnly}>
              Diretrizes para colaboradores
            </h2>
            <div className={styles.guidelinesGrid}>
              {guidelines.map(guideline => (
                <article
                  key={guideline.id}
                  className={`${styles.guidelineItem} ${guideline.fullWidth ? styles.guidelineItemFullWidth : ''}`}
                >
                  <h3 className={styles.guidelineTitle}>{guideline.title}</h3>
                  <p className={styles.guidelineText}>{guideline.text}</p>
                </article>
              ))}
            </div>
            <hr className={styles.dividerLine} />
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className={styles.testimonialsSection} role="region" aria-labelledby="testimonials-title">
          <div className="container">
            <div className={styles.testimonialsWrapper}>
              <h2 id="testimonials-title" className={styles.testimonialsTitle}>
                Depoimentos de nossos colaboradores
              </h2>

              <div className={styles.testimonialsList}>
                {testimonialsList.map(item => (
                  <blockquote key={item.id} className={styles.testimonialCard}>
                    <p>"{item.text}"</p>
                    <cite>- {item.author}</cite>
                  </blockquote>
                ))}
              </div>

              <form
                className={styles.testimonialForm}
                aria-label="Adicionar depoimento"
                onSubmit={handleTestimonialSubmit}
              >
                <label htmlFor="testimonial" className={styles.srOnly}>
                  Escreva seu depoimento
                </label>
                <input
                  type="text"
                  id="testimonial"
                  placeholder="Escreva seu depoimento aqui..."
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                />
                <button type="submit" style={{ display: 'none' }} />
              </form>
            </div>
          </div>
        </section>
      <Footer />
      </main>
    </div>
    </div>
  );
};

export default ColabHome;
