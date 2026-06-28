import React, { useState, useRef } from 'react';
import styles from './CP_CSS.module.css';

import Header from '../../Complementos/Colab/Header/C_Header';
import Footer from '../../Complementos/Colab/Footer/C_Footer';

const AlunoPerfil = () => {
  const [profileData, setProfileData] = useState({
    displayName: 'NOME NOME NOME',
    username:    'NOME.DE_USUARIO',
    email:       'RM99999@ESTUDANTE.FIEB.EDU.BR',
    password:    '********',
    phone:       'XXXXXX0902',
    protocol:    '12345'
  });

  const [visibleFields, setVisibleFields] = useState({
    email: false, password: false, phone: false
  });

  const [profilePicture, setProfilePicture] = useState('NN');
  const [profileBanner,  setProfileBanner]  = useState(null);

  const [status] = useState({
    title:       'Em Análise',
    badge:       'Em Andamento',
    description: 'A equipe da Ouvidoria está analisando o conteúdo da manifestação para entender os detalhes do caso. Nessa etapa, verificamos se todas as informações foram preenchidas corretamente e avaliamos qual será o melhor encaminhamento ou solução.'
  });

  const [editingField, setEditingField] = useState(null);
  const [editValue,    setEditValue]    = useState('');

  const fileInputRef   = useRef(null);
  const bannerInputRef = useRef(null);

  const toggleVisibility = (field) =>
    setVisibleFields(prev => ({ ...prev, [field]: !prev[field] }));

  const startEditing = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const saveEditing = () => {
    if (editingField && editValue.trim()) {
      setProfileData(prev => ({ ...prev, [editingField]: editValue }));
      setEditingField(null);
      setEditValue('');
    }
  };

  const cancelEditing = () => { setEditingField(null); setEditValue(''); };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePicture(URL.createObjectURL(file));
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileBanner(URL.createObjectURL(file));
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  const handleProtocolChange = (e) =>
    setProfileData(prev => ({ ...prev, protocol: e.target.value }));

  const getVisibleValue = (field) => {
    if (visibleFields[field]) return profileData[field];
    switch (field) {
      case 'email':    return profileData.email.replace(/[^@]+@/, '*****@');
      case 'password': return '••••••••••••••';
      case 'phone':    return 'XXXXXX' + profileData.phone.slice(-4);
      default:         return profileData[field];
    }
  };

  /* ── Campo inline editável simples (displayName, username) ── */
  const renderSimpleEditable = (field) => {
    if (editingField === field) {
      return (
        <div className={styles.editMode}>
          <input
            type={field === 'password' ? 'password' : 'text'}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={styles.editInput}
            autoFocus
          />
          <div className={styles.editActions}>
            <button onClick={saveEditing}  className={styles.saveBtn}>Salvar</button>
            <button onClick={cancelEditing} className={styles.cancelBtn}>Cancelar</button>
          </div>
        </div>
      );
    }
    return (
      <>
        <div className={styles.formValueBox}>{getVisibleValue(field)}</div>
        <a href="#" className={styles.changeLink}
          onClick={(e) => { e.preventDefault(); startEditing(field, profileData[field]); }}>
          Mudar
        </a>
      </>
    );
  };

  /* ── Campo com mostrar/ocultar + editar (email, password, phone) ── */
  const renderPrivateField = (field, inputType = 'text', placeholder = '') => (
    editingField === field ? (
      <div className={styles.editMode}>
        <input
          type={inputType}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className={styles.editInput}
          placeholder={placeholder}
          autoFocus
        />
        <div className={styles.editActions}>
          <button onClick={saveEditing}  className={styles.saveBtn}>Salvar</button>
          <button onClick={cancelEditing} className={styles.cancelBtn}>Cancelar</button>
        </div>
      </div>
    ) : (
      <div className={styles.formValueBoxWithAction}>
        <span>{getVisibleValue(field)}</span>
        <a href="#" className={styles.showLink}
          onClick={(e) => { e.preventDefault(); toggleVisibility(field); }}>
          {visibleFields[field] ? 'Ocultar' : 'Mostrar'}
        </a>
      </div>
    )
  );

  return (
    <div className="body">
      <Header />
      <section className={styles.profilePage}>

        {/* ── Background Decorations ── */}
        <div className={styles.backgroundDecorations}>
          <div className={styles.decoItem} style={{ left: '5%',   top: '5%',  width: '300px', height: '300px', background: 'radial-gradient(circle, var(--purple-primary) 0%, transparent 70%)' }} />
          <div className={styles.decoItem} style={{ left: '-5%',  top: '30%', width: '250px', height: '250px', background: 'radial-gradient(circle, var(--purple-secondary) 0%, transparent 70%)' }} />
          <div className={styles.decoItem} style={{ right: '-10%', top: '25%', width: '350px', height: '350px', background: 'radial-gradient(circle, var(--purple-primary) 0%, transparent 70%)' }} />
          <div className={styles.decoItem} style={{ right: '10%', top: '10%', width: '200px', height: '200px', background: 'radial-gradient(circle, var(--purple-secondary) 0%, transparent 70%)' }} />
        </div>

        <div className={styles.pageContent}>
          <main className={styles.profileCard}>

            {/* ── Header ── */}
            <div className={styles.profileHeader}>
              <div
                className={styles.profileBanner}
                style={profileBanner ? { backgroundImage: `url(${profileBanner})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              />
              <div className={styles.profilePictureWrapper}>
                <div className={styles.profilePicture}>
                  {typeof profilePicture === 'string' && profilePicture.startsWith('blob:') ? (
                    <img src={profilePicture} alt="Profile"
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : profilePicture}
                </div>
              </div>
              <div className={styles.profileActions}>
                <button className={styles.profileAction} onClick={() => fileInputRef.current.click()}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Trocar Foto
                </button>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }}
                  accept="image/*" onChange={handlePhotoChange} />

                <button className={styles.profileAction} onClick={() => bannerInputRef.current.click()}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Trocar Banner
                </button>
                <input type="file" ref={bannerInputRef} style={{ display: 'none' }}
                  accept="image/*" onChange={handleBannerChange} />
              </div>
            </div>

            {/* ── Body ── */}
            <div className={styles.profileBody}>
              <form className={styles.userForm} onSubmit={(e) => e.preventDefault()}>

                {/* Nome Exibido */}
                <div className={styles.formGroup}>
                  <label>Nome Exibido</label>
                  {renderSimpleEditable('displayName')}
                </div>

                {/* Nome de Usuário */}
                <div className={styles.formGroup}>
                  <label>Nome de Usuário</label>
                  {renderSimpleEditable('username')}
                </div>

                {/* E-mail */}
                <div className={styles.formGroup}>
                  <label>
                    E-mail
                    <a href="#" className={styles.changeLink}
                      onClick={(e) => { e.preventDefault(); startEditing('email', profileData.email); }}>
                      Mudar
                    </a>
                  </label>
                  {renderPrivateField('email', 'email')}
                </div>

                {/* Senha */}
                <div className={styles.formGroup}>
                  <label>
                    Senha
                    <a href="#" className={styles.changeLink}
                      onClick={(e) => { e.preventDefault(); startEditing('password', ''); }}>
                      Mudar
                    </a>
                  </label>
                  {renderPrivateField('password', 'password', 'Nova senha')}
                </div>

                {/* Telefone */}
                <div className={styles.formGroup}>
                  <label>
                    Telefone
                    <a href="#" className={styles.changeLink}
                      onClick={(e) => { e.preventDefault(); startEditing('phone', profileData.phone); }}>
                      Mudar
                    </a>
                  </label>
                  {renderPrivateField('phone', 'tel', '(00) 00000-0000')}
                </div>

              </form>

              <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Sair da Conta
              </button>
            </div>

          </main>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AlunoPerfil;
