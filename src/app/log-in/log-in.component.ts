import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LogInAndRegisterService } from '../shared/firebase-services/log-in-and-register.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  constructor(
    public logInService: LogInAndRegisterService,
    private router: Router
  ) {
    logInService.loggedIn = false;
    this.logInService.guestLoggedIn = false;
    logInService.userLoggedIn = false;
    console.log(logInService.registeredUsers);
  }

  navigateToPreOrder() {
    if (!this.logInService.userLoggedIn) {
      this.logInService.guestLoggedIn = true;
    }
    this.router.navigateByUrl('/preOrder');
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register').then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  emailImage = '/assets/img/register-email.png';
  passwordImage = '/assets/img/register-password.png';

  checkEmail(email: string) {
    const userEmail = this.logInService.registeredUsers.find(
      (user) => user.email === email
    );

    if (userEmail) {
      return '/assets/img/dataExist.png';
    } else {
      return '/assets/img/register-email.png';
    }
  }

  checkPassword(email: string, password: string) {
    const userData = this.userExists(email, password);

    if (userData) {
      return '/assets/img/dataExist.png';
    } else {
      return '/assets/img/register-password.png';
    }
  }

  logInUser(email: string, password: string) {
    const user = this.userExists(email, password);
    if (user) {
      this.logInService.setLoggedInUser(user);
      this.logInService.userLoggedIn = true;
      this.navigateToPreOrder();
    }
  }

  userExists(email: string, password: string) {
    return this.logInService.registeredUsers.find(
      (user) => user.email === email && user.password === password
    );
  }
}
