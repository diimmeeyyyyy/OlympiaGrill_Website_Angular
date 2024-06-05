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
    this.logInService.loggedIn = false;
    console.log(logInService.registeredUsers);
  }

  navigateToPreOrder() {
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
}
