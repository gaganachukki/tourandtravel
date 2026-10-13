
document.addEventListener("DOMContentLoaded", (event) => {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Hero Sections (Index, Destinations, Tour Packages)
        const heroSelectors = ".contact-hero h1, .contact-hero p, .contact-hero .contact-badge, .contact-hero .hero-actions, .contact-hero .hero-features, .flight-hero h1, .flight-hero p, .flight-hero .flight-badge, .flight-hero .flight-search-box, .hotel-hero h1, .hotel-hero p, .hotel-hero .hotel-badge, .hotel-hero .hotel-search-bar, .hotel-hero .hotel-filters, .hero h1, .hero p, .hero-badge, .hero .hero-actions, .hero .search-widget, .dest-hero h1, .dest-hero p, .dest-badge, .dest-search, .dest-filters, .tp-hero h1, .tp-hero p, .tp-badge, .tp-search-bar";
        const heroElements = document.querySelectorAll(heroSelectors);
        if (heroElements.length > 0) {
            gsap.from(heroElements, {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.1,
                clearProps: "all"
            });
        }

        // 2. Generic Fade Up for Section Headers and Banners
        const fadeUpElements = document.querySelectorAll(".section-header, .promo-banner, .newsletter-section, .tp-promo-banner, .tp-cta-banner");
        fadeUpElements.forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "transform,opacity"
            });
        });

        // 3. Generic Stagger for Grids
        // Select all grids that contain cards
        const gridClasses = [".grid-3", ".grid-4", ".tp-featured-grid", ".tp-categories-grid", ".features-grid", ".destinations-grid", ".activities-grid", ".hotels-grid", ".hotel-categories-grid", ".flight-results-list", ".contact-cards-grid", ".faq-container", ".how-it-works-grid"];
        
        gridClasses.forEach(gridClass => {
            const grids = document.querySelectorAll(gridClass);
            grids.forEach((grid) => {
                // Get immediate children as the items to stagger
                const items = Array.from(grid.children);
                if (items.length > 0) {
                    gsap.from(items, {
                        scrollTrigger: {
                            trigger: grid,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        },
                        y: 40,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        clearProps: "all"
                    });
                }
            });
        });
    }
});
