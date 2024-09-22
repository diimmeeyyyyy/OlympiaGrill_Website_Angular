import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogInAndRegisterService } from '../firebase-services/log-in-and-register/log-in-and-register.service';
import { UserService } from '../firebase-services/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userService = inject(UserService);
  constructor(private router: Router) {}
  menuOpen = false;

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = 'auto';
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(`/${url}`);
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

  /*  getGreetingName() {
    if (!this.logInService.loggedInUser) {
      return 'Gast';
    } else {
      return this.logInService.loggedInUser.name;
    }
  } */

  logOut() {
    sessionStorage.clear();
    this.userService.activeUser = null;
    this.router.navigateByUrl('/');
  }
}
