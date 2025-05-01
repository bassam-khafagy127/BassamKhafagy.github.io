/**
 * Initializes and manages skill bar animations
 * Uses Intersection Observer to trigger animations when skills become visible
 */
class SkillsAnimator {
  constructor() {
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      threshold: 0.2,
      rootMargin: '0px'
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.style.width = entry.target.dataset.progress;
        });
        this.observer.unobserve(entry.target);
      }
    });
  }

  init() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      bar.style.width = '0%';
      this.observer.observe(bar);
    });
  }
}

// Initialize skills animation
const skillsAnimator = new SkillsAnimator();

// Handle different document ready states
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => skillsAnimator.init());
} else {
  skillsAnimator.init();
}

// Reinitialize on scroll (for single page navigation)
document.addEventListener('scroll', () => {
  requestAnimationFrame(() => skillsAnimator.init());
}, { once: true });

// Initialize EmailJS
(function() {
  emailjs.init("GHVnODnf6C0_WRroh");
})();

// Form handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const submitButton = document.getElementById('submitButton');
  const formStatus = document.getElementById('formStatus');
  const successMessage = formStatus.querySelector('.success-message');
  const errorMessage = formStatus.querySelector('.error-message');
  
  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.querySelector('span').textContent = 'Sending...';
  
  // Hide any previous messages
  formStatus.classList.remove('hidden');
  successMessage.classList.add('hidden');
  errorMessage.classList.add('hidden');

  // Get form data
  const templateParams = {
    to_name: "Bassam Nasser",
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
    reply_to: document.getElementById('email').value
  };

  // Auto-reply parameters
  const autoReplyParams = {
    to_name: templateParams.from_name,
    from_name: "Bassam Nasser",
    from_email: "bassamkhafgy127@gmail.com",
    email: templateParams.from_email,
    reply_to: "bassamkhafgy127@gmail.com",
    subject: "Thank you for contacting Bassam Nasser",
    message: templateParams.message
  };

  // Send email using EmailJS
  Promise.all([
    // Send notification to you
    emailjs.send('service_7bosa57', 'template_r7b8bwd', templateParams),
    // Send auto-reply to sender
    emailjs.send('service_7bosa57', 'template_0176djo', autoReplyParams)
  ])
    .then(function() {
      // Show success message
      successMessage.classList.remove('hidden');
      // Reset form
      event.target.reset();
    }, function(error) {
      console.error('Email error:', error);
      // Show error message
      errorMessage.classList.remove('hidden');
    })
    .finally(function() {
      // Reset button state
      submitButton.disabled = false;
      submitButton.querySelector('span').textContent = 'Send Message';
    });
}); 