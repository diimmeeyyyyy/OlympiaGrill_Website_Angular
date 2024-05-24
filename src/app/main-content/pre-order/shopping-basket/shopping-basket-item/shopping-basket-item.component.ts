import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  increaseItemAmount() {
    this.dish.amount++;
    this.itemPrice();
    this.changedItemAmount.emit({
      amount: this.dish.amount,
      index: this.index,
    });
  }

  decreaseItemAmount() {
    this.dish.amount--;
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

  getToppings() {
    if (this.dish.foodClass === 'GR') {
      return this.checkToppingsGR();
    } else if (this.dish.foodClass === 'S') {
      return this.checkToppingsS();
    } else if (this.dish.foodClass === 'TX') {
      if (this.dish.toppings.length === 0) {
        return 'Nichts drauf';
      } else {
        return 'Mit ' + this.dish.toppings.join(', ');
      }
    } else {
      return this.dish.toppings;
    }
  }

  checkToppingsGR() {
    if (this.dish.toppings.length === 0) {
      return 'Mit ' + this.dish.salad;
    } else {
      return 'Mit ' + this.dish.salad + ', ' + this.dish.toppings.join(', ');
    }
  }

  checkToppingsS() {
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
