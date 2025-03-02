import { load } from '../../utilities/authGuard';
import { setLogoutListener } from './logout';

export function navTemplate() {
  try {
    const user = load('user');

    const header = document.getElementById('header');

    const existingNav = document.querySelector('.navbar');
    if (existingNav) existingNav.remove();

    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-light bg-light fixed-top box-shadow-S';

    nav.innerHTML = `
    <div class="container position-relative">
      <!-- Logo -->
      <a href="/" class="navbar-brand mx-auto">
        <img style="height: 80px; width: auto;" src="/logo/antiquities-logotype-light-mode-s@1x.png" alt="Antiquities logo">
      </a>

      <!-- Navbar Toggler -->
      <button 
        type="button"
        class="navbar-toggler position-absolute end-0 top-0"
        data-bs-toggle="collapse"
        data-bs-target="#navBarNav"
        aria-controls="navBarNav"
        aria-label="Toggle navigation"
        aria-expanded="false">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse mt-5" id="navBarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="#" class="nav-link" data-bs-toggle="collapse">Listings 
              <img src="/icons/arrow-icon-antiquities.svg" class="arrow-icon" alt="Dropdown arrow">
            </a>
          </li>
        </ul>

         ${
           user
             ? // LOGGED-IN STATE
               `<div id="isloggedIn" class="d-flex flex-column align-items-center text-center">
                  <div class="frame">
                    <div class="profile-picture-container d-flex justify-content-center align-items-center border border-5 border-black m-4">
                      <img style="height: 120px; width:auto;" src="${user.profileImage || '/images/placeholder-image-camera.jpg'}" alt="Profile image">
                    </div>
                    <a href="/profile/index.html" class="profile-content d-flex flex-column align-items-center">
                      <p class="caption">Account</p>
                      <p id="name" class="heading">${user.name || 'User'}</p>
                      <span class="line"></span>
                      <p class="caption p-2 fw-bold" id="credit">${user.credit || '0'} NOK</p>
                    </a>
                  </div>
                  <div class="d-flex flex-column gap-4 my-4">
                    <a href="/listings/index.html" class="btn btn-custom-primary">Create Listing</a>
                    <button class="btn btn-custom-secondary" id="logoutButton">Log Out</button>
                  </div>
                </div>`
             : // LOGGED-OUT STATE
               `<div id="isNotLoggedIn" class="d-flex flex-column gap-3 py-5">
                  <a href="/auth/login/" class="btn btn-custom-primary">Log In</a>
                  <a href="/auth/register/" class="btn btn-custom-secondary">Register</a>
                </div>`
         }
        </div>
      </div>
    `;

    // Append to the document body or a specific container
    header.appendChild(nav);

    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
      console.log(logoutButton);
      setLogoutListener();
    }
  } catch (error) {
    console.error('Error rendering nav:', error);
  }
}
