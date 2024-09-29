import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PreorderdataService } from '../firebase-services/pre-order-data/preorderdata.service';
import { Router } from '@angular/router';
import { ShoppingbasketService } from '../firebase-services/basket/shoppingbasket.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  basketService = inject(ShoppingbasketService);
  constructor(private router: Router) {}

  checkMarginBottom() {
    return (
      this.basketService.totalItemAmount > 0 &&
      window.innerWidth < 450 &&
      this.router.url !== '/myOrders'
    );
  }

  navigateToImprint() {
    this.router.navigateByUrl('/imprint').then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  navigateToPrivacyPolicy() {
    this.router.navigateByUrl('/privacyPolicy').then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}
