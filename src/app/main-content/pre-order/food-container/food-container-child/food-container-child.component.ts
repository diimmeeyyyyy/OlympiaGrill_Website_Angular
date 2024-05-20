import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PreorderdataService } from '../../../../shared/firebase-services/preorderdata.service';
import { FoodClass } from '../../../../interfaces/food-class.interface';
import { SaladSelectionComponent } from './salad-selection/salad-selection.component';
import { GyrosSpecialSelectionComponent } from './gyros-special-selection/gyros-special-selection.component';
import { BiftekiSelectionComponent } from './bifteki-selection/bifteki-selection.component';
import { SidesSelectionComponent } from './sides-selection/sides-selection.component';

@Component({
  selector: 'app-food-container-child',
  standalone: true,
  imports: [
    CommonModule,
    SaladSelectionComponent,
    GyrosSpecialSelectionComponent,
    BiftekiSelectionComponent,
    SidesSelectionComponent,
  ],
  templateUrl: './food-container-child.component.html',
  styleUrl: './food-container-child.component.scss',
})
export class FoodContainerChildComponent {
  @Input() dish: any;
  @Input() foodContainerindex!: number;
  @Output() close = new EventEmitter<void>();
  closeChildContainer() {
    this.close.emit();
  }

  selectedValueFoodClassS?: string;
  totalPrice: number = 0;
  toppingPrice: number = 0;
  amount: number = 1;

  constructor(private preOrderService: PreorderdataService) {}

  handleSelectedValueChange(selectedValue: string) {
    this.selectedValueFoodClassS = selectedValue;
    this.getFoodClassContent();
  }

  getFoodClassContent(): FoodClass[] | undefined {
    if (this.dish.foodClass === 'TX') {
      return this.preOrderService.foodClassTX;
    } else if (this.selectedValueFoodClassS === 'WithFries') {
      return this.preOrderService.foodClassS;
    } else if (this.selectedValueFoodClassS === 'Without') {
      return undefined;
    } else if (this.dish.foodClass === 'CP') {
      return this.preOrderService.foodClassS;
    } else if (this.dish.foodClass === 'GR' || this.dish.foodClass === 'GP') {
      return this.preOrderService.foodClassGR;
    } else if (this.dish.foodClass === 'PITA') {
      return this.preOrderService.foodClassPITA;
    } else if (this.dish.foodClass === 'GY' || this.dish.foodClass === 'GYSA') {
      return this.preOrderService.foodClassGY;
    } else {
      return undefined;
    }
  }

  getFoodClassBackground() {
    if (this.dish.foodClass === 'TX') {
      return 'backgroundFoodClassTX';
    } else if (this.dish.foodClass === 'GR') {
      return 'backgroundFoodClassGR';
    } else if (this.dish.foodClass === 'PITA') {
      return 'backgroundFoodClassPITA';
    } else if (this.dish.foodClass === 'S') {
      return 'backgroundFoodClassS';
    } else {
      return 'backgroundFoodClassGR';
    }
  }

  getToppingPrice(price: number | undefined) {
    return price == 0 ? '' : '+ ' + price?.toFixed(2).replace('.', ',') + ' €';
  }

  itemPrice() {
    if (this.selectedValueFoodClassS === 'WithFries') {
      this.totalPrice =
        (this.dish.price + 2.2 + this.toppingPrice) * this.amount;
    } else if (this.selectedValueFoodClassS === 'Without') {
      this.toppingPrice = 0;
      this.totalPrice = this.dish.price * this.amount;
    } else {
      this.totalPrice = (this.dish.price + this.toppingPrice) * this.amount;
    }
    return this.totalPrice.toFixed(2).replace('.', ',');
  }

  onCheckboxChange(event: Event, topping: FoodClass) {
    const checkbox = event.target as HTMLInputElement;
    let price = typeof topping.price === 'number' ? topping.price : 0;
    if (checkbox.checked) {
      this.toppingPrice += price;
    } else {
      this.toppingPrice -= price;
    }
    this.itemPrice();
  }

  increaseAmount() {
    this.amount++;

    this.itemPrice();
  }

  decreaseAmount() {
    if (this.amount > 1) {
      this.amount--;
    }

    this.itemPrice();
  }

  scaleUp(event: TouchEvent) {
    (event.target as HTMLElement).classList.add('scale-up');
    (event.target as HTMLElement).classList.remove('scale-down');
  }

  scaleDown(event: TouchEvent) {
    (event.target as HTMLElement).classList.add('scale-down');
    (event.target as HTMLElement).classList.remove('scale-up');
  }
}
