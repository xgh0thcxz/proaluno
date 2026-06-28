        document.addEventListener('DOMContentLoaded', function() {
            const protocolForm = document.getElementById('protocolForm');
            const protocolInput = document.getElementById('protocol-number');
            const statusDisplay = document.getElementById('status-display');
            const pageActions = document.getElementById('page-actions');
            const errorMessage = document.getElementById('errorMessage');
            
            // Protocolos válidos para demonstração
            const validProtocols = [
                'MANIF2025-0585',
                'MANIF2025-0385', 
                'MANIF2025-0375',
                'MANIF2025-0575',
                '123456789',
                'protocolo123'
            ];
            
            protocolForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const protocolValue = protocolInput.value.trim();
                
                // Esconder mensagem de erro anterior
                errorMessage.classList.remove('show');
                
                if (protocolValue === '') {
                    // Campo vazio
                    showError('Por favor, digite um número de protocolo.');
                    return;
                }
                
                // Verificar se o protocolo é válido
                if (validProtocols.includes(protocolValue.toUpperCase())) {
                    // Protocolo válido - mostrar resultados
                    statusDisplay.classList.add('show');
                    pageActions.classList.add('show');
                    
                    // Rolar suavemente para os resultados
                    statusDisplay.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Protocolo inválido
                    showError('Protocolo não encontrado. Por favor, verifique o número digitado.');
                    
                    // Esconder resultados se estiverem visíveis
                    statusDisplay.classList.remove('show');
                    pageActions.classList.remove('show');
                }
            });
            
            function showError(message) {
                errorMessage.textContent = message;
                errorMessage.classList.add('show');
                
                // Focar no campo de input para correção
                protocolInput.focus();
            }
            
            // Limpar resultados se o usuário modificar o protocolo
            protocolInput.addEventListener('input', function() {
                if (statusDisplay.classList.contains('show')) {
                    statusDisplay.classList.remove('show');
                    pageActions.classList.remove('show');
                    errorMessage.classList.remove('show');
                }
            });
            
            // Adicionar placeholder de exemplo após carregamento
            setTimeout(() => {
                protocolInput.placeholder = 'Ex: MANIF2025-0585';
            }, 1000);
        });