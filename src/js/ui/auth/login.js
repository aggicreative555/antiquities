import { login } from '../../api/auth/login';
import { getValidation } from '../global/validateForm';

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

      // Form validation
      const email = form.querySelector('#email');
      const password = form.querySelector('#password');
      const errorMessage = form.querySelector('#errorMessage');

      const allInputs = [email, password];

      allInputs.forEach((input) => {
        input.addEventListener('input', () => {
          input.classList.remove('incorrect');
          // Clear the error message if it exists
          if (errorMessage && errorMessage.innerHTML) {
            errorMessage.innerHTML = '';
          }
        });
      });

      errorMessage.innerHTML = '';
      form
        .querySelectorAll('.incorrect')
        .forEach((el) => el.classList.remove('incorrect'));

      const { errors, invalidFields } = getValidation(
        '',
        email.value.trim(),
        password.value.trim(),
        '',
      );

      if (errors.length > 0) {
        errorMessage.innerHTML = errors
          .map((error) => `<p>${error}</p>`)
          .join('');

        invalidFields.forEach((fieldId) => {
          form.querySelector(`#${fieldId}`).classList.add('incorrect');
        });
        return;
      }

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
        setTimeout(() => {
          window.location.href = '/';
        }, 5);
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
