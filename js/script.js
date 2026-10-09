document.addEventListener('DOMContentLoaded', () => {
    // Set Active Nav Link based on current page URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

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
});
