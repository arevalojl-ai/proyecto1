document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('open');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('open');
            }
        });
    });

    // --- Theme Toggle (Dark/Light Mode) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    
    // Check saved theme or OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    });

    // --- Text Size Toggle (Accessibility) ---
    const textSizeBtn = document.getElementById('text-size-toggle');
    let isLargeText = localStorage.getItem('textSize') === 'large';

    if (isLargeText) {
        document.documentElement.setAttribute('data-text-size', 'large');
        textSizeBtn.textContent = 'A-';
    }

    textSizeBtn.addEventListener('click', () => {
        isLargeText = !isLargeText;
        if (isLargeText) {
            document.documentElement.setAttribute('data-text-size', 'large');
            localStorage.setItem('textSize', 'large');
            textSizeBtn.textContent = 'A-';
            textSizeBtn.setAttribute('aria-label', 'Reducir tamaño de texto');
        } else {
            document.documentElement.removeAttribute('data-text-size');
            localStorage.setItem('textSize', 'normal');
            textSizeBtn.textContent = 'A+';
            textSizeBtn.setAttribute('aria-label', 'Aumentar tamaño de texto');
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    // Respect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Run once
                }
            });
        }, observerOptions);

        // Observe elements with fade-in classes
        const animateElements = document.querySelectorAll('.fade-in, .fade-in-up');
        animateElements.forEach(el => observer.observe(el));
    } else {
        // If reduced motion is preferred, show all elements immediately
        document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
            el.classList.add('visible');
            el.style.transition = 'none';
            el.style.transform = 'none';
            el.style.opacity = '1';
        });
    }
});
