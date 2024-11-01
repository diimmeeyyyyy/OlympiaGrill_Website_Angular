import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../shared/firebase-services/order/order.service';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss',
})
export class OrderStatusComponent {
  @Input() status!: string;
  @Input() confirmedPickUpTime!: number;
  /* statusSubscription!: Subscription; */

  
  /* constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.statusSubscription = this.orderService.statusChanged.subscribe(
      (newStatus: string) => {
        this.status = newStatus;
        this.reloadPage();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  reloadPage(): void {
    this.router.navigate([this.router.url]);
  } */
}
