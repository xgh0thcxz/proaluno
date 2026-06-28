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