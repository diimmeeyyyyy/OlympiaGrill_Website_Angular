import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PreorderdataService } from '../../../../shared/firebase-services/preorderdata.service';

@Component({
  selector: 'app-shopping-basket-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-basket-item.component.html',
  styleUrl: './shopping-basket-item.component.scss',
})
export class ShoppingBasketItemComponent {
  @Input() dish: any;
  @Input() index!: number;

  @Output() changedItemAmount = new EventEmitter<{
    amount: number;
    index: number;
  }>();
  @Output() removeItem = new EventEmitter<number>();

  constructor(private preOrderService: PreorderdataService) {}

  increaseItemAmount() {
    this.dish.amount++;
    this.preOrderService.totalItemAmount++;
    this.itemPrice();
    this.changedItemAmount.emit({
      amount: this.dish.amount,
      index: this.index,
    });
  }

  decreaseItemAmount() {
    this.dish.amount--;
    this.preOrderService.totalItemAmount--;
    this.itemPrice();
    this.changedItemAmount.emit({
      amount: this.dish.amount,
      index: this.index,
    });
  }

  deleteItem() {
    this.removeItem.emit(this.index);
  }

  itemPrice() {
    let dishPrice = this.dish.price * this.dish.amount;
    return dishPrice.toFixed(2).replace('.', ',');
  }

  isSpecialDish(): boolean {
    return (
      this.dish.title === 'Champignon-Schnitzel' ||
      this.dish.title === 'Mailänder - Schnitzel' ||
      this.dish.title === 'Currywurst-Pommes'
    );
  }

  getToppingsString() {
    if (this.dish.foodClass === 'GR') {
      return this.toppingsStringGR();
    } else if (this.dish.foodClass === 'S') {
      return this.toppingsStringS();
    } else if (this.dish.foodClass === 'TX' || this.dish.foodClass === 'CP') {
      if (this.dish.toppings.length === 0) {
        return 'Nichts drauf';
      } else {
        return this.dish.toppings.join(', ');
      }
    } else {
      return this.dish.toppings;
    }
  }

  toppingsStringGR() {
    if (this.dish.toppings.length === 0) {
      return 'Mit ' + this.dish.salad;
    } else {
      return 'Mit ' + this.dish.salad + ', ' + this.dish.toppings.join(', ');
    }
  }

  toppingsStringS() {
    if (this.dish.sides === 'Ohne Beilage') {
      return 'Ohne Beilage';
    } else if (
      this.dish.sides === 'Mit Pommes' &&
      this.dish.toppings.length === 0
    ) {
      return 'Mit Pommes und da nichts drauf';
    } else if (
      this.dish.sides === 'Mit Pommes' &&
      this.dish.toppings.length !== 0
    ) {
      return 'Mit Pommes ' + this.dish.toppings.join(', ');
    } else {
      return;
    }
  }
}
