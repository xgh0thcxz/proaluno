        // Seleção de identificação - FUNCIONANDO
        const choiceCards = document.querySelectorAll('.choice-card');
        let selectedType = null;

        choiceCards.forEach(card => {
            card.addEventListener('click', function() {
                choiceCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                selectedType = this.getAttribute('data-option');
                console.log('Tipo selecionado:', selectedType);
            });
        });

        // Seleção de envolvidos
        const involvedOptions = document.querySelectorAll('.involved-option');
        const selectedTags = document.getElementById('selected-tags');
        const selectedOptions = new Set();

        involvedOptions.forEach(option => {
            option.addEventListener('click', function() {
                const optionText = this.textContent;
                
                if (selectedOptions.has(optionText)) {
                    selectedOptions.delete(optionText);
                    this.classList.remove('selected');
                } else {
                    selectedOptions.add(optionText);
                    this.classList.add('selected');
                }
                
                updateSelectedTags();
            });
        });

        function updateSelectedTags() {
            selectedTags.innerHTML = '';
            selectedOptions.forEach(option => {
                const tag = document.createElement('div');
                tag.className = 'selected-tag';
                tag.innerHTML = `
                    ${option}
                    <span class="remove-tag">&times;</span>
                `;
                
                tag.querySelector('.remove-tag').addEventListener('click', function(e) {
                    e.stopPropagation();
                    selectedOptions.delete(option);
                    updateSelectedTags();
                    
                    // Remover a seleção do botão correspondente
                    involvedOptions.forEach(btn => {
                        if (btn.textContent === option) {
                            btn.classList.remove('selected');
                        }
                    });
                });
                
                selectedTags.appendChild(tag);
            });
        }

        // Upload de arquivos
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const fileList = document.getElementById('fileList');
        const files = [];

        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--color-primary)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--color-primary-light)';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--color-primary-light)';
            
            if (e.dataTransfer.files.length) {
                handleFiles(e.dataTransfer.files);
            }
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                handleFiles(fileInput.files);
            }
        });

        function handleFiles(fileList) {
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                files.push(file);
                
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <span>${file.name}</span>
                    <span class="remove-file">&times;</span>
                `;
                
                fileItem.querySelector('.remove-file').addEventListener('click', function() {
                    const index = files.indexOf(file);
                    if (index > -1) {
                        files.splice(index, 1);
                    }
                    fileItem.remove();
                });
                
                fileList.appendChild(fileItem);
            }
        }

        // Envio do formulário
        const complaintForm = document.getElementById('complaintForm');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const thankYouPage = document.getElementById('thankYouPage');
        const protocolNumber = document.getElementById('protocolNumber');
        const backBtn = document.getElementById('backBtn');
        const homeBtn = document.getElementById('homeBtn');

        complaintForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verificar se o tipo de identificação foi selecionado
            if (!selectedType) {
                alert('Por favor, selecione uma forma de identificação (Identificada ou Anônima)');
                return;
            }
            
            // Simular envio
            btnText.style.opacity = '0';
            btnLoader.style.opacity = '1';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Gerar número de protocolo
                const protocol = 'DEN-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
                protocolNumber.textContent = protocol;
                
                // Mostrar página de agradecimento
                complaintForm.style.display = 'none';
                thankYouPage.classList.add('active');
                
                // Scroll para a página de agradecimento
                thankYouPage.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
        });

        // Botão de nova denúncia
        backBtn.addEventListener('click', function() {
            // Resetar formulário
            complaintForm.reset();
            complaintForm.style.display = 'flex';
            thankYouPage.classList.remove('active');
            
            // Resetar seleções
            choiceCards.forEach(card => card.classList.remove('selected'));
            selectedType = null;
            selectedOptions.clear();
            updateSelectedTags();
            involvedOptions.forEach(option => option.classList.remove('selected'));
            
            // Limpar arquivos
            files.length = 0;
            fileList.innerHTML = '';
            
            // Scroll para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Botão home
        homeBtn.addEventListener('click', function() {
            window.location.href = 'home.html';
        });

        // Menu mobile
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const userToggle = document.querySelector('.user-toggle');
        const userMenu = document.querySelector('.user-menu');

        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        userToggle.addEventListener('click', function() {
            userMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!userToggle.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.classList.remove('active');
            }
            
            if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });

        // Header scroll effect
        const siteHeader = document.getElementById('site-header');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        });
