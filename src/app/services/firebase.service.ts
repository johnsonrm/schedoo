import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppCheck, initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential, User } from "firebase/auth";
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  /*
  Handles Firebase authentication and database access
  */

  private firebaseReCAPTCHASiteKeyUrl = "https://getrecaptchalivekey-nwbh4vxb3a-uc.a.run.app";
  private reCAPTCHASiteKey: string = null;
  private appCheck: AppCheck = null;

  private loggedInUserSubject = new BehaviorSubject<User>(null);
  public loggedInUser = this.loggedInUserSubject.asObservable();

  public analytics: Analytics = null;
  public db: Firestore = null;

  constructor(private http: HttpClient) {
  // constructor() {

    const firebaseConfig = environment.firebaseConfig;

      // Initialize Firebase
      try {
        // const app = initializeApp(firebaseConfig);
        console.log('FirebaseService initializeApp');
        const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

        http.get(this.firebaseReCAPTCHASiteKeyUrl).subscribe((data) => {
          this.reCAPTCHASiteKey = data['siteKey'];
          // console.log(this.reCAPTCHASiteKey);
            // Create a ReCaptchaEnterpriseProvider instance using your reCAPTCHA Enterprise
            // site key and pass it to initializeAppCheck().
            this.appCheck = initializeAppCheck(app, {
              provider: new ReCaptchaEnterpriseProvider(this.reCAPTCHASiteKey),
              isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
            });
        });

        this.analytics = getAnalytics(app);
        // Initialize Cloud Firestore and get a reference to the service
        this.db = getFirestore(app);

        // call Firebase Function?

        //https://getrecaptchalivekey-nwbh4vxb3a-uc.a.run.app


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

  // getSecret(secretName: string) {
  //   const url = `https://secretmanager.googleapis.com/v1/projects/YOUR_PROJECT_ID/secrets/${secretName}/versions/latest:access`;

  //   return this.http.get(url);
  // }

  async signIn() {

    console.log('FirebaseService login');

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    await signInWithPopup(auth, provider).catch((error) => {
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
