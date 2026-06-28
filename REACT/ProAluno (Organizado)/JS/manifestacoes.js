        // ========== NAVBAR SCRIPT ==========
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('site-header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const userToggle = document.querySelector('.user-toggle');
        const userMenu = document.querySelector('.user-menu');

        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // User menu toggle
        userToggle.addEventListener('click', function() {
            userMenu.classList.toggle('active');
        });

        // Close user menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!userToggle.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.classList.remove('active');
            }
        });

        // ========== ORIGINAL SCRIPT ==========
        // Dados das manifestações
        const manifestationData = {
            'MANIF2025-0585': {
                type: 'Reclamação',
                publicationDate: '05/08/2025',
                status: 'Pendente',
                statusClass: 'status-pending',
                studentName: 'Anônimo',
                subject: 'Infraestrutura',
                message: 'A porta do banheiro feminino está quebrada e não fecha corretamente, e o bebedouro próximo à quadra está sempre sem água.'
            },
            'MANIF2025-0385': {
                type: 'Sugestão',
                publicationDate: '04/08/2025',
                status: 'Em andamento',
                statusClass: 'status-in-progress',
                studentName: 'Maria Silva',
                subject: 'Biblioteca',
                message: 'Sugiro que a biblioteca estenda o horário de funcionamento aos sábados, pois muitos alunos trabalham durante a semana.'
            },
            'MANIF2025-0375': {
                type: 'Elogio',
                publicationDate: '20/10/2025',
                status: 'Pendente',
                statusClass: 'status-pending',
                studentName: 'Geovanna Gehring',
                subject: 'Professores',
                message: 'Gostaria de elogiar o professor de matemática pela didática excelente e paciência com os alunos.'
            },
            'MANIF2025-0575': {
                type: 'Reclamação',
                publicationDate: '02/08/2025',
                status: 'Pendente',
                statusClass: 'status-pending',
                studentName: 'Anônimo',
                subject: 'Cantina',
                message: 'Os preços da cantina estão muito altos e a qualidade da comida piorou nos últimos meses.'
            },
            '123456789': {
                type: 'Solicitação',
                publicationDate: '01/08/2025',
                status: 'Em andamento',
                statusClass: 'status-in-progress',
                studentName: 'Ana Costa',
                subject: 'Documentos',
                message: 'Preciso de uma segunda via do histórico escolar com urgência para processo seletivo.'
            }
        };

        document.addEventListener('DOMContentLoaded', function() {
            const searchForm = document.getElementById('search-form');
            const protocolInput = document.getElementById('protocol-input');
            const searchErrorMessage = document.getElementById('searchErrorMessage');
            const manifestationCard = document.getElementById('manifestation-card');
            const responseForm = document.getElementById('response-form');
            const responseErrorMessage = document.getElementById('responseErrorMessage');
            const successAnimation = document.getElementById('success-animation');

            // Inicialmente esconder elementos
            manifestationCard.style.display = 'none';
            responseForm.style.display = 'none';
            successAnimation.style.display = 'none';
            searchErrorMessage.classList.remove('show');

            // Buscar manifestação
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const protocolValue = protocolInput.value.trim().toUpperCase();

                if (!protocolValue) {
                    showSearchError('Por favor, digite um número de protocolo.');
                    return;
                }

                if (manifestationData[protocolValue]) {
                    showManifestation(protocolValue);
                } else {
                    showSearchError('Protocolo não encontrado. Verifique o número digitado.');
                }
            });

            // Enviar resposta
            responseForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const responseValue = document.getElementById('response-text').value.trim();

                if (!responseValue) {
                    showResponseError('Por favor, digite uma resposta antes de enviar.');
                    return;
                }

                submitResponse(responseValue);
            });

            function showManifestation(protocol) {
                // Esconder mensagem de erro
                searchErrorMessage.classList.remove('show');

                // Mostrar loading
                const searchBtn = searchForm.querySelector('.search-button');
                const originalText = searchBtn.textContent;
                searchBtn.textContent = 'Buscando...';
                searchBtn.disabled = true;

                // Simular delay de rede
                setTimeout(() => {
                    const data = manifestationData[protocol];

                    // Atualizar dados da manifestação
                    document.getElementById('protocol-display').textContent = protocol;
                    document.getElementById('manifestation-type').textContent = data.type;
                    document.getElementById('publication-date').textContent = data.publicationDate;
                    
                    const statusElement = document.getElementById('status-display');
                    statusElement.textContent = data.status;
                    statusElement.className = `status-indicator ${data.statusClass}`;
                    
                    document.getElementById('student-name').textContent = data.studentName;
                    document.getElementById('manifestation-subject').textContent = data.subject;
                    document.getElementById('manifestation-message').textContent = data.message;

                    // Mostrar elementos
                    manifestationCard.style.display = 'block';
                    responseForm.style.display = 'block';

                    // Scroll para a manifestação
                    manifestationCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // Restaurar botão
                    searchBtn.textContent = originalText;
                    searchBtn.disabled = false;
                }, 1000);
            }

            function submitResponse(response) {
                // Mostrar loading
                const submitBtn = responseForm.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;

                // Simular envio para o servidor
                setTimeout(() => {
                    // Esconder formulários e mostrar animação de sucesso
                    responseForm.style.display = 'none';
                    manifestationCard.style.display = 'none';
                    successAnimation.style.display = 'block';

                    // Scroll para animação de sucesso
                    successAnimation.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Restaurar botão
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }

            function showSearchError(message) {
                searchErrorMessage.textContent = message;
                searchErrorMessage.classList.add('show');
                manifestationCard.style.display = 'none';
                responseForm.style.display = 'none';
                protocolInput.focus();
            }

            function showResponseError(message) {
                responseErrorMessage.textContent = message;
                responseErrorMessage.classList.add('show');
                document.getElementById('response-text').focus();
            }

            // Validação em tempo real
            protocolInput.addEventListener('input', function() {
                searchErrorMessage.classList.remove('show');
            });

            document.getElementById('response-text').addEventListener('input', function() {
                responseErrorMessage.classList.remove('show');
            });
        });

        function resetPage() {
            // Resetar tudo para o estado inicial
            document.getElementById('search-form').reset();
            document.getElementById('response-form').reset();
            document.getElementById('manifestation-card').style.display = 'none';
            document.getElementById('response-form').style.display = 'none';
            document.getElementById('success-animation').style.display = 'none';
            document.getElementById('searchErrorMessage').classList.remove('show');
            document.getElementById('responseErrorMessage').classList.remove('show');
            
            // Scroll para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }