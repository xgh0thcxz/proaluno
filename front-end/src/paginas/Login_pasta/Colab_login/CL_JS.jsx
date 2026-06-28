import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useColabLogin() {
  const navigate = useNavigate();

  // Estados do formulário principal
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailMsg, setEmailMsg] = useState({ text: '', type: '' });
  const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryMsg, setRecoveryMsg] = useState({ text: '', type: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  // Estado das partículas
  const [particles, setParticles] = useState([]);

  const validateEmailFormat = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  // Gerador de partículas dinâmicas no carregamento
  useEffect(() => {
    const particleCount = 15;
    const generatedParticles = [];
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 6 + 2;
      generatedParticles.push({
        id: i,
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${15 + Math.random() * 10}s`,
      });
    }
    setParticles(generatedParticles);
  }, []);

  // Handlers para os inputs em tempo real
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.trim() === '') setEmailMsg({ text: '', type: '' });
    else if (validateEmailFormat(value.trim())) setEmailMsg({ text: '✓ E-mail válido', type: 'valid' });
    else setEmailMsg({ text: '✗ Por favor, insira um e-mail válido', type: 'invalid' });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value === '') setPasswordMsg({ text: '', type: '' });
    else if (value.length >= 6) setPasswordMsg({ text: '✓ Senha válida', type: 'valid' });
    else setPasswordMsg({ text: '✗ A senha precisa de no mínimo 6 caracteres', type: 'invalid' });
  };

  const handleRecoveryEmailChange = (e) => {
    const value = e.target.value;
    setRecoveryEmail(value);
    if (value.trim() === '') setRecoveryMsg({ text: '', type: '' });
    else if (validateEmailFormat(value.trim())) setRecoveryMsg({ text: '✓ E-mail válido', type: 'valid' });
    else setRecoveryMsg({ text: '✗ Por favor, insira um e-mail válido', type: 'invalid' });
  };

  // Ações de envio
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateEmailFormat(email) && password.length >= 6) {
      // Modifique aqui para a sua rota interna de colaborador
      navigate('/colab_home'); 
    }
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    if (validateEmailFormat(recoveryEmail)) {
      setShowSuccess(true);
    }
  };

  return {
    email, password, emailMsg, passwordMsg,
    isModalOpen, setIsModalOpen, recoveryEmail, recoveryMsg, showSuccess, setShowSuccess,
    particles, handleEmailChange, handlePasswordChange, handleRecoveryEmailChange,
    handleLoginSubmit, handleRecoverySubmit
  };
}
