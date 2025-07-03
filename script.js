// ===== PREMIUM PORTFOLIO - NEXT-LEVEL ANIMATIONS ===== //

// Global state management
let state = {
    isLoading: true,
    currentTheme: 'dark',
    lastScrollY: 0,
    ticking: false,
    particles: [],
    mouseX: 0,
    mouseY: 0,
    isCommandPaletteOpen: false,
    magneticElements: [],
    scrollRevealElements: []
};

// ===== INITIALIZATION ===== //
document.addEventListener('DOMContentLoaded', () => {
    initializePremiumPortfolio();
});

async function initializePremiumPortfolio() {
    console.log('🚀 Initializing Premium Portfolio...');
    
    // Show loading screen
    showLoadingScreen();
    
    // Initialize all premium systems
    await Promise.all([
        initPremiumCursor(),
        initEnhancedParticles(),
        initScrollAnimations(),
        initThemeSystem(),
        initCommandPalette(),
        initMobileMenu(),
        initScrollReveal(),
        initMagneticElements(),
        init3DTilt(),
        initPremiumButtons(),
        initFloatingDashboard(),
        initRotatingPhrases(),
        initProjectSystem(),
        initContactSystem(),
        initPerformanceOptimizations()
    ]);
    
    // Generate dynamic greeting
    await generateDynamicGreeting();
    
    // Start entrance animations
    startPremiumEntrance();
    
    console.log('✅ Premium Portfolio Initialized');
}

// ===== PREMIUM LOADING SCREEN ===== //
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    // Animate progress bar
    const progressBar = loadingScreen.querySelector('.progress-bar');
    if (progressBar) {
        gsap.to(progressBar, {
            width: '100%',
            duration: 3,
            ease: 'power2.out'
        });
    }
    
    // Hide loading screen after delay
    setTimeout(() => {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                loadingScreen.classList.add('hidden');
                state.isLoading = false;
                document.body.classList.add('loaded');
            }
        });
    }, 3000);
}

// ===== PREMIUM CURSOR SYSTEM ===== //
function initPremiumCursor() {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (!cursor || !cursorOutline) return;
    
    document.body.style.cursor = 'none';
    
    // Smooth cursor movement with GSAP
    let mouse = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    let speed = 0.15;
    
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
        
        // Trail effect
        if (cursorTrail) {
            gsap.to(cursorTrail, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: 'power2.out'
            });
        }
    });
    
    // Smooth cursor animation
    function updateCursor() {
        pos.x += (mouse.x - pos.x) * speed;
        pos.y += (mouse.y - pos.y) * speed;
        
        gsap.set(cursor, { x: pos.x, y: pos.y });
        gsap.set(cursorOutline, { x: pos.x, y: pos.y });
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Enhanced hover effects
    const hoverElements = document.querySelectorAll('a, button, [data-magnetic], .premium-card, .social-link');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                scale: 2,
                duration: 0.3,
                ease: 'power2.out'
            });
            cursorOutline.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            cursorOutline.classList.remove('hover');
        });
    });
}

// ===== ENHANCED PARTICLE SYSTEM ===== //
function initEnhancedParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class PremiumParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.005;
            this.hue = Math.random() * 60 + 240; // Purple to blue spectrum
            this.alpha = 0.8;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.size *= 0.98;
            this.alpha = this.life * 0.8;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = `hsl(${this.hue}, 70%, 60%)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    let lastMouse = { x: 0, y: 0 };
    
    document.addEventListener('mousemove', (e) => {
        const distance = Math.sqrt(
            Math.pow(e.clientX - lastMouse.x, 2) + 
            Math.pow(e.clientY - lastMouse.y, 2)
        );
        
        if (distance > 8 && Math.random() < 0.3) {
            state.particles.push(new PremiumParticle(e.clientX, e.clientY));
        }
        
        lastMouse.x = e.clientX;
        lastMouse.y = e.clientY;
    });
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        state.particles = state.particles.filter(particle => {
            particle.update();
            particle.draw();
            return particle.life > 0 && particle.size > 0.1;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize handling
    window.addEventListener('resize', debounce(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, 250));
}

// ===== PREMIUM SCROLL ANIMATIONS ===== //
function initScrollAnimations() {
    const navbar = document.getElementById('navbar');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll behavior
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        if (!state.ticking) {
            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                
                // Navbar hide/show with smooth transitions
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    gsap.to(navbar, {
                        y: -100,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(navbar, {
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
                
                // Add scrolled class for styling
                if (currentScrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Update scroll progress with easing
                if (scrollProgressBar) {
                    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrolled = (currentScrollY / windowHeight) * 100;
                    gsap.to(scrollProgressBar, {
                        width: `${Math.min(scrolled, 100)}%`,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
                
                lastScrollY = currentScrollY;
                state.ticking = false;
            });
            state.ticking = true;
        }
    });
    
    // Smooth scroll for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: 'power2.out'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu
                const navMenu = document.getElementById('nav-menu');
                navMenu?.classList.remove('active');
            }
        });
    });
    
    // Intersection Observer for active nav links
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

// ===== PREMIUM THEME SYSTEM ===== //
function initThemeSystem() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    state.currentTheme = savedTheme;
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.classList.add('light');
    }
    
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        
        if (isLight) {
            // Switch to dark
            gsap.to(document.body, {
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    document.body.classList.remove('light-theme');
                    themeToggle.classList.remove('light');
                    state.currentTheme = 'dark';
                    localStorage.setItem('portfolio-theme', 'dark');
                }
            });
        } else {
            // Switch to light
            gsap.to(document.body, {
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    document.body.classList.add('light-theme');
                    themeToggle.classList.add('light');
                    state.currentTheme = 'light';
                    localStorage.setItem('portfolio-theme', 'light');
                }
            });
        }
        
        // Animate toggle
        gsap.to(themeToggle, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out'
        });
    });
}

// ===== ENHANCED COMMAND PALETTE ===== //
function initCommandPalette() {
    const commandPalette = document.getElementById('commandPalette');
    const commandInput = document.getElementById('commandInput');
    const commandResults = document.getElementById('commandResults');
    
    if (!commandPalette || !commandInput || !commandResults) return;
    
    const commands = [
        { name: 'Home', action: () => scrollToSection('hero'), keywords: ['home', 'start', 'top'], icon: '🏠' },
        { name: 'About', action: () => scrollToSection('about'), keywords: ['about', 'bio', 'info'], icon: '👨‍💻' },
        { name: 'Projects', action: () => scrollToSection('projects'), keywords: ['projects', 'work', 'portfolio'], icon: '💼' },
        { name: 'Certifications', action: () => scrollToSection('certifications'), keywords: ['certs', 'certificates'], icon: '🏆' },
        { name: 'Contact', action: () => scrollToSection('contact'), keywords: ['contact', 'email', 'reach'], icon: '📧' },
        { name: 'Copy Email', action: () => copyToClipboard('waghaditya312@gmail.com'), keywords: ['email', 'copy'], icon: '📋' },
        { name: 'Copy Phone', action: () => copyToClipboard('+91 8329177017'), keywords: ['phone', 'number'], icon: '📞' },
        { name: 'GitHub', action: () => window.open('https://github.com/dragaditya', '_blank'), keywords: ['github', 'code'], icon: '🐙' },
        { name: 'LinkedIn', action: () => window.open('https://linkedin.com/in/DragAdi', '_blank'), keywords: ['linkedin'], icon: '💼' },
        { name: 'Toggle Theme', action: () => document.getElementById('themeToggle').click(), keywords: ['theme', 'dark', 'light'], icon: '🌓' }
    ];
    
    // Open command palette
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openCommandPalette();
        }
        
        if (e.key === '/' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            openCommandPalette();
        }
        
        if (e.key === 'Escape') {
            closeCommandPalette();
        }
    });
    
    function openCommandPalette() {
        state.isCommandPaletteOpen = true;
        commandPalette.classList.add('active');
        commandInput.focus();
        renderCommands(commands);
        
        // Animate entrance
        gsap.fromTo(commandPalette, 
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
    }
    
    function closeCommandPalette() {
        if (!state.isCommandPaletteOpen) return;
        
        state.isCommandPaletteOpen = false;
        gsap.to(commandPalette, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                commandPalette.classList.remove('active');
                commandInput.value = '';
                commandResults.innerHTML = '';
            }
        });
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
            `<div class="command-item" data-index="${index}">
                <span class="command-icon">${cmd.icon}</span>
                <span class="command-name">${cmd.name}</span>
            </div>`
        ).join('');
        
        // Add click handlers with animations
        const commandItems = commandResults.querySelectorAll('.command-item');
        commandItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                gsap.to(item, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.out',
                    onComplete: () => {
                        commandList[index].action();
                        closeCommandPalette();
                    }
                });
            });
            
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    x: 5,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    x: 0,
                    duration: 0.2,
                    ease: 'power2.out'
                });
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

// ===== SCROLL REVEAL ANIMATIONS ===== //
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    delay: entry.target.dataset.delay || 0
                });
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ===== MAGNETIC ELEMENTS ===== //
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(element, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

// ===== 3D TILT EFFECTS ===== //
function init3DTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(element, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000,
                transformOrigin: 'center'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// ===== PREMIUM BUTTONS ===== //
function initPremiumButtons() {
    const buttons = document.querySelectorAll('.premium-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '4px';
            ripple.style.height = '4px';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'translate(-50%, -50%)';
            
            button.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 50,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
        });
    });
    
    // Button click handlers
    const ctaPrimary = document.querySelector('.cta-primary');
    const ctaSecondary = document.querySelector('.cta-secondary');
    
    if (ctaPrimary) {
        ctaPrimary.addEventListener('click', () => scrollToSection('projects'));
    }
    
    if (ctaSecondary) {
        ctaSecondary.addEventListener('click', () => scrollToSection('contact'));
    }
}

// ===== FLOATING DASHBOARD ===== //
function initFloatingDashboard() {
    const dashboard = document.querySelector('.floating-dashboard');
    if (!dashboard) return;
    
    // Animate stats on intersection
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const values = entry.target.querySelectorAll('.stat-value');
                values.forEach(value => {
                    const target = parseFloat(value.textContent);
                    gsap.fromTo(value, 
                        { textContent: 0 },
                        {
                            textContent: target,
                            duration: 2,
                            ease: 'power2.out',
                            snap: { textContent: target < 10 ? 0.01 : 1 },
                            onUpdate: function() {
                                value.textContent = Math.round(this.targets()[0].textContent * 100) / 100;
                            }
                        }
                    );
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(dashboard);
}

// ===== ROTATING PHRASES ===== //
function initRotatingPhrases() {
    const phrases = document.querySelectorAll('.phrase');
    if (phrases.length === 0) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        const current = phrases[currentIndex];
        const next = phrases[(currentIndex + 1) % phrases.length];
        
        gsap.timeline()
            .to(current, {
                y: -30,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            })
            .set(current, { className: 'phrase' })
            .set(next, { 
                className: 'phrase active',
                y: 30,
                opacity: 0
            })
            .to(next, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        
        currentIndex = (currentIndex + 1) % phrases.length;
    }, 3000);
}

// ===== UTILITY FUNCTIONS ===== //
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        gsap.to(window, {
            duration: 1.2,
            scrollTo: {
                y: section,
                offsetY: 80
            },
            ease: 'power2.out'
        });
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied: ${text}`, 'success');
    }).catch(() => {
        showToast('Failed to copy to clipboard', 'error');
    });
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    const container = document.getElementById('toastContainer') || document.body;
    container.appendChild(toast);
    
    gsap.fromTo(toast,
        { opacity: 0, y: 50, scale: 0.8 },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.7)'
        }
    );
    
    setTimeout(() => {
        gsap.to(toast, {
            opacity: 0,
            y: -50,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => toast.remove()
        });
    }, 3000);
}

async function generateDynamicGreeting() {
    const greetingElement = document.getElementById('dynamicGreeting');
    if (!greetingElement) return;
    
    const greetings = [
        "Hey there! 👋",
        "Welcome to my lab! 🧪",
        "Hey curious coder! 💻",
        "Sup fellow dev! 🚀",
        "Hello, innovator! ⚡",
        "Greetings, tech explorer! 🌟"
    ];
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    // Typewriter effect with GSAP
    greetingElement.textContent = '';
    for (let i = 0; i < randomGreeting.length; i++) {
        setTimeout(() => {
            greetingElement.textContent += randomGreeting.charAt(i);
        }, i * 100);
    }
}

function startPremiumEntrance() {
    // Staggered entrance animations
    gsap.timeline()
        .from('.hero-badge', {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: 'power2.out'
        })
        .from('.hero-name', {
            opacity: 0,
            y: 50,
            rotationX: 90,
            duration: 1.2,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6')
        .from('.hero-cta .premium-button', {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, '-=0.4')
        .from('.floating-dashboard', {
            opacity: 0,
            scale: 0.8,
            rotationY: 45,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.8');
}

// ===== MOBILE MENU ===== //
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            gsap.to(navMenu, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => navMenu.classList.remove('active')
            });
        } else {
            navMenu.classList.add('active');
            gsap.fromTo(navMenu,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// ===== PROJECT SYSTEM ===== //
function initProjectSystem() {
    // Project modals and interactions
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ===== CONTACT SYSTEM ===== //
function initContactSystem() {
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const text = button.getAttribute('data-copy');
            copyToClipboard(text);
            
            // Visual feedback
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out'
            });
        });
    });
}

// ===== PERFORMANCE OPTIMIZATIONS ===== //
function initPerformanceOptimizations() {
    // Intersection Observer for expensive animations
    const expensiveElements = document.querySelectorAll('.expensive-animation');
    
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, { threshold: 0.1 });
    
    expensiveElements.forEach(element => {
        performanceObserver.observe(element);
    });
    
    // Debounce utility
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
    
    // Throttle utility
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Export utilities globally
    window.debounce = debounce;
    window.throttle = throttle;
}

// ===== GSAP SCROLL TRIGGER SETUP ===== //
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Enhanced scroll triggers for premium effects
ScrollTrigger.create({
    trigger: ".hero",
    start: "top center",
    end: "bottom center",
    onEnter: () => console.log("Hero in view"),
    onLeave: () => console.log("Hero out of view"),
});

// Performance monitoring
console.log('🎯 Premium Portfolio Ready - Performance Optimized');

// Export state for debugging
window.portfolioState = state;