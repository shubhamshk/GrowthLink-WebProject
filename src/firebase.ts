import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAuDpV4wji6GtwkcKNTwVWE6GMRDlJvwV0",
  authDomain: "netflix-clone-a18fb.firebaseapp.com",
  projectId: "netflix-clone-a18fb",
  storageBucket: "netflix-clone-a18fb.firebasestorage.app",
  messagingSenderId: "644650663324",
  appId: "1:644650663324:web:ceeed20e26c53fdd555c59",
  measurementId: "G-R2TDZZGEJ8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);