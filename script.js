// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking a link
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Close menu when clicking outside or scrolling
document.addEventListener('click', (e) => {
    const isMenuClick = mobileMenu.contains(e.target);
    const isNavOpen = navLinks.classList.contains('active');
    
    if (!isMenuClick && isNavOpen && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

window.addEventListener('scroll', () => {
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Load and display projects
fetch('projects.json')
    .then(response => response.json())
    .then(projects => {
        const grid = document.querySelector('.projects-grid');
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.opacity = 0;
            projectCard.style.transform = 'translateY(20px)';
            projectCard.style.transition = 'all 0.6s ease';
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.url}" class="visit-btn">Visit Project</a>
                </div>
            `;
            
            grid.appendChild(projectCard);
            
            // Observe each card for animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(projectCard);
        });
    })
    .catch(error => console.error('Error loading projects:', error));
