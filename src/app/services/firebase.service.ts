import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

@Injectable({providedIn: 'root'})
export class FirebaseService {

  // private _app = null;
  // private _analytics = null;

  public loggedInUserEmail = "";

  constructor() {
    console.log('FirebaseService constructor');

    // Firebase web app configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyC3R2K9r7aDJ31VBLksS3RFx1VvBPBaa40",
      authDomain: "monthly-1.firebaseapp.com",
      projectId: "monthly-1",
      storageBucket: "monthly-1.appspot.com",
      messagingSenderId: "41320600110",
      appId: "1:41320600110:web:10196bac0fff97d39205bf",
      measurementId: "G-ZJ07MY4V7X"
    };

    // Initialize Firebase
    try {
      initializeApp(firebaseConfig);
      // this._analytics = getAnalytics(this._app);
    } catch(err) {
      throw new Error('Firebase initialization error');
    }

  }

  signIn(): Promise<UserCredential> {

    console.log('FirebaseService login');

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    return signInWithPopup(auth, provider);

  }

  signOut(): Promise<void> {

    console.log('FirebaseService logout');
    const auth = getAuth();
    return auth.signOut();

  }

}
