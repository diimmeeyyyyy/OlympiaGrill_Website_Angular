import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LogInAndRegisterService } from '../shared/firebase-services/log-in-and-register/log-in-and-register.service';
import { UserService } from '../shared/firebase-services/user/user.service';
import { AuthentificationService } from '../shared/firebase-services/authentification/authentification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule,FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  userService = inject(UserService);
  authService = inject(AuthentificationService);
  email!: string;
  password!: string;

  constructor(
    public logInService: LogInAndRegisterService,
    private router: Router
  ) {
    logInService.loggedIn = false;
    this.logInService.guestLoggedIn = false;
    logInService.userLoggedIn = false;
  }

  logInAsGuest() {
    let guest = {
      id: '123456789',
      name: 'guest',
      email: 'guest@gmx.de',
      password: 'guest',
      orders: [],
    };
    this.userService.setActiveUser(guest);
    console.log(this.userService.activeUser);
    this.navigateToPreOrder();
  }

  navigateToPreOrder() {
    this.router.navigateByUrl('/preOrder');
    document.body.style.overflow = 'auto';
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register').then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  emailImage = './assets/img/register-email.png';
  passwordImage = './assets/img/register-password.png';

  checkEmail(email: string) {
    const userEmail = this.logInService.users.find(
      (user) => user.email === email
    );

    if (userEmail) {
      return './assets/img/dataExist.png';
    } else {
      return './assets/img/register-email.png';
    }
  }

  /* checkPassword(email: string, password: string) {
    const userData = this.userExists(email, password);

    if (userData) {
      return './assets/img/dataExist.png';
    } else {
      return './assets/img/register-password.png';
    }
  } */

  async logInUser() {
    debugger;
    await this.authService.logIn(this.email, this.password);
    this.navigateToPreOrder();
  }
  /* logInUser(email: string, password: string) {
    const user = this.userExists(email, password);
    if (user) {
      sessionStorage.setItem('loggedInUser', user.id);
      this.userService.setActiveUser(user);
      this.navigateToPreOrder();
    }
  } */

  /* userExists(email: string, password: string) {
    return this.logInService.users.find(
      (user) => user.email === email && user.password === password
    );
  } */
}
