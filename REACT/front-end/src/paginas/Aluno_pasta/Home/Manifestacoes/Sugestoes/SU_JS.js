        // // Header scroll effect
        // window.addEventListener('scroll', function() {
        //     const header = document.getElementById('site-header');
        //     if (window.scrollY > 50) {
        //         header.classList.add('scrolled');
        //     } else {
        //         header.classList.remove('scrolled');
        //     }
        // });

        // // Mobile menu toggle
        // const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        // const mobileNav = document.querySelector('.mobile-nav');
        // const userToggle = document.querySelector('.user-toggle');
        // const userMenu = document.querySelector('.user-menu');

        // mobileMenuToggle.addEventListener('click', function() {
        //     this.classList.toggle('active');
        //     mobileNav.classList.toggle('active');
        // });

        // // User menu toggle
        // userToggle.addEventListener('click', function() {
        //     userMenu.classList.toggle('active');
        // });

        // // Close user menu when clicking outside
        // document.addEventListener('click', function(e) {
        //     if (!userToggle.contains(e.target) && !userMenu.contains(e.target)) {
        //         userMenu.classList.remove('active');
        //     }
        // });

        // // Choice card selection
        // const choiceCards = document.querySelectorAll('.choice-card');
        // let selectedType = null;

        // choiceCards.forEach(card => {
        //     card.addEventListener('click', function() {
        //         choiceCards.forEach(c => c.classList.remove('selected'));
        //         this.classList.add('selected');
        //         selectedType = this.getAttribute('data-option');
        //     });
        // });

        // // Category selection
        // const categoryOptions = document.querySelectorAll('.category-option');
        // const selectedTags = document.getElementById('selected-tags');
        // const selectedCategories = new Set();

        // categoryOptions.forEach(option => {
        //     option.addEventListener('click', function() {
        //         const value = this.getAttribute('data-value');
        //         const text = this.textContent;

        //         if (selectedCategories.has(value)) {
        //             // Remove if already selected
        //             selectedCategories.delete(value);
        //             this.classList.remove('selected');
        //             updateSelectedTags();
        //         } else {
        //             // Add if not selected
        //             selectedCategories.add(value);
        //             this.classList.add('selected');
        //             updateSelectedTags();
        //         }
        //     });
        // });

        // function updateSelectedTags() {
        //     selectedTags.innerHTML = '';
        //     selectedCategories.forEach(value => {
        //         const tag = document.createElement('div');
        //         tag.className = 'selected-tag';
        //         tag.innerHTML = `
        //             ${getCategoryText(value)}
        //             <span class="remove-tag" data-value="${value}">×</span>
        //         `;
        //         selectedTags.appendChild(tag);
        //     });

        //     // Add event listeners to remove buttons
        //     const removeButtons = document.querySelectorAll('.remove-tag');
        //     removeButtons.forEach(button => {
        //         button.addEventListener('click', function() {
        //             const value = this.getAttribute('data-value');
        //             selectedCategories.delete(value);
        //             updateSelectedTags();
                    
        //             // Update the original button state
        //             const originalButton = document.querySelector(`.category-option[data-value="${value}"]`);
        //             if (originalButton) {
        //                 originalButton.classList.remove('selected');
        //             }
        //         });
        //     });
        // }

        // function getCategoryText(value) {
        //     const option = document.querySelector(`.category-option[data-value="${value}"]`);
        //     return option ? option.textContent : value;
        // }

        // // File upload functionality
        // const uploadArea = document.getElementById('uploadArea');
        // const fileInput = document.getElementById('fileInput');
        // const fileList = document.getElementById('fileList');
        // const files = [];

        // uploadArea.addEventListener('click', function() {
        //     fileInput.click();
        // });

        // uploadArea.addEventListener('dragover', function(e) {
        //     e.preventDefault();
        //     this.style.borderColor = 'var(--color-primary)';
        // });

        // uploadArea.addEventListener('dragleave', function() {
        //     this.style.borderColor = 'var(--color-primary-light)';
        // });

        // uploadArea.addEventListener('drop', function(e) {
        //     e.preventDefault();
        //     this.style.borderColor = 'var(--color-primary-light)';
        //     handleFiles(e.dataTransfer.files);
        // });

        // fileInput.addEventListener('change', function() {
        //     handleFiles(this.files);
        // });

        // function handleFiles(fileList) {
        //     for (let i = 0; i < fileList.length; i++) {
        //         const file = fileList[i];
        //         files.push(file);
        //         displayFile(file);
        //     }
        // }

        // function displayFile(file) {
        //     const fileItem = document.createElement('div');
        //     fileItem.className = 'file-item';
        //     fileItem.innerHTML = `
        //         <span>${file.name}</span>
        //         <span class="remove-file" data-name="${file.name}">×</span>
        //     `;
        //     fileList.appendChild(fileItem);

        //     // Add event listener to remove button
        //     const removeButton = fileItem.querySelector('.remove-file');
        //     removeButton.addEventListener('click', function() {
        //         const fileName = this.getAttribute('data-name');
        //         const index = files.findIndex(f => f.name === fileName);
        //         if (index !== -1) {
        //             files.splice(index, 1);
        //         }
        //         fileItem.remove();
        //     });
        // }

        // // Form submission
        // const submitBtn = document.getElementById('submitBtn');
        // const btnText = submitBtn.querySelector('.btn-text');
        // const btnLoader = submitBtn.querySelector('.btn-loader');
        // const thankYouPage = document.getElementById('thankYouPage');
        // const protocolNumber = document.getElementById('protocolNumber');
        // const backBtn = document.getElementById('backBtn');
        // const homeBtn = document.getElementById('homeBtn');

        // submitBtn.addEventListener('click', function() {
        //     // Show loading state
        //     btnText.style.opacity = '0';
        //     btnLoader.style.opacity = '1';
        //     submitBtn.disabled = true;

        //     // Simulate form submission
        //     setTimeout(function() {
        //         // Reset button state
        //         btnText.style.opacity = '1';
        //         btnLoader.style.opacity = '0';
        //         submitBtn.disabled = false;

        //         // Generate random protocol number
        //         const randomProtocol = 'SUG-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        //         protocolNumber.textContent = randomProtocol;

        //         // Show thank you page
        //         thankYouPage.classList.add('active');
                
        //         // Scroll to thank you page
        //         thankYouPage.scrollIntoView({ behavior: 'smooth' });
        //     }, 1500);
        // });

        // // Back button functionality
        // backBtn.addEventListener('click', function() {
        //     // Hide thank you page
        //     thankYouPage.classList.remove('active');
            
        //     // Reset form
        //     document.getElementById('suggestionForm').reset();
        //     fileList.innerHTML = '';
        //     files.length = 0;
        //     selectedCategories.clear();
        //     updateSelectedTags();
            
        //     // Reset category buttons
        //     categoryOptions.forEach(option => {
        //         option.classList.remove('selected');
        //     });
            
        //     // Scroll to top
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        // });

        // // Home button functionality
        // homeBtn.addEventListener('click', function() {
        //     window.location.href = 'home.html';
        // });
