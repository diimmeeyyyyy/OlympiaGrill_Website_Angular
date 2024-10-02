import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShoppingBasketItem } from '../../shared/interfaces/shopping-basket-item.interface';
import { Dish } from '../../shared/interfaces/dish.interface';
import { EuroCurrencyPipe } from '../../shared/pipes/currencies/euro-currency.pipe';
import { ButtonModule } from 'primeng/button';
import { DishComponent } from './dish/dish.component';
import { Order } from '../../shared/interfaces/order.interface';
import { OrderStatusComponent } from './order-status/order-status.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    EuroCurrencyPipe,
    DishComponent,
    ButtonModule,
    OrderStatusComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input() order!: Order;

  calculateTotalPrice(order: Order): number {
    let total: number = 0;
    order.order.forEach((dish) => {
      total += dish.price * dish.amount;
    });
    return total;
  }
}
