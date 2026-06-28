        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registrationForm');
            const passwordInput = document.getElementById('password');
            const passwordStrength = document.getElementById('password-strength');
            const submitButton = document.getElementById('submitButton');

            // Validação de força da senha
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                let strength = 0;

                if (password.length >= 5) strength += 1;
                if (password.length >= 8) strength += 1;
                if (/[A-Z]/.test(password)) strength += 1;
                if (/[0-9]/.test(password)) strength += 1;
                if (/[^A-Za-z0-9]/.test(password)) strength += 1;

                // Atualizar barra de força
                passwordStrength.className = 'strength-fill';
                if (strength <= 2) {
                    passwordStrength.classList.add('weak');
                } else if (strength <= 4) {
                    passwordStrength.classList.add('medium');
                } else {
                    passwordStrength.classList.add('strong');
                }
            });

            // Validação do formulário
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    // Simular envio do formulário
                    simulateFormSubmission();
                }
            });

            function validateForm() {
                let isValid = true;
                const requiredFields = form.querySelectorAll('input[required]');

                // Resetar estados de erro
                form.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('error', 'success');
                });

                // Validar campos obrigatórios
                requiredFields.forEach(field => {
                    const formGroup = field.closest('.form-group');
                    
                    if (!field.value.trim()) {
                        formGroup.classList.add('error');
                        isValid = false;
                    } else {
                        formGroup.classList.add('success');
                    }

                    // Validação específica para e-mail
                    if (field.type === 'email' && field.value.trim()) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(field.value)) {
                            formGroup.classList.add('error');
                            isValid = false;
                        }
                    }

                    // Validação específica para senha
                    if (field.type === 'password' && field.value.trim()) {
                        if (field.value.length < 5) {
                            formGroup.classList.add('error');
                            isValid = false;
                        }
                    }
                });

                // Validar termos
                const termsCheckbox = document.getElementById('terms');
                if (!termsCheckbox.checked) {
                    termsCheckbox.closest('.terms-group').style.color = 'var(--required-color)';
                    isValid = false;
                } else {
                    termsCheckbox.closest('.terms-group').style.color = '';
                }

                return isValid;
            }

            function simulateFormSubmission() {
                // Mostrar estado de loading
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="animate-spin">
                        <path d="M12 4V2A10 10 0 00 2 12h2a8 8 0 018-8z"/>
                    </svg>
                    Processando...
                `;
                submitButton.disabled = true;

                // Simular delay de rede
                setTimeout(() => {
                    // Feedback de sucesso
                    submitButton.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Cadastro realizado!
                    `;
                    submitButton.style.background = 'var(--success-color)';

                    setTimeout(() => {
                        // Redirecionar ou mostrar mensagem de sucesso
                        alert('Cadastro realizado com sucesso! Em uma implementação real, isso redirecionaria para a página de login.');
                         window.location.href = 'login 5.html';
                    }, 1000);
                }, 2000);
            }

            // Validação em tempo real
            form.querySelectorAll('input').forEach(input => {
                input.addEventListener('blur', function() {
                    const formGroup = this.closest('.form-group');
                    if (this.hasAttribute('required') && !this.value.trim()) {
                        formGroup.classList.add('error');
                    } else {
                        formGroup.classList.remove('error');
                        formGroup.classList.add('success');
                    }
                });
            });

            // Animações de entrada
            const formElements = form.querySelectorAll('.form-group, .submit-button, .login-link');
            formElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100 + (index * 100));
            });
        });