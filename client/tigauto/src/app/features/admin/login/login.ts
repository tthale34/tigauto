import {
  Component,
  inject
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {Auth} from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private readonly authService =
    inject(Auth);

  private readonly router =
    inject(Router);


  username = '';

  password = '';

  errorMessage = '';

  isLoading = false;


  login(): void {

    this.errorMessage = '';

    this.isLoading = true;


    const authenticated =
      this.authService.login(
        this.username.trim(),
        this.password
      );


    if (!authenticated) {

      this.isLoading = false;

      this.errorMessage =
        'Invalid username or password.';

      return;
    }


    this.router.navigate([
      '/admin'
    ]);

  }

}