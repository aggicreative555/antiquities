import { onRegister } from '../../ui/auth/register';

export function initializeRegister() {
  try {
    onRegister();
  } catch {
    console.error('Error initializing register function.');
  }
}

initializeRegister();
