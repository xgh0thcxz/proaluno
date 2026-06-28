import React from 'react';
import styles from './EQ_CSS.module.css';

import Header from '../../Complementos/Aluno/Header/Header';
import Footer from '../../Complementos/Aluno/Footer/Footer';

//imagens
import GG from '../../../imagens/teste_foto.jpg';
import GL from '../../../imagens/teste_foto.jpg';
import FP from '../../../imagens/teste_foto.jpg';
import BA from '../../../imagens/teste_foto.jpg';
import GA from '../../../imagens/teste_foto.jpg';
import DF from '../../../imagens/teste_foto.jpg';
import GC from '../../../imagens/teste_foto.jpg';

const teamMembers = [
  {
    initials: "GG",
    name: "Geovanna Gomes Gehring",
    role: "Gerente",
    description: "Atua na coordenação do projeto, organiza o desenvolvimento e manutenção do site da ouvidoria, responsável pela confecção da interface do site, ajuda com ideias para o site.",
    photo: GG, // substitua por: import foto from './fotos/geovanna.jpg' e coloque aqui
  },
  {
    initials: "GL",
    name: "Giovanna Lucena da Silva",
    role: "Vice Gerente",
    description: "Auxilia na organização do desenvolvimento e manutenção do site da ouvidoria, responsável pela confecção da interface do site, ajuda com ideias para o site.",
    photo: GL,
  },
  {
    initials: "FP",
    name: "Fernanda Paiva Fontes Da Silva",
    role: "Assistente e Auxiliar do Projeto",
    description: "Ajuda na manutenção, desenvolvimento e ideias para o site, responsável pela confecção da interface do site.",
    photo: FP,
  },
  {
    initials: "BA",
    name: "Bianca de Andrade Dionisio",
    role: "Assistente e Auxiliar do Projeto",
    description: "Cuida do recebimento das manifestações (sugestões, denúncias, elogios etc.) e organiza os dados de forma clara e acessível.",
    photo: BA,
  },
  {
    initials: "GA",
    name: "Gabriela de Araujo Florentino",
    role: "Assistente e Auxiliar do Projeto",
    description: "Ajuda na manutenção, desenvolvimento e ideias para o site, responsável pela parte da documentação.",
    photo: GA,
  },
  {
    initials: "DF",
    name: "Davi Ferreira Fernandes",
    role: "Assistente e Auxiliar do Projeto",
    description: "Responsável pelo suporte e colaboração nas atividades do projeto.",
    photo: DF,
  },
  {
  initials: "GC",
  name: "Giovanna Coelho Paschol",
  role: "Assistente e Auxiliar do Projeto",
  description: "Responsável pelo suporte e colaboração nas atividades do projeto.",
  photo: GC,
  },
];

export default function Equipe() {
  return (
    <div className="body">
      <div className="page-wrapper">
        <Header />
        <main>

          {/* ── Hero da Equipe ── */}
          <section className={styles.teamHero}>
            <p className={styles.teamHeroLabel}>CONHEÇA A EQUIPE</p>
            <h1 className={styles.teamHeroTitle}>
              O Talento por Trás do <span className={styles.teamHeroHighlight}>PROALUNO</span>
            </h1>
            <p className={styles.teamHeroSubtitle}>
              Nossa equipe é formada por estudantes dedicados a construir um ambiente escolar mais
              participativo, justo e acolhedor. Cada integrante tem um papel essencial no
              desenvolvimento, organização e funcionamento do projeto.
            </p>
          </section>

{/* ── Cards da Equipe ── */}
<section className={styles.teamSection}>
  {/* Linha 1: 4 cards */}
  <div className={styles.teamRow}>
    {teamMembers.slice(0, 4).map((member, index) => (
      <div key={`top-${index}`} className={styles.teamCard}>
        <div className={styles.teamPhotoWrapper}>
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className={styles.teamPhoto}
            />
          ) : (
            <div className={styles.teamAvatar}>{member.initials}</div>
          )}
        </div>

        <h3 className={styles.memberName}>{member.name}</h3>
        <p className={styles.memberRole}>{member.role}</p>
      </div>
    ))}
  </div>

  {/* Linha 2: 3 cards (centralizada) */}
  <div className={styles.teamRow}>
    {teamMembers.slice(4, 7).map((member, index) => (
      <div key={`bottom-${index}`} className={styles.teamCard}>
        <div className={styles.teamPhotoWrapper}>
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className={styles.teamPhoto}
            />
          ) : (
            <div className={styles.teamAvatar}>{member.initials}</div>
          )}
        </div>

        <h3 className={styles.memberName}>{member.name}</h3>
        <p className={styles.memberRole}>{member.role}</p>
      </div>
    ))}
  </div>
</section>


        </main>
        <Footer />
      </div>
    </div>
  );
}
