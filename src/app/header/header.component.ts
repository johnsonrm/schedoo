import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  signedIn: boolean = false;

  constructor(private firebaseService: FirebaseService) { }

  signIn() {
    console.log('HeaderComponent login');
    this.firebaseService.signIn().then((userCredential) => {
      this.signedIn = true;
    });

  }

  signOut() {
    console.log('HeaderComponent logout');
    this.firebaseService.signOut().then(() => {
      this.signedIn = false;
    });

  }

}
