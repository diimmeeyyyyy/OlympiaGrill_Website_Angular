import { Component, Input } from '@angular/core';
import { ShoppingBasketItem } from '../../../shared/interfaces/shopping-basket-item.interface';
import { CommonModule } from '@angular/common';
import { EuroCurrencyPipe } from '../../../shared/pipes/currencies/euro-currency.pipe';

@Component({
  selector: 'app-dish',
  standalone: true,
  imports: [CommonModule, EuroCurrencyPipe],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss',
})
export class DishComponent {
  @Input() dish: ShoppingBasketItem | undefined;

  getTotalPrice(): number {
    return (this.dish?.price ?? 0) * (this.dish?.amount ?? 0);
  }

  getToppingsString(dish: ShoppingBasketItem) {
    if (dish.foodClass === 'GR') {
      return this.toppingsStringGR(dish);
    } else if (dish.foodClass === 'S') {
      return this.toppingsStringS(dish);
    } else if (
      dish.foodClass === 'TX' ||
      dish.foodClass === 'CP' ||
      dish.foodClass === 'GY'
    ) {
      return this.toppingsStringTX(dish);
    } else if (dish.foodClass === 'PITA' || dish.foodClass === 'BUR') {
      return this.toppingsStringPITA(dish);
    } else if (dish.foodClass === 'GYSP') {
      return this.toppingsStringGYSP(dish);
    } else if (dish.foodClass === 'GYSA') {
      return this.toppingsStringGYSA(dish);
    } else if (dish.foodClass === 'BIF') {
      return this.toppingsStringBIF(dish);
    } else {
      return dish.toppings?.join(', ');
    }
  }

  toppingsStringPITA(dish: ShoppingBasketItem) {
    if (dish.toppings?.length === 0) {
      return 'komplett';
    } else {
      return dish.toppings?.join(', ');
    }
  }

  toppingsStringTX(dish: ShoppingBasketItem) {
    if (dish.toppings?.length === 0) {
      return 'Nichts drauf';
    } else {
      return dish.toppings?.join(', ');
    }
  }

  toppingsStringGR(dish: ShoppingBasketItem) {
    if (dish.toppings?.length === 0) {
      return 'Mit ' + dish.salad;
    } else {
      return 'Mit ' + dish.salad + ', ' + dish.toppings?.join(', ');
    }
  }

  toppingsStringS(dish: ShoppingBasketItem) {
    if (dish.sides === 'Ohne Beilage') {
      return 'Ohne Beilage';
    } else if (dish.sides === 'Mit Pommes' && dish.toppings?.length === 0) {
      return 'Mit Pommes ohne';
    } else if (dish.sides === 'Mit Pommes' && dish.toppings?.length !== 0) {
      return 'Mit Pommes ' + dish.toppings?.join(', ');
    } else {
      return '';
    }
  }

  toppingsStringGYSP(dish: ShoppingBasketItem) {
    if (dish.sides === 'Ohne Beilage') {
      return dish.gyrosSpecial + ', ohne Beilage';
    } else if (dish.sides === 'Mit Pommes' && dish.toppings?.length === 0) {
      return dish.gyrosSpecial + ' und mit Pommes ohne';
    } else {
      return dish.gyrosSpecial + ' und Pommes ' + dish.toppings?.join(', ');
    }
  }

  toppingsStringGYSA(dish: ShoppingBasketItem) {
    if (dish.toppings?.length === 0) {
      return 'Mit ' + dish.salad;
    } else {
      return 'Mit ' + dish.salad + ', ' + dish.toppings?.join(', ');
    }
  }

  toppingsStringBIF(dish: ShoppingBasketItem) {
    if (dish.toppings?.length === 0) {
      return dish.bifteki + ' und ' + dish.salad;
    } else {
      return (
        dish.bifteki + ' , ' + dish.salad + ' , ' + dish.toppings?.join(', ')
      );
    }
  }
}
