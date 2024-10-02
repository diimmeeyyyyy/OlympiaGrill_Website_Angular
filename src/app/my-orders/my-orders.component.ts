import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../shared/firebase-services/user/user.service';
import { OrderService } from '../shared/firebase-services/order/order.service';
import { OrderComponent } from './order/order.component';
import { TabViewModule } from 'primeng/tabview';
import { EuroCurrencyPipe } from '../shared/pipes/currencies/euro-currency.pipe';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { PageEvent } from '../shared/interfaces/page-event.interface';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    ProgressSpinnerModule,
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent implements OnInit {
  userService = inject(UserService);
  orderService = inject(OrderService);
  isLoading: boolean = false;

  async ngOnInit() {
    this.isLoading = true;
    await this.initMyOrders();
    this.isLoading = false;
  }

  async initMyOrders() {
    await this.userService.loadActiveUser();
    console.log(this.userService.activeUser);
    if (this.userService.activeUser) {
      await this.initializeMyOrders();
      this.updatePaginatedOrders();
    } else {
      console.error('activeUser is null');
    }
  }

  async initializeMyOrders() {
    await this.orderService.loadMyOrders();
  }

  first: number = 0;
  rows: number = 3;
  paginatedOrders: any[] = [];

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? +3;
    this.rows = event.rows ?? 3;
    this.updatePaginatedOrders();
    window.scrollTo(0, 0);
  }

  updatePaginatedOrders() {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedOrders = this.orderService.myOrders.slice(start, end);
  }
}
