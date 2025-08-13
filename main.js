document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenu && navLinks) {
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
    }

    // Load projects
    if (document.getElementById('projects-grid')) {
        loadProjects((projects) => {
            const grid = document.getElementById('projects-grid');
            grid.innerHTML = '';
            
            if (!projects) {
                grid.innerHTML = '<p>No projects found</p>';
                return;
            }
            
            for (const projectId in projects) {
                const project = projects[projectId];
                
                grid.innerHTML += `
                    <div class="project-card">
                        <div class="project-image">
                            <img src="${project.imageUrl}" alt="${project.title}">
                        </div>
                        <div class="project-info">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <a href="${project.projectUrl}" class="visit-btn" target="_blank">Visit Project</a>
                        </div>
                    </div>
                `;
            }
        });
    }
});