import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { User } from "firebase/auth";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['../app.component.css']
})
export class HeaderComponent implements OnInit {

  signedIn: boolean = false;
  user: User = null;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.loggedInUser.subscribe((user) => {
      if (user) {
        this.user = user;
        this.signedIn = true;
      } else {
        this.user = null;
        this.signedIn = false;
      }
    });
  }

  signIn() {
    this.firebaseService.signIn();
  }

  signOut() {
    this.firebaseService.signOut();
  }

}
