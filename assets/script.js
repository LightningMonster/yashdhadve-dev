// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Set default theme to light
body.dataset.theme = 'light';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';

themeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.innerHTML = body.dataset.theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const roles = ['Web Developer', 'UI/UX Designer', 'Frontend Specialist'];
let roleIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < roles[roleIndex].length) {
        typingText.textContent = "I'm a " + roles[roleIndex].substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = "I'm a " + roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
    }
}

type();

// Projects Data
// const projects = [
//     {
//         title: 'Task Manager',
//         description: 'A responsive task management application with local storage, drag-and-drop functionality, and task categories.',
//         image: 'https://via.placeholder.com/300x200',
//         technologies: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage API'],
//         link: 'https://github.com/yashdhadve/task-manager'
//     },
//     {
//         title: 'Weather Dashboard',
//         description: 'Interactive weather dashboard with real-time updates, 5-day forecast, and location search.',
//         image: 'https://via.placeholder.com/300x200',
//         technologies: ['JavaScript', 'Weather API', 'HTML/CSS'],
//         link: 'https://github.com/yashdhadve/weather-dashboard'
//     },
//     {
//         title: 'Portfolio Gallery',
//         description: 'Dynamic image gallery with filtering, lightbox view, and smooth animations.',
//         image: 'https://via.placeholder.com/300x200',
//         technologies: ['JavaScript', 'CSS Grid', 'Animations'],
//         link: 'https://github.com/yashdhadve/portfolio-gallery'
//     }
// ];

// Initialize sections when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Skills Data
    const skills = [
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'Responsive Design', icon: 'fas fa-mobile-alt' },
        { name: 'Web APIs', icon: 'fas fa-code' },
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'UI/UX', icon: 'fas fa-paint-brush' },
        { name: 'Performance', icon: 'fas fa-tachometer-alt' },
        { name: 'Accessibility', icon: 'fas fa-universal-access' },
        { name: 'SEO', icon: 'fas fa-search' }
    ];

    // Initialize Skills Section
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        console.log('Initializing skills section...');
        skillsGrid.innerHTML = ''; // Clear existing content
        skills.forEach((skill, index) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item glass-card';
            skillItem.style.animationDelay = `${index * 0.1}s`;
            skillItem.innerHTML = `
                <i class="${skill.icon}"></i>
                <p>${skill.name}</p>
            `;
            skillsGrid.appendChild(skillItem);
        });
    }
});

// Projects section
const projectGrid = document.querySelector('.project-grid');
projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" target="_blank">View Project</a>
        </div>
    `;
    projectGrid.appendChild(projectCard);
});

// Populate Skills
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
    // Clear existing content
    skillsGrid.innerHTML = '';
    
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item glass-card';
        skillItem.innerHTML = `
            <i class="${skill.icon}"></i>
            <p>${skill.name}</p>
        `;
        skillsGrid.appendChild(skillItem);
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thanks for your message! I will get back to you soon.');
    contactForm.reset();
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Close mobile menu when scrolling
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
    lastScroll = currentScroll;
});
