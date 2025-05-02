// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('section');

// Smooth scroll and active class management
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');

    // Smooth scroll to section
    targetSection.scrollIntoView({
      behavior: 'smooth'
    });

    // Close mobile menu
    mainNav.classList.remove('active');
  });
});

// Intersection Observer for scroll detection
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add active class to section
      entry.target.classList.add('active');
      
      // Update nav links
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
    mainNav.classList.remove('active');
  }
});

// Initialize EmailJS with your User ID
(function() {
  emailjs.init('YOUR_USER_ID'); // Replace with your EmailJS User ID
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const formData = {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
    reply_to: 'piaaxibrand@gmail.com' // Set the reply-to email
  };

  // Send email using EmailJS
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData) // Replace with your Service ID and Template ID
    .then(function(response) {
      document.getElementById('status-message').textContent = 'Message sent successfully!';
      document.getElementById('status-message').style.color = 'green';
      document.getElementById('contact-form').reset(); // Clear the form
    }, function(error) {
      document.getElementById('status-message').textContent = 'Failed to send message. Please try again.';
      document.getElementById('status-message').style.color = 'red';
    });
});

// Initial active state
window.addEventListener('load', () => {
  document.querySelector('#home').classList.add('active');
});