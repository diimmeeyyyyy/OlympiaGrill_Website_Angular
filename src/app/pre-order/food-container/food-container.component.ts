import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, inject } from '@angular/core';
import { PreOrderComponent } from '../pre-order.component';
import { FoodContainerChildComponent } from './food-container-child/food-container-child.component';
import { PreorderdataService } from '../../shared/firebase-services/preorderdata.service';
import { ShoppingBasketItem } from '../../interfaces/shopping-basket-item.interface';
import { ShoppingbasketService } from '../../shared/firebase-services/shoppingbasket.service';

@Component({
  selector: 'app-food-container',
  standalone: true,
  imports: [CommonModule, FoodContainerChildComponent],
  templateUrl: './food-container.component.html',
  styleUrl: './food-container.component.scss',
})
export class FoodContainerComponent {
  basketService = inject(ShoppingbasketService);
  @Input() dish: any;
  @Input() index!: number;
  showChild = false;

  @ViewChild('mainContainer') mainContainer!: ElementRef;
  @ViewChild('Background_Large_Screen') background!: ElementRef;

  childContainer!: ElementRef;
  onChildContainerReady(childContainer: ElementRef) {
    this.childContainer = childContainer;
  }

  toggleChild() {
    if (this.showChild) {
      this.closeChildContainer();
    } else {
      if (this.dish.foodClass === 'C') {
        let item: ShoppingBasketItem =
          this.createShoppingBasketItemFoodClassC();
        this.basketService.checkIfDishAlreadyExistsInBasket(item);
      } else {
        this.checkIfLargeScreen();
        this.showChild = !this.showChild;
      }
    }
  }

  createShoppingBasketItemFoodClassC() {
    return {
      id: -1,
      title: this.dish.title,
      price: this.dish.price,
      amount: 1,
      foodClass: this.dish.foodClass,
      toppings: [this.dish.description],
      salad: undefined,
      bifteki: undefined,
      gyrosSpecial: undefined,
      sides: undefined,
    };
  }

  checkIfLargeScreen() {
    if (window.innerWidth > 690) {
      if (this.background) {
        this.background.nativeElement.classList.add(
          'background-div-large-screen'
        );
      }
      if (this.mainContainer) {
        this.mainContainer.nativeElement.classList.add('center-screen');
      }
    }
  }

  scrollToTop() {
    let clickedContainer = this.mainContainer.nativeElement as HTMLElement;
    let clickedContainerPosition = clickedContainer.getBoundingClientRect().top;
    let targetPosition = window.scrollY + clickedContainerPosition - 10;

    if (this.showChild && this.dish.foodClass !== 'C') {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }

  closeChildContainer() {
    const element = this.childContainer.nativeElement;

    element.animate(
      [
        // keyframes
        { transform: 'scale(1)' },
        { transform: 'scale(0)' },
      ],
      {
        // timing options
        duration: 250,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );

    setTimeout(() => {
      this.showChild = false;
    }, 251);
    this.background.nativeElement.classList.remove(
      'background-div-large-screen'
    );
    this.mainContainer.nativeElement.classList.remove('center-screen');
  }
}
