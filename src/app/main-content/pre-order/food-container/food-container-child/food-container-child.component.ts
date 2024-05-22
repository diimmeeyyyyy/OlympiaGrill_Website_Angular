import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { PreorderdataService } from '../../../../shared/firebase-services/preorderdata.service';
import { FoodClass } from '../../../../interfaces/food-class.interface';
import { SaladSelectionComponent } from './salad-selection/salad-selection.component';
import { GyrosSpecialSelectionComponent } from './gyros-special-selection/gyros-special-selection.component';
import { BiftekiSelectionComponent } from './bifteki-selection/bifteki-selection.component';
import { SidesSelectionComponent } from './sides-selection/sides-selection.component';
import { ShoppingBasketItem } from '../../../../interfaces/shopping-basket-item.interface';
/* import { ShoppingBasket } from '../../../../interfaces/shopping-basket.interface'; */

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

  @ViewChild('Child_Container') childContainer!: ElementRef;
  @Output() childContainerReady = new EventEmitter<ElementRef>();
  ngAfterViewInit() {
    this.childContainerReady.emit(this.childContainer);
  }

  selectedValueFoodClassS?: string;
  totalPrice: number = 0;
  toppingPrice: number = 0;
  amount: number = 1;
  selectedToppings: string[] = [];

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
    } else if (
      this.dish.foodClass === 'GR' ||
      this.dish.foodClass === 'GP' ||
      this.dish.foodClass === 'BIF'
    ) {
      return this.preOrderService.foodClassGR;
    } else if (this.dish.foodClass === 'PITA') {
      return this.preOrderService.foodClassPITA;
    } else if (this.dish.foodClass === 'GY' || this.dish.foodClass === 'GYSA') {
      return this.preOrderService.foodClassGY;
    } else if (this.dish.foodClass === 'PITAVEG') {
      return this.preOrderService.foodClassPITAVEG;
    } else if (this.dish.foodClass === 'BUR') {
      return this.preOrderService.foodClassBUR;
    } else if (this.dish.foodClass === 'K') {
      return this.preOrderService.foodClassK;
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
    } else if (this.dish.foodClass === 'GY') {
      return 'backgroundFoodClassGY';
    } else if (this.dish.foodClass === 'K') {
      return 'backgroundFoodClassK';
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
      this.selectedToppings.push(topping.title);
    } else {
      this.toppingPrice -= price;
      const index = this.selectedToppings.indexOf(topping.title);
      if (index > -1) {
        this.selectedToppings.splice(index, 1);
      }
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

  addToShoppingBasket() {
    console.log('Dish is ' + this.dish.title);
    console.log('Amount is ' + this.amount);
    console.log('Price is ' + this.totalPrice);
    console.log('Toppings are: ' + this.selectedToppings);
    console.log('Choosed Salad is ' + this.getSalad());
    console.log('Choosed Bifteki is ' + this.getBifteki());

    let item: ShoppingBasketItem = {
      title: this.dish.title,
      price: this.totalPrice,
      amount: this.amount,
      toppings: this.selectedToppings,
      salad: this.getSalad(),
      bifteki: this.getBifteki(),
      /* gyrosSpecial?: string; */
    };
    /* this.preOrderService.addToShoppingBasket(item); */
  }

  saladSelected: string | undefined = ''; //Default
  handleSaladSelection(selectedSalad?: string) {
    this.saladSelected = selectedSalad;
  }

  getSalad() {
    if (
      this.dish.foodClass === 'GR' ||
      this.dish.foodClass === 'GYSA' ||
      this.dish.foodClass === 'BIF'
    ) {
      return this.saladSelected === '' ? 'Krautsalat' : this.saladSelected;
    } else {
      return '';
    }
  }

  biftekiSelected: string | undefined = '';
  handleBiftekiSelection(selectedBifteki?: string) {
    this.biftekiSelected = selectedBifteki;
  }

  getBifteki() {
    if (this.dish.foodClass === 'BIF') {
      return this.biftekiSelected === ''
        ? 'Mit Gouda-Käse'
        : this.biftekiSelected;
    } else {
      return '';
    }
  }

  gyrosSpecialSelected: string | undefined = '';
  handleGyrosSpecialSelection(selectedGyrosSpecial?: string) {
    this.gyrosSpecialSelected = selectedGyrosSpecial;
  }

  getGyrosSpecial() {
    if (this.dish.foodClass === 'GYSP') {
      return this.gyrosSpecialSelected === ''
        ? 'Mit Gouda-Käse & Metaxa-Sauce'
        : this.gyrosSpecialSelected;
    } else {
      return '';
    }
  }
}
