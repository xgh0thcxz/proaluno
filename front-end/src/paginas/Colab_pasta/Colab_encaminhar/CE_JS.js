        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('manifestationForm');
            const protocolInput = document.getElementById('protocol-number');
            const summaryInput = document.getElementById('summary');
            const sectorButtons = document.querySelectorAll('.sector-btn');
            const submitBtn = document.getElementById('submitBtn');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            
            let selectedSector = null;
            
            // Protocolos válidos para demonstração
            const validProtocols = [
                'MANIF2025-0585',
                'MANIF2025-0385', 
                'MANIF2025-0375',
                'MANIF2025-0575',
                '123456789',
                'protocolo123'
            ];
            
            // Seleção de setor
            sectorButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class de todos os botões
                    sectorButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Adiciona active class ao botão clicado
                    this.classList.add('active');
                    selectedSector = this.getAttribute('data-sector');
                    
                    // Atualiza estado do botão de envio
                    updateSubmitButton();
                });
            });
            
            // Validação em tempo real dos campos
            protocolInput.addEventListener('input', validateForm);
            summaryInput.addEventListener('input', validateForm);
            
            function validateForm() {
                const protocolValue = protocolInput.value.trim();
                const summaryValue = summaryInput.value.trim();
                
                // Verifica se o protocolo é válido
                const isProtocolValid = validProtocols.includes(protocolValue.toUpperCase());
                
                if (!isProtocolValid && protocolValue !== '') {
                    protocolInput.style.border = '2px solid #f44336';
                } else {
                    protocolInput.style.border = 'none';
                }
                
                updateSubmitButton();
            }
            
            function updateSubmitButton() {
                const protocolValue = protocolInput.value.trim();
                const summaryValue = summaryInput.value.trim();
                const isProtocolValid = validProtocols.includes(protocolValue.toUpperCase());
                
                if (protocolValue !== '' && summaryValue !== '' && selectedSector !== null && isProtocolValid) {
                    submitBtn.disabled = false;
                } else {
                    submitBtn.disabled = true;
                }
            }
            
            // Envio do formulário
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const protocolValue = protocolInput.value.trim();
                const summaryValue = summaryInput.value.trim();
                
                // Esconder mensagens anteriores
                successMessage.classList.remove('show');
                errorMessage.classList.remove('show');
                
                // Validar protocolo
                if (!validProtocols.includes(protocolValue.toUpperCase())) {
                    errorMessage.textContent = 'Protocolo não encontrado. Verifique o número digitado.';
                    errorMessage.classList.add('show');
                    return;
                }
                
                // Validar campos obrigatórios
                if (protocolValue === '' || summaryValue === '' || selectedSector === null) {
                    errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios e selecione um setor.';
                    errorMessage.classList.add('show');
                    return;
                }
                
                // Simular envio bem-sucedido
                successMessage.textContent = `Manifestação ${protocolValue} encaminhada com sucesso para o setor de ${getSectorName(selectedSector)}!`;
                successMessage.classList.add('show');
                
                // Limpar formulário após 3 segundos
                setTimeout(() => {
                    form.reset();
                    sectorButtons.forEach(btn => btn.classList.remove('active'));
                    selectedSector = null;
                    submitBtn.disabled = true;
                    successMessage.classList.remove('show');
                }, 3000);
            });
            
            function getSectorName(sector) {
                const sectors = {
                    'denuncia': 'Denúncia',
                    'reclamacao': 'Reclamação',
                    'solicitacao': 'Solicitação',
                    'elogio': 'Elogio',
                    'sugestoes': 'Sugestões'
                };
                return sectors[sector] || 'Setor';
            }
            
            // Adicionar placeholder de exemplo após carregamento
            setTimeout(() => {
                protocolInput.placeholder = 'Ex: MANIF2025-0585';
            }, 1000);
        });