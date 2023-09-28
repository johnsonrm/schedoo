import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { provideAppCheck, initializeAppCheck, ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { Firestore, collection, CollectionReference, doc, setDoc, getDoc, getDocs, DocumentData, DocumentReference, query  } from '@angular/fire/firestore';
import { Store } from '@ngxs/store';
import { UserActions } from '../store/actions/user.action';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  /*
  Handles Firebase authentication and database access
  */

  public usersCollection: CollectionReference = null;
  public userDocData: DocumentData = null;

  constructor(private http: HttpClient, public firestore: Firestore, public store: Store ) {

      // Initialize users collection and handle authentification state changes

      try {

        this.usersCollection = collection(firestore, 'users');

        //handle authentification state changes
        const auth = getAuth();
        auth.onAuthStateChanged((user) => {

          if (user) {
            this.store.dispatch(new UserActions.Login(user.uid)).subscribe((data: User) => {
              try {
                getDoc(doc(this.usersCollection, user.uid)).then((doc) => {
                  this.userDocData = doc.data();
                });
              } catch(err) {
                throw new Error('Unable to find data for logged in user.');
              }

            });

          } else {
            console.log('FirebaseService login - user logged out');
            this.store.dispatch(new UserActions.Logout()).subscribe(()=>{
              this.userDocData = null;
            });
          }
        });

      } catch(err) {
        throw new Error('Error when initializing the Firebase service.');
      }

  }

  async signIn() {

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const userCred = await signInWithPopup(auth, provider).catch((error) => {
      throw new Error('Firebase login error');
    });

    if (userCred?.user) {

      const user = userCred.user;

      // Create a document in the users collection with the uid of the user
      setDoc(doc(this.usersCollection, user.uid), {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        providerId: user.providerId,
      }).catch((error) => {
        throw new Error('Unable to create a data record for the new user.');
      });


    } else {
      console.log('FirebaseService - user logged out');
    }


  }

  signOut() {

    const auth = getAuth();
    auth.signOut().catch((error) => {
      throw new Error('Firebase logout error');
    });

  }

}
