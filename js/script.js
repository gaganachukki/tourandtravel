document.addEventListener('DOMContentLoaded', () => {
    // Set Active Nav Link based on current page URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // =========================================================================
    // HERO BACKGROUND SLIDER (3 WEBP IMAGES, 1.5S FADE-IN LOOP)
    // =========================================================================
    const heroSlides = document.querySelectorAll('.hero-slides-wrapper .hero-slide');
    const heroDots = document.querySelectorAll('.hero-indicators .hero-dot');
    
    if (heroSlides.length > 1) {
        let currentSlide = 0;
        let slideTimer = null;
        const slideDuration = 5500; // 5.5s per slide (includes 1.5s fade-in)

        function goToSlide(nextIndex) {
            if (nextIndex === currentSlide) return;

            const prevSlide = heroSlides[currentSlide];
            const nextSlide = heroSlides[nextIndex];

            // Retain previous slide as underlay during crossfade
            heroSlides.forEach(s => s.classList.remove('prev'));
            prevSlide.classList.add('prev');
            prevSlide.classList.remove('active');

            // Trigger 1.5s fade-in transition on incoming slide
            nextSlide.classList.add('active');

            // Update indicator dots
            if (heroDots.length > 0) {
                heroDots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === nextIndex);
                });
            }

            currentSlide = nextIndex;

            // Remove 'prev' underlay once fade-in completes (1.5s = 1500ms)
            setTimeout(() => {
                prevSlide.classList.remove('prev');
            }, 1500);
        }

        function startSlideLoop() {
            if (slideTimer) clearInterval(slideTimer);
            slideTimer = setInterval(() => {
                const nextIndex = (currentSlide + 1) % heroSlides.length;
                goToSlide(nextIndex);
            }, slideDuration);
        }

        // Dot click interaction
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                goToSlide(index);
                startSlideLoop(); // Reset interval
            });
        });

        startSlideLoop();
    }

    // =========================================================================
    // WATCH FILM VIDEO MODAL CONTROLLER
    // =========================================================================
    const watchFilmBtn = document.getElementById('watchFilmBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideoModalBtn = document.getElementById('closeVideoModal');
    const heroFilmFrame = document.getElementById('heroFilmFrame');
    const travelFilmUrl = 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&rel=0';

    if (watchFilmBtn && videoModal) {
        const openVideo = (e) => {
            if (e) e.preventDefault();
            if (heroFilmFrame) {
                heroFilmFrame.src = travelFilmUrl;
            }
            videoModal.classList.add('open');
            videoModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closeVideo = (e) => {
            if (e) e.preventDefault();
            videoModal.classList.remove('open');
            videoModal.setAttribute('aria-hidden', 'true');
            if (heroFilmFrame) {
                heroFilmFrame.src = '';
            }
            document.body.style.overflow = '';
        };

        watchFilmBtn.addEventListener('click', openVideo);
        if (closeVideoModalBtn) {
            closeVideoModalBtn.addEventListener('click', closeVideo);
        }

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideo();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('open')) {
                closeVideo();
            }
        });
    }

    // Tab Switching for Search Widget
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(t => t.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');
            
            // You can add logic here to switch form content based on the tab selected
            // const tabId = btn.getAttribute('data-tab');
            // e.g., show Stays form, hide Flights form, etc.
        });
    });

    // Like Button Interaction
    const likeBtns = document.querySelectorAll('.like-btn');
    
    likeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('i');
            
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#ef4444'; // Red color
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                icon.style.color = ''; // Reset
            }
        });
    });

    // FAQ Accordion Interaction
    const faqHeaders = document.querySelectorAll('.faq-header');
    
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const isActive = currentItem.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const icon = item.querySelector('.faq-icon i');
                if(icon) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                currentItem.classList.add('active');
                const icon = currentItem.querySelector('.faq-icon i');
                if(icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            }
        });
    });

    // =========================================================================
    // MOBILE NAVIGATION & ANIMATED HAMBURGER MENU DRAWER
    // =========================================================================
    const headerContainer = document.querySelector('.header .header-container');
    if (headerContainer) {
        // Create hamburger button if not already present
        let mobileToggle = document.getElementById('mobileNavToggle');
        if (!mobileToggle) {
            mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-nav-toggle';
            mobileToggle.id = 'mobileNavToggle';
            mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.innerHTML = `
                <span class="hamburger-bar bar-top"></span>
                <span class="hamburger-bar bar-middle"></span>
                <span class="hamburger-bar bar-bottom"></span>
            `;
            headerContainer.appendChild(mobileToggle);
        }

        // Create mobile navigation drawer if not already present
        let drawer = document.getElementById('mobileNavDrawer');
        let backdrop = document.getElementById('mobileNavBackdrop');
        if (!drawer) {
            drawer = document.createElement('div');
            drawer.className = 'mobile-nav-drawer';
            drawer.id = 'mobileNavDrawer';
            drawer.setAttribute('aria-hidden', 'true');
            drawer.innerHTML = `
                <div class="mobile-drawer-header">
                    <a href="index.html" class="logo">
                        <img src="assets/logo.webp" alt="Stackly Logo" style="height: 36px; width: auto;">
                    </a>
                    <button class="mobile-drawer-close" id="mobileDrawerClose" aria-label="Close navigation menu">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="mobile-drawer-body">
                    <ul class="mobile-nav-links">
                        <li><a href="index.html"><i class="fa-solid fa-house"></i> Home</a></li>
                        <li><a href="destinations.html"><i class="fa-solid fa-earth-americas"></i> Destinations</a></li>
                        <li><a href="tourpackages.html"><i class="fa-solid fa-box-archive"></i> Tour Packages</a></li>
                        <li><a href="hotels.html"><i class="fa-solid fa-hotel"></i> Hotels</a></li>
                        <li><a href="flights.html"><i class="fa-solid fa-plane"></i> Flights</a></li>
                        <li><a href="contact.html"><i class="fa-solid fa-envelope"></i> Contact</a></li>
                    </ul>
                    <div class="mobile-drawer-actions">
                        <a href="login.html" class="btn-outline-drawer"><i class="fa-solid fa-arrow-right-to-bracket"></i> Login</a>
                        <a href="404.html" class="btn btn-primary btn-drawer"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                    </div>
                </div>
            `;
            document.body.appendChild(drawer);

            backdrop = document.createElement('div');
            backdrop.className = 'mobile-nav-backdrop';
            backdrop.id = 'mobileNavBackdrop';
            document.body.appendChild(backdrop);
        }

        // Set active link inside mobile drawer based on current page URL
        const mobileLinks = drawer.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });

        // Open & Close Menu Functions with Animated States
        const openMenu = () => {
            mobileToggle.classList.add('is-active');
            mobileToggle.setAttribute('aria-expanded', 'true');
            drawer.classList.add('open');
            drawer.setAttribute('aria-hidden', 'false');
            backdrop.classList.add('open');
            document.body.classList.add('mobile-menu-active');
        };

        const closeMenu = () => {
            mobileToggle.classList.remove('is-active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            drawer.classList.remove('open');
            drawer.setAttribute('aria-hidden', 'true');
            backdrop.classList.remove('open');
            document.body.classList.remove('mobile-menu-active');
        };

        // Event Listeners
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (drawer.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        const drawerCloseBtn = document.getElementById('mobileDrawerClose');
        if (drawerCloseBtn) {
            drawerCloseBtn.addEventListener('click', closeMenu);
        }

        backdrop.addEventListener('click', closeMenu);

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && drawer.classList.contains('open')) {
                closeMenu();
            }
        });

        // Close when clicking any nav link inside drawer
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Auto close if window is resized above 1024px
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && drawer.classList.contains('open')) {
                closeMenu();
            }
        });
    }

    // =========================================================================
    // GLOBAL HANDLER: ALL UNUSED BUTTONS & PLACEHOLDER LINKS LEAD TO 404 PAGE
    // =========================================================================
    document.addEventListener('click', (e) => {
        const target = e.target.closest('button, a, input[type="button"], input[type="submit"]');
        if (!target) return;

        // Bypass elements explicitly marked or inside mobile nav drawer / hero slider / video modal
        if (target.dataset && target.dataset.bypass404) return;
        if (target.closest('.mobile-nav-drawer, .mobile-nav-toggle, .hero-dot, .hero-indicators, .btn-hero-watch, .btn-hero-explore, .video-modal-backdrop, .video-modal-close')) return;

        // 1. ANCHOR LINKS (<a>)
        if (target.tagName.toLowerCase() === 'a') {
            const href = target.getAttribute('href');

            // Direct link to 404
            if (href === '404.html') return;

            // Known functional interactive links
            const isFunctional = 
                target.hasAttribute('data-view') ||
                target.classList.contains('nav-view-btn') ||
                target.classList.contains('btn-drawer') ||
                target.classList.contains('btn-outline-drawer') ||
                target.hasAttribute('onclick') ||
                (href && (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http://') || href.startsWith('https://')));

            if (isFunctional) return;

            // Placeholder hrefs or non-existent page targets
            const deadHrefs = ['#', '', 'javascript:void(0)', 'javascript:;', 'javascript:void(0);'];
            const nonExistentPages = ['activities.html', 'experiences.html', 'about.html', 'privacy.html', 'terms.html'];

            if (deadHrefs.includes(href) || (href && nonExistentPages.includes(href.split('#')[0]))) {
                e.preventDefault();
                window.location.href = '404.html';
                return;
            }

            // In-page hash link without matching element
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                if (targetId && !document.getElementById(targetId) && !document.querySelector(`[name="${targetId}"]`)) {
                    e.preventDefault();
                    window.location.href = '404.html';
                    return;
                }
            }
        }

        // 2. BUTTONS (<button>, input buttons)
        if (target.tagName.toLowerCase() === 'button' || target.type === 'button' || target.type === 'submit') {
            // Explicit SSO / search buttons without implementation
            if (target.classList.contains('btn-sso') ||
                target.classList.contains('auth-provider-google') ||
                target.classList.contains('auth-provider-apple') ||
                target.classList.contains('tp-search-btn') ||
                target.classList.contains('hotel-search-btn') ||
                target.classList.contains('search-submit-btn')) {
                e.preventDefault();
                window.location.href = '404.html';
                return;
            }

            // Known functional buttons
            const isInteractive = 
                target.hasAttribute('onclick') ||
                target.hasAttribute('data-tab') ||
                target.hasAttribute('data-view') ||
                target.classList.contains('tab-btn') ||
                target.classList.contains('like-btn') ||
                target.classList.contains('faq-header') ||
                target.classList.contains('faq-question') ||
                target.classList.contains('mobile-toggle-btn') ||
                target.classList.contains('close-sidebar-btn') ||
                target.classList.contains('modal-close-btn') ||
                target.classList.contains('toggle-password-btn') ||
                target.classList.contains('table-filter-btn') ||
                target.classList.contains('btn-role') ||
                target.classList.contains('tab-pill') ||
                target.classList.contains('tab') ||
                target.classList.contains('mobile-nav-toggle') ||
                target.classList.contains('mobile-drawer-close') ||
                target.id === 'openSidebarBtn' ||
                target.id === 'closeSidebarBtn' ||
                target.id === 'mobileNavToggle' ||
                target.id === 'mobileDrawerClose' ||
                target.id === 'loginSubmitBtn' ||
                target.id === 'btnSubmitSignup';

            if (target.classList.contains('tab-pill')) {
                const container = target.closest('.filter-tabs');
                if (container) {
                    container.querySelectorAll('.tab-pill').forEach(btn => btn.classList.remove('active'));
                    target.classList.add('active');
                }
                return;
            }

            if (isInteractive) return;

            // Form submit buttons
            const form = target.closest('form');
            if (form) {
                // Newsletter form with no backend
                if (form.classList.contains('newsletter-form') || form.classList.contains('newsletter-form-inline')) {
                    e.preventDefault();
                    window.location.href = '404.html';
                    return;
                }
                const hasFormAction = form.hasAttribute('onsubmit') || (form.hasAttribute('action') && form.getAttribute('action') !== '#');
                if (hasFormAction) return;
            }

            // Unhandled button
            e.preventDefault();
            window.location.href = '404.html';
        }
    });
});
