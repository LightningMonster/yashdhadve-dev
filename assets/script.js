// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

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
const projects = [
    {
        title: 'Task Manager',
        description: 'A responsive task management application with local storage, drag-and-drop functionality, and task categories.',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage API'],
        link: 'https://github.com/yashdhadve/task-manager'
    },
    {
        title: 'Weather Dashboard',
        description: 'Interactive weather dashboard with real-time updates, 5-day forecast, and location search.',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['JavaScript', 'Weather API', 'HTML/CSS'],
        link: 'https://github.com/yashdhadve/weather-dashboard'
    },
    {
        title: 'Portfolio Gallery',
        description: 'Dynamic image gallery with filtering, lightbox view, and smooth animations.',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['JavaScript', 'CSS Grid', 'Animations'],
        link: 'https://github.com/yashdhadve/portfolio-gallery'
    }
];

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

// Populate Projects
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
skills.forEach(skill => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.innerHTML = `
        <i class="${skill.icon}"></i>
        <p>${skill.name}</p>
    `;
    skillsGrid.appendChild(skillItem);
});

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
