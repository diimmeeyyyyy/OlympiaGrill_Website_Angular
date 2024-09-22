import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LogInAndRegisterService } from '../shared/firebase-services/log-in-and-register/log-in-and-register.service';
import { UserService } from '../shared/firebase-services/user/user.service';
import { Order } from '../shared/interfaces/order.interface';
import { OrderService } from '../shared/firebase-services/order/order.service';
import { OrderComponent } from './order/order.component';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, OrderComponent],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  userService = inject(UserService);
  orderService = inject(OrderService);

  constructor() {
    this.initializeMyOrders();
  }

  async initializeMyOrders() {
    await this.orderService.loadMyOrders();
  }
}
