/*
 * Ludo Game Website - Main JavaScript
 * Enhanced animations and interactive features
 */

// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library with enhanced settings
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom',
        offset: 100
    });

    // Add animated backgrounds for sections with the class 'animated-bg'
    const animatedBgs = document.querySelectorAll('.animated-bg');
    if (animatedBgs.length > 0) {
        animatedBgs.forEach(bg => {
            const particles = document.createElement('div');
            particles.className = 'particles';
            
            // Create random colored particles
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random color from Ludo theme
                const colors = ['#ff3a3a', '#2b7de8', '#1ee069', '#ffcc0d', '#9d4edd', '#ff8d1e'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Random position and size
                const size = Math.random() * 40 + 10;
                particle.style.backgroundColor = randomColor;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation duration and delay
                const duration = Math.random() * 30 + 20;
                const delay = Math.random() * 5;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;
                
                particles.appendChild(particle);
            }
            
            bg.appendChild(particles);
        });
    }

    // Smooth scrolling for anchor links with improved easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Add a visual highlight effect to the target section
                    const highlightClass = 'section-highlight';
                    targetElement.classList.add(highlightClass);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Remove highlight after animation completes
                    setTimeout(() => {
                        targetElement.classList.remove(highlightClass);
                    }, 1500);
                }
            }
        });
    });

    // Enhanced active nav link detection with scroll trigger zones
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Shrink header on scroll
        const header = document.querySelector('.header');
        if (header) {
            if (scrollPosition > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
        
        // Update active nav based on current section
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId || 
                        (sectionId === 'home' && link.getAttribute('href') === 'index.html')) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Add subtle parallax effect to hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const scrollValue = window.scrollY;
            heroSection.style.backgroundPosition = `center ${scrollValue * 0.05}px`;
        }
        
        // Animate feature cards when they come into view
        const featureCards = document.querySelectorAll('.feature-card');
        if (featureCards.length > 0) {
            featureCards.forEach((card, index) => {
                if (isElementInViewport(card)) {
                    setTimeout(() => {
                        card.classList.add('animate-feature');
                    }, index * 150); // Staggered animation
                }
            });
        }
    });

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }

    // Enable Bootstrap tooltips with custom styling
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl, {
        template: '<div class="tooltip custom-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    }));

    // Mobile menu toggle with enhanced animation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const isNavbarToggler = e.target === navbarToggler || navbarToggler.contains(e.target);
            const isNavbarCollapse = e.target === navbarCollapse || navbarCollapse.contains(e.target);
            
            if (!isNavbarToggler && !isNavbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close mobile menu when a nav-link is clicked
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }

    // Enhanced animated counter for stats with comma formatting
    function animateCounter(element, target, duration) {
        const formatNumber = num => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        
        let start = 0;
        const totalTarget = parseInt(target.replace(/,/g, ''));
        
        const step = timestamp => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            element.innerText = formatNumber(Math.floor(progress * totalTarget));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.innerText = target;
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Initialize number counters when they come into view
    const counterElements = document.querySelectorAll('.counter-number');
    if (counterElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target.getAttribute('data-target');
                    animateCounter(entry.target, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterElements.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Enhanced testimonial carousel with smooth transitions
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 6000
        });
        
        // Add custom transition animations
        testimonialCarousel.addEventListener('slide.bs.carousel', event => {
            const activeItem = testimonialCarousel.querySelector('.carousel-item.active');
            const nextItem = testimonialCarousel.querySelector(`.carousel-item:nth-child(${event.to + 1})`);
            
            activeItem.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            nextItem.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            
            if (event.direction === 'left') {
                activeItem.style.transform = 'translateX(-10%) scale(0.95)';
                nextItem.style.transform = 'translateX(0) scale(1)';
            } else {
                activeItem.style.transform = 'translateX(10%) scale(0.95)';
                nextItem.style.transform = 'translateX(0) scale(1)';
            }
            
            activeItem.style.opacity = '0';
            nextItem.style.opacity = '1';
        });
        
        // Optional: Pause carousel on hover with visual feedback
        testimonialCarousel.addEventListener('mouseenter', function() {
            carousel.pause();
            testimonialCarousel.classList.add('paused');
        });
        
        testimonialCarousel.addEventListener('mouseleave', function() {
            carousel.cycle();
            testimonialCarousel.classList.remove('paused');
        });
    }

    // Enchanced form validation with visual feedback for contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // Add input event listeners for real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (input.value.trim()) {
                    input.classList.add('is-filled');
                } else {
                    input.classList.remove('is-filled');
                }
            });
            
            // Add focus effects
            input.addEventListener('focus', function() {
                input.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', function() {
                input.parentElement.classList.remove('input-focused');
                
                // Validate on blur
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.classList.add('is-invalid');
                } else if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value)) {
                        input.classList.add('is-invalid');
                    } else {
                        input.classList.remove('is-invalid');
                    }
                } else {
                    input.classList.remove('is-invalid');
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // More comprehensive validation
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('is-invalid');
                    
                    // Add shake animation to invalid fields
                    field.classList.add('shake-animation');
                    setTimeout(() => {
                        field.classList.remove('shake-animation');
                    }, 600);
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // Email validation with detailed feedback
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    valid = false;
                    emailField.classList.add('is-invalid');
                    
                    // Add specific error message for email
                    const feedback = emailField.parentElement.querySelector('.invalid-feedback');
                    if (feedback) {
                        feedback.textContent = 'Please enter a valid email address';
                    }
                    
                    // Add shake animation
                    emailField.classList.add('shake-animation');
                    setTimeout(() => {
                        emailField.classList.remove('shake-animation');
                    }, 600);
                }
            }
            
            if (valid) {
                // Successful submission animation
                contactForm.classList.add('form-submitted');
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitButton.classList.add('btn-success');
                }
                
                // Here you would typically send the form data to a server
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3 fade-in-up';
                successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Thank you for your message! We\'ll get back to you soon.';
                
                contactForm.appendChild(successMessage);
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    formInputs.forEach(input => {
                        input.classList.remove('is-filled');
                    });
                    
                    // Restore submit button
                    if (submitButton) {
                        submitButton.innerHTML = 'Send Message';
                        submitButton.classList.remove('btn-success');
                    }
                    
                    // Fade out success message
                    successMessage.classList.add('fade-out');
                    setTimeout(() => {
                        successMessage.remove();
                        contactForm.classList.remove('form-submitted');
                    }, 500);
                }, 3000);
            }
        });
    }

    // Enhanced back-to-top button with progress indicator
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        // Create SVG circle progress indicator
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.classList.add("progress-circle");
        
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "45");
        circle.classList.add("progress-circle-path");
        
        svg.appendChild(circle);
        backToTopButton.appendChild(svg);
        
        window.addEventListener('scroll', function() {
            const scrollPercentage = Math.min((document.documentElement.scrollTop || document.body.scrollTop) / 
                ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight) * 100, 100);
            
            const circumference = 2 * Math.PI * 45;
            const dashOffset = circumference - (scrollPercentage / 100 * circumference);
            circle.style.strokeDashoffset = dashOffset;
            
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // Animated playing dice in game section (if exists)
    const gameSection = document.querySelector('.game-preview-section');
    if (gameSection) {
        const diceContainer = document.createElement('div');
        diceContainer.className = 'animated-dice-container';
        
        // Create animated dice with random results on click
        const dice = document.createElement('div');
        dice.className = 'interactive-dice';
        dice.innerHTML = '<span class="dice-dots"></span>';
        
        dice.addEventListener('click', () => {
            if (!dice.classList.contains('rolling')) {
                dice.classList.add('rolling');
                
                setTimeout(() => {
                    const randomNumber = Math.floor(Math.random() * 6) + 1;
                    dice.setAttribute('data-result', randomNumber);
                    dice.classList.remove('rolling');
                    
                    // Show result message
                    const resultMessage = document.createElement('div');
                    resultMessage.className = 'dice-result-message';
                    resultMessage.textContent = `You rolled a ${randomNumber}!`;
                    
                    diceContainer.appendChild(resultMessage);
                    
                    setTimeout(() => {
                        resultMessage.remove();
                    }, 2000);
                }, 1000);
            }
        });
        
        diceContainer.appendChild(dice);
        gameSection.appendChild(diceContainer);
    }

    
    // Initialize image comparison sliders if they exist
    const comparisonSliders = document.querySelectorAll('.image-comparison');
    if (comparisonSliders.length > 0) {
        comparisonSliders.forEach(slider => {
            const handle = slider.querySelector('.comparison-handle');
            const beforeImage = slider.querySelector('.before-image');
            
            // Set initial position
            beforeImage.style.width = '50%';
            handle.style.left = '50%';
            
            // Add drag functionality
            handle.addEventListener('mousedown', startDrag);
            handle.addEventListener('touchstart', startDrag);
            
            function startDrag(e) {
                e.preventDefault();
                document.addEventListener('mousemove', drag);
                document.addEventListener('touchmove', drag);
                document.addEventListener('mouseup', stopDrag);
                document.addEventListener('touchend', stopDrag);
                
                slider.classList.add('active');
            }
            
            function drag(e) {
                let clientX;
                if (e.type === 'touchmove') {
                    clientX = e.touches[0].clientX;
                } else {
                    clientX = e.clientX;
                }
                
                const rect = slider.getBoundingClientRect();
                const position = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
                
                beforeImage.style.width = `${position}%`;
                handle.style.left = `${position}%`;
            }
            
            function stopDrag() {
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('touchmove', drag);
                slider.classList.remove('active');
            }
        });
    }

    // Add floating objects to sections
    addFloatingObjects();
});

// Add floating animated objects to specific sections (dice, tokens, etc.)
function addFloatingObjects() {
    // Sections to add floating objects to
    const sectionsWithFloaters = [
        { selector: '.hero-section', items: 'dice', count: 6 },
        { selector: '.features-section', items: 'tokens', count: 8 },
        { selector: '.testimonials-section', items: 'stars', count: 12 },
        { selector: '.how-to-play-section', items: 'dice-dots', count: 15 }
    ];
    
    sectionsWithFloaters.forEach(section => {
        const sectionElement = document.querySelector(section.selector);
        if (sectionElement) {
            // Create container for floating elements
            const floatersContainer = document.createElement('div');
            floatersContainer.className = 'floating-objects';
            
            // Generate the floating elements
            for (let i = 0; i < section.count; i++) {
                const floater = document.createElement('div');
                floater.className = `floating-${section.items}`;
                
                // Randomize size
                const size = Math.random() * 30 + 20;
                floater.style.width = `${size}px`;
                floater.style.height = `${size}px`;
                
                // Randomize position
                floater.style.left = `${Math.random() * 100}%`;
                floater.style.top = `${Math.random() * 100}%`;
                
                // Randomize animation duration and delay
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 10;
                floater.style.animationDuration = `${duration}s`;
                floater.style.animationDelay = `${delay}s`;
                
                // If it's a dice, add a random rotation
                if (section.items === 'dice') {
                    const rotationDuration = Math.random() * 30 + 20;
                    floater.style.animationDuration = `${duration}s, ${rotationDuration}s`;
                    floater.style.animationName = 'float, rotate';
                }
                
                // Add to container
                floatersContainer.appendChild(floater);
            }
            
            // Add to section
            sectionElement.appendChild(floatersContainer);
        }
    });
}

// Function to handle Windows download
function downloadWindows() {
    // Show confirmation dialog
    if (confirm('Download Ludo Game for Windows?')) {
        // Create a temporary link element
        const downloadLink = document.createElement('a');
        downloadLink.href = 'downloads/ludo-game-setup.exe'; // Path to your Windows installer
        downloadLink.download = 'ludo-game-setup.exe';
        downloadLink.target = '_blank';
        
        // Append to the document, trigger click and remove
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        // Track download event if analytics is available
        if (typeof gtag === 'function') {
            gtag('event', 'download', {
                'event_category': 'games',
                'event_label': 'Windows version'
            });
        }
        
        // Remove the temporary link
        setTimeout(() => {
            document.body.removeChild(downloadLink);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'download-notification';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Download started!';
            document.body.appendChild(successMsg);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMsg.classList.add('fade-out');
                setTimeout(() => document.body.removeChild(successMsg), 500);
            }, 3000);
        }, 100);
    }
} 