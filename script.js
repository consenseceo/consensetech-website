// Navigation references
const navLinksContainer = document.querySelector('.nav__links');
const navbar = document.querySelector('.nav');

// Smooth scroll for anchor links
const navAnchors = document.querySelectorAll('a[href^="#"]');
navAnchors.forEach(anchor => {
    anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        const offset = (navbar ? navbar.offsetHeight : 0) + 20;
        const position = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        navbar.style.boxShadow = currentScroll > 60
            ? '0 4px 18px rgba(15, 23, 42, 0.08)'
            : 'none';
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

// Get API base URL from environment variable or meta tag
const API_BASE_URL = window.API_BASE_URL ||
                     document.querySelector('meta[name="api-base-url"]')?.content ||
                     'https://consense-demo-rnkjb3yahq-uw.a.run.app';

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Sending…';
        submitButton.disabled = true;
        if (formStatus) {
            formStatus.textContent = '';
        }

        try {
            const response = await fetch(`${API_BASE_URL}/public/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            submitButton.textContent = 'Message sent ✓';
            if (formStatus) {
                formStatus.textContent = 'Thanks! We received your message.';
            }

            setTimeout(() => {
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        } catch (error) {
            console.error('Contact form error:', error);
            submitButton.textContent = 'Error — try again';
            if (formStatus) {
                formStatus.textContent = 'Something went wrong. Please try again.';
            }

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// Intersection Observer for cards
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.55s ease ${index * 0.06}s, transform 0.55s ease ${index * 0.06}s`;
        observer.observe(el);
    });
});

// Add active state to nav links on scroll
const sections = document.querySelectorAll('section[id]');

if (sections.length && navLinksContainer) {
    const navLinks = navLinksContainer.querySelectorAll('a[href^="#"]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const navLink = navLinksContainer.querySelector(`a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}
