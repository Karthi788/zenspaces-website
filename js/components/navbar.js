
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const enquiryBtn = document.querySelector('.nav-enquiry-btn');
const nav = document.querySelector('nav');

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// Enhanced scroll behavior for navbar
let lastScrollTop = 0;
const scrollThreshold = 100;
let scrollTimer = null;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) return;
  
  // Clear the previous timer
  if (scrollTimer !== null) {
    clearTimeout(scrollTimer);
  }
  
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    nav.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    nav.style.transform = 'translateY(0)';
    nav.style.opacity = '1';
  }
  
  lastScrollTop = scrollTop;
  
  // Set a timer to show the navbar after stopping scroll
  scrollTimer = setTimeout(() => {
    if (scrollTop < 100) {
      nav.style.transform = 'translateY(0)';
      nav.style.opacity = '1';
    }
  }, 150);
});

// Enhanced button interactions
enquiryBtn.addEventListener('mouseenter', () => {
  enquiryBtn.style.transform = 'perspective(1000px) translateY(-2px) rotateX(5deg)';
});

enquiryBtn.addEventListener('mouseleave', () => {
  enquiryBtn.style.transform = 'perspective(1000px) translateY(0) rotateX(0)';
});

enquiryBtn.addEventListener('click', (e) => {
  const rect = enquiryBtn.getBoundingClientRect();
  
  enquiryBtn.style.transform = 'perspective(1000px) scale(0.95)';
  
  setTimeout(() => {
    enquiryBtn.style.transform = 'perspective(1000px) translateY(-2px) rotateX(5deg)';
  }, 200);
});
