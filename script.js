// ===== GLOBAL STATE ===== //
let isLoading = true;
let currentTheme = 'dark';
let lastScrollY = 0;
let ticking = false;
let particles = [];
let mouseX = 0;
let mouseY = 0;

// ===== INITIALIZATION ===== //
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
});

async function initializeWebsite() {
    // Initialize all components
    initCustomCursor();
    initEnhancedParticleTrail();
    initScrollNavigation();
    initCommandPalette();
    initMobileMenu();
    initRotatingPhrases();
    initProjectModals();
    initContactForm();
    initCopyToClipboard();
    initThemeToggle();
    initScrollAnimations();
    init3DTilt();
    initMagneticElements();
    initScrollSnapping();
    initDynamicTheming();
    initPerformanceOptimizations();
    
    // Generate dynamic greeting
    await generateDynamicGreeting();
    
    // Start cinematic entry
    startCinematicEntry();
    
    // Mark loading as complete
    setTimeout(() => {
        isLoading = false;
        document.body.classList.add('loaded');
    }, 2000);
}

// ===== CUSTOM CURSOR ===== //
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Hide default cursor on desktop
    if (window.innerWidth > 768) {
        document.body.style.cursor = 'none';
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
        
        if (cursorOutline) {
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        }
    });
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, [data-magnetic], .project-card, .social-link');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (cursorOutline) {
                cursorOutline.classList.add('hover');
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (cursorOutline) {
                cursorOutline.classList.remove('hover');
            }
        });
    });
}

// ===== ENHANCED PARTICLE TRAIL ===== //
function initEnhancedParticleTrail() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = (Math.random() - 0.5) * 1;
            this.life = 1;
            this.decay = Math.random() * 0.015 + 0.005;
            this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.size *= 0.995;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.life * 0.8;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        const distance = Math.sqrt(
            Math.pow(e.clientX - lastMouseX, 2) + 
            Math.pow(e.clientY - lastMouseY, 2)
        );
        
        // Only add particles when mouse is moving fast enough
        if (distance > 5 && Math.random() < 0.2) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
        
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles = particles.filter(particle => {
            particle.update();
            particle.draw();
            return particle.life > 0 && particle.size > 0.1;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== SCROLL NAVIGATION ===== //
function initScrollNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Hide/show navbar on scroll + progress bar
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                
                // Navbar hide/show
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    navbar.classList.add('hidden');
                } else {
                    navbar.classList.remove('hidden');
                }
                
                // Update scroll progress
                if (scrollProgressBar) {
                    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrolled = (currentScrollY / windowHeight) * 100;
                    scrollProgressBar.style.width = Math.min(scrolled, 100) + '%';
                }
                
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// ===== COMMAND PALETTE ===== //
function initCommandPalette() {
    const commandPalette = document.getElementById('commandPalette');
    const commandInput = document.getElementById('commandInput');
    const commandResults = document.getElementById('commandResults');
    
    const commands = [
        { name: 'Home', action: () => scrollToSection('hero'), keywords: ['home', 'start', 'top'] },
        { name: 'About', action: () => scrollToSection('about'), keywords: ['about', 'bio', 'info'] },
        { name: 'Projects', action: () => scrollToSection('projects'), keywords: ['projects', 'work', 'portfolio'] },
        { name: 'Certifications', action: () => scrollToSection('certifications'), keywords: ['certs', 'certificates', 'achievements'] },
        { name: 'Contact', action: () => scrollToSection('contact'), keywords: ['contact', 'email', 'reach'] },
        { name: 'Copy Email', action: () => copyToClipboard('waghaditya312@gmail.com'), keywords: ['email', 'copy'] },
        { name: 'Copy Phone', action: () => copyToClipboard('+91 8329177017'), keywords: ['phone', 'number', 'copy'] },
        { name: 'GitHub', action: () => window.open('https://github.com/dragaditya', '_blank'), keywords: ['github', 'code'] },
        { name: 'LinkedIn', action: () => window.open('https://linkedin.com/in/DragAdi', '_blank'), keywords: ['linkedin', 'profile'] }
    ];
    
    // Open command palette
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openCommandPalette();
        }
        
        if (e.key === '/') {
            e.preventDefault();
            openCommandPalette();
        }
        
        if (e.key === 'Escape') {
            closeCommandPalette();
        }
    });
    
    function openCommandPalette() {
        commandPalette.classList.add('active');
        commandInput.focus();
        renderCommands(commands);
    }
    
    function closeCommandPalette() {
        commandPalette.classList.remove('active');
        commandInput.value = '';
        commandResults.innerHTML = '';
    }
    
    // Search commands
    commandInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredCommands = commands.filter(cmd => 
            cmd.name.toLowerCase().includes(query) ||
            cmd.keywords.some(keyword => keyword.includes(query))
        );
        renderCommands(filteredCommands);
    });
    
    function renderCommands(commandList) {
        commandResults.innerHTML = commandList.map((cmd, index) => 
            `<div class="command-item" data-index="${index}">${cmd.name}</div>`
        ).join('');
        
        // Add click handlers
        const commandItems = commandResults.querySelectorAll('.command-item');
        commandItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                commandList[index].action();
                closeCommandPalette();
            });
        });
    }
    
    // Close on backdrop click
    commandPalette.addEventListener('click', (e) => {
        if (e.target === commandPalette) {
            closeCommandPalette();
        }
    });
}

// ===== MOBILE MENU ===== //
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// ===== ROTATING PHRASES ===== //
function initRotatingPhrases() {
    const phrases = document.querySelectorAll('.phrase');
    let currentIndex = 0;
    
    if (phrases.length === 0) return;
    
    // Add technical expertise rotation with smooth transitions
    const technicalSkills = [
        'I architect cloud solutions.',
        'I optimize performance.',
        'I secure digital systems.',
        'I innovate with Python.',
        'I deploy with AWS.',
        'I automate workflows.',
        'I debug complex problems.',
        'I craft AI experiences.',
        'I design seamless UX.',
        'I build innovative solutions.'
    ];
    
    // Enhanced rotation with staggered effects
    setInterval(() => {
        phrases[currentIndex].style.transform = 'translateY(-100%) scale(0.9)';
        phrases[currentIndex].style.opacity = '0';
        
        setTimeout(() => {
            phrases[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % phrases.length;
            phrases[currentIndex].classList.add('active');
            
            // Smooth entry animation
            phrases[currentIndex].style.transform = 'translateY(100%) scale(0.9)';
            phrases[currentIndex].style.opacity = '0';
            
            requestAnimationFrame(() => {
                phrases[currentIndex].style.transform = 'translateY(0) scale(1)';
                phrases[currentIndex].style.opacity = '1';
            });
        }, 300);
    }, 2500);
}

// ===== DYNAMIC GREETING ===== //
async function generateDynamicGreeting() {
    const greetingElement = document.getElementById('dynamicGreeting');
    if (!greetingElement) return;
    
    const greetings = [
        "Hey there! 👋",
        "Welcome to my lab! 🧪",
        "Hey curious coder! 💻",
        "Sup fellow dev! 🚀",
        "Hello, innovator! ⚡",
        "Greetings, tech explorer! 🌟",
        "Hey there, creator! 🎨",
        "Welcome, digital architect! 🏗️"
    ];
    
    // For now, use a random greeting (you can replace with Gemini API call)
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    // Typewriter effect
    let i = 0;
    greetingElement.textContent = '';
    
    const typeWriter = setInterval(() => {
        if (i < randomGreeting.length) {
            greetingElement.textContent += randomGreeting.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 100);
}

// ===== CINEMATIC ENTRY ===== //
function startCinematicEntry() {
    const heroElements = document.querySelectorAll('.hero .name-part, .greeting, .hero-description, .hero-cta');
    
    // Add initial state
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
    // Animate elements with stagger
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 200));
    });
    
    // Add click handlers for CTA buttons
    const ctaPrimary = document.querySelector('.cta-primary');
    const ctaSecondary = document.querySelector('.cta-secondary');
    
    if (ctaPrimary) {
        ctaPrimary.addEventListener('click', () => {
            scrollToSection('projects');
        });
    }
    
    if (ctaSecondary) {
        ctaSecondary.addEventListener('click', () => {
            scrollToSection('contact');
        });
    }
}

// ===== PROJECT MODALS ===== //
function initProjectModals() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');
    const infoButtons = document.querySelectorAll('[data-project]');
    
    const projectData = {
        alter: {
            title: 'ALTER - AI Code Debugger',
            description: 'A revolutionary web application that leverages Google Gemini API to provide real-time code debugging and intelligent suggestions. Built with modern authentication and a sleek dark mode interface.',
            features: [
                'Real-time code analysis using Google Gemini API',
                'Secure authentication with Clerk OAuth',
                'Modern dark mode UI with glassmorphism',
                'Intelligent error detection and suggestions',
                'Multi-language code support',
                'Real-time collaborative debugging'
            ],
            tech: ['Google Gemini API', 'Clerk Auth', 'React', 'Node.js', 'CSS3'],
            live: 'https://projectdebugger.onrender.com',
            github: 'https://github.com/dragaditya/alter'
        },
        dragx: {
            title: 'DRAGX - CLI Terminal Tool',
            description: 'A smart command-line interface tool that automates Git operations, project setup, and file management, significantly improving developer workflow efficiency.',
            features: [
                'Automated Git operations and workflows',
                'Smart project initialization and setup',
                'File management and organization tools',
                '15% improvement in development efficiency',
                'Cross-platform compatibility',
                'NPM package distribution'
            ],
            tech: ['Node.js', 'CLI', 'Git APIs', 'File System', 'NPM'],
            install: 'npx dragadix',
            github: 'https://github.com/dragaditya/dragx'
        }
    };
    
    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectKey = button.dataset.project;
            const project = projectData[projectKey];
            
            if (project) {
                showProjectModal(project);
            }
        });
    });
    
    function showProjectModal(project) {
        modalContent.innerHTML = `
            <h2>${project.title}</h2>
            <p class="project-modal-description">${project.description}</p>
            
            <h3>Key Features</h3>
            <ul class="feature-list">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <h3>Technologies Used</h3>
            <div class="tech-stack">
                ${project.tech.map(tech => `<span class="tech-chip">${tech}</span>`).join('')}
            </div>
            
            <div class="modal-actions">
                ${project.live ? `<a href="${project.live}" target="_blank" class="modal-btn primary">View Live</a>` : ''}
                ${project.install ? `<button class="modal-btn secondary" onclick="copyToClipboard('${project.install}')">Copy Install Command</button>` : ''}
                ${project.github ? `<a href="${project.github}" target="_blank" class="modal-btn secondary">View on GitHub</a>` : ''}
            </div>
        `;
        
        modalOverlay.classList.add('active');
    }
    
    function closeModal() {
        modalOverlay.classList.remove('active');
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// ===== CONTACT FORM ===== //
function initContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearValidation(input));
    });
    
    form.addEventListener('submit', handleFormSubmit);
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const validationDiv = field.parentNode.querySelector('.form-validation');
        
        let isValid = true;
        let message = '';
        
        if (field.required && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
        
        if (validationDiv) {
            validationDiv.textContent = message;
            validationDiv.className = `form-validation ${isValid ? '' : 'error'}`;
        }
        
        field.className = `${field.className.replace(/\s?(valid|invalid)/g, '')} ${isValid ? 'valid' : 'invalid'}`;
        
        return isValid;
    }
    
    function clearValidation(field) {
        const validationDiv = field.parentNode.querySelector('.form-validation');
        if (validationDiv) {
            validationDiv.textContent = '';
            validationDiv.className = 'form-validation';
        }
        field.className = field.className.replace(/\s?(valid|invalid)/g, '');
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            showToast('Please fix the errors above', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// ===== COPY TO CLIPBOARD ===== //
function initCopyToClipboard() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.dataset.copy;
            copyToClipboard(textToCopy);
        });
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}" ✅`, 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`Copied "${text}" ✅`, 'success');
    });
}

// ===== TOAST NOTIFICATIONS ===== //
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// ===== THEME TOGGLE ===== //
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.classList.toggle('light-theme');
        themeToggle.classList.toggle('active');
        
        // Save preference
        localStorage.setItem('theme', currentTheme);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme === 'light') {
        currentTheme = 'light';
        document.body.classList.add('light-theme');
        themeToggle.classList.add('active');
    }
}

// ===== SCROLL ANIMATIONS ===== //
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glass-card, .project-card, .cert-card, .skill-tag');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// ===== 3D TILT EFFECTS ===== //
function init3DTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
    });
    
    function handleTilt(e) {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
    
    function resetTilt(e) {
        const element = e.currentTarget;
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
}

// ===== MAGNETIC ELEMENTS ===== //
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', handleMagnetic);
        element.addEventListener('mouseleave', resetMagnetic);
    });
    
    function handleMagnetic(e) {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.3;
        const moveY = y * 0.3;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    function resetMagnetic(e) {
        const element = e.currentTarget;
        element.style.transform = 'translate(0px, 0px)';
    }
}

// ===== UTILITY FUNCTIONS ===== //
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== SCROLL SNAPPING ===== //
function initScrollSnapping() {
    const sections = document.querySelectorAll('section');
    
    // Add scroll snap to sections
    sections.forEach(section => {
        section.style.scrollSnapAlign = 'start';
    });
    
    // Add scroll snap container to main
    const main = document.querySelector('main');
    if (main) {
        main.style.scrollSnapType = 'y mandatory';
    }
}

// ===== DYNAMIC THEMING ===== //
function initDynamicTheming() {
    const updateThemeByTime = () => {
        const hour = new Date().getHours();
        const root = document.documentElement;
        
        if (hour >= 6 && hour < 18) {
            // Day theme adjustments
            root.style.setProperty('--accent-primary', '#8b5cf6');
            root.style.setProperty('--accent-secondary', '#06b6d4');
        } else {
            // Night theme adjustments  
            root.style.setProperty('--accent-primary', '#a855f7');
            root.style.setProperty('--accent-secondary', '#0ea5e9');
        }
    };
    
    updateThemeByTime();
    setInterval(updateThemeByTime, 60000); // Update every minute
}

// ===== PERFORMANCE OPTIMIZATIONS ===== //
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate layouts on resize
            const particles = document.getElementById('particleCanvas');
            if (particles) {
                particles.width = window.innerWidth;
                particles.height = window.innerHeight;
            }
        }, 250);
    });
    
    // Prefetch critical resources
    const criticalLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    criticalLinks.forEach(link => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'dns-prefetch';
        prefetchLink.href = link;
        document.head.appendChild(prefetchLink);
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PERFORMANCE OPTIMIZATIONS ===== //
// Throttle scroll events
const throttledScrollHandler = debounce(() => {
    // Handle scroll-based animations
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Preload critical resources
window.addEventListener('load', () => {
    // Mark as fully loaded
    document.body.classList.add('fully-loaded');
});

// ===== ACCESSIBILITY ENHANCEMENTS ===== //
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
});

// Reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
}

// ===== ERROR HANDLING ===== //
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Graceful degradation - continue without breaking
});

// ===== SERVICE WORKER REGISTRATION ===== //
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}