// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation to elements
    const elements = document.querySelectorAll('.feature-card, .tech-item, .color-item, .challenge-item');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        animateOnScroll.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Image zoom functionality
    const showcaseItems = document.querySelectorAll('.showcase-item img');
    showcaseItems.forEach(img => {
        img.addEventListener('click', () => {
            const modal = createZoomModal(img.src);
            document.body.appendChild(modal);
            
            // Remove modal on click outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // Horizontal scroll for showcase carousel with mouse wheel
    const carousel = document.querySelector('.showcase-carousel');
    if (carousel) {
        carousel.addEventListener('wheel', (e) => {
            e.preventDefault();
            carousel.scrollLeft += e.deltaY;
        });

        // Touch scroll handling
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
});

// Create zoom modal for images
function createZoomModal(imageSrc) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
    `;

    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    `;

    modal.appendChild(img);
    return modal;
}

// Add parallax effect to showcase images
document.addEventListener('mousemove', (e) => {
    const showcaseImages = document.querySelectorAll('.showcase-item img');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    showcaseImages.forEach(img => {
        const parent = img.closest('.showcase-item');
        if (parent) {
            const rect = parent.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.style.transform = `
                    translate(${mouseX * 20}px, ${mouseY * 20}px)
                    scale(1.05)
                `;
            }
        }
    });
});
