import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  constructor(public router: Router) {}

  navigateToImprint() {
    this.router.navigateByUrl('/imprint');
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
}
