import { register } from '../../api/auth/register';

/**
 * Handles the register form submission by passing data to the register function.
 *
 * @function onRegister
 * @param {Event} event - Form submission event.
 * @throws {Error} If register form is missing in the DOM.
 */

export function onRegister() {
  const form = document.querySelector('#registerForm');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');

      if (!submitButton) {
        console.error('Submit button not found', error);
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';

      const formData = new FormData(form);
      const profile = Object.fromEntries(formData);

      try {
        await register(profile);
        alert('User registered successfully!');
        form.reset();
        window.location.href = '/auth/login/';
      } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred while registering. Please try again.');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Register';
      }
    });
  } else {
    console.error('Register form not found');
  }
}
