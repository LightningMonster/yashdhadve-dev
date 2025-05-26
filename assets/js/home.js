// Enhanced Home Page Interactions
class PortfolioHomePage {
    constructor() {
        this.initializeObserver();
        this.initializeHero();
        this.initializeNavbar();
        this.initializeProjects();
        this.initializeSkills();
        this.initializeContactForm();
    }

    initializeObserver() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    if (entry.target.classList.contains('project-card')) {
                        this.animateProjectCard(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('section, .project-card, .skill-card').forEach(el => {
            el.classList.add('animate-hidden');
            this.observer.observe(el);
        });
    }

    initializeHero() {
        const roles = ['Web Developer 💻', 'UI/UX Designer 🎨', 'Frontend Specialist ⚡'];
        let roleIndex = 0;
        let charIndex = 0;
        const typingText = document.querySelector('.typing-text');
        
        const typeRole = () => {
            if (charIndex < roles[roleIndex].length) {
                typingText.textContent = roles[roleIndex].substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeRole, 100);
            } else {
                setTimeout(eraseRole, 2000);
            }
        };

        const eraseRole = () => {
            if (charIndex > 0) {
                typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(eraseRole, 50);
            } else {
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 500);
            }
        };

        // Start typing animation
        typeRole();

        // Add parallax effect to hero
        document.addEventListener('mousemove', (e) => {
            const hero = document.querySelector('.hero');
            if (hero) {
                const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
                const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
                hero.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }
        });
    }

    initializeNavbar() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide mobile menu on scroll
            if (window.scrollY > lastScrollY && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        // Mobile menu toggle with improved animation
        menuToggle?.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking a link or outside
        document.addEventListener('click', (e) => {
            const isNavLink = e.target.closest('.nav-links a');
            const isMenuToggle = e.target.closest('.menu-toggle');
            
            if ((isNavLink || (!isMenuToggle && !e.target.closest('.nav-links'))) && 
                navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');

        const highlightNavLink = () => {
            const scrollY = window.scrollY;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${sectionId}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', highlightNavLink);
    }

    initializeProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add hover effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });

            // Add click animation
            card.addEventListener('click', function(e) {
                if (!card.classList.contains('project-coming-soon')) {
                    const ripple = document.createElement('div');
                    ripple.classList.add('ripple');
                    this.appendChild(ripple);
                    
                    const rect = card.getBoundingClientRect();
                    ripple.style.left = `${e.clientX - rect.left}px`;
                    ripple.style.top = `${e.clientY - rect.top}px`;
                    
                    setTimeout(() => ripple.remove(), 1000);
                }
            });
        });
    }

    initializeSkills() {
        const skills = [
            { name: 'Python', icon: 'fab fa-python', level: 90 },
            { name: 'Java', icon: 'fab fa-java', level: 85 },
            { name: 'HTML5', icon: 'fab fa-html5', level: 95 },
            { name: 'CSS3', icon: 'fab fa-css3-alt', level: 90 },
            { name: 'JavaScript', icon: 'fab fa-js', level: 88 },
            { name: 'React', icon: 'fab fa-react', level: 85 },
            { name: 'Node.js', icon: 'fab fa-node-js', level: 82 },
            { name: 'Git', icon: 'fab fa-git-alt', level: 88 },
            { name: 'UI/UX', icon: 'fas fa-palette', level: 92 },
            { name: 'Responsive Design', icon: 'fas fa-mobile-alt', level: 94 }
        ];

        const skillsGrid = document.querySelector('.skills-grid');
        skillsGrid.innerHTML = '';

        skills.forEach((skill, index) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card glass-card';
            skillCard.innerHTML = `
                <i class="${skill.icon}"></i>
                <h3>${skill.name}</h3>
                <div class="skill-level">
                    <div class="skill-progress" style="--progress: ${skill.level}%"></div>
                </div>
            `;
            skillCard.style.animationDelay = `${index * 0.1}s`;
            skillsGrid.appendChild(skillCard);
        });
    }

    initializeContactForm() {
        const form = document.getElementById('contact-form');
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Add validation feedback
            input.addEventListener('invalid', () => {
                input.classList.add('error');
            });

            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });

        // Handle form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            try {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success feedback
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 2000);
            } catch (error) {
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 2000);
            }
        });
    }

    animateProjectCard(card) {
        const img = card.querySelector('img');
        const info = card.querySelector('.project-info');
        const tech = card.querySelectorAll('.tech-tag');

        img?.classList.add('slide-in-left');
        info?.classList.add('slide-in-right');
        tech.forEach((tag, index) => {
            tag.style.animationDelay = `${0.2 + (index * 0.1)}s`;
            tag.classList.add('fade-in-up');
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioHomePage();

    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Add loading animation to elements
    const animatedElements = document.querySelectorAll('.hero-content > *, .project-card, .service-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Collect form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            // Here you would typically send the data to your backend
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
            contactForm.insertBefore(successMessage, contactForm.firstChild);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-error';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again.';
            contactForm.insertBefore(errorMessage, contactForm.firstChild);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
});
