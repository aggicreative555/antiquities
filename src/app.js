import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';

import router from './js/router';
import { navTemplate } from './js/ui/global/nav';



document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById('header');

    if (header) {
        navTemplate();
    } else {
        console.error("Header element not found or error setting up nav");
    }
});


await router(window.location.pathname);
