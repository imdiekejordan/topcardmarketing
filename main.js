// Service Slider Carousel Functionality
const serviceCardsTrack = document.getElementById("service-cards-track");
const serviceCard = document.querySelector(".service-card");
const prevButton = document.getElementById("service-slider-prev");
const nextButton = document.getElementById("service-slider-next");

if (serviceCardsTrack && serviceCard && prevButton && nextButton) {
  // Calculate scroll distance: card width + gap (20px)
  const getScrollDistance = () => {
    const cardWidth = serviceCard.clientWidth;
    const gap = 20; // Gap between cards from CSS
    return cardWidth + gap;
  };

  // Next button click handler
  nextButton.addEventListener("click", () => {
    const scrollDistance = getScrollDistance();
    serviceCardsTrack.scrollLeft += scrollDistance;
  });

  // Previous button click handler
  prevButton.addEventListener("click", () => {
    const scrollDistance = getScrollDistance();
    serviceCardsTrack.scrollLeft -= scrollDistance;
  });
}

// FAQ Dropdown Functionality
const faqQuestions = document.querySelectorAll("#faq .faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.closest(".faq-item");
    const isActive = faqItem.classList.contains("active");
    const ariaExpanded = question.getAttribute("aria-expanded") === "true";

    // Close all FAQ items
    document.querySelectorAll("#faq .faq-item").forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });

    // If this item wasn't active, open it
    if (!isActive) {
      faqItem.classList.add("active");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

// Hamburger Menu Toggle Functionality
const hamburger = document.getElementById("hamburger");
const navExterior = document.getElementById("nav-exterior");

if (hamburger && navExterior) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("on");
    navExterior.classList.toggle("nav-open");
  });

  // Handle window resize - remove classes when switching to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 950) {
      hamburger.classList.remove("on");
      navExterior.classList.remove("nav-open");
    }
  });
}

// Dropdown Menu Click Functionality for Mobile
const dropdownItems = document.querySelectorAll("#header .dropdown");

dropdownItems.forEach((dropdown) => {
  const dropdownMenu = dropdown.querySelector(".dropdown-menu");
  const dropdownTrigger = dropdown.querySelector(".nav-item");
  
  if (dropdownMenu && dropdownTrigger) {
    // Check if we're on mobile/tablet
    const isMobile = () => window.innerWidth <= 950;
    
    // Handle click on the trigger only (not the dropdown links)
    dropdownTrigger.addEventListener("click", (e) => {
      // Prevent default for Services link (href="#") on all screen sizes
      const clickedLink = e.target.closest('a');
      if (clickedLink && clickedLink.classList.contains('nav-link') && clickedLink.getAttribute('href') === '#') {
        e.preventDefault();
        e.stopPropagation();
      }
      
      if (isMobile()) {
        // Only prevent default if clicking the trigger link, not dropdown links
        if (clickedLink && clickedLink.classList.contains('nav-link')) {
          e.preventDefault();
          e.stopPropagation();
        }
        
        // Close all other dropdowns
        dropdownItems.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("dropdown-open");
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle("dropdown-open");
      }
    });
    
    // Close dropdowns when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (isMobile() && !dropdown.contains(e.target)) {
        dropdown.classList.remove("dropdown-open");
      }
    });
  }
});

// YouTube Video Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
  const aboutVideoTrigger = document.querySelector(".about-video-trigger");
  const youtubeModal = document.getElementById("youtube-modal");
  const youtubeModalClose = document.querySelector(".youtube-modal-close");
  const youtubeModalOverlay = document.querySelector(".youtube-modal-overlay");
  const youtubeVideoIframe = document.getElementById("youtube-video-iframe");

  // Extract video ID from YouTube URL (handles regular videos and Shorts)
  const youtubeUrl = "https://www.youtube.com/shorts/D-KhLwijtbQ";
  const getVideoId = (url) => {
    // Match regular videos, Shorts, youtu.be links, and embed URLs
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const youtubeVideoId = getVideoId(youtubeUrl) || "D-KhLwijtbQ";
  // Use YouTube embed URL with parameters to minimize UI elements
  // Note: YouTube's embed player will always show some basic info, but these parameters minimize it
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&controls=1&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1&origin=${window.location.origin}`;

  if (aboutVideoTrigger && youtubeModal && youtubeVideoIframe) {
    console.log("YouTube modal elements found, setting up event listeners");
    
    // Close modal function
    const closeModal = () => {
      youtubeModal.classList.remove("active");
      youtubeVideoIframe.src = ""; // Stop video playback
      document.body.style.overflow = ""; // Restore scrolling
    };

    // Open modal when clicking on the video image
    aboutVideoTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Video image clicked, opening modal");
      // Set iframe source
      youtubeVideoIframe.src = youtubeEmbedUrl;
      youtubeModal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      console.log("Modal should be visible now");
    });

    // Close on close button click
    if (youtubeModalClose) {
      youtubeModalClose.addEventListener("click", closeModal);
    }

    // Close on overlay click
    if (youtubeModalOverlay) {
      youtubeModalOverlay.addEventListener("click", closeModal);
    }

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && youtubeModal.classList.contains("active")) {
        closeModal();
      }
    });
  } else {
    console.error("YouTube modal elements not found:", {
      aboutVideoTrigger: !!aboutVideoTrigger,
      youtubeModal: !!youtubeModal,
      youtubeVideoIframe: !!youtubeVideoIframe
    });
  }
});

// Mailerlite Form Submission Handler
document.addEventListener("DOMContentLoaded", () => {
  const mailerliteForms = document.querySelectorAll(".email-signup-form");
  
  mailerliteForms.forEach((form) => {
    // Create a hidden iframe for form submission
    const iframe = document.createElement('iframe');
    iframe.name = 'mailerlite-iframe-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    iframe.style.display = 'none';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
    
    // Store original button text
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';
    
    // Set form target to the hidden iframe
    form.target = iframe.name;
    
    // Listen for iframe load to detect submission completion
    iframe.addEventListener('load', () => {
      try {
        // Try to read the iframe content (may be blocked by CORS)
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const iframeText = iframeDoc.body.textContent || iframeDoc.body.innerText;
        
        if (iframeText.includes('"success":true') || iframeText.includes('success')) {
          handleFormSuccess(form, submitButton, originalButtonText);
        } else {
          handleFormError(form, submitButton, originalButtonText);
        }
      } catch (e) {
        // CORS may block access, but assume success since iframe loaded
        // Mailerlite JSONP endpoints return {"success":true} on success
        handleFormSuccess(form, submitButton, originalButtonText);
      }
    });
    
    form.addEventListener("submit", (e) => {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = submitButton.textContent.includes('Subscribe') ? 'Subscribing...' : 'Submitting...';
        
        // Re-enable button after a delay if iframe doesn't fire load event
        setTimeout(() => {
          if (submitButton.disabled) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
          }
        }, 5000);
      }
    });
  });
});

function handleFormSuccess(form, submitButton, originalButtonText) {
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
  
  // Clear the email input
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput) {
    emailInput.value = '';
  }
  
  // Show success message
  const successMessage = document.createElement('div');
  successMessage.className = 'form-success-message';
  successMessage.textContent = 'Thank you for subscribing!';
  successMessage.style.cssText = 'color: #55E6A5; margin-top: 10px; font-size: 14px;';
  
  // Remove any existing messages
  const existingSuccess = form.querySelector('.form-success-message');
  const existingError = form.querySelector('.form-error-message');
  if (existingSuccess) existingSuccess.remove();
  if (existingError) existingError.remove();
  
  form.appendChild(successMessage);
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    if (successMessage.parentNode) {
      successMessage.remove();
    }
  }, 5000);
}

function handleFormError(form, submitButton, originalButtonText) {
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
  
  // Show error message
  const errorMessage = document.createElement('div');
  errorMessage.className = 'form-error-message';
  errorMessage.textContent = 'Something went wrong. Please try again.';
  errorMessage.style.cssText = 'color: #f44336; margin-top: 10px; font-size: 14px;';
  
  // Remove any existing messages
  const existingSuccess = form.querySelector('.form-success-message');
  const existingError = form.querySelector('.form-error-message');
  if (existingSuccess) existingSuccess.remove();
  if (existingError) existingError.remove();
  
  form.appendChild(errorMessage);
  
  // Remove error message after 5 seconds
  setTimeout(() => {
    if (errorMessage.parentNode) {
      errorMessage.remove();
    }
  }, 5000);
}
