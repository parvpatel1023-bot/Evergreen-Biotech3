// Evergreen Biotech - Main JavaScript File
// With FormSpree AJAX Integration

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ============================================================================
// CONTACT FORM - FORMSPREE AJAX SUBMISSION
// ============================================================================
const contactForm = document.getElementById('contact-form');
const formMessages = document.getElementById('form-messages');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get button elements
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Get form data
        const formData = new FormData(contactForm);

        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        submitBtn.disabled = true;

        // Clear previous messages
        formMessages.innerHTML = '';

        try {
            // Send to FormSpree with AJAX
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success!
                showMessage('success', 
                    '✓ Thank you for contacting us! Your message has been sent successfully. ' +
                    'We will get back to you within 24 hours.'
                );
                contactForm.reset();

                // Optional: Scroll to success message
                formMessages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            } else {
                // Error from FormSpree
                const data = await response.json();
                if (data.errors) {
                    const errors = data.errors.map(error => error.message).join(', ');
                    showMessage('error', '✗ Error: ' + errors);
                } else {
                    showMessage('error', '✗ Oops! There was a problem sending your message. Please try again.');
                }
            }

        } catch (error) {
            // Network error
            console.error('Form submission error:', error);
            showMessage('error', 
                '✗ Network error. Please check your internet connection and try again.'
            );
        } finally {
            // Reset button state
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Function to display form messages
function showMessage(type, message) {
    formMessages.innerHTML = `
        <div class="form-message ${type}">
            ${message}
        </div>
    `;

    // Auto-remove success message after 10 seconds
    if (type === 'success') {
        setTimeout(() => {
            const messageEl = formMessages.querySelector('.form-message');
            if (messageEl) {
                messageEl.style.opacity = '0';
                setTimeout(() => {
                    formMessages.innerHTML = '';
                }, 300);
            }
        }, 10000);
    }
}

// ============================================================================
// FORM FIELD VALIDATION STYLING
// ============================================================================
const formInputs = document.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    // Add focus styling
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    // Remove focus styling
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');

        // Validate on blur
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.classList.add('error');
        } else {
            this.classList.remove('error');
        }
    });

    // Remove error styling on input
    input.addEventListener('input', function() {
        this.classList.remove('error');
    });
});

// ============================================================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// ============================================================================
// SCROLL ANIMATIONS (Optional Enhancement)
// ============================================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements with animation
document.querySelectorAll('.service-card, .info-card, .stat-card, .team-member, .research-card, .initiative-card').forEach(el => {
    observer.observe(el);
});

// ============================================================================
// CONSOLE MESSAGE
// ============================================================================
console.log('%c🌿 Evergreen Biotech', 'color: #10b981; font-size: 20px; font-weight: bold;');
console.log('%cWebsite loaded successfully with FormSpree integration!', 'color: #059669; font-size: 14px;');
console.log('%cContact form submissions are handled by FormSpree', 'color: #6b7280; font-size: 12px;');
console.log('%cClass 10 IT Project by Evergreen Biotech Team', 'color: #10b981; font-size: 12px;');
