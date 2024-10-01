import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LogInAndRegisterService } from '../shared/firebase-services/log-in-and-register/log-in-and-register.service';
import { UserService } from '../shared/firebase-services/user/user.service';
import { Order } from '../shared/interfaces/order.interface';
import { OrderService } from '../shared/firebase-services/order/order.service';
import { OrderComponent } from './order/order.component';
import { TabViewModule } from 'primeng/tabview';
import { EuroCurrencyPipe } from '../shared/pipes/currencies/euro-currency.pipe';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { PageEvent } from '../shared/interfaces/page-event.interface';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    CommonModule,
    OrderComponent,
    TabViewModule,
    EuroCurrencyPipe,
    ButtonModule,
    PaginatorModule,
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent implements OnInit {
  userService = inject(UserService);
  orderService = inject(OrderService);

  async ngOnInit() {
    await this.userService.loadActiveUser();
    console.log(this.userService.activeUser);
    if (this.userService.activeUser) {
      await this.initializeMyOrders();
    } else {
      console.log('activeUser is null');
    }
  }

  calculateTotalPrice(order: Order): number {
    let total: number = 0;
    order.order.forEach((dish) => {
      total += dish.price * dish.amount;
    });
    return total;
  }

  /*  orderStatus!:string;
  getOrderStatus(){
    
  } */

  /* async init() {
    this.userService.loadActiveUser();
  } */

  async initializeMyOrders() {
    await this.orderService.loadMyOrders();
  }

  first: number = 0;
  rows: number = 2;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 2;
  }
}
