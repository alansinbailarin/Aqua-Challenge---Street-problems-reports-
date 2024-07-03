// plugins/firebase.client.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.apiKey,
    authDomain: config.public.authDomain,
    projectId: config.public.projectId,
    storageBucket: config.public.storageBucket,
    messagingSenderId: config.public.messagingSenderId,
    appId: config.public.appId,
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  return {
    provide: {
      firebaseApp: app,
      storage,
    },
  };
});
