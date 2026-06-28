import React, { useState } from 'react';
import styles from './C_CSS.module.css';
import './C_JS'

import Header from '../../Complementos/Aluno/Header/Header';
import Footer from '../../Complementos/Aluno/Footer/Footer';

export default function Contato() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors]     = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim())                                newErrors.name    = true;
    if (!formData.email.trim() ||
        !/\S+@\S+\.\S+/.test(formData.email))                newErrors.email   = true;
    if (!formData.message.trim())                             newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setModalOpen(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="body">
      <div className="page-wrapper">
        <Header />
        <main>

          {/* ── Feedback Section ── */}
          <section className={styles.feedbackSection}>
            <div className={styles.feedbackContainer}>

              <div className={styles.feedbackIntro}>
                <h1 className={styles.feedbackTitle}>Deixe seu Feedback</h1>
                <p className={styles.feedbackDescription}>
                  Sua opinião é essencial para melhorarmos continuamente este site da ouvidoria.
                  Conte se conseguiu navegar sem dificuldades, se encontrou o que precisava e como
                  podemos deixar tudo ainda mais claro e fácil para você.
                </p>
              </div>

              <div className={styles.feedbackContentGrid}>

                {/* ── Formulário ── */}
                <div className={styles.formWrapper}>
                  <div className={styles.formCard}>
                    <form onSubmit={handleSubmit}>

                      <div className={styles.formGroup}>
                        <label htmlFor="name">Nome</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Insira seu nome"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={errors.name ? styles.inputError : ''}
                        />
                        {errors.name && (
                          <div className={styles.errorMessage}>Por favor, insira seu nome</div>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="email">E-mail</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Digite seu e-mail"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={errors.email ? styles.inputError : ''}
                        />
                        {errors.email && (
                          <div className={styles.errorMessage}>Por favor, insira um e-mail válido</div>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="phone">Telefone Celular</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Digite o número do seu Telefone Celular"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="message">Mensagem</label>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          placeholder="Explique sua mensagem com clareza."
                          value={formData.message}
                          onChange={handleInputChange}
                          className={errors.message ? styles.inputError : ''}
                        />
                        {errors.message && (
                          <div className={styles.errorMessage}>Por favor, insira sua mensagem</div>
                        )}
                      </div>

                      <button type="submit" className={styles.submitBtn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                        Enviar Feedback
                      </button>

                    </form>
                  </div>
                </div>

                {/* ── Contato ── */}
                <div className={styles.contactWrapper}>
                  <div className={styles.contactCard}>
                    <div className={styles.contactSocialIcons}>
                      <div className={styles.socialIcon}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/>
                        </svg>
                      </div>
                      <div className={styles.socialIcon}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                        </svg>
                      </div>
                      <div className={styles.socialIcon}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.176-1.24-6.162-3.491-8.411z"/>
                        </svg>
                      </div>
                    </div>
                    <div className={styles.contactDetails}>
                      <p><strong>Email:</strong> proaluno@fieb.edu.br</p>
                      <p><strong>Número:</strong> (11) 99999-9999</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ── Modal de Sucesso ── */}
          {modalOpen && (
            <div className={`${styles.successModal} ${styles.successModalActive}`}>
              <div className={styles.modalContent}>
                <div className={styles.successIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <h2 className={styles.modalTitle}>Feedback Enviado!</h2>
                <p className={styles.modalMessage}>
                  Obrigado por compartilhar sua opinião conosco. Seu feedback foi recebido com sucesso
                  e será fundamental para melhorarmos nossos serviços.
                </p>
                <button className={styles.modalCloseBtn} onClick={closeModal}>Fechar</button>
              </div>
            </div>
          )}

        </main>
        <Footer />
      </div>
    </div>
  );
}
