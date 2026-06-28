        document.addEventListener('DOMContentLoaded', function() {
            // Elementos DOM
            const profileForm = document.getElementById('profileForm');
            const logoutButton = document.getElementById('logoutButton');
            const protocolInput = document.getElementById('protocolInput');
            const showLinks = document.querySelectorAll('.show-link');
            const changeLinks = document.querySelectorAll('.change-link');
            const profilePicture = document.getElementById('profilePicture');
            const changePhotoBtn = document.getElementById('changePhotoBtn');
            const changeBannerBtn = document.getElementById('changeBannerBtn');

            // Função para mostrar/ocultar valores sensíveis
            showLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = this.getAttribute('data-target');
                    const targetElement = document.getElementById(target);
                    
                    if (targetElement.textContent.includes('•') || targetElement.textContent.includes('X')) {
                        // Mostrar valor real (em uma implementação real, isso viria do backend)
                        if (target === 'password') {
                            targetElement.textContent = 'minhaSenha123';
                        } else if (target === 'phone') {
                            targetElement.textContent = '(11) 98765-0902';
                        } else if (target === 'email') {
                            targetElement.textContent = 'rm99999@estudante.fieb.edu.br';
                        }
                        this.textContent = 'Ocultar';
                    } else {
                        // Ocultar valor
                        if (target === 'password') {
                            targetElement.textContent = '••••••••••••••';
                        } else if (target === 'phone') {
                            targetElement.textContent = 'XXXXXX0902';
                        } else if (target === 'email') {
                            targetElement.textContent = 'RM99999@ESTUDANTE.FIEB.EDU.BR';
                        }
                        this.textContent = 'Mostrar';
                    }
                });
            });

            // Função para editar campos
            changeLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const field = this.getAttribute('data-field');
                    const currentValue = document.getElementById(field).textContent;
                    
                    // Em uma implementação real, isso abriria um modal de edição
                    const newValue = prompt(`Editar ${field}:`, currentValue);
                    if (newValue && newValue.trim() !== '') {
                        document.getElementById(field).textContent = newValue.trim();
                        
                        // Feedback visual
                        const formGroup = this.closest('.form-group');
                        formGroup.style.animation = 'none';
                        setTimeout(() => {
                            formGroup.style.animation = 'highlight 1s ease';
                        }, 10);
                    }
                });
            });

            // Logout
            logoutButton.addEventListener('click', function() {
                if (confirm('Tem certeza que deseja sair da sua conta?')) {
                    // Simular logout
                    this.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="animate-spin">
                            <path d="M12 4V2A10 10 0 00 2 12h2a8 8 0 018-8z"/>
                        </svg>
                        Saindo...
                    `;
                    this.disabled = true;
                    
                    setTimeout(() => {
                        alert('Logout realizado com sucesso! Em uma implementação real, isso redirecionaria para a página de login.');
                        // window.location.href = '/login';
                    }, 1500);
                }
            });

            // Consulta de protocolo
            protocolInput.addEventListener('input', function() {
                // Simular consulta em tempo real
                if (this.value.length >= 5) {
                    // Aqui você faria uma requisição AJAX para buscar o status
                    console.log('Consultando protocolo:', this.value);
                }
            });

            // Trocar foto de perfil (simulação)
            changePhotoBtn.addEventListener('click', function() {
                // Em uma implementação real, isso abriria um seletor de arquivos
                const initials = prompt('Digite suas iniciais para a foto de perfil:', 'NN');
                if (initials && initials.trim() !== '') {
                    profilePicture.textContent = initials.trim().substring(0, 2).toUpperCase();
                }
            });

            // Trocar banner (simulação)
            changeBannerBtn.addEventListener('click', function() {
                alert('Em uma implementação real, isso abriria um seletor de imagens para o banner.');
            });

            // Animações de entrada
            const animateElements = document.querySelectorAll('.profile-card > *');
            animateElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 200 + (index * 100));
            });

            // Adicionar CSS para highlight animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes highlight {
                    0% { background-color: transparent; }
                    50% { background-color: rgba(124, 58, 237, 0.1); }
                    100% { background-color: transparent; }
                }
            `;
            document.head.appendChild(style);
        });