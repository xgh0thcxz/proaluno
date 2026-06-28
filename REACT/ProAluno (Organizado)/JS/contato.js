        document.addEventListener('DOMContentLoaded', function() {
            const feedbackForm = document.getElementById('feedbackForm');
            const submitBtn = document.getElementById('submitBtn');
            const successModal = document.getElementById('successModal');
            const modalCloseBtn = document.getElementById('modalCloseBtn');

            // Validação do formulário
            feedbackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    submitFeedback();
                }
            });

            function validateForm() {
                let isValid = true;
                const requiredFields = feedbackForm.querySelectorAll('[required]');

                // Resetar estados de erro
                feedbackForm.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('error');
                });

                // Validar campos obrigatórios
                requiredFields.forEach(field => {
                    const formGroup = field.closest('.form-group');
                    
                    if (!field.value.trim()) {
                        formGroup.classList.add('error');
                        isValid = false;
                    }

                    // Validação específica para e-mail
                    if (field.type === 'email' && field.value.trim()) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(field.value)) {
                            formGroup.classList.add('error');
                            isValid = false;
                        }
                    }
                });

                return isValid;
            }

            function submitFeedback() {
                // Mostrar estado de loading
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="animate-spin">
                        <path d="M12 4V2A10 10 0 00 2 12h2a8 8 0 018-8z"/>
                    </svg>
                    Enviando...
                `;
                submitBtn.disabled = true;

                // Simular envio para o servidor
                setTimeout(() => {
                    // Mostrar modal de sucesso
                    showSuccessModal();
                    
                    // Restaurar botão
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Limpar formulário
                    feedbackForm.reset();
                }, 2000);
            }

            function showSuccessModal() {
                successModal.classList.add('active');
                
                // Adicionar efeito de confete
                createConfetti();
            }

            function createConfetti() {
                const colors = ['#7c3aed', '#8b5cf6', '#c4b5fd', '#10b981', '#f59e0b'];
                const confettiCount = 50;
                
                for (let i = 0; i < confettiCount; i++) {
                    const confetti = document.createElement('div');
                    confetti.style.cssText = `
                        position: fixed;
                        width: 10px;
                        height: 10px;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        border-radius: 2px;
                        top: -10px;
                        left: ${Math.random() * 100}vw;
                        animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
                        z-index: 10001;
                    `;
                    
                    document.body.appendChild(confetti);
                    
                    // Remover confetti após animação
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }
            }

            // Fechar modal
            modalCloseBtn.addEventListener('click', function() {
                successModal.classList.remove('active');
            });

            // Fechar modal ao clicar fora
            successModal.addEventListener('click', function(e) {
                if (e.target === successModal) {
                    successModal.classList.remove('active');
                }
            });

            // Fechar modal com ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && successModal.classList.contains('active')) {
                    successModal.classList.remove('active');
                }
            });

            // Adicionar CSS para animação de confetti
            const style = document.createElement('style');
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
                
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
            feedbackForm.querySelectorAll('input, textarea').forEach(field => {
                field.addEventListener('blur', function() {
                    const formGroup = this.closest('.form-group');
                    if (this.hasAttribute('required') && !this.value.trim()) {
                        formGroup.classList.add('error');
                    } else {
                        formGroup.classList.remove('error');
                    }
                });
            });

            // Animações de entrada
            const animateElements = document.querySelectorAll('.form-card, .contact-card');
            animateElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 300 + (index * 200));
            });
        });