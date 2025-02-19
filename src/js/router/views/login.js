import { onLogin } from '../../ui/auth/login';

document.addEventListener('DOMContentLoaded', () => {
  onLogin();
});

export function initializeLogin() {
  try {
    onLogin();
  } catch {
    console.error('Error loading login functionality.');
  }
}

initializeLogin();
