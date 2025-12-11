  // Import the functions you need from the SDKs you need
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCDdJ8CG2YXtpI7cXN0DP_29Uu_LakAYlg",
    authDomain: "macetas-e4c2f.firebaseapp.com",
    projectId: "macetas-e4c2f",
    storageBucket: "macetas-e4c2f.firebasestorage.app",
    messagingSenderId: "196652874232",
    appId: "1:196652874232:web:f8e94f0018e066378bbe0d",
    measurementId: "G-DZD511VS5N"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const db = getFirestore(app);