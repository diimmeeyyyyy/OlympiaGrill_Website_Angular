import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  Renderer2,
} from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FoodMenuNavComponent } from './food-menu-nav/food-menu-nav.component';
import { PreorderdataService } from '../../shared/firebase-services/preorderdata.service';
import { FoodContainerComponent } from './food-container/food-container.component';
import { Dish } from '../../interfaces/dish.interface';
import { FoodContainerChildComponent } from './food-container/food-container-child/food-container-child.component';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';

@Component({
  selector: 'app-pre-order',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FoodMenuNavComponent,
    FoodContainerComponent,
    FoodContainerChildComponent,
    ShoppingBasketComponent,
  ],
  templateUrl: './pre-order.component.html',
  styleUrl: './pre-order.component.scss',
})
export class PreOrderComponent {
  preorderdata = inject(PreorderdataService);
  showChildContainer = false;
  selectedFoodType: string = '';

  foodList: Dish[] = [];

  constructor(
    private preOrderService: PreorderdataService,
    private renderer: Renderer2
  ) {}

  renderFoodTypeSection(name: string) {
    this.selectedFoodType = name;
    console.log(this.selectedFoodType);
    this.getFoodTypeList();
  }

  getFoodTypeList() {
    if (this.selectedFoodType === 'Salate') {
      return this.preOrderService.salads;
    } else if (this.selectedFoodType === 'Beilagen') {
      return this.preOrderService.sides;
    } else if (this.selectedFoodType === 'Vorspeisen') {
      return this.preOrderService.appetizers;
    } else if (this.selectedFoodType === 'Schnelle Gerichte') {
      return this.preOrderService.fastDishes;
    } else if (this.selectedFoodType === 'Kinder') {
      return this.preOrderService.kids;
    } else if (this.selectedFoodType === 'Schnitzel') {
      return this.preOrderService.schnitzel;
    } else if (this.selectedFoodType === 'Vom Grill') {
      return this.preOrderService.grilledDishes;
    } else if (this.selectedFoodType === 'Gyros Gerichte') {
      return this.preOrderService.gyrosDishes;
    } else if (this.selectedFoodType === 'Pita') {
      return this.preOrderService.pita;
    } else {
      return this.preOrderService.popularDishes;
    }
  }

  shoppingBasket!: ElementRef;
  onShoppingBasketReady(shoppingBasket: ElementRef) {
    this.shoppingBasket = shoppingBasket;
  }

  showShoppingBasket: boolean = false;
  toggleShoppingBasket() {
    this.showShoppingBasket = !this.showShoppingBasket;
    if (this.showShoppingBasket) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  closeShoppingBasket() {
    const element = this.shoppingBasket.nativeElement;
    this.renderer.setStyle(document.body, 'overflow', 'auto');
    element.animate([{ transform: 'scale(1)' }, { transform: 'scale(0)' }], {
      duration: 250,
      easing: 'ease-in-out',
      fill: 'forwards',
    });

    setTimeout(() => {
      this.showShoppingBasket = false;
    }, 251);
  }
}
