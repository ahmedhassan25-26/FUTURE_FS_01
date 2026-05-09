// ===== Mobile Menu Toggle =====
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });
}

// ===== Active Link on Scroll & Sticky Header =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    // Active link highlighting
    let current = '';
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Sticky header on scroll
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    // Close mobile menu when scrolling (better UX)
    if (navbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('bx-x');
    }
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('.navbar a, .logo, .btn-outline[href="#contact"], .btn-primary[href="#contact"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip download CV buttons
        if (this.id === 'downloadCV' || this.id === 'downloadCV2') return;
        
        if (href && href !== '#' && href !== '#home') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (href === '#home' || (this.classList.contains('logo') && href === '#')) {
            e.preventDefault();
            const targetElement = document.querySelector('#home');
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Close mobile menu after clicking
        if (navbar && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            if (menuIcon) menuIcon.classList.remove('bx-x');
        }
    });
});

// ===== Download CV Button Handler =====
const downloadBtns = document.querySelectorAll('#downloadCV, #downloadCV2');
downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('📄 Ahmed Jinay - Full Stack Developer Resume\n\nSkills: React, Node.js, Python, MongoDB, PostgreSQL, AWS\nExperience: 3+ Years\n\nIn a real implementation, this would download your actual CV file.');
        
        // Uncomment below and add your actual CV file path:
        // window.open('path/to/your-cv.pdf', '_blank');
    });
});

// ===== Contact Form Submission Handler =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const fullName = contactForm.querySelector('input[placeholder="Full Name"]')?.value || '';
        const email = contactForm.querySelector('input[placeholder="Email Address"]')?.value || '';
        
        // Simple validation
        if (!fullName.trim() || !email.trim()) {
            alert('⚠️ Please fill in your name and email address.');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            alert('⚠️ Please enter a valid email address.');
            return;
        }
        
        // Success message
        alert(`✨ Thank you ${fullName}! Your message has been sent successfully.\n\nI will get back to you within 24 hours.`);
        
        // Reset form
        contactForm.reset();
    });
}

// ===== Dark Mode Toggle =====
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = toggleBtn.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.className = 'bx bx-sun';
        } else {
            icon.className = 'bx bx-moon';
        }
    });
}

// ===== Service Card Interaction Animation =====
const serviceBoxes = document.querySelectorAll('.service-box');
serviceBoxes.forEach(box => {
    box.addEventListener('click', () => {
        console.log('Service clicked:', box.querySelector('h4')?.innerText);
    });
});

// ===== Testimonial Rating Animation =====
const testimonialItems = document.querySelectorAll('.testimonial-item');
testimonialItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const stars = item.querySelectorAll('.rating i');
        stars.forEach((star, index) => {
            setTimeout(() => {
                star.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    star.style.transform = 'scale(1)';
                }, 200);
            }, index * 50);
        });
    });
});

// ===== Prevent form resubmission on page refresh =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===== Lazy load images for better performance =====
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.getAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

// ===== Add animation on scroll (fade-in) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
const animatedSections = document.querySelectorAll('.service-box, .testimonial-item, .timeline-item, .project-card, .blog-card, .achievement-item');
animatedSections.forEach(el => {
    observer.observe(el);
});

// ===== Dynamic Copyright Year =====
const copyrightElement = document.querySelector('.copyright');
if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
}

// ===== Progress Bar Animation on Scroll =====
const progressBars = document.querySelectorAll('.progress-bar div');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            if (width && width !== '0%') {
                // Already has width set inline
            }
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// ===== Console log for developer =====
console.log('✅ Ahmed Jinay Portfolio loaded successfully! | Full Stack Developer Portfolio');