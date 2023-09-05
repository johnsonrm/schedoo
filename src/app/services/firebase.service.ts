import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential, User } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FirebaseService {

  private loggedInUserSubject = new BehaviorSubject<User>(null);
  public loggedInUser = this.loggedInUserSubject.asObservable();

  constructor() {

    // Firebase web app configuration
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
      const app = initializeApp(firebaseConfig);
      // this._analytics = getAnalytics(this._app);

    } catch(err) {
      throw new Error('Firebase initialization error');
    }

    //handle authentification state changes
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('FirebaseService login - user logged in');
        this.loggedInUserSubject.next(user);
      } else {
        console.log('FirebaseService login - user logged out');
        this.loggedInUserSubject.next(null);
      }
    });


  }

  signIn() {

    console.log('FirebaseService login');

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider).catch((error) => {
      throw new Error('Firebase login error');
    });
  }

  signOut() {

    console.log('FirebaseService logout');
    const auth = getAuth();
    auth.signOut().catch((error) => {
      throw new Error('Firebase logout error');
    });

  }

}
