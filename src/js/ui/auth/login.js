import { login } from '../../api/auth/login';

/**
 * Handles the login form submission by passing data to the login function.
 *
 * Disabled the submit button to prevent key spamming and multiple submissions.
 *
 * @async
 * @function onLogin
 * @throws {Error} If login form is missing in the DOM.
 */

export function onLogin() {
  const form = document.querySelector('#loginForm');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');

      if (!submitButton) {
        console.error('Submit button not found', error);
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = 'Loggin in...';

      const formData = new FormData(form);
      const profile = Object.fromEntries(formData);

      try {
        await login(profile);
        alert('Successful Login!');
        // setTimeout(() => {
        //   window.location.href = "/post/";
        // }, 5);
        return false;
      } catch (error) {
        console.error('Error logging in user', error);
        alert('An error occurred while loggin in. Please try again.');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
        form.reset();
      }
    });
  } else {
    console.error('Error submitting login information');
  }
}
