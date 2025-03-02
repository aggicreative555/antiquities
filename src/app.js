import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';

import router from './js/router';
import { navTemplate } from './js/ui/global/nav';
import { footerTemplate } from './js/ui/global/footer';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');

  if (header) {
    navTemplate();
  } else {
    console.error('Header element not found or error setting up nav');
  }

  if (footer) {
    footerTemplate();
  } else {
    console.error('Footer element not found or error setting up footer');
  }
});

await router(window.location.pathname);
