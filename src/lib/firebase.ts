// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, isSupported } from "firebase/messaging/sw";

import { devLog } from "@/utils/dev-log";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const messaging = (async () => {
  try {
      const isSupportedBrowser = await isSupported();
      if (isSupportedBrowser) {
          return getMessaging(app);
      }
      devLog("알람 지원X. 현재 브라우저 정보: ", navigator.userAgent);
      return null;
  } catch (err) {
      devLog(err);
      return null;
  }
  })();

export { app, auth, messaging };
