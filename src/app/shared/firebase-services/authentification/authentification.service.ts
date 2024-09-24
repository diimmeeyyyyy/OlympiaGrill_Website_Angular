import { inject, Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  auth = getAuth();
  errorMessage: string = '';
  loginSuccess: boolean = false;
  showMessage: boolean = false;
  registerProcess: boolean = false;

  userService = inject(UserService);

  constructor() {}

  /* ===========================
  SIGN UP WITH E-MAIL & PASSWORD
  ==============================*/
  async mailSignUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: any) => {
        // Signed in
        this.showMessage = true;
        this.loginSuccess = true;
        /*  this.userService.googleUser = userCredential.user; */
        this.errorMessage = '';

        setTimeout(() => {
          /*  this.userService.login(userCredential.user);
          this.setLocalPersistent(); */
        }, 1000);
      })
      .catch((error: any) => {
        this.showMessage = false;
        if (error.code === 'auth/user-not-found')
          this.errorMessage =
            'Nutzer nicht gefunden. Bitte registrieren Sie sich.';
        else if (error.code === 'auth/network-request-failed')
          this.errorMessage =
            'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.';
        else if (error.code === 'auth/too-many-requests')
          this.errorMessage =
            'Zu viele Anfragen. Versuchen Sie es später erneut.';
        else if (error.code === 'auth/invalid-credential')
          this.errorMessage = 'Ungültige Anmeldeinformationen';
        else if (error.code === 'auth/invalid-email')
          this.errorMessage = 'E-Mail-Adresse ist ungültig';
        else {
          alert(error.message);
        }
      });
  }

  /* ====
LOG-IN
=======*/
  /*  async logIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: any) => {
        this.userService.activeUser = userCredential.user;

        sessionStorage.setItem('loggedInUser', userCredential);
      })
      .catch((error: { code: any; message: any; }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
} */

  async logIn(email: string, password: string) {
    debugger;
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      debugger;
      // Signed in
      /*   this.userService.activeUser = userCredential.user; */
      console.log(JSON.stringify(userCredential.user.uid));

      sessionStorage.setItem(
        'loggedInUser',
        JSON.stringify(userCredential.user.uid)
      );
      /* this.userService.setActiveUser(user); */
    } catch (error) {
      alert(error);
    }
  }
}
