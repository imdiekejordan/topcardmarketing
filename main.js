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
      if (isMobile()) {
        // Only prevent default if clicking the trigger link, not dropdown links
        const clickedLink = e.target.closest('a');
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
