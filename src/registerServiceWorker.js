// Registers the service worker for PWA support
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(
        registration => {
          // Registration successful
        },
        err => {
          // Registration failed
        }
      );
    });
  }
}
