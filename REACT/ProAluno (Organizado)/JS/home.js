
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
        const searchToggle = document.querySelector('.search-toggle');
        const searchExpanded = document.querySelector('.search-expanded');

        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // User menu toggle
        userToggle.addEventListener('click', function() {
            userMenu.classList.toggle('active');
        });

        // Search toggle
        searchToggle.addEventListener('click', function() {
            searchExpanded.classList.toggle('active');
        });

        // Close menus when clicking outside
        document.addEventListener('click', function(e) {
            if (!userToggle.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.classList.remove('active');
            }
            
            if (!searchToggle.contains(e.target) && !searchExpanded.contains(e.target)) {
                searchExpanded.classList.remove('active');
            }
        });

        // Carousel functionality
        const carousel = document.querySelector('.news-cards-wrapper');
        const cards = document.querySelectorAll('.news-card');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const dots = document.querySelectorAll('.carousel-dot');
        
        let currentIndex = 0;
        const cardWidth = cards[0].offsetWidth + 30; // Width + gap
        
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        nextBtn.addEventListener('click', function() {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Initialize carousel
        updateCarousel();
