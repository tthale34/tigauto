import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly storageKey =
    'tigauto_admin_authenticated';

  /*
   * Prototype admin credentials.
   *
   * These will later be replaced with
   * real backend authentication.
   */
  private readonly adminUsername =
    'admin';

  private readonly adminPassword =
    'Tigauto@123';


  login(
    username: string,
    password: string
  ): boolean {

    const isValid =
      username === this.adminUsername &&
      password === this.adminPassword;


    if (isValid) {

      localStorage.setItem(
        this.storageKey,
        'true'
      );

    }


    return isValid;
  }


  logout(): void {

    localStorage.removeItem(
      this.storageKey
    );

  }


  isAuthenticated(): boolean {

    return (
      localStorage.getItem(
        this.storageKey
      ) === 'true'
    );

  }

}