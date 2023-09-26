import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { User } from "firebase/auth";
import { Select } from '@ngxs/store';
import { UserStateModel } from '../store/states/user.state';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['../app.component.css']
})
export class HeaderComponent {

  @Select((state: {user: UserStateModel}) => state.user.userData) userData$ : Observable<User>;

  public signedIn: boolean = false;

  constructor(private firebaseService: FirebaseService) {

    this.userData$.subscribe((userData: User) => {
      this.signedIn = userData?.uid ? true : false;
    });

   }

  signIn() {
    this.firebaseService.signIn();
  }

  signOut() {
    this.firebaseService.signOut();
  }

}
