/**
 * Matcha Website - Main JavaScript
 * Mobile menu improvements and form validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Handler
    initMobileMenu();

    // Active Nav State on Scroll
    initActiveNavOnScroll();

    // Form Validation (if on join community page)
    const joinForm = document.getElementById('join-form');
    if (joinForm) {
        initFormValidation(joinForm);
    }

    // Billing Toggle Handler
    initBillingToggle();

    // Contact Modal Handler
    initContactModal();

    // Match Center Screens Handler
    initMatchCenterScreens();
    
    // Match Center Carousel Handler
    initMatchCenterCarousel();
});

/**
 * Update active nav link based on scroll position
 */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.menu a');

    if (!sections.length || !navLinks.length) return;

    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('nav-active');
            const href = link.getAttribute('href');

            if (href === '#' + current) {
                link.classList.add('nav-active');
            } else if (!current && href === '#') {
                link.classList.add('nav-active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial check
}

/**
 * Initialize mobile menu functionality
 * - Close menu when navigation link is clicked
 * - Close menu when clicking outside
 * - Close menu on Escape key press
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');
    const navbar = document.querySelector('.navbar');

    if (!menuToggle || !menu) return;

    // Get all menu links
    const menuLinks = menu.querySelectorAll('a');

    // Close menu when a link is clicked
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menuToggle.checked = false;
        });
    });

    // Close menu when clicking outside navbar
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && menuToggle.checked) {
            menuToggle.checked = false;
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuToggle.checked) {
            menuToggle.checked = false;
        }
    });
}

/**
 * Initialize form validation for join community form
 * @param {HTMLFormElement} form - The form element to validate
 */
function initFormValidation(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form fields
        const userType = form.querySelector('select:first-of-type');
        const referralSource = form.querySelector('select:nth-of-type(2)');
        const fullName = form.querySelector('input[type="text"]');
        const email = form.querySelector('input[type="email"]');
        const phone = form.querySelector('input[type="tel"]');

        // Clear previous errors
        clearErrors(form);

        let isValid = true;

        // Validate user type
        if (!userType.value) {
            showError(userType, 'Please select your role');
            isValid = false;
        }

        // Validate referral source
        if (!referralSource.value) {
            showError(referralSource, 'Please select how you heard about us');
            isValid = false;
        }

        // Validate full name
        if (!fullName.value.trim()) {
            showError(fullName, 'Please enter your full name');
            isValid = false;
        } else if (fullName.value.trim().length < 2) {
            showError(fullName, 'Name must be at least 2 characters');
            isValid = false;
        }

        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone
        if (!phone.value.trim()) {
            showError(phone, 'Please enter your mobile number');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number with country code');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            showSuccessMessage(form);
        }
    });
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number format (basic validation)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format
 */
function isValidPhone(phone) {
    // Allow digits, spaces, dashes, parentheses, and plus sign
    // Minimum 8 digits
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15;
}

/**
 * Show error message for a field
 * @param {HTMLElement} field - The form field
 * @param {string} message - Error message to display
 */
function showError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#ff4444';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'color: #ff4444; font-size: 12px; margin-top: -10px; margin-bottom: 10px;';
    errorDiv.textContent = message;

    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

/**
 * Clear all error messages from form
 * @param {HTMLFormElement} form - The form to clear errors from
 */
function clearErrors(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(function(msg) {
        msg.remove();
    });

    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(function(field) {
        field.classList.remove('error');
        field.style.borderColor = '';
    });
}

/**
 * Show success message after form submission
 * @param {HTMLFormElement} form - The form element
 */
function showSuccessMessage(form) {
    const modalBox = form.closest('.join-modal-box');
    if (modalBox) {
        modalBox.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-check-circle" style="font-size: 60px; color: #17c964; margin-bottom: 20px;"></i>
                <h2 style="color: #17c964; margin-bottom: 15px;">Thank You!</h2>
                <p style="color: #ccc; font-size: 16px;">You've successfully joined the Matcha community.</p>
                <p style="color: #999; font-size: 14px; margin-top: 10px;">We'll be in touch soon!</p>
                <a href="/" style="display: inline-block; margin-top: 25px; padding: 12px 30px; background: #17c964; color: #000; text-decoration: none; border-radius: 25px; font-weight: 600;">Back to Home</a>
            </div>
        `;
    }
}

/**
 * Initialize pricing tabs functionality
 */
function initPricingTabs() {
    const tabs = document.querySelectorAll('.pricing-tab');
    if (!tabs.length) return;

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(function(t) {
                t.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab type
            const tabType = this.getAttribute('data-tab');
            
            // Show/hide plans based on tab
            const allPlans = document.querySelectorAll('.plan-card');
            allPlans.forEach(function(plan, index) {
                if (tabType === 'players') {
                    // Show only first 2 cards (Free and Pro)
                    if (index < 2) {
                        plan.style.display = 'block';
                    } else {
                        plan.style.display = 'none';
                    }
                } else if (tabType === 'coaches') {
                    // Show all 3 cards (Free, Pro, and Coach & Club)
                    plan.style.display = 'block';
                }
            });
        });
    });

    // Initialize with Players tab active
    const playersTab = document.querySelector('.pricing-tab[data-tab="players"]');
    if (playersTab) {
        playersTab.click();
    }
}

/**
 * Initialize billing toggle functionality
 */
function initBillingToggle() {
    const toggle = document.getElementById('billing-toggle');
    const monthlyOption = document.querySelector('.billing-option[data-billing="monthly"]');
    const annualOption = document.querySelector('.billing-option[data-billing="annual"]');
    
    if (!toggle || !monthlyOption || !annualOption) return;

    toggle.addEventListener('change', function() {
        if (this.checked) {
            monthlyOption.classList.remove('active');
            annualOption.classList.add('active');
            // Update prices for annual billing (20% discount)
            updatePricesForAnnual();
        } else {
            monthlyOption.classList.add('active');
            annualOption.classList.remove('active');
            // Reset to monthly prices
            updatePricesForMonthly();
        }
    });
}

/**
 * Update prices for annual billing
 */
function updatePricesForMonthly() {
    const proPrice = document.querySelector('.plan-card.featured .price');
    if (proPrice) {
        proPrice.innerHTML = '$9.99 <span>/ month</span>';
    }
}

/**
 * Update prices for annual billing (20% discount)
 */
function updatePricesForAnnual() {
    const proPrice = document.querySelector('.plan-card.featured .price');
    if (proPrice) {
        const monthlyPrice = 9.99;
        const annualPrice = (monthlyPrice * 12 * 0.8).toFixed(2);
        proPrice.innerHTML = '$' + annualPrice + ' <span>/ year</span>';
    }
}

/**
 * Initialize contact modal functionality
 */
function initContactModal() {
    const contactModal = document.getElementById('contact-modal');
    const contactLinks = document.querySelectorAll('.footer-contact-link');
    const closeContactModal = document.getElementById('close-contact-modal');
    const contactForm = document.getElementById('contact-form');

    if (!contactModal) return;

    // Open modal when clicking contact link
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (contactModal) {
                contactModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal function
    function closeModal() {
        if (contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = '';
            // Reset form
            if (contactForm) {
                contactForm.reset();
            }
        }
    }

    // Close modal when clicking close button
    if (closeContactModal) {
        closeContactModal.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const countryCode = document.getElementById('contact-country-code') ? document.getElementById('contact-country-code').value : '';
            const phone = document.getElementById('contact-phone').value;
            const fullPhone = phone ? (countryCode + ' ' + phone) : '';
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;

            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show success message
            const modalContent = contactModal.querySelector('.contact-modal-content');
            if (modalContent) {
                modalContent.innerHTML = `
                    <div style="text-align: center; padding: 60px 40px;">
                        <i class="fas fa-check-circle" style="font-size: 60px; color: #17c964; margin-bottom: 20px;"></i>
                        <h2 style="color: #17c964; margin-bottom: 15px; font-family: 'Montserrat', sans-serif;">Thank You!</h2>
                        <p style="color: #666; font-size: 16px; margin-bottom: 10px;">Your message has been sent successfully.</p>
                        <p style="color: #999; font-size: 14px;">We'll get back to you soon!</p>
                        <button onclick="location.reload()" style="margin-top: 25px; padding: 12px 30px; background: var(--primary-green); color: #000; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-family: 'Montserrat', sans-serif;">Close</button>
                    </div>
                `;
            }

            // Auto close after 3 seconds (optional)
            // setTimeout(closeModal, 3000);
        });
    }
}

/**
 * Initialize Match Center Screens functionality
 */
function initMatchCenterScreens() {
    const viewMatchCenterBtn = document.getElementById('view-match-center-btn');
    const matchCenterScreensSection = document.getElementById('match-center-screens');
    const matchCenterDescription = document.getElementById('match-center-description');

    if (!viewMatchCenterBtn || !matchCenterScreensSection) return;

    // Toggle screens when clicking the button
    viewMatchCenterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (matchCenterScreensSection.style.display === 'none') {
            // Show description and screens
            if (matchCenterDescription) {
                matchCenterDescription.style.display = 'block';
            }
            matchCenterScreensSection.style.display = 'block';
            viewMatchCenterBtn.textContent = 'Hide Match Center';
            
            // Smooth scroll to the description section
            setTimeout(function() {
                if (matchCenterDescription) {
                    matchCenterDescription.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                } else {
                    matchCenterScreensSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }, 100);
        } else {
            // Hide description and screens
            if (matchCenterDescription) {
                matchCenterDescription.style.display = 'none';
            }
            matchCenterScreensSection.style.display = 'none';
            viewMatchCenterBtn.textContent = 'View Match Center';
            
            // Scroll back to the button
            setTimeout(function() {
                viewMatchCenterBtn.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        }
    });
}

/**
 * Initialize Match Center Carousel (auto-rotating images)
 */
function initMatchCenterCarousel() {
    const carousel = document.querySelector('.match-center-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Function to show next slide
    function showNextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // Add active class to next slide
        slides[currentSlide].classList.add('active');
    }

    // Start carousel only when section is visible
    let carouselInterval = null;

    function startCarousel() {
        if (carouselInterval) return; // Already running
        
        // Change image every 3 seconds
        carouselInterval = setInterval(showNextSlide, 3000);
    }

    function stopCarousel() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }

    // Check if section is visible and start/stop carousel accordingly
    const matchCenterScreensSection = document.getElementById('match-center-screens');
    if (matchCenterScreensSection) {
        // Observer to detect when section becomes visible
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && entry.target.style.display !== 'none') {
                    startCarousel();
                } else {
                    stopCarousel();
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(matchCenterScreensSection);

        // Also check on button click
        const viewMatchCenterBtn = document.getElementById('view-match-center-btn');
        if (viewMatchCenterBtn) {
            viewMatchCenterBtn.addEventListener('click', function() {
                setTimeout(function() {
                    if (matchCenterScreensSection.style.display === 'block') {
                        startCarousel();
                    } else {
                        stopCarousel();
                    }
                }, 500);
            });
        }
    } else {
        // Fallback: start carousel immediately if observer not available
        startCarousel();
    }
}
