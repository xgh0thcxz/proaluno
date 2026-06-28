        document.addEventListener('DOMContentLoaded', function() {
            const resetForm = document.getElementById('resetForm');
            const submitBtn = document.getElementById('submitBtn');
            const messageDiv = document.getElementById('message');
            const messageText = messageDiv.querySelector('.message-text');
            const messageIcon = messageDiv.querySelector('.message-icon');

            // Validação do formulário
            resetForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const formGroup = document.getElementById('email').closest('.form-group');
                
                // Resetar estado de erro
                formGroup.classList.remove('error');
                
                // Validação do e-mail
                if (!validateEmail(email)) {
                    formGroup.classList.add('error');
                    return;
                }
                
                // Mostrar estado de loading
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="animate-spin">
                        <path d="M12 4V2A10 10 0 00 2 12h2a8 8 0 018-8z"/>
                    </svg>
                    Enviando...
                `;
                submitBtn.disabled = true;

                // Simulação de envio do formulário
                setTimeout(() => {
                    showMessage('Um link de redefinição de senha foi enviado para o seu e-mail.', 'success');
                    
                    // Restaurar botão
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Limpar o formulário após 5 segundos
                    setTimeout(() => {
                        resetForm.reset();
                        messageDiv.style.display = 'none';
                    }, 5000);
                }, 2000);
            });
            
            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
            
            function showMessage(text, type) {
                messageText.textContent = text;
                messageDiv.className = `message ${type}`;
                
                // Definir ícone baseado no tipo
                if (type === 'success') {
                    messageIcon.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                    `;
                } else {
                    messageIcon.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                    `;
                }
                
                messageDiv.style.display = 'flex';
            }

            // Adicionar CSS para animação de loading
            const style = document.createElement('style');
            style.textContent = `
                @keyframes animate-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .animate-spin {
                    animation: animate-spin 1s linear infinite;
                }
            `;
            document.head.appendChild(style);

            // Validação em tempo real
            document.getElementById('email').addEventListener('blur', function() {
                const formGroup = this.closest('.form-group');
                if (!validateEmail(this.value)) {
                    formGroup.classList.add('error');
                } else {
                    formGroup.classList.remove('error');
                }
            });

            // Animações de entrada
            const resetCard = document.querySelector('.reset-card');
            resetCard.style.opacity = '0';
            resetCard.style.transform = 'translateY(30px)';
            resetCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                resetCard.style.opacity = '1';
                resetCard.style.transform = 'translateY(0)';
            }, 300);
        });