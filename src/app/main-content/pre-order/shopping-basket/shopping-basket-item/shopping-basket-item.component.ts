import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-basket-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-basket-item.component.html',
  styleUrl: './shopping-basket-item.component.scss',
})
export class ShoppingBasketItemComponent {
  @Input() dish: any;
  /* @Input() index: number; */
}
