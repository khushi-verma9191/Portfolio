// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize AOS animation library if it exists
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false
        });
    }

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Add background to navbar when scrolling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add('navbar-scrolled');
        } else {
            if (navbar) navbar.classList.remove('navbar-scrolled');
        }
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
                    top: targetElement.offsetTop - 80, // Offset for fixed navbar
                    behavior: 'smooth'
                });

                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
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

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Form validation and submission for contact form
    const contactForm = document.getElementById('contact-form') || document.querySelector('#contact form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            // Reset previous error states
            if (name) {
                removeErrorState(name);
                // Validate name
                if (!name.value.trim()) {
                    addErrorState(name, 'Please enter your name');
                    isValid = false;
                }
            }

            if (email) {
                removeErrorState(email);
                // Validate email
                if (!email.value.trim()) {
                    addErrorState(email, 'Please enter your email');
                    isValid = false;
                } else if (!isValidEmail(email.value)) {
                    addErrorState(email, 'Please enter a valid email');
                    isValid = false;
                }
            }

            if (subject) {
                removeErrorState(subject);
                // Validate subject
                if (!subject.value.trim()) {
                    addErrorState(subject, 'Please enter a subject');
                    isValid = false;
                }
            }

            if (message) {
                removeErrorState(message);
                // Validate message
                if (!message.value.trim()) {
                    addErrorState(message, 'Please enter your message');
                    isValid = false;
                }
            }

            // If form is valid, send email using EmailJS
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

                // Prepare template parameters
                const templateParams = {
                    from_name: name.value,
                    from_email: email.value,
                    subject: subject.value,
                    message: message.value
                };

                // Send email using EmailJS
                // Service ID has been updated to 'service_brydt8l'
                // Replace 'YOUR_TEMPLATE_ID' with your actual EmailJS template ID
                emailjs.send('service_brydt8l', 'template_6agvs2c', templateParams)
                    .then(function(response) {
                        // Show success message
                        formStatus.style.display = 'block';
                        formStatus.className = 'alert alert-success mt-3';
                        formStatus.innerHTML = 'Thank you for your message! I will get back to you soon.';

                        // Reset form
                        contactForm.reset();

                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;

                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            formStatus.style.display = 'none';
                        }, 5000);
                    }, function(error) {
                        // Show error message with more details
                        formStatus.style.display = 'block';
                        formStatus.className = 'alert alert-danger mt-3';
                        let errorMsg = 'Oops! Something went wrong. Please try again later.';

                        // Add more specific error message if available
                        if (error.text) {
                            errorMsg += ' Error: ' + error.text;

                            // Special handling for "Account not found" error
                            if (error.text.includes("Account not found")) {
                                errorMsg = 'EmailJS account not found. Please check the README.md file for instructions on how to fix this issue.';
                            }
                        }

                        formStatus.innerHTML = errorMsg;

                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;

                        console.error('EmailJS error:', error);
                        // Log detailed error information for debugging
                        if (error.text) {
                            console.error('Error details:', error.text);
                        }
                    });
            }
        });
    }

    // Helper functions for form validation
    function addErrorState(element, message) {
        element.classList.add('is-invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.innerText = message;
        element.parentNode.appendChild(errorDiv);
    }

    function removeErrorState(element) {
        element.classList.remove('is-invalid');
        const errorDiv = element.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Update active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        // Get all sections
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Animate skill bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillBars = document.querySelectorAll('.progresss');

    // Create an Intersection Observer for new progress bars
    if (progressBars.length > 0) {
        const animateProgressBars = () => {
            progressBars.forEach(bar => {
                const value = bar.getAttribute('aria-valuenow');
                bar.style.width = '0%';

                setTimeout(() => {
                    bar.style.width = value + '%';
                }, 100);
            });
        };

        // Trigger animation when skills section is in view
        const skillsSection = document.getElementById('skills');

        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateProgressBars();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(skillsSection);
        }
    }

    // Support for old progress bars
    if (skillBars.length > 0) {
        // Create an Intersection Observer
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get the width from the style attribute
                    const width = entry.target.style.width;

                    // Animate from 0 to the target width
                    entry.target.style.width = '0%';

                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 200);

                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observe each skill bar
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
});
