/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    let icon = themeBtn.querySelector('i');
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if(theme === 'dark') {
            icon.className = 'fa-solid fa-moon';
        } else {
            icon.className = 'fa-solid fa-sun';
        }
    }

    // --- 2. Mobile Navigation ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        menuToggle.classList.toggle('toggle');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('nav-active')){
                navLinks.classList.remove('nav-active');
                menuToggle.classList.remove('toggle');
            }
        });
    });

    // --- 3. Typing Animation ---
    const typingText = document.querySelector('.typing-text');
    const words = ['Software Developer', 'Software Test Engineer', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if(!typingText) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 1000);

    // --- 4. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('active');
            
            // Progress bars specific
            if(entry.target.classList.contains('skills')) {
                const progressBars = document.querySelectorAll('.progress');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.transform = 'scaleX(1)';
                    }, index * 100);
                });
            }
            
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 5. Active Section & Back to Top ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        let current = '';
        
        if(window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 6. Custom Cursor Glow (GSAP) ---
    const cursor = document.querySelector('.cursor-glow');
    if(cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }

    // --- 7. Tilt Effect on Cards ---
    const tiltCards = document.querySelectorAll('.tilt-effect');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // --- 8. Particle Canvas Implementation ---
    // Feature disabled per user request
    
    // Smooth GSAP hero intro
    gsap.fromTo('.slide-up', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo('.slide-in',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.8 }
    );
});
