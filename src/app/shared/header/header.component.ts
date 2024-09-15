import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogInAndRegisterService } from '../firebase-services/log-in-and-register/log-in-and-register.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public logInService: LogInAndRegisterService
  ) {}
  menuOpen = false;

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = 'auto';
  }

  navigateToPreOrder() {
    this.router.navigateByUrl('/preOrder');
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  screenIsLarge() {
    return window.innerWidth >= 1024;
  }

  getGreetingName() {
    if (!this.logInService.loggedInUser) {
      return 'Gast';
    } else {
      return this.logInService.loggedInUser.name;
    }
  }

  logOut() {
    this.router.navigateByUrl('/');
    this.logInService.loggedIn = false;
  }
}
