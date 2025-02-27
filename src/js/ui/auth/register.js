import { register } from '../../api/auth/register';
import { getValidation } from '../global/validateForm';

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

      // Form validation

      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const password = form.querySelector('#password');
      const repeatPassword = form.querySelector('#confirmPassword');
      const errorMessage = form.querySelector('#errorMessage');

      console.log(errorMessage);

      const allInputs = [name, email, password, repeatPassword];

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
        name.value.trim(),
        email.value.trim(),
        password.value.trim(),
        repeatPassword.value.trim(),
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
        console.error('Submit button not found');
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
