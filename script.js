// ========================================
// Tech Precision — Premium Repair Service
// JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('hidden');
            }, 1500);
        });
    }
    
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.style.padding = '0.5rem 2rem';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        } else {
            nav.style.padding = '1rem 2rem';
            nav.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animation observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger delay for cards
                if (entry.target.classList.contains('expertise-card')) {
                    const cards = document.querySelectorAll('.expertise-card');
                    cards.forEach((card, index) => {
                        card.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
                
                if (entry.target.classList.contains('service-item')) {
                    const items = document.querySelectorAll('.service-item');
                    items.forEach((item, index) => {
                        item.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
                
                if (entry.target.classList.contains('process-step')) {
                    const steps = document.querySelectorAll('.process-step');
                    steps.forEach((step, index) => {
                        step.style.transitionDelay = `${index * 0.15}s`;
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.expertise-card, .service-item, .process-step').forEach(el => {
        observer.observe(el);
    });

    // Form submission
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validate
            if (!data.name || !data.email || !data.device || !data.problem) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Show success message (in production, send to server)
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Envoyé !';
            btn.style.background = '#059669';
            
            // Reset form
            setTimeout(() => {
                this.reset();
                btn.textContent = originalText;
                btn.style.background = '';
                alert('Merci ! Votre demande de devis a été envoyée. Nous vous répondrons sous 2h.');
            }, 1500);
        });
    }

    // Nav CTA scroll to contact
    window.scrollToContact = function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const offset = 80;
            const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Parallax effect on hero circle
    const heroCircle = document.querySelector('.hero-circle');
    
    if (heroCircle) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.1;
            heroCircle.style.transform = `translate(-50%, -50%) translateY(${rate}px)`;
        });
    }

    // Add fade-in class to stats on scroll
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsSection.classList.add('fade-in');
        observer.observe(statsSection);
    }

    // Lazy load images (if any)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Smooth scroll polyfill for older browsers
if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo(0, targetPosition);
            }
        });
    });
}