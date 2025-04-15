document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements and variables
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // Create mobile menu elements
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    
    const mobileMenuClose = document.createElement('button');
    mobileMenuClose.classList.add('mobile-menu-close');
    mobileMenuClose.innerHTML = '<i class="fas fa-times"></i>';
    
    const mobileMenuLinks = document.createElement('div');
    mobileMenuLinks.classList.add('mobile-menu-links');
    
    // Clone navigation links for mobile menu
    navLinks.forEach(link => {
        const mobileLink = link.cloneNode(true);
        mobileMenuLinks.appendChild(mobileLink);
    });
    
    // Create CTA button for mobile menu
    const mobileMenuCta = document.createElement('div');
    mobileMenuCta.classList.add('mobile-menu-cta');
    mobileMenuCta.innerHTML = '<a href="#get-started" class="btn btn-primary">Get Started</a>';
    
    // Assemble mobile menu
    mobileMenu.appendChild(mobileMenuClose);
    mobileMenu.appendChild(mobileMenuLinks);
    mobileMenu.appendChild(mobileMenuCta);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    
    // Add mobile menu and overlay to the body
    document.body.appendChild(mobileMenu);
    document.body.appendChild(overlay);
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        // Add shadow to header on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight active navigation link based on scroll position
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileMenuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenuLinks.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation classes to elements when they come into view
    const animateElements = document.querySelectorAll('.feature-card, .use-case, .timeline-item, .card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add staggered animations to features grid
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        if (index % 3 === 0) {
            card.classList.add('fade-in-delay-1');
        } else if (index % 3 === 1) {
            card.classList.add('fade-in-delay-2');
        } else {
            card.classList.add('fade-in-delay-3');
        }
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simple validation
            let isValid = true;
            const requiredFields = ['name', 'email', 'message'];
            
            requiredFields.forEach(field => {
                if (!formValues[field] || formValues[field].trim() === '') {
                    isValid = false;
                    const input = this.querySelector(`#${field}`);
                    input.style.borderColor = 'red';
                }
            });
            
            if (!isValid) {
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                
                this.appendChild(successMessage);
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    // Coin counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-item h3');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;
                
                if (value.includes('%')) {
                    const percentage = parseInt(value);
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const interval = duration / percentage;
                    
                    const counter = setInterval(() => {
                        count++;
                        target.textContent = count + '%';
                        
                        if (count >= percentage) {
                            clearInterval(counter);
                        }
                    }, interval);
                } else if (value.includes('s')) {
                    const seconds = parseInt(value);
                    let count = 0;
                    const duration = 1500; // 1.5 seconds
                    const interval = duration / (seconds * 10);
                    
                    const counter = setInterval(() => {
                        count += 0.1;
                        target.textContent = count.toFixed(1) + 's';
                        
                        if (count >= seconds) {
                            clearInterval(counter);
                        }
                    }, interval);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});