// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':
      await import('./views/home.js');
      break;
    case '/auth/':
      await import('./views/auth.js');
      break;
    case '/auth/login/':
      await import('./views/login.js');
      break;
    case '/auth/register/':
      await import('./views/register.js');
      break;
    case '/listings/':
      await import('./views/listings.js');
      break;
    case '/listings/edit/':
      await import('./views/listingEdit.js');
      break;
    case '/listings/create/':
      await import('./views/listingCreate.js');
      break;
    case '/profile/':
      await import('./views/profile.js');
      break;
    default:
      await import('./views/notFound.js');
  }
}
