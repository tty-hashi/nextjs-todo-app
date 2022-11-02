import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  // apiKey: "AIzaSyCK3PjzYTf1Ayia1TaVJ2FIrwPq24fgtaI",
  // authDomain: "nextjs-todo-shokyu.firebaseapp.com",
  // databaseURL: "https://nextjs-todo-shokyu-default-rtdb.firebaseio.com",
  // projectId: "nextjs-todo-shokyu",
  // storageBucket: "nextjs-todo-shokyu.appspot.com",
  // messagingSenderId: "113210993606",
  // appId: "1:113210993606:web:65d5c1108552affeada0c7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage();

//Googleサインイン
const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const sinInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
// uidの取得
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    return uid;
  }
});