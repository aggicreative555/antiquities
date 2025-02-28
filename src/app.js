import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';

import router from './js/router';
import { setLogoutListener } from './js/ui/global/logout';



document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        setLogoutListener();
    } else {
        console.error("Error setting up logout listener:");
    }
});


await router(window.location.pathname);
