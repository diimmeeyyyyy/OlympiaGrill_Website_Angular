import { inject, Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
  async mailSignUp(email: string, password: string): Promise<string> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: any) => {
        /* console.log(userCredential.user.uid); */
        return userCredential.user.uid;
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
  async logIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      // Signed in
      console.log(JSON.stringify(userCredential.user.uid));

      this.userService.activeUser = await this.userService.getUserByUserId(
        userCredential.user.uid
      );

      sessionStorage.setItem(
        'loggedInUser',
        JSON.stringify(userCredential.user.uid)
      );
      /* this.userService.setActiveUser(user); */
    } catch (error) {
      alert(error);
    }
  }

  /* =========
  LOG-OUT
  ============*/
  async logOut(){
    signOut(this.auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }



}


