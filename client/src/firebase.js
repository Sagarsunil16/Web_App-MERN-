import { initializeApp } from "firebase/app";


const firebaseConfig = {

    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  
    authDomain: "web-app-2cf98.firebaseapp.com",
  
    projectId: "web-app-2cf98",
  
    storageBucket: "web-app-2cf98.firebasestorage.app",
  
    messagingSenderId: "821855902109",
  
    appId: "1:821855902109:web:4c4fdcaa23326cf49ab774"
  
  };

  export const app = initializeApp(firebaseConfig);

