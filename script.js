// Initialize EmailJS
emailjs.init("E-rbTvf8L3ERyjmHm"); // Replace with your EmailJS User ID

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader
    setTimeout(() => {
        document.querySelector('.loader').classList.add('fade-out');
        setTimeout(() => {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 1000);

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        
        // Save preference to localStorage
        localStorage.setItem('theme', this.checked ? 'light' : 'dark');
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.replace('dark-theme', 'light-theme');
        themeToggle.checked = true;
    }

    // Sample Projects Data with descriptions
    const projects = [
        // Dylan's Projects
        { 
            title: "Network Infrastructure", 
            image: "jaringan.jpg", 
            tags: ["Networking", "Infrastructure", "Network Design", "LAN/WAN", "Routing & Switching"],
            member: "dylan",
            description: "Designed and implemented a secure enterprise network infrastructure with redundant systems and advanced firewall protection for a corporate client."
        },
        { 
            title: "Proxmox VE Cluster", 
            image: "proxmox.jpg", 
            tags: ["Proxmox", "Virtualization", "Cluster", "Linux", "Infrastructure"],
            member: "dylan",
            description: "Deployed high-availability Proxmox VE cluster for a medium-sized business, providing failover capabilities and reducing server downtime by 99.9%."
        },
        { 
            title: "Cybersecurity Audit", 
            image: "cyber.jpg", 
            tags: ["Security", "Penetration Testing", "Vulnerability Assessment", "Firewall"],
            member: "dylan",
            description: "Conducted comprehensive security audit for financial institution, identifying and patching critical vulnerabilities in their network infrastructure."
        },
        
        // Lili's Projects
        { 
            title: "Database Migration", 
            image: "oracle.jpg", 
            tags: ["Oracle Cloud", "OCI", "Autonomous Database", "Cloud Database", "Infrastructure as a Service"],
            member: "lili",
            description: "Migrated legacy database systems to Oracle Cloud Infrastructure (OCI) with zero downtime, improving performance by 300% and reducing costs by 40%."
        },
        { 
            title: "Data Warehouse Implementation", 
            image: "data.jpg", 
            tags: ["ETL", "Data Modeling", "Big Data", "Analytics"],
            member: "lili",
            description: "Implemented enterprise data warehouse solution for retail chain, enabling real-time analytics and reporting across 200+ stores."
        },
        { 
            title: "Database Optimization", 
            image: "database-optimization.jpg", 
            tags: ["Performance Tuning", "Query Optimization", "Indexing", "SQL"],
            member: "lili",
            description: "Optimized critical production database, reducing query times from 15 seconds to under 200ms for high-traffic e-commerce platform."
        },
        
        // Kenzio's Projects
        { 
            title: "UI/UX Redesign", 
            image: "uiux.jpg", 
            tags: ["UI Design", "UX Design", "Figma", "Prototyping", "Wireframing", "User Research"],
            member: "kenzio",
            description: "Complete UI/UX overhaul for a fintech mobile app resulting in 50% increase in user engagement and 30% higher conversion rates."
        },
        { 
            title: "Design System", 
            image: "design-system.jpg", 
            tags: ["Component Library", "Design Tokens", "Accessibility", "Responsive Design"],
            member: "kenzio",
            description: "Created comprehensive design system for SaaS platform, ensuring consistency across web and mobile applications while improving accessibility."
        },
        { 
            title: "User Research Project", 
            image: "user.jpeg", 
            tags: ["User Testing", "Personas", "Journey Mapping", "Usability"],
            member: "kenzio",
            description: "Conducted extensive user research for healthcare application, identifying key pain points that led to complete redesign of appointment scheduling flow."
        }
    ];

    // Load Projects
    const projectsGrid = document.getElementById('projects-grid');
    const projectCounter = document.getElementById('project-counter');
    
    // Update project counter
    projectCounter.textContent = projects.length;
    
    projects.forEach(project => {
        projectsGrid.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card project-card h-100" data-member="${project.member}" data-tags="${project.tags.join(',')}">
                    <img src="images/${project.image}" class="card-img-top" alt="${project.title}">
                    <div class="card-body">
                        <h5>${project.title}</h5>
                        <div class="tags">
                            ${project.tags.slice(0, 3).map(tag => `<span class="badge bg-red">${tag}</span>`).join('')}
                            ${project.tags.length > 3 ? `<span class="badge bg-dark">+${project.tags.length - 3}</span>` : ''}
                        </div>
                    </div>
                    <div class="project-overlay">
                        <button class="btn btn-red" onclick="openProjectModal('${project.title}', 'images/${project.image}', '${project.description}', '${project.tags.join(', ')}')">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
                isValid = false;
            }
        });
        
        if (isValid) {
            emailjs.sendForm(
                "service_bjkm0yq",
                "template_sufz9ga",
                this
            )
            .then(() => {
                alert("Message sent successfully! 🎉");
                this.reset();
            }, (error) => {
                alert("Failed to send: " + error);
            });
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
        
        // Back to top button
        if (window.scrollY > 300) {
            document.getElementById('back-to-top').style.display = 'block';
        } else {
            document.getElementById('back-to-top').style.display = 'none';
        }
    });

    // Back to top button
    document.getElementById('back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const toggler = document.querySelector('.navbar-toggler');
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });
});

// Filter Projects by Member
function showMemberProjects(memberId) {
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    
    // Reset all filter buttons
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === 'All') {
            btn.classList.add('active');
        }
    });
    
    projects.forEach(project => {
        if (project.dataset.member === memberId) {
            project.style.display = 'block';
            project.classList.add('highlight');
            setTimeout(() => {
                project.classList.remove('highlight');
            }, 1000);
        } else {
            project.style.display = 'none';
        }
    });
    
    document.getElementById('show-all-btn').style.display = 'block';
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    
    // Update project counter
    const visibleProjects = document.querySelectorAll('.project-card[style="display: block"]').length;
    document.getElementById('project-counter').textContent = visibleProjects;
}

// Filter Projects by Tag
function filterByTag(tag) {
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    
    // Set active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === tag || (tag === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });
    
    projects.forEach(project => {
        const tags = project.dataset.tags.split(',');
        if (tag === 'all' || tags.includes(tag)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
    
    document.getElementById('show-all-btn').style.display = 'none';
    
    // Update project counter
    const visibleProjects = document.querySelectorAll('.project-card[style="display: block"]').length;
    document.getElementById('project-counter').textContent = visibleProjects;
}

// Show All Projects
function showAllProjects() {
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    
    // Reset all filter buttons
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === 'All') {
            btn.classList.add('active');
        }
    });
    
    projects.forEach(project => {
        project.style.display = 'block';
    });
    document.getElementById('show-all-btn').style.display = 'none';
    
    // Update project counter
    document.getElementById('project-counter').textContent = projects.length;
}

// Open Project Modal
function openProjectModal(title, image, description, tags) {
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    
    document.getElementById('modalProjectTitle').textContent = title;
    document.getElementById('modalProjectImage').src = image;
    document.getElementById('modalProjectImage').alt = title;
    document.getElementById('modalProjectDesc').textContent = description;
    
    const tagsContainer = document.getElementById('modalProjectTags');
    tagsContainer.innerHTML = tags.split(',').map(tag => 
        `<span class="badge bg-red me-1">${tag.trim()}</span>`
    ).join('');
    
    modal.show();
}