        document.addEventListener('DOMContentLoaded', function() {
            const responseForm = document.getElementById('response-form');
            const responseText = document.getElementById('response-text');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            
            // Inicialmente esconder as mensagens
            successMessage.classList.remove('show');
            errorMessage.classList.remove('show');
            
            // Evento de envio do formulário
            if (responseForm) {
                responseForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const responseValue = responseText.value.trim();
                    
                    if (!responseValue) {
                        showError('Por favor, digite uma resposta antes de enviar.');
                        return;
                    }
                    
                    // Simular envio da resposta
                    submitResponse(responseValue);
                });
            }
            
            // Função para enviar resposta
            function submitResponse(response) {
                // Mostrar loading
                const submitBtn = responseForm.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                // Simular delay de rede
                setTimeout(() => {
                    // Esconder mensagem de erro se estiver visível
                    errorMessage.classList.remove('show');
                    
                    // Mostrar mensagem de sucesso
                    successMessage.textContent = 'Resposta enviada com sucesso! A manifestação foi atualizada.';
                    successMessage.classList.add('show');
                    
                    // Scroll para a mensagem de sucesso
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Restaurar botão
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Limpar formulário após 3 segundos
                    setTimeout(() => {
                        responseForm.reset();
                        successMessage.classList.remove('show');
                    }, 3000);
                }, 1500);
            }
            
            // Função para mostrar erro
            function showError(message) {
                errorMessage.textContent = message;
                errorMessage.classList.add('show');
                
                // Esconder mensagem de sucesso se estiver visível
                successMessage.classList.remove('show');
                
                // Focar no campo de resposta
                responseText.focus();
            }
            
            // Validação em tempo real
            responseText.addEventListener('input', function() {
                // Esconder mensagem de erro enquanto o usuário digita
                errorMessage.classList.remove('show');
            });
        });