/// <reference types="react-scripts" />

interface AndroidInterface {
  requestNotificationPermission: () => Promise<string>;
}

declare global {
  interface Window {
    Android?: AndroidInterface;
  }
}

export {}; 