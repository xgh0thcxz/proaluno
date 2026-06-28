
    // Criar partículas dinâmicas
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 15;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamanho aleatório
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição inicial aleatória
        particle.style.left = `${Math.random() * 100}%`;
        
        // Atraso de animação aleatório
        particle.style.animationDelay = `${Math.random() * 20}s`;
        
        // Duração de animação aleatória
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
      }
    }

    // Validação do formulário
    document.addEventListener('DOMContentLoaded', function() {
      createParticles();
      
      const form = document.getElementById('loginForm');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const emailValidation = document.getElementById('email-validation');
      const passwordValidation = document.getElementById('password-validation');

      // Elementos do modal
      const forgotPasswordLink = document.getElementById('forgotPasswordLink');
      const forgotPasswordModal = document.getElementById('forgotPasswordModal');
      const modalClose = document.getElementById('modalClose');
      const recoveryForm = document.getElementById('recoveryForm');
      const recoveryEmailInput = document.getElementById('recoveryEmail');
      const recoveryEmailValidation = document.getElementById('recovery-email-validation');
      const successMessage = document.getElementById('successMessage');

      function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

      // Validação em tempo real - Login
      emailInput.addEventListener('input', function() {
        const value = this.value.trim();
        
        if (value === '') {
          emailValidation.textContent = '';
          emailValidation.className = 'validation-message';
        } else if (validateEmail(value)) {
          emailValidation.textContent = '✓ E-mail válido';
          emailValidation.className = 'validation-message valid';
        } else {
          emailValidation.textContent = '✗ Por favor, insira um e-mail válido';
          emailValidation.className = 'validation-message invalid';
        }
      });

      passwordInput.addEventListener('input', function() {
        const value = this.value;
        
        if (value === '') {
          passwordValidation.textContent = '';
          passwordValidation.className = 'validation-message';
        } else if (value.length >= 6) {
          passwordValidation.textContent = '✓ Senha válida';
          passwordValidation.className = 'validation-message valid';
        } else {
          passwordValidation.textContent = '✗ A senha deve ter pelo menos 6 caracteres';
          passwordValidation.className = 'validation-message invalid';
        }
      });

      // Validação em tempo real - Recuperação
      recoveryEmailInput.addEventListener('input', function() {
        const value = this.value.trim();
        
        if (value === '') {
          recoveryEmailValidation.textContent = '';
          recoveryEmailValidation.className = 'validation-message';
        } else if (validateEmail(value)) {
          recoveryEmailValidation.textContent = '✓ E-mail válido';
          recoveryEmailValidation.className = 'validation-message valid';
        } else {
          recoveryEmailValidation.textContent = '✗ Por favor, insira um e-mail válido';
          recoveryEmailValidation.className = 'validation-message invalid';
        }
      });

      // Abrir modal de recuperação
      forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        forgotPasswordModal.classList.add('active');
      });

      // Fechar modal
      modalClose.addEventListener('click', function() {
        forgotPasswordModal.classList.remove('active');
        resetRecoveryForm();
      });

      // Fechar modal clicando fora
      forgotPasswordModal.addEventListener('click', function(e) {
        if (e.target === forgotPasswordModal) {
          forgotPasswordModal.classList.remove('active');
          resetRecoveryForm();
        }
      });

      // Reset do formulário de recuperação
      function resetRecoveryForm() {
        recoveryForm.reset();
        recoveryEmailValidation.textContent = '';
        recoveryEmailValidation.className = 'validation-message';
        successMessage.style.display = 'none';
        recoveryForm.style.display = 'block';
      }

      // Submit do formulário de recuperação
      recoveryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = recoveryEmailInput.value.trim();
        
        if (!validateEmail(email)) {
          recoveryEmailValidation.textContent = '✗ Por favor, insira um e-mail válido';
          recoveryEmailValidation.className = 'validation-message invalid';
          return;
        }

        // Simular envio do e-mail
        const submitBtn = recoveryForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        setTimeout(() => {
          // Mostrar mensagem de sucesso
          recoveryForm.style.display = 'none';
          successMessage.style.display = 'block';
          
          // Fechar modal após 3 segundos
          setTimeout(() => {
            forgotPasswordModal.classList.remove('active');
            resetRecoveryForm();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 3000);
        }, 2000);
      });

      // Submit do formulário de login
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validar email
        if (!validateEmail(emailInput.value.trim())) {
          emailValidation.textContent = '✗ Por favor, insira um e-mail válido';
          emailValidation.className = 'validation-message invalid';
          isValid = false;
        }
        
        // Validar senha
        if (passwordInput.value.length < 6) {
          passwordValidation.textContent = '✗ A senha deve ter pelo menos 6 caracteres';
          passwordValidation.className = 'validation-message invalid';
          isValid = false;
        }
        
        // Se o formulário for válido, redirecionar para home.html
        if (isValid) {
          const submitBtn = form.querySelector('.submit-btn');
          const originalText = submitBtn.innerHTML;
          
          // Mostrar estado de carregamento
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
          submitBtn.disabled = true;
          
          // Simular um pequeno delay para mostrar a animação
          setTimeout(() => {
            // Redirecionar para a página home
            window.location.href = 'home.html';
          }, 1500);
        }
      });

      // Efeito de foco melhorado
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('focus', function() {
          this.parentElement.style.transform = 'translateY(-2px)';
          this.parentElement.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.25)';
        });
        
        input.addEventListener('blur', function() {
          this.parentElement.style.transform = 'translateY(0)';
          this.parentElement.style.boxShadow = 'none';
        });
      });
    });
