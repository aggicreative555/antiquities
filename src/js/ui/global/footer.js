export function footerTemplate() {
    try {
      const footer = document.getElementById("footer");
  
      const existingFooter = document.querySelector(".footer");
      if (existingFooter) existingFooter.remove();
  
      const footerElement = document.createElement("footer");
      footerElement.className = "footer py-4 mt-5"; 
  
      footerElement.innerHTML = `
        <div class="container d-flex flex-column align-items-center mb-5 pb-5">
          <!-- Logo -->
          <a href="/" class="mb-5">
            <img style="height: 150px; width: auto;" src="/logo/antiquities-logo-red-s@.5x.png" alt="Antiquities logoin red color">
          </a>
  
          <!-- Navigation Links -->
          <ul class="nav d-flex flex-column gap-3">
            <li class="nav-item">
              <a href="/events.html" class="nav-link d-flex align-items-center">
                Events
                <img src="/icons/arrow-icon-antiquities.svg" class="ms-2" alt="Arrow icon">
              </a>
            </li>
            <li class="nav-item">
              <a href="/contact.html" class="nav-link d-flex align-items-center">
                Contact
                <img src="/icons/arrow-icon-antiquities.svg" class="ms-2" alt="Arrow icon">
              </a>
            </li>
            <li class="nav-item">
              <a href="/locations.html" class="nav-link d-flex align-items-center">
                Locations
                <img src="/icons/arrow-icon-antiquities.svg" class="ms-2" alt="Arrow icon">
              </a>
            </li>
            <li class="nav-item">
              <a href="/regulations.html" class="nav-link d-flex align-items-center">
                Regulations
                <img src="/icons/arrow-icon-antiquities.svg" class="ms-2" alt="Arrow icon">
              </a>
            </li>
          </ul>
        </div>
      `;
  
      footer.appendChild(footerElement);
    } catch (error) {
      console.error("Error rendering footer:", error);
    }
 }
  