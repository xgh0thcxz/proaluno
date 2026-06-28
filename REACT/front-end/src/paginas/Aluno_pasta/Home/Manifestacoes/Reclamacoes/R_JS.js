    //    // Mobile menu toggle
    //    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    //    const mobileNav = document.querySelector('.mobile-nav');
    //    mobileMenuToggle.addEventListener('click', () => {
    //        mobileMenuToggle.classList.toggle('active');
    //        mobileNav.classList.toggle('active');
    //    });
    //    // User menu toggle
    //    const userToggle = document.querySelector('.user-toggle');
    //    const userMenu = document.querySelector('.user-menu');
    //    userToggle.addEventListener('click', () => {
    //        userMenu.classList.toggle('active');
    //    });
    //    // Close user menu when clicking outside
    //    document.addEventListener('click', (e) => {
    //        if (!userToggle.contains(e.target) && !userMenu.contains(e.target)) {
    //            userMenu.classList.remove('active');
    //        }
    //    });
    //    // Header scroll effect
    //    const siteHeader = document.getElementById('site-header');
    //    window.addEventListener('scroll', () => {
    //        if (window.scrollY > 50) {
    //            siteHeader.classList.add('scrolled');
    //        } else {
    //            siteHeader.classList.remove('scrolled');
    //        }
    //    });
    //    // Choice cards selection
    //    const choiceCards = document.querySelectorAll('.choice-card');
    //    choiceCards.forEach(card => {
    //        card.addEventListener('click', () => {
    //            choiceCards.forEach(c => c.classList.remove('selected'));
    //            card.classList.add('selected');
    //            // In a real application, we would store the selection
    //            const option = card.getAttribute('data-option');
    //            console.log(`Selected option: ${option}`);
    //        });
    //    });
    //    // File upload functionality
    //    const uploadArea = document.getElementById('uploadArea');
    //    const fileList = document.getElementById('fileList');
    //    uploadArea.addEventListener('click', () => {
    //        // In a real application, we would trigger a file input
    //        const fileInput = document.createElement('input');
    //        fileInput.type = 'file';
    //        fileInput.multiple = true;
    //        fileInput.accept = '.jpg,.jpeg,.png,.pdf,.doc,.docx';
    //        fileInput.addEventListener('change', (e) => {
    //            const files = e.target.files;
    //            handleFiles(files);
    //        });
    //        fileInput.click();
    //    });
    //    // Drag and drop functionality
    //    uploadArea.addEventListener('dragover', (e) => {
    //        e.preventDefault();
    //        uploadArea.style.borderColor = 'var(--color-primary)';
    //        uploadArea.style.backgroundColor = 'rgba(255, 123, 0, 0.05)';
    //    });
    //    uploadArea.addEventListener('dragleave', () => {
    //        uploadArea.style.borderColor = 'var(--color-primary-light)';
    //        uploadArea.style.backgroundColor = 'transparent';
    //    });
    //    uploadArea.addEventListener('drop', (e) => {
    //        e.preventDefault();
    //        uploadArea.style.borderColor = 'var(--color-primary-light)';
    //        uploadArea.style.backgroundColor = 'transparent';
    //        const files = e.dataTransfer.files;
    //        handleFiles(files);
    //    });
    //    function handleFiles(files) {
    //        for (let i = 0; i < files.length; i++) {
    //            const file = files[i];
    //            // Check file size (max 10MB)
    //            if (file.size > 10 * 1024 * 1024) {
    //                alert(`O arquivo ${file.name} é muito grande. Tamanho máximo permitido: 10MB`);
    //                continue;
    //            }
    //            // Create file item
    //            const fileItem = document.createElement('div');
    //            fileItem.className = 'file-item';
    //            const fileName = document.createElement('span');
    //            fileName.textContent = file.name;
    //            const removeFile = document.createElement('span');
    //            removeFile.className = 'remove-file';
    //            removeFile.innerHTML = '<i class="fas fa-times"></i>';
    //            removeFile.addEventListener('click', () => {
    //                fileItem.remove();
    //            });
    //            fileItem.appendChild(fileName);
    //            fileItem.appendChild(removeFile);
    //            fileList.appendChild(fileItem);
    //        }
    //    }
    //    // Form submission
    //    const submitBtn = document.getElementById('submitBtn');
    //    const btnText = submitBtn.querySelector('.btn-text');
    //    const btnLoader = submitBtn.querySelector('.btn-loader');
    //    submitBtn.addEventListener('click', (e) => {
    //        e.preventDefault();
    //        // Show loading state
    //        btnText.style.opacity = '0';
    //        btnLoader.style.opacity = '1';
    //        submitBtn.disabled = true;
    //        // Simulate form submission
    //        setTimeout(() => {
    //            // Reset button state
    //            btnText.style.opacity = '1';
    //            btnLoader.style.opacity = '0';
    //            submitBtn.disabled = false;
    //            // Show success message
    //            alert('Reclamação enviada com sucesso! Entraremos em contato em breve.');
    //            // Reset form
    //            document.getElementById('complaintForm').reset();
    //            fileList.innerHTML = '';
    //        }, 2000);
    //    });