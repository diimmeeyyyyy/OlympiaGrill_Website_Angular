import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PreorderdataService } from '../firebase-services/preorderdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(
    private preOrderService: PreorderdataService,
    private router: Router
  ) {}

  checkMarginBottom() {
    return this.preOrderService.totalItemAmount > 0 && window.innerWidth < 690;
  }

  navigateToImprint() {
    this.router.navigateByUrl('/imprint').then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}
