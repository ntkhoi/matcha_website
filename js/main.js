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

    // Pricing Tabs Handler
    initPricingTabs();

    // Billing Toggle Handler
    initBillingToggle();
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
                <a href="index.html" style="display: inline-block; margin-top: 25px; padding: 12px 30px; background: #17c964; color: #000; text-decoration: none; border-radius: 25px; font-weight: 600;">Back to Home</a>
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
        proPrice.innerHTML = '$4.99 <span>/ month</span>';
    }
}

/**
 * Update prices for annual billing (20% discount)
 */
function updatePricesForAnnual() {
    const proPrice = document.querySelector('.plan-card.featured .price');
    if (proPrice) {
        const monthlyPrice = 4.99;
        const annualPrice = (monthlyPrice * 12 * 0.8).toFixed(2);
        proPrice.innerHTML = '$' + annualPrice + ' <span>/ year</span>';
    }
}
