import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAlunoLogin() {
  const navigate = useNavigate();

  const [email,         setEmail]         = useState('');
  const [password,      setPassword]      = useState('');
  const [emailMsg,      setEmailMsg]      = useState({ text: '', type: '' });
  const [passwordMsg,   setPasswordMsg]   = useState({ text: '', type: '' });

  const [isModalOpen,   setIsModalOpen]   = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryMsg,   setRecoveryMsg]   = useState({ text: '', type: '' });
  const [showSuccess,   setShowSuccess]   = useState(false);

  const [particles,     setParticles]     = useState([]);

  const validateEmailFormat = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  useEffect(() => {
    const generated = Array.from({ length: 15 }, (_, i) => {
      const size = Math.random() * 6 + 2;
      return {
        id:               i,
        width:            `${size}px`,
        height:           `${size}px`,
        left:             `${Math.random() * 100}%`,
        animationDelay:   `${Math.random() * 20}s`,
        animationDuration:`${15 + Math.random() * 10}s`,
      };
    });
    setParticles(generated);
  }, []);

  const handleEmailChange = (e) => {
    const v = e.target.value;
    setEmail(v);
    if (!v.trim())                    setEmailMsg({ text: '',                   type: ''        });
    else if (validateEmailFormat(v))  setEmailMsg({ text: '✓ E-mail válido',    type: 'valid'   });
    else                              setEmailMsg({ text: '✗ E-mail inválido',  type: 'invalid' });
  };

  const handlePasswordChange = (e) => {
    const v = e.target.value;
    setPassword(v);
    if (!v)              setPasswordMsg({ text: '',                      type: ''        });
    else if (v.length >= 6) setPasswordMsg({ text: '✓ Senha válida',    type: 'valid'   });
    else                 setPasswordMsg({ text: '✗ Mínimo 6 caracteres', type: 'invalid' });
  };

  const handleRecoveryEmailChange = (e) => {
    const v = e.target.value;
    setRecoveryEmail(v);
    if (!v.trim())                   setRecoveryMsg({ text: '',                   type: ''        });
    else if (validateEmailFormat(v)) setRecoveryMsg({ text: '✓ E-mail válido',    type: 'valid'   });
    else                             setRecoveryMsg({ text: '✗ E-mail inválido',  type: 'invalid' });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateEmailFormat(email) && password.length >= 6) {
      navigate('/home');
    }
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    if (validateEmailFormat(recoveryEmail)) setShowSuccess(true);
  };

  return {
    email, password, emailMsg, passwordMsg,
    isModalOpen, setIsModalOpen,
    recoveryEmail, recoveryMsg, showSuccess, setShowSuccess,
    particles,
    handleEmailChange, handlePasswordChange, handleRecoveryEmailChange,
    handleLoginSubmit, handleRecoverySubmit,
  };
}
