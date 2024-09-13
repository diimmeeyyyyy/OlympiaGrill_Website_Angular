import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  Renderer2,
} from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FoodMenuNavComponent } from './food-menu-nav/food-menu-nav.component';
import { PreorderdataService } from '../shared/firebase-services/preorderdata.service';
import { FoodContainerComponent } from './food-container/food-container.component';
import { Dish } from '../interfaces/dish.interface';
import { FoodContainerChildComponent } from './food-container/food-container-child/food-container-child.component';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';
import { LogInAndRegisterService } from '../shared/firebase-services/log-in-and-register.service';

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
    /* private preOrderService: PreorderdataService, */
    private renderer: Renderer2,
    public logInAndRegisterService: LogInAndRegisterService
  ) {
    this.logInAndRegisterService.loggedIn = true;
  }

  renderFoodTypeSection(name: string) {
    this.selectedFoodType = name;
    this.getFoodTypeList();
  }

  getFoodTypeList() {
    if (this.selectedFoodType === 'Salate') {
      return this.preorderdata.salads;
    } else if (this.selectedFoodType === 'Beilagen') {
      return this.preorderdata.sides;
    } else if (this.selectedFoodType === 'Vorspeisen') {
      return this.preorderdata.appetizers;
    } else if (this.selectedFoodType === 'Schnelle Gerichte') {
      return this.preorderdata.fastDishes;
    } else if (this.selectedFoodType === 'Kinder') {
      return this.preorderdata.kids;
    } else if (this.selectedFoodType === 'Schnitzel') {
      return this.preorderdata.schnitzel;
    } else if (this.selectedFoodType === 'Vom Grill') {
      return this.preorderdata.grilledDishes;
    } else if (this.selectedFoodType === 'Gyros Gerichte') {
      return this.preorderdata.gyrosDishes;
    } else if (this.selectedFoodType === 'Pita') {
      return this.preorderdata.pita;
    } else {
      return this.preorderdata.popularDishes;
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

  shoppingBasketVisibity() {
    if (window.innerWidth <= 1024) {
      return this.showShoppingBasket;
    } else {
      return (this.showShoppingBasket = true);
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

  redirectionButtonToShoppingBasket() {
    if (window.innerWidth <= 1024) {
      return this.preorderdata.totalItemAmount > 0;
    } else {
      return false;
    }
  }
}
