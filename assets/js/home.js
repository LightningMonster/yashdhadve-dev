// Enhanced Home Page Interactions
class PortfolioHomePage {
    constructor() {
        this.initializeNavbar();
        this.initializeProjects();
        this.initializeObserver();
        this.initializeAnimations();
        this.initializeHero();
        this.initializeSkills();
        this.initializeContactForm();
    }

    initializeObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('project-card')) {
                        this.animateProjectCard(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('.section, .project-card').forEach(el => {
            this.observer.observe(el);
        });
    }

    initializeAnimations() {
        // Add initial visibility to sections
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
        });

        // Animate project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.opacity = '1';
            card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
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
        const menuIcon = menuToggle.querySelector('i');
        let lastScrollY = window.scrollY;

        // Scroll handler
        const handleScroll = () => {
            // Add/remove scrolled class
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide navbar on scroll down, show on scroll up
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        // Mobile menu toggle
        menuToggle?.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuIcon.classList.replace('fa-times', 'fa-bars');
                document.body.style.overflow = '';
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

        // Smooth scroll for nav links
        navItems.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuIcon.classList.replace('fa-times', 'fa-bars');
                        document.body.style.overflow = '';
                    }

                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
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
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scrolling for navigation links
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
    const navigationLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navigationLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navigationLinks.classList.contains('active')) {
            navigationLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<div class="loading"></div>';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual API call)
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
                submitButton.classList.add('success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.classList.remove('success');
                    submitButton.disabled = false;
                }, 3000);
            } catch (error) {
                // Handle error
                submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
                submitButton.classList.add('error');
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.classList.remove('error');
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScrollY = window.scrollY;
    });

    // Active section highlighting
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Typing animation for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing animation when hero section is visible
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                heroObserver.unobserve(entries[0].target);
            }
        });
        
        heroObserver.observe(document.querySelector('.hero'));
    }

    // Counter animation
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        function updateCount() {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count) + '+';
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target + '+';
            }
        }

        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                counterObserver.unobserve(entries[0].target);
            }
        });

        counterObserver.observe(counter);
    });
});
