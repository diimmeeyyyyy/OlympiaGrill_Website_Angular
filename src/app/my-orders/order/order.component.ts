import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShoppingBasketItem } from '../../shared/interfaces/shopping-basket-item.interface';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input() dish: ShoppingBasketItem | undefined;
}
