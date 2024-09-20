import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LogInAndRegisterService } from '../shared/firebase-services/log-in-and-register/log-in-and-register.service';
import { UserService } from '../shared/firebase-services/user/user.service';
import { Order } from '../shared/interfaces/order.interface';
import { OrderService } from '../shared/firebase-services/order/order.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  userService = inject(UserService);
  orderService = inject(OrderService);
  myOrder: Order[] = [];

  constructor(public logInAndRegisterService: LogInAndRegisterService) {
    this.logInAndRegisterService.loggedIn = true;
  }

  loadOrders() {
    this.userService.activeUser?.orders.forEach(order => {
      
    });
  }
}
