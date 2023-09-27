import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { User } from "firebase/auth";
import { Select } from '@ngxs/store';
import { UserStateModel } from './store/states/user.state';
import { Observable } from 'rxjs';
import { FirebaseService } from './services/firebase.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'monthly';

  public signedIn: boolean = false;

  @Select((state: {user: UserStateModel}) => state.user.userData) userData$ : Observable<User>;

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
