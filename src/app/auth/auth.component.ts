import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private authService: AuthenticationService) { }

  onSubmit(form: NgForm) {

    console.log(form.value);

    const email = form.value.email;
    const password = form.value.password;

    // this.authService.login(email, password);


  }

}




